'use server'

import { createClient } from '@/lib/supabase/server'
import { trackUsageSchema } from '@/lib/validations/schemas'
import { revalidatePath } from 'next/cache'

export async function recordUsage(eventType: string, amount: number = 1) {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Unauthorized' }

  const validation = trackUsageSchema.safeParse({
    userId: user.id,
    eventType,
    quantity: amount
  })

  if (!validation.success) return { error: 'Invalid data' }

  const { error } = await supabase.from('usage_logs').insert({
    user_id: user.id,
    event_type: eventType,
    quantity: amount
  })

  if (error) return { error: 'Failed to record usage' }

  revalidatePath('/dashboard')
  return { success: true }
}
