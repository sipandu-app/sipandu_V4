-- Create table for Belanja Modal (Table Name: modal)
CREATE TABLE modal (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    unit_kerja TEXT NOT NULL,
    tanggal_belanja DATE NOT NULL,
    nomor_bp TEXT, -- Diubah dari nomor_bukti ke nomor_bp
    jenis_pakaian TEXT NOT NULL, 
    uraian TEXT NOT NULL,
    penyedia TEXT NOT NULL,
    penerima_barang TEXT NOT NULL,
    volume NUMERIC DEFAULT 0,
    satuan TEXT DEFAULT 'Unit',
    harga_satuan NUMERIC DEFAULT 0,
    nominal NUMERIC DEFAULT 0,
    photos TEXT[] DEFAULT ARRAY[]::TEXT[],
    document_url TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE modal ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access for now
CREATE POLICY "Allow all access to modal" ON modal
    FOR ALL
    USING (true)
    WITH CHECK (true);
