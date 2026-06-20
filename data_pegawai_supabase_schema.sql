-- Create table for Data Pegawai
CREATE TABLE IF NOT EXISTS data_pegawai (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nama TEXT NOT NULL,
    nip TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE data_pegawai ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access to data_pegawai" ON data_pegawai
    FOR ALL
    USING (true)
    WITH CHECK (true);
