import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { PlanFeatures } from '@/types'

// Validates session and subscription status.
export async function requireSubscription() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, plan_id')
    .eq('id', user.id)
    .single()

  if (!profile || profile.subscription_status !== 'active') {
    redirect('/pricing')
  }

  const { data: plan } = await supabase
    .from('plans')
    .select('features')
    .eq('id', profile.plan_id)
    .single()

  return { user, features: plan?.features }
}

// Compares current usage against plan limits.
export async function checkQuota(
  eventType: string,
  limitKey: keyof PlanFeatures
) {
  const supabase = await createClient()
  const { user, features } = await requireSubscription()

  const limit = features?.[limitKey]
  if (typeof limit !== 'number') return { allowed: true, limit: 'unlimited' }

  const { data: logs } = await supabase
    .from('usage_logs')
    .select('quantity')
    .eq('user_id', user.id)
    .eq('event_type', eventType)

  const totalUsage =
    logs?.reduce((acc, log) => acc + (log.quantity || 0), 0) ?? 0

  return {
    allowed: totalUsage < limit,
    current: totalUsage,
    limit
  }
}
