import { createClient } from '@/lib/supabase/server'
import type { Customer } from '@/types'

export async function getCustomers(): Promise<Customer[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
      id,
      email,
      subscription_status,
      created_at,
      plans (
        id,
        name,
        description,
        stripe_price_id,
        amount,
        interval,
        features
      )
    `
    )
    .not('subscription_status', 'eq', 'none') // Only show users who engaged with billing
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Customer fetch error:', error.message)
    return []
  }

  // Explicit casting ensures the Supabase response matches customer type
  return data as unknown as Customer[]
}
