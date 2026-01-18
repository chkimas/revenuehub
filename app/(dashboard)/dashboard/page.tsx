import { requireSubscription } from '@/lib/supabase/gatekeeper'
import { getRevenueStats } from '@/lib/analytics/revenue'
import { StatsCards } from '@/components/dashboard/stats-cards'

export default async function DashboardPage() {
  const { user } = await requireSubscription()
  const { mrr, activeSubscriptions } = await getRevenueStats()

  return (
    <main className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user.email}. Here is your current revenue snapshot.
        </p>
      </section>

      <section aria-label="Revenue Statistics">
        <StatsCards mrr={mrr} activeSubscriptions={activeSubscriptions} />
      </section>

      <div className="grid gap-6 md:grid-cols-7">
        <section className="col-span-4 rounded-xl border border-border bg-card p-6 min-h-100">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Revenue Growth
          </h2>
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground/40 italic">
            Chart visualization engine initializing...
          </div>
        </section>

        <section className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground/60 italic">
              No recent usage logs detected.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
