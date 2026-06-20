-- Seed Data untuk tabel mutasi_pm
-- Jalankan kode ini di SQL Editor Supabase setelah membuat tabel

INSERT INTO public.mutasi_pm (id, unit_pelayanan, bulan_tahun, jumlah_awal, pm_masuk, pm_keluar, jumlah_akhir, catatan, pdf_url, is_locked)
VALUES 
('M1', 'PPSDI Raharjo', '2026-04', 99, 3, 2, 100, 'PM Masuk : 1. Toni, 17 April 2. Rofiqoh, 28 April 3. Raihan, 28 April. PM Keluar : 1. Siti Romsah, 24 April 2026 2. Maratun Sholeha 24 April 2026', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1777520212/mutasi_pm/uwybtk6axjpho4artefe.pdf', true),
('M2', 'RPSA Pamardi Siwi', '2026-04', 100, 0, 0, 100, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1777363229/mutasi_pm/rwez4vrsxknwbyojhq3b.pdf', true),
('M3', 'RPS PMKS Gondang', '2026-04', 0, 1, 1, 0, 'PM masuk : Jumiatun. PM keluar Eny S', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1777964217/mutasi_pm/rmtlcwhfn8eotqoc5lvv.pdf', true),
('M4', 'RPSLU Mojomulyo', '2026-04', 48, 1, 1, 48, '-terminasi pm a.n LASIEM(meninggal) _masuk baru pm a.n MOCHAMAD', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1777355325/mutasi_pm/ugrzf2msmyotivewpk9b.pdf', true),
('M5', 'RPS PMKS Gondang', '2026-03', 40, 0, 0, 40, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1774919063/mutasi_pm/xfic6lksg1c4kyarerud.pdf', true),
('M6', 'PPSDI Raharjo', '2026-03', 96, 1, 1, 96, 'PM Masuk : Muhammad Aziz Udin. PM keluar: Kurniah', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1775014308/mutasi_pm/xp25cjmplbxfxfdfjiau.pdf', true),
('M7', 'RPSLU Mojomulyo', '2026-03', 48, 1, 2, 47, '-pm a.n Gatinem( meninggal) -pm a. n Sugiyati(kembali ke masyarakat) -masuk pm baru a.n semi', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1774511533/mutasi_pm/rlzqggd1hbk1lgaxuq3q.pdf', true),
('M8', 'RPSA Pamardi Siwi', '2026-03', 100, 0, 0, 100, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1774879383/mutasi_pm/ap05qjazr7hoekocg2ba.pdf', true),
('M9', 'RPSA Pamardi Siwi', '2026-02', 100, 1, 1, 100, 'PM KELUAR 1 NAMA JAYANA MONA AMANDA DIGANTI PM MASUK 1 NAMA MAULIDA WIKITA PUTRI', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1772016458/mutasi_pm/mlzrgb6wknqgs15ujwqd.pdf', true),
('M10', 'RPS PMKS Gondang', '2026-02', 40, 0, 0, 40, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1774918967/mutasi_pm/z6pbfm49hpb7cqxk7ocs.pdf', true),
('M11', 'RPSLU Mojomulyo', '2026-02', 50, 0, 1, 49, 'PM A.N RAHARJO DIPERIODE 3 TELAH PTP(PERGI TANPA PAMIT)', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1772006342/mutasi_pm/at8merkjnnud5rggb27h.pdf', true),
('M12', 'PPSDI Raharjo', '2026-02', 99, 0, 3, 96, '-Pm Basofi terminasi tgl 11 februari 2026 di jemput keluarga -Pm Sugeng Riyadi terminasi 12 februari 2025 dijemput keluarga -Pm Muhammad Keanu terminasi tgl 14 februari 2026 dijemput keluarga -2 Pm ijin sementara (kurniah dan Danis)', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1771994147/mutasi_pm/mru56j5ylzj167ratbam.pdf', true),
('M13', 'RPSA Pamardi Siwi', '2026-01', 98, 2, 0, 100, '2 PM Masuk 1.Saifal Millati, 2.Pratiwi Eka Nur Cahyati. (2 PM PKL tidak di SPJ kan)', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1770737414/mutasi_pm/e5mmxwdid0u2rj6dmwup.pdf', true),
('M14', 'RPS PMKS Gondang', '2026-01', 40, 0, 0, 40, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1771463011/mutasi_pm/bawluqfarykropzsikoi.pdf', true),
('M15', 'RPSLU Mojomulyo', '2026-01', 50, 0, 0, 50, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1770875699/mutasi_pm/sre2djqayxng6opxwuth.pdf', true),
('M16', 'PPSDI Raharjo', '2026-01', 98, 0, 0, 98, '-', 'https://res.cloudinary.com/dkxehjgu0/image/upload/v1770634745/mutasi_pm/w4hq0f53ywzqbo3x6xkw.pdf', true);
