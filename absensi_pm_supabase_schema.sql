-- Create table for Absensi PM
CREATE TABLE IF NOT EXISTS absensi_pm (
    id TEXT PRIMARY KEY,
    unit_pelayanan TEXT NOT NULL,
    bulan_tahun TEXT NOT NULL,
    periode_laporan TEXT NOT NULL,
    pm_laki NUMERIC DEFAULT 0,
    pm_perempuan NUMERIC DEFAULT 0,
    total_pm NUMERIC DEFAULT 0,
    keterangan TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE absensi_pm ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access to absensi_pm" ON absensi_pm
    FOR ALL
    USING (true)
    WITH CHECK (true);
