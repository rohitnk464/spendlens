-- Audits table
CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tools JSONB NOT NULL,           -- Array of tool configs
  team_size INTEGER NOT NULL,
  use_case TEXT NOT NULL,
  results JSONB NOT NULL,          -- Audit results
  total_monthly_savings DECIMAL,
  total_annual_savings DECIMAL,
  total_credex_savings DECIMAL,
  savings_tier TEXT,
  ai_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table  
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID REFERENCES audits(id),
  email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  team_size INTEGER,
  savings_tier TEXT,               -- 'high' | 'medium' | 'low' | 'optimal'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limiting (Fallback if not using Upstash)
CREATE TABLE rate_limits (
  ip TEXT PRIMARY KEY,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW()
);
