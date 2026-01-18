import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true
})

// Creates or retrieves a Stripe customer based on Supabase UID.
export async function createOrGetCustomer(email: string, userId: string) {
  const customers = await stripe.customers.list({ email, limit: 1 })

  if (customers.data.length > 0) {
    return customers.data[0]?.id
  }

  const customer = await stripe.customers.create({
    email,
    metadata: { supabase_uid: userId }
  })

  return customer.id
}
