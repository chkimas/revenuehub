'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, signUpSchema } from '@/lib/validations/schemas'
import type { LoginInput, SignUpInput } from '@/lib/validations/schemas'

// Handles user registration and profile creation via Supabase Auth.
export async function signUp(input: SignUpInput) {
  const validation = signUpSchema.safeParse(input)

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? 'Invalid input' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: validation.data.email,
    password: validation.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    }
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// Authenticates user credentials and establishes a session.
export async function login(input: LoginInput) {
  const validation = loginSchema.safeParse(input)

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? 'Invalid input' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: validation.data.email,
    password: validation.data.password
  })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

// Destroys the current user session and clears auth cookies.
export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/login')
}
