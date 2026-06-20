-- Create table for Voucher Data
CREATE TABLE IF NOT EXISTS voucher_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_pengguna TEXT NOT NULL,
    tanggal TEXT NOT NULL,
    nilai_voucher NUMERIC NOT NULL,
    volume NUMERIC NOT NULL,
    penerima TEXT,
    uraian_kegiatan TEXT,
    usage_details JSONB DEFAULT '{}'::jsonb,
    has_details BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE voucher_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access to voucher_data" ON voucher_data
    FOR ALL
    USING (true)
    WITH CHECK (true);
