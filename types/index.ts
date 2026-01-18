export interface PlanFeatures {
  maxProjects?: number | string
  apiCallsPerMonth?: number | string
  storageGB?: number | string
  supportTier?: string
  [key: string]: unknown
}

export interface Plan {
  id: string
  name: string
  description: string | null
  stripe_price_id: string
  amount: number
  interval: 'month' | 'year'
  features: PlanFeatures
}

export interface Customer {
  id: string
  email: string
  subscription_status: string
  created_at: string
  plans: Plan | Plan[] | null
}
