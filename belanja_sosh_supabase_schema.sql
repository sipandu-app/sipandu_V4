-- Create table for Belanja SOSH
CREATE TABLE IF NOT EXISTS belanja_sosh (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_pelayanan TEXT NOT NULL,
    bulan_tahun TEXT NOT NULL,
    periode_laporan TEXT NOT NULL,
    uraian_belanja TEXT NOT NULL,
    nominal NUMERIC DEFAULT 0,
    penyedia_toko TEXT,
    no_bp TEXT,
    rec_bayar TEXT,
    surat_pesanan TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE belanja_sosh ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access for now (similar to other tables in this project)
CREATE POLICY "Allow all access to belanja_sosh" ON belanja_sosh
    FOR ALL
    USING (true)
    WITH CHECK (true);
