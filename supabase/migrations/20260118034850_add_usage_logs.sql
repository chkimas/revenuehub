-- Table to record metered usage events
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- e.g., 'api_call', 'project_created'
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast aggregation during quota checks
CREATE INDEX idx_usage_logs_user_event ON public.usage_logs (user_id, event_type);

-- Enable RLS
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own usage data
CREATE POLICY "Users can view own usage" 
  ON public.usage_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy: Service role (Server Actions) can insert logs
-- No policy needed for service_role as it bypasses RLS