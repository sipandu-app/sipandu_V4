-- Create table for BMD reports
CREATE TABLE IF NOT EXISTS bmd_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_kerja TEXT NOT NULL,
    jenis_laporan TEXT NOT NULL,
    periode TEXT NOT NULL,
    tahun TEXT NOT NULL,
    pelapor TEXT NOT NULL,
    pdf_url TEXT,
    external_link TEXT,
    keterangan TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE bmd_reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access
CREATE POLICY "Allow all access bmd" ON bmd_reports
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create index for faster search
CREATE INDEX IF NOT EXISTS idx_bmd_unit_kerja ON bmd_reports(unit_kerja);
CREATE INDEX IF NOT EXISTS idx_bmd_jenis_laporan ON bmd_reports(jenis_laporan);
CREATE INDEX IF NOT EXISTS idx_bmd_tahun ON bmd_reports(tahun);
