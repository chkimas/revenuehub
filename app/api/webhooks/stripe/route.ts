import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook Error: ${message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  // Idempotency check
  const { data: existingEvent } = await supabaseAdmin
    .from('webhook_events')
    .select('*')
    .eq('stripe_event_id', event.id)
    .single()

  if (existingEvent?.processed) {
    return NextResponse.json({ received: true, ignored: 'already processed' })
  }

  await supabaseAdmin.from('webhook_events').insert({
    stripe_event_id: event.id,
    type: event.type
  })

  // Handle specific event types with proper casting
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.metadata?.supabase_uid) {
        await supabaseAdmin
          .from('profiles')
          .update({
            stripe_customer_id: session.customer as string,
            subscription_status: 'active'
          })
          .eq('id', session.metadata.supabase_uid)
      }
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: subscription.status
        })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('profiles')
        .update({
          subscription_status: 'canceled',
          plan_id: null
        })
        .eq('stripe_customer_id', subscription.customer as string)
      break
    }
  }

  await supabaseAdmin
    .from('webhook_events')
    .update({ processed: true })
    .eq('stripe_event_id', event.id)

  return NextResponse.json({ received: true })
}
