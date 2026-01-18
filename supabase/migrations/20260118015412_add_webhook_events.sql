-- Track processed events to prevent duplicate processing
CREATE TABLE public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service role only access
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;