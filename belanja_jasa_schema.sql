-- SQL Schema for Belanja Jasa (Supabase)

-- Create the table
CREATE TABLE IF NOT EXISTS belanja_jasa (
    id TEXT PRIMARY KEY, -- Standard ID like JASA-XXXXX
    unit_pelayanan TEXT NOT NULL,
    jenis_jasa TEXT NOT NULL,
    nama_pekerjaan TEXT NOT NULL,
    tanggal_pekerjaan DATE NOT NULL,
    nama_rekanan TEXT,
    nominal BIGINT NOT NULL DEFAULT 0,
    url_spk TEXT, -- Cloudinary PDF link
    url_bayar TEXT, -- Cloudinary PDF link
    dokumentasi JSONB DEFAULT '[]'::jsonb, -- Array of documentation points
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE belanja_jasa ENABLE ROW LEVEL SECURITY;

-- Create Policy: Allow all operations
-- Note: In production, you might want to restrict this further,
-- but since the app uses a PIN-based protection in the UI, 
-- we allow all authenticated/anonymous access here for simplicity.
CREATE POLICY "Public Access for Belanja Jasa" ON belanja_jasa
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Optional: Create indexes for faster filtering
CREATE INDEX IF NOT EXISTS idx_belanja_jasa_unit ON belanja_jasa(unit_pelayanan);
CREATE INDEX IF NOT EXISTS idx_belanja_jasa_jenis ON belanja_jasa(jenis_jasa);
CREATE INDEX IF NOT EXISTS idx_belanja_jasa_tanggal ON belanja_jasa(tanggal_pekerjaan);
