import { DollarSign, Users, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface StatsCardsProps {
  mrr: number
  activeSubscriptions: number
}

export function StatsCards({ mrr, activeSubscriptions }: StatsCardsProps) {
  const stats = [
    {
      name: 'MRR',
      value: formatCurrency(mrr),
      icon: DollarSign,
      description: 'Monthly Recurring Revenue'
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.toString(),
      icon: Users,
      description: 'Current paying customers'
    },
    {
      name: 'Avg. Revenue',
      value: formatCurrency(
        activeSubscriptions > 0 ? mrr / activeSubscriptions : 0
      ),
      icon: TrendingUp,
      description: 'ARPU (Average Revenue Per User)'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </p>
            <stat.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  )
}
