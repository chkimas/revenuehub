export interface PlanFeatures {
  maxProjects?: number | string
  apiCallsPerMonth?: number | string
  storageGB?: number | string
  supportTier?: string
  [key: string]: unknown // Allows for arbitrary additional features
}

export interface Plan {
  id: string
  name: string
  description: string | null
  stripe_price_id: string
  amount: number
  interval: string
  features: PlanFeatures
}
