import { z } from 'zod'

/**
 * Authentication Schemas
 */
export const signUpSchema = z
  .object({
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Password must contain at least one number.'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const loginSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(1, 'Password is required.')
})

/**
 * Subscription & Usage Schemas
 */
export const createCheckoutSchema = z.object({
  priceId: z.string().startsWith('price_', 'Invalid Stripe price ID format.')
})

export const trackUsageSchema = z.object({
  userId: z.string().uuid(),
  eventType: z.enum(['api_call', 'project_created', 'storage_upload']),
  quantity: z.number().int().positive().default(1),
  metadata: z.record(z.string(), z.unknown()).optional()
})

// Infers TypeScript types from the Zod schemas
export type SignUpInput = z.infer<typeof signUpSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type TrackUsageInput = z.infer<typeof trackUsageSchema>
