-- SpendLens Lead API Rate Limiting Table
-- Run this in your Supabase SQL Editor if you want to switch from in-memory rate limiting to database-backed rate limiting.

CREATE TABLE IF NOT EXISTS rate_limits (
  ip TEXT PRIMARY KEY,
  request_count INTEGER DEFAULT 1,
  last_request_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to handle atomic rate limiting
CREATE OR REPLACE FUNCTION check_rate_limit(client_ip TEXT, window_seconds INTEGER, max_requests INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  last_request TIMESTAMPTZ;
BEGIN
  -- Insert or get existing record
  INSERT INTO rate_limits (ip, request_count, last_request_at)
  VALUES (client_ip, 1, NOW())
  ON CONFLICT (ip) DO UPDATE SET last_request_at = NOW()
  RETURNING request_count, last_request_at INTO current_count, last_request;

  -- If time window expired, reset count
  IF last_request < NOW() - (window_seconds || ' seconds')::INTERVAL THEN
    UPDATE rate_limits SET request_count = 1 WHERE ip = client_ip;
    RETURN TRUE;
  END IF;

  -- If within time window, check limit
  IF current_count < max_requests THEN
    UPDATE rate_limits SET request_count = request_count + 1 WHERE ip = client_ip;
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
