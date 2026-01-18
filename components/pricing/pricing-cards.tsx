'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/lib/actions/subscription'
import { cn, formatCurrency } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { Plan } from '@/types'

export function PricingCards({ plans }: { plans: Plan[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleSubscribe(priceId: string, planId: string) {
    setLoadingId(planId)
    try {
      await createCheckoutSession(priceId)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Checkout failed'
      console.error(message)
      setLoadingId(null)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="flex flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/50"
        >
          <div>
            <h3 className="text-lg font-semibold leading-8 text-foreground">
              {plan.name}
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {plan.description}
            </p>
            <div className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">
                {formatCurrency(plan.amount / 100)}
              </span>
              <span className="text-sm font-semibold leading-6 text-muted-foreground">
                /{plan.interval}
              </span>
            </div>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground"
            >
              {Object.entries(plan.features).map(([key, value]) => (
                <li key={key} className="flex gap-x-3">
                  <Check
                    className="h-6 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    {/* Format keys like 'maxProjects' to 'Max projects' */}
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    : {String(value)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe(plan.stripe_price_id, plan.id)}
            disabled={loadingId !== null}
            className={cn(
              'mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              loadingId === plan.id
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {loadingId === plan.id ? 'Processing...' : 'Get started'}
          </button>
        </div>
      ))}
    </div>
  )
}
