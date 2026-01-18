import { cn, formatCurrency, formatDate } from '@/lib/utils'
import type { Customer, Plan } from '@/types'

interface CustomerTableProps {
  customers: Customer[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-foreground">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Plan</th>
              <th className="px-6 py-4 font-medium">Revenue (Monthly)</th>
              <th className="px-6 py-4 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => {
              const plan = Array.isArray(customer.plans)
                ? (customer.plans[0] as Plan | undefined)
                : (customer.plans as Plan | null)

              const isMonthly = plan?.interval === 'month'

              return (
                <tr
                  key={customer.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{customer.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
                        customer.subscription_status === 'active'
                          ? 'bg-green-500/10 text-green-500 ring-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/20'
                      )}
                    >
                      {customer.subscription_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {plan?.name ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    {plan
                      ? formatCurrency(
                          isMonthly ? plan.amount / 100 : plan.amount / 12 / 100
                        )
                      : '--'}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {formatDate(customer.created_at)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {customers.length === 0 && (
        <div className="p-8 text-center text-muted-foreground italic">
          No active customers found.
        </div>
      )}
    </div>
  )
}
