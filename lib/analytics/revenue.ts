import { createClient } from '@/lib/supabase/server'

interface RevenueStats {
  mrr: number
  activeSubscriptions: number
  totalRevenue: number
}

/**
 * Calculates core revenue metrics by aggregating profile and payment data.
 * Note: For high-volume apps, this should be moved to a Postgres Materialized View.
 */
export async function getRevenueStats(): Promise<RevenueStats> {
  const supabase = await createClient()

  // Fetch active profiles with their associated plan amounts
  const { data: activeProfiles, error } = await supabase
    .from('profiles')
    .select(
      `
      subscription_status,
      plans (
        amount,
        interval
      )
    `
    )
    .eq('subscription_status', 'active')

  if (error) {
    console.error('Failed to fetch revenue data:', error.message)
    return { mrr: 0, activeSubscriptions: 0, totalRevenue: 0 }
  }

  // Calculate MRR by normalizing annual plans to monthly
  const mrr = activeProfiles.reduce((acc, profile) => {
    const plan = Array.isArray(profile.plans) ? profile.plans[0] : profile.plans
    if (!plan) return acc

    const monthlyAmount =
      plan.interval === 'year' ? plan.amount / 12 : plan.amount
    return acc + monthlyAmount
  }, 0)

  return {
    mrr: mrr / 100,
    activeSubscriptions: activeProfiles.length,
    totalRevenue: 0
  }
}
