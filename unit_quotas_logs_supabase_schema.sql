-- Create table for Unit Quotas Logs
CREATE TABLE IF NOT EXISTS unit_quotas_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit TEXT NOT NULL,
    nilai_voucher NUMERIC NOT NULL,
    lembar NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE unit_quotas_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access to unit_quotas_logs" ON unit_quotas_logs
    FOR ALL
    USING (true)
    WITH CHECK (true);
