-- Create table for reports
CREATE TABLE IF NOT EXISTS reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_kerja TEXT NOT NULL,
    jenis_laporan TEXT NOT NULL,
    periode TEXT NOT NULL,
    tahun TEXT NOT NULL,
    pelapor TEXT NOT NULL,
    pdf_url TEXT NOT NULL,
    keterangan TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access (since it's an internal admin tool)
CREATE POLICY "Allow all access" ON reports
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create index for faster search
CREATE INDEX IF NOT EXISTS idx_reports_unit_kerja ON reports(unit_kerja);
CREATE INDEX IF NOT EXISTS idx_reports_jenis_laporan ON reports(jenis_laporan);
CREATE INDEX IF NOT EXISTS idx_reports_tahun ON reports(tahun);
