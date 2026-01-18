import { getBillingPortalUrl } from '@/lib/actions/subscription'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and billing preferences.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Subscription Plan</h2>
            <p className="text-sm text-muted-foreground">
              Update your payment method or change your plan tier.
            </p>
          </div>

          <form action={getBillingPortalUrl}>
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Manage Billing in Stripe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
