import Link from 'next/link'
import { ArrowRight, BarChart3, ShieldCheck, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <header className="flex h-20 items-center justify-between px-8 border-b border-border">
        <div className="text-xl font-bold text-primary tracking-tight">
          RevenueHub
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          Unified revenue metrics for{' '}
          <span className="text-primary">modern SaaS.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          The all-in-one platform to track MRR, manage subscriptions with
          Stripe, and gain deep customer insights. Built for speed and
          high-growth teams.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1"
          >
            Start Your Trial <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pricing"
            className="rounded-md border border-border bg-card px-8 py-4 text-base font-semibold hover:bg-accent transition-all"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid gap-8 px-8 py-24 md:grid-cols-3 border-t border-border bg-muted/30">
        {[
          {
            title: 'Stripe Native',
            icon: Zap,
            text: 'Direct integration with your Stripe account for seamless billing sync.'
          },
          {
            title: 'Secure by Default',
            icon: ShieldCheck,
            text: 'Bank-grade security with Supabase RLS and automated webhook tracking.'
          },
          {
            title: 'Real-time Analytics',
            icon: BarChart3,
            text: 'Instant MRR and ARPU calculations on a server-side analytics engine.'
          }
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            <feature.icon className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {feature.text}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
