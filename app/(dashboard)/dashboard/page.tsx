import { getRevenueStats } from '@/lib/analytics/revenue'
import { StatsCards } from '@/components/dashboard/stats-cards'

export default async function DashboardPage() {
  const { mrr, activeSubscriptions } = await getRevenueStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Real-time insights into your subscription business.
        </p>
      </div>

      <StatsCards mrr={mrr} activeSubscriptions={activeSubscriptions} />

      <div className="grid gap-4 md:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-border bg-card p-6 min-h-[400px]">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Revenue Growth
          </h2>
          {/* Chart implementation will go here */}
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground/50 italic">
            Chart data visualization pending...
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-border bg-card p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground italic">
              No recent transactions found.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
