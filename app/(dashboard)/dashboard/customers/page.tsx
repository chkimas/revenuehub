import { getCustomers } from '@/lib/analytics/customers'
import { CustomerTable } from '@/components/dashboard/customer-table'

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Customers
        </h1>
        <p className="text-muted-foreground">
          Detailed breakdown of your subscriber base and their billing status.
        </p>
      </div>

      <CustomerTable customers={customers} />
    </div>
  )
}
