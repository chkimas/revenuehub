-- Insert mock subscription plans
INSERT INTO public.plans (name, description, stripe_price_id, stripe_product_id, amount, interval, features)
VALUES 
  (
    'Starter', 
    'Ideal for hobbyists and small projects.', 
    'price_starter_mock', 
    'prod_starter', 
    900, 
    'month', 
    '{"maxProjects": 3, "apiCallsPerMonth": 1000, "storageGB": 1, "supportTier": "Email"}'::jsonb
  ),
  (
    'Professional', 
    'Scaling businesses needing more power.', 
    'price_pro_mock', 
    'prod_pro', 
    2900, 
    'month', 
    '{"maxProjects": 15, "apiCallsPerMonth": 10000, "storageGB": 10, "supportTier": "Priority"}'::jsonb
  ),
  (
    'Enterprise', 
    'Unlimited scale and dedicated support.', 
    'price_ent_mock', 
    'prod_ent', 
    9900, 
    'month', 
    '{"maxProjects": "Unlimited", "apiCallsPerMonth": "Unlimited", "storageGB": 100, "supportTier": "24/7 Phone"}'::jsonb
  );

-- Note: We don't seed Profiles/Users here because they depend on auth.users (handled by Supabase Auth).
-- To test the dashboard, simply sign up a new account via /signup page, 
-- and then manually update that user's subscription_status to 'active' in the Supabase Dashboard.