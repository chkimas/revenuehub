import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merges Tailwind classes safely, handling conditional classes and conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats numbers into USD currency strings.
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}
