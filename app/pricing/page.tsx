import { createClient } from '@/lib/supabase/server'
import { PricingCards } from '@/components/pricing/pricing-cards'

export default async function PricingPage() {
  const supabase = await createClient()

  // Fetch active plans ordered by price
  const { data: plans } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('amount', { ascending: true })

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose the plan that fits your scale. All plans include a 14-day
          trial.
        </p>
      </div>

      <PricingCards plans={plans ?? []} />
    </div>
  )
}
