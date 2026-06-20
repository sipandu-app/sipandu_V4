let isSidebarOpen = true;

// Supabase client (optional). If configured via window.SUPABASE_URL and window.SUPABASE_ANON_KEY,
// we will use Supabase (DB + Storage) so it works fully online without hosting a custom backend.
let supa = null;
function initSupabaseClient() {
    try {
        if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
            supa = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
            console.log('[SIPANDU] Supabase client initialized');
        }
    } catch (e) {
        console.warn('[SIPANDU] Supabase not available:', e);
    }
}

// Penyimpanan sementara (simulasi database) untuk halaman Mutasi PM.
let mutasiDataList = [];

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const overlay = document.getElementById('sidebar-overlay');

    isSidebarOpen = !isSidebarOpen;

    if (isSidebarOpen) {
        sidebar.classList.remove('collapsed');
        if (window.innerWidth >= 1024) mainContent.classList.add('lg:ml-72');
        else overlay.classList.add('active');
    } else {
        sidebar.classList.add('collapsed');
        mainContent.classList.remove('lg:ml-72');
        overlay.classList.remove('active');
    }
}

function toggleSubmenu(id, btn) {
    const submenu = document.getElementById(id);
    const chevron = btn.querySelector('.chevron-icon');

    // Tutup semua submenu lainnya (Opsional, jika ingin perilaku akordion)
    /*
    document.querySelectorAll('.submenu-container').forEach(sub => {
        if(sub.id !== id) {
            sub.classList.remove('open');
            const otherBtn = sub.previousElementSibling;
            if(otherBtn) otherBtn.querySelector('.chevron-icon').classList.remove('rotate');
        }
    });
    */

    submenu.classList.toggle('open');
    chevron.classList.toggle('rotate');
}

// --- SESSION TIMEOUT (60 MENIT INAKTIF) ---
let sessionTimeout;
const TIMEOUT_DURATION = 60 * 60 * 1000; // 60 Menit dalam milidetik

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        alert("Sesi Anda telah berakhir karena tidak ada aktivitas selama 60 menit. Silakan login kembali.");
        location.reload(); // Logout paksa dengan reload (kembali ke halaman login)
    }, TIMEOUT_DURATION);
}

// Pantau aktivitas untuk reset timeout
['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, resetSessionTimeout, true);
});

// Terima sinyal aktivitas dari modul (iframe)
window.addEventListener('message', (event) => {
    if (event.data === 'resetSession') {
        resetSessionTimeout();
    }
});

// Inisialisasi timeout pertama kali
resetSessionTimeout();

// Perbaikan fokus Iframe agar bisa diketik
window.addEventListener('blur', function () {
    if (document.activeElement.tagName === 'IFRAME') {
        // Iframe mendapatkan fokus, biarkan saja
    }
});

function initIcons() {
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
}

function showPage(pageId) {
    resetSessionTimeout(); // Reset saat pindah halaman
    trackPageVisit(pageId); // Track page visit
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active-menu'));
    const activeBtn = document.getElementById('menu-' + pageId);
    if (activeBtn) activeBtn.classList.add('active-menu');

    const displayTitle = pageId.replace(/[-_]/g, ' ').toUpperCase();
    const pageTitleEl = document.getElementById('page-title-display');
    if (pageTitleEl) {
        pageTitleEl.innerText = displayTitle === 'DASHBOARD' ? 'Dashboard' : displayTitle;
    }

    const runningTextContainer = document.getElementById('running-text-container');
    if (runningTextContainer) {
        if (pageId === 'dashboard') {
            runningTextContainer.classList.remove('hidden');
        } else {
            runningTextContainer.classList.add('hidden');
        }
    }

    // Konten dinamis untuk setiap halaman
    const pageContents = {
        'dashboard': `
            <!-- Hero Section -->
            <div class="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-3xl p-5 text-white relative overflow-hidden shadow-2xl shadow-sky-200">
                <!-- Logo PPSDI di Pojok Kanan Atas -->
                <div class="absolute top-5 right-6 z-20">
                    <div class="relative group">
                        <div class="absolute -inset-2 bg-white/20 rounded-2xl blur-xl opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <img src="logo-ppsdri-raharjo.png" alt="Logo PPSDI" class="relative w-32 h-32 object-contain rounded-2xl bg-white/10 p-2 shadow-2xl ring-2 ring-white/40" onerror="this.style.display='none'">
                    </div>
                </div>

                <div class="relative z-10 max-w-5xl">
                    <div class="flex items-center gap-6 mb-4">
                        <!-- Logo Maskot Sipandu -->
                        <div class="relative group shrink-0 animate-float">
                            <div class="absolute -inset-2 bg-white/20 rounded-2xl blur-xl opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                            <img src="maskot-sipandu.png" alt="Logo Sipandu" class="relative w-32 h-32 object-contain rounded-2xl bg-white/10 p-2 shadow-2xl ring-2 ring-white/40" onerror="this.style.display='none'">
                        </div>
                        <div class="animate-pop">
                            <h3 class="text-6xl font-black uppercase tracking-tighter mb-0.5 drop-shadow-2xl text-yellow-400 leading-none">SIPANDU</h3>
                            <div class="relative inline-block overflow-hidden rounded-lg">
                                <p class="text-xl font-bold text-yellow-400 leading-tight mb-0.5 whitespace-nowrap relative z-10">
                                    Sistem Informasi Penyimpanan Data Terpadu
                                </p>
                                <div class="animate-wave"></div>
                            </div>
                            <div class="relative block overflow-hidden rounded-lg mt-1">
                                <p class="text-sm font-medium text-sky-100/80 italic leading-snug relative z-10">
                                    (Portal Internal PPS Raharjo - RPS Mojomulyo - RPS Pamardi Siwi - RPS Gondang)
                                </p>
                                <div class="animate-wave"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-3">
                        <div class="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest">Role: ${currentUserRole || 'Guest'}</div>
                        <div class="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-[9px] font-bold uppercase tracking-widest">Nama: ${currentUserName || '-'}</div>
                    </div>
                </div>
            </div>

            <!-- Gallery Slider (Replacing Stats Grid) -->
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h4 class="text-sm font-black text-slate-800 uppercase tracking-widest">Galery PPS Raharjo Sragen</h4>
                        <div class="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-4">
                            <a href="https://www.instagram.com/ppsraharjosragen/" target="_blank" class="flex items-center justify-center w-6 h-6 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 hover:scale-110 transition-all shadow-sm" title="Instagram">
                                <i data-lucide="instagram" class="w-4 h-4"></i>
                            </a>
                            <a href="https://www.facebook.com/pps.raharjo.sragen" target="_blank" class="flex items-center justify-center w-6 h-6 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:scale-110 transition-all shadow-sm" title="Facebook">
                                <i data-lucide="facebook" class="w-4 h-4"></i>
                            </a>
                            <a href="https://www.youtube.com/@ppsraharjosragen" target="_blank" class="flex items-center justify-center w-6 h-6 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:scale-110 transition-all shadow-sm" title="YouTube">
                                <i data-lucide="youtube" class="w-4 h-4"></i>
                            </a>
                            <a href="https://ppsraharjosragen.com" target="_blank" class="flex items-center justify-center w-6 h-6 bg-sky-50 text-sky-500 rounded-lg hover:bg-sky-100 hover:scale-110 transition-all shadow-sm" title="Website Resmi">
                                <i data-lucide="globe" class="w-4 h-4"></i>
                            </a>
                        </div>
                    </div>
                    <span class="text-[10px] text-slate-400 font-bold uppercase shrink-0">Geser Otomatis</span>
                </div>
                <div class="slider-container shadow-xl border-4 border-white">
                    <div class="slider-track animate-slide">
                        <!-- GANTI URL GAMBAR DI SINI SEWAKTU-WAKTU (SLIDE 1-6) -->
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=1gqpsBofXZIHAmZCCt_XeHkqj8MjdsWYs&sz=w1200" alt="Slider 1">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 1</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Filosofi Logo PPS Raharjo</p>
                                </div>
                            </div>
                        </div>
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=11mQCi5h3sikm4WQuaDtf7U-SiiPULXyH&sz=w1200" alt="Slider 2">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 2</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Kepala Dinas Sosial Provinsi Jawa Tengah Bersama Pegawai PPS Raharjo dan RPS</p>
                                </div>
                            </div>
                        </div>
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=1wkgiGR1U76m55rsh_47hED4j58uLlWxZ&sz=w1200" alt="Slider 3">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 3</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Kepala PPS Raharjo Sragen</p>
                                </div>
                            </div>
                        </div>
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=1cf_h2eqaoiPrEzh96xfZJdQpZ26y5O_y&sz=w1200" alt="Slider 4">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 4</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Kepala Bidang Rehabilitasi Sosial Dinsos Prov Jateng bersama Penerima Manfaat</p>
                                </div>
                            </div>
                        </div>
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=1SbT-1S2KVg3BJswr1M0YhCKVmB3hBvmn&sz=w1200" alt="Slider 5">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 5</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Galery Penerima Manfaat</p>
                                </div>
                            </div>
                        </div>
                        <div class="slider-item relative">
                            <img src="https://drive.google.com/thumbnail?id=16duM3ujQBF_PfpDoIfcJGW-ytgqJgL-5&sz=w1200" alt="Slider 6">
                            <div class="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                                <div class="inline-block bg-sky-500/90 px-4 py-1.5 rounded-xl mb-3 shadow-xl backdrop-blur-sm">
                                    <h5 class="font-black text-2xl drop-shadow-lg">Slide 6</h5>
                                </div>
                                <div class="block bg-sky-400/30 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                                    <p class="text-sm font-bold drop-shadow-md">Pemeriksaan Kesehatan Penerima Manfaat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Info Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all space-y-4">
                    <div class="flex items-center space-x-3 mb-2">
                        <i data-lucide="mouse-pointer-click" class="w-5 h-5 text-sky-500"></i>
                        <h4 class="font-black text-sm uppercase tracking-wider">Navigasi Dropdown</h4>
                    </div>
                    <p class="text-sm text-slate-500 leading-relaxed">Klik pada Menu pada sidebar untuk membuka sub-menu dan mengakses data yang Anda butuhkan.</p>
                </div>
                <div class="bg-sky-50 p-8 rounded-3xl border border-sky-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all space-y-4">
                    <div class="flex items-center space-x-3 mb-2">
                        <i data-lucide="info" class="w-5 h-5 text-sky-600"></i>
                        <h4 class="font-black text-sm uppercase tracking-wider text-sky-800">Data Terpadu</h4>
                    </div>
                    <p class="text-sm text-sky-700/70 leading-relaxed">Seluruh data dan Laporan Panti dan RPS terintegrasi dalam satu sistem untuk memudahkan monitoring pimpinan.</p>
                </div>
            </div>
        `,
        'sosh': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./sosh.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'bend23': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./bend23.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'pakaian': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./pakaian.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'belanja_modal': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./belanja_modal.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'belanja_jasa': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./belanja_jasa.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'belanja_lain': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./belanja_lain.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'bmd': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./bmd.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'pegawai': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./pegawai.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'kp_kgb': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./KP_KGB.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'data_keluarga': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./data_keluarga.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'pendidikan': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./pendidikan.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'kesehatan-pm': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./pemeriksaan_kesehatan.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'pengumuman': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./pengumuman.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'surat-masuk': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./surat_masuk.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'bbm': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./bbm.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'surat-keluar': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./surat_keluar.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'sppd': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./sppd.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'lap_uk': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./lap_uk.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'lap_bmd': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./lap_bmd.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'apbd': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./apbd.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'absensi-pm': `
            <div class="max-w-[70%] mx-auto h-full rounded-3xl border border-slate-200 shadow-sm bg-white overflow-hidden">
                <iframe src="./absen_sosh.html" class="w-full h-full border-none pointer-events-auto" allow="clipboard-read; clipboard-write"></iframe>
            </div>
        `,
        'monitoring-resos': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./monitoring_resos.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'statistik-pengunjung': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./statistik-pengunjung.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'mutasi-pm': `
            <div class="space-y-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                         <i data-lucide="shuffle" class="w-5 h-5 text-indigo-500"></i>
                        <h3 class="text-xl font-black text-slate-800">Mutasi PM</h3>
                    </div>
                    <div class="flex gap-2">
                        <button id="mutasiTabInputBtn" class="px-3 py-1.5 bg-violet-500 text-white text-xs rounded-lg hover:bg-violet-600">Input Baru</button>
                        <button id="mutasiTabHistoryBtn" class="px-3 py-1.5 bg-slate-500 text-white text-xs rounded-lg hover:bg-slate-600">Data Cloud</button>
                    </div>
                </div>

                <div id="mutasiInputTab" class="bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <form id="mutasiForm" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Unit Pelayanan</label>
                                <select name="unitPelayanan" class="w-full p-3.5 bg-white border-2 border-violet-100 focus:border-violet-300 rounded-2xl font-bold text-sm outline-none transition-all" required>
                                    <option value="">Pilih Unit</option>
                                    <option value="PPSDI Raharjo Sragen">PPSDI Raharjo Sragen</option>
                                    <option value="RPSLU Mojomulyo Sragen">RPSLU Mojomulyo Sragen</option>
                                    <option value="RPSA Pamardi Siwi Sragen">RPSA Pamardi Siwi Sragen</option>
                                    <option value="RPS PMKS Gondang">RPS PMKS Gondang</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Periode Laporan</label>
                                <input type="month" name="bulanTahun" class="w-full p-3.5 bg-white border-2 border-sky-100 focus:border-sky-300 rounded-2xl font-bold text-sm outline-none transition-all" required />
                            </div>
                        </div>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-[2rem] border-2 border-slate-100/70">
                            <div>
                                <label class="text-[9px] font-black uppercase tracking-widest text-slate-500 block text-center mb-2">PM Awal</label>
                                <input type="number" name="jumlahAwal" placeholder="0" class="w-full p-3 bg-white border border-slate-200 shadow-sm rounded-xl text-center font-black text-base outline-none focus:ring-2 ring-sky-400/20 transition-all" min="0" required />
                            </div>
                            <div>
                                <label class="text-[9px] font-black uppercase tracking-widest text-emerald-600 block text-center mb-2">Masuk</label>
                                <input type="number" name="pmMasuk" placeholder="0" class="w-full p-3 bg-white border border-emerald-200 shadow-sm rounded-xl text-center font-black text-base outline-none focus:ring-2 ring-emerald-400/20 transition-all" min="0" required />
                            </div>
                            <div>
                                <label class="text-[9px] font-black uppercase tracking-widest text-rose-600 block text-center mb-2">Keluar</label>
                                <input type="number" name="pmKeluar" placeholder="0" class="w-full p-3 bg-white border border-rose-200 shadow-sm rounded-xl text-center font-black text-base outline-none focus:ring-2 ring-rose-400/20 transition-all" min="0" required />
                            </div>
                            <div>
                                <label class="text-[9px] font-black uppercase tracking-widest text-slate-900 block text-center mb-2">Sisa Akhir</label>
                                <input type="number" id="mutasiJumlahAkhir" name="jumlahAkhir" class="w-full p-3 bg-slate-900 text-white rounded-xl text-center font-black text-base shadow-lg shadow-slate-200" readonly />
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Upload PDF (Opsional)</label>
                                <input type="file" name="pdfFile" accept="application/pdf,.pdf" class="w-full p-3.5 bg-white border-2 border-slate-200 focus:border-slate-300 rounded-2xl font-bold text-sm outline-none transition-all" />
                                <p class="text-[10px] text-slate-400 font-bold mt-1">Maks 5MB</p>
                            </div>
                            <div>
                                <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Catatan</label>
                                <input name="catatan" placeholder="Tambahkan catatan jika diperlukan" class="w-full p-3.5 bg-white border-2 border-slate-200 focus:border-slate-300 rounded-2xl font-bold text-sm outline-none transition-all" />
                            </div>
                        </div>

                        <div class="flex gap-4 pt-2">
                            <button type="reset" class="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest transition-all">Reset</button>
                            <button type="submit" class="px-6 py-3 bg-indigo-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 hover:bg-indigo-700 hover:shadow-indigo-200 flex items-center gap-2">
                                <i data-lucide="save" class="w-4 h-4 text-white"></i>
                                Simpan (Simulasi)
                            </button>
                        </div>
                    </form>
                </div>

                <div id="mutasiHistoryTab" class="hidden bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="flex-1 relative">
                            <i data-lucide="search" class="w-4 h-4 text-slate-300 absolute left-4 top-1/2 -translate-y-1/2"></i>
                            <input id="mutasiSearch" type="text" placeholder="Cari unit atau periode..." class="w-full pl-10 pr-4 py-3 bg-sky-50 border-2 border-transparent focus:border-sky-200 rounded-2xl text-xs font-bold outline-none transition-all" />
                        </div>
                        <div class="lg:w-60">
                            <select id="mutasiFilterUnit" class="w-full p-3.5 bg-violet-50 border-2 border-transparent focus:border-violet-200 rounded-2xl text-xs font-black uppercase outline-none cursor-pointer">
                                <option value="Semua">Semua Unit</option>
                                <option value="PPSDI Raharjo Sragen">PPSDI Raharjo Sragen</option>
                                <option value="RPSLU Mojomulyo Sragen">RPSLU Mojomulyo Sragen</option>
                                <option value="RPSA Pamardi Siwi Sragen">RPSA Pamardi Siwi Sragen</option>
                                <option value="RPS PMKS Gondang">RPS PMKS Gondang</option>
                            </select>
                        </div>
                        <div class="flex items-end gap-3">
                            <div>
                                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Periode Dari</label>
                                <input id="mutasiFilterStart" type="month" class="w-full p-3.5 bg-emerald-50 border-2 border-transparent focus:border-emerald-200 rounded-2xl text-xs font-bold outline-none transition-all" />
                            </div>
                            <div>
                                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Sampai</label>
                                <input id="mutasiFilterEnd" type="month" class="w-full p-3.5 bg-emerald-50 border-2 border-transparent focus:border-emerald-200 rounded-2xl text-xs font-bold outline-none transition-all" />
                            </div>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-[980px]">
                            <thead>
                                <tr class="bg-slate-50/80 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <th class="p-4 pl-6 text-left">Unit Pelayanan</th>
                                    <th class="p-4 text-center">Periode</th>
                                    <th class="p-4 text-center">Data Mutasi (A-M-K)</th>
                                    <th class="p-4 text-center">Sisa Akhir</th>
                                    <th class="p-4 text-center">Catatan</th>
                                    <th class="p-4 text-right pr-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="mutasiTableBody" class="divide-y divide-slate-50">
                                <tr><td colspan="6" class="p-10 text-center text-slate-500">Belum ada data.</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,

        'laporan-unit': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan Unit Kerja</h3>
                <p class="text-slate-600">Halaman laporan unit kerja akan segera tersedia.</p>
            </div>
        `,
        'laporan-kegiatan': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan Kegiatan</h3>
                <p class="text-slate-600">Halaman laporan kegiatan akan segera tersedia.</p>
            </div>
        `,
        'laporan-ikm': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan IKM</h3>
                <p class="text-slate-600">Halaman laporan IKM akan segera tersedia.</p>
            </div>
        `,
        'laporan-spm': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan SPM</h3>
                <p class="text-slate-600">Halaman laporan SPM akan segera tersedia.</p>
            </div>
        `,
        'laporan-pekpp': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan E-PEKPP</h3>
                <p class="text-slate-600">Halaman laporan E-PEKPP akan segera tersedia.</p>
            </div>
        `,
        'laporan-bmd': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="text-xl font-black mb-4">Laporan BMD</h3>
                <p class="text-slate-600">Halaman laporan BMD akan segera tersedia.</p>
            </div>
        `,
        'approval-belanja': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div class="flex items-center gap-3 mb-6">
                    <i data-lucide="shield-check" class="w-6 h-6 text-sky-500"></i>
                    <h3 class="text-xl font-black text-slate-800">Persetujuan Belanja</h3>
                </div>
                <div class="p-12 text-center space-y-4">
                    <div class="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto">
                        <i data-lucide="clock" class="w-10 h-10 text-sky-400"></i>
                    </div>
                    <h4 class="text-lg font-bold text-slate-700">Belum Ada Data Antrean</h4>
                    <p class="text-sm text-slate-500 max-w-sm mx-auto">Seluruh pengajuan belanja telah diproses. Data baru akan muncul di sini jika ada pengajuan dari unit kerja.</p>
                </div>
            </div>
        `,
        'approval-laporan': `
            <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div class="flex items-center gap-3 mb-6">
                    <i data-lucide="file-check" class="w-6 h-6 text-indigo-500"></i>
                    <h3 class="text-xl font-black text-slate-800">Persetujuan Laporan</h3>
                </div>
                <div class="p-12 text-center space-y-4">
                    <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                        <i data-lucide="file-text" class="w-10 h-10 text-indigo-400"></i>
                    </div>
                    <h4 class="text-lg font-bold text-slate-700">Antrean Laporan Kosong</h4>
                    <p class="text-sm text-slate-500 max-w-sm mx-auto">Belum ada laporan unit kerja yang memerlukan persetujuan saat ini.</p>
                </div>
            </div>
        `,
        'restore-json': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./restore_json.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'setting-akses': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./setting_akses.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'ganti-password': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./ganti_password.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'cetak-kartu': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./cetak_kartu.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
        'form-informasi-sipandu': `
            <div class="w-full h-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                <iframe src="./form_informasi_sipandu.html" class="w-full h-full border-none"></iframe>
            </div>
        `,
    };

    const content = pageContents[pageId] || '<div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"><h3 class="text-xl font-black mb-4">Halaman Tidak Ditemukan</h3><p class="text-slate-600">Konten untuk halaman ini belum tersedia.</p></div>';
    document.getElementById('page-content').innerHTML = content;

    if (window.innerWidth < 1024) toggleSidebar();
    if (pageId === 'mutasi-pm') initMutasiForm();
    initIcons();
}



// Global state
let currentUserRole = null;
let currentUserName = null;
let currentUserAccess = [];

// Fungsi untuk menerapkan izin berdasarkan data dari database (Kolom 'access' yang dicentang)
function applyMenuPermissionsByData(userData) {
    currentUserRole = userData ? userData.role : 'Guest';
    currentUserAccess = userData ? (userData.access || []) : [];

    // 1. Reset SEMUA menu: Pastikan semuanya TAMPIL (tidak hidden) dan AKTIF terlebih dahulu
    document.querySelectorAll('#sidebar nav button, #sidebar nav div, .submenu-container button').forEach(item => {
        item.classList.remove('hidden', 'menu-disabled');
        item.style.pointerEvents = 'auto';
        
        // Hapus ikon kunci lama jika ada
        const lockIcon = item.querySelector('.lock-icon-db');
        if (lockIcon) lockIcon.remove();
    });

    // 2. Tampilkan semua container submenu agar isinya terlihat
    document.querySelectorAll('.submenu-container').forEach(container => {
        container.classList.remove('hidden');
    });

    // 3. Iterasi SEMUA tombol menu yang memiliki ID 'menu-xxx'
    const allMenuButtons = document.querySelectorAll('button[id^="menu-"]');
    allMenuButtons.forEach(btn => {
        let pageId = btn.id.replace('menu-', '');
        
        // Normalisasi ID (Menghilangkan suffix jika ada)
        if (pageId.includes('restore-json')) pageId = 'restore-json';
        
        // Pengecualian: Ganti Password, Dashboard, APBD, Form Informasi Sipandu, dan Statistik Pengunjung selalu aktif
        if (pageId === 'ganti-password' || pageId === 'dashboard' || pageId === 'apbd' || pageId === 'form-informasi-sipandu' || pageId === 'statistik-pengunjung') return;

        // Jika ID halaman TIDAK ada dalam daftar 'access' di database (tidak dicentang)
        // Atau jika user belum login (Guest)
        if (currentUserRole === 'Guest' || !currentUserAccess.includes(pageId)) {
            // Maka DISABLE menu tersebut (tetap tampil tapi tidak bisa diklik)
            btn.classList.add('menu-disabled');
            btn.style.pointerEvents = 'none';

            // Tambahkan ikon gembok kecil sebagai penanda visual
            const lockIcon = document.createElement('i');
            lockIcon.setAttribute('data-lucide', 'lock');
            lockIcon.className = 'w-3 h-3 text-white/40 ml-auto lock-icon-db';
            btn.appendChild(lockIcon);
        }
    });

    // 4. KUNCI RUANG APPROVER UNTUK SEMUA ROLE (Permintaan User)
    const approverContainer = document.getElementById('sub-approver');
    const approverBtn = document.getElementById('btn-sub-approver');
    const cetakKartuBtn = document.getElementById('menu-cetak-kartu');

    if (approverBtn) {
        approverBtn.classList.add('menu-disabled');
        approverBtn.style.pointerEvents = 'none';
        
        if (!approverBtn.querySelector('.lock-icon-db')) {
            const lockIcon = document.createElement('i');
            lockIcon.setAttribute('data-lucide', 'lock');
            lockIcon.className = 'w-4 h-4 text-white/40 ml-2 lock-icon-db';
            approverBtn.appendChild(lockIcon);
        }
    }
    if (approverContainer) {
        approverContainer.querySelectorAll('a, button').forEach(item => {
            item.classList.add('menu-disabled');
            item.style.pointerEvents = 'none';
            
            // Tampilkan ikon gembok bawaan HTML jika ada di sebelahnya
            const parent = item.parentElement;
            const htmlLock = parent ? parent.querySelector('.lock-icon') : null;
            if (htmlLock) htmlLock.classList.remove('hidden');
        });
    }

    // 5. CETAK KARTU HANYA UNTUK ROLE CHECKER
    if (cetakKartuBtn) {
        if (currentUserRole !== 'Checker') {
            cetakKartuBtn.classList.add('menu-disabled');
            cetakKartuBtn.style.pointerEvents = 'none';
            
            if (!cetakKartuBtn.querySelector('.lock-icon-db')) {
                const lockIcon = document.createElement('i');
                lockIcon.setAttribute('data-lucide', 'lock');
                lockIcon.className = 'w-4 h-4 text-white/40 ml-auto lock-icon-db';
                cetakKartuBtn.appendChild(lockIcon);
            }
        } else {
            // Jika role adalah Checker, pastikan tidak terkunci
            cetakKartuBtn.classList.remove('menu-disabled');
            cetakKartuBtn.style.pointerEvents = 'auto';
            const lock = cetakKartuBtn.querySelector('.lock-icon-db');
            if (lock) lock.remove();
        }
    }

    // Refresh icons untuk menampilkan ikon gembok yang baru ditambahkan
    if (window.lucide) window.lucide.createIcons();
}

// Functions for SIPANDU Info Modal
async function showSipanduInfoModal() {
    // Check if modal already shown in this session
    if (sessionStorage.getItem('sipanduModalShown')) {
        return;
    }

    const modal = document.getElementById('sipandu-info-modal');
    const photoSection = document.getElementById('sipandu-info-photo');
    const textSection = document.getElementById('sipandu-info-text');
    const photoImg = document.getElementById('sipandu-photo-img');
    const textContent = document.getElementById('sipandu-text-content');

    try {
        if (!supa) initSupabaseClient();
        if (!supa) {
            modal.classList.remove('hidden');
            if (window.lucide) window.lucide.createIcons();
            sessionStorage.setItem('sipanduModalShown', 'true');
            return;
        }

        const { data, error } = await supa
            .from('informasi_sipandu')
            .select('*')
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        // Default values if no data
        let showPhoto = true;
        let showText = true;
        let photoUrl = '';
        let infoText = '';

        if (data) {
            showPhoto = data.show_photo ?? true;
            showText = data.show_text ?? true;
            photoUrl = data.photo_url ?? '';
            infoText = data.info_text ?? '';
        }

        // Update UI
        if (showPhoto && photoUrl) {
            photoImg.src = photoUrl;
            photoSection.classList.remove('hidden');
        } else {
            photoSection.classList.add('hidden');
        }

        if (showText && infoText) {
            // Process text: add 3 spaces to lines not starting with a number
            const processedText = infoText.split('\n').map(line => {
                if (/^\d/.test(line.trim())) {
                    return line;
                }
                return '   ' + line;
            }).join('\n');
            
            textContent.innerText = processedText;
            textSection.classList.remove('hidden');
        } else {
            textSection.classList.add('hidden');
        }

        // Only show modal if at least one section is visible
        if (showPhoto || showText) {
            modal.classList.remove('hidden');
            sessionStorage.setItem('sipanduModalShown', 'true');
            if (window.lucide) window.lucide.createIcons();
        }
    } catch (err) {
        console.error('Error showing SIPANDU info modal:', err);
    }
}

function closeSipanduInfoModal() {
    const modal = document.getElementById('sipandu-info-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Make functions globally available for inline handlers
window.closeSipanduInfoModal = closeSipanduInfoModal;

function handleLogin() {
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    const loginPage = document.getElementById('login-page');
    const mainAppContent = document.getElementById('main-app-content');
    const loginButton = document.getElementById('login-button');

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        loginError.innerText = 'Username dan Password harus diisi.';
        loginError.classList.remove('hidden');
        return;
    }

    // Set loading state
    loginButton.disabled = true;
    const originalContent = `<span>Masuk ke Sistem</span> <i data-lucide="arrow-right" class="w-4 h-4"></i>`;
    loginButton.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Memvalidasi...</span>`;
    if (window.lucide) window.lucide.createIcons();

    // Pastikan supa siap
    if (!supa) initSupabaseClient();

    if (!supa) {
        loginError.innerText = 'Koneksi database bermasalah.';
        loginError.classList.remove('hidden');
        loginButton.disabled = false;
        loginButton.innerHTML = originalContent;
        if (window.lucide) window.lucide.createIcons();
        return;
    }

    // Gunakan Promise.race untuk timeout jika koneksi lambat
    const loginPromise = supa.from('user_access')
        .select('*')
        .eq('nip', username)
        .eq('password', password)
        .single();

    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 10000)
    );

    Promise.race([loginPromise, timeoutPromise])
        .then(async ({ data, error }) => {
            if (error || !data) {
                throw new Error(error ? error.message : 'Invalid credentials');
            } else {
                currentUserRole = data.role;
                const userAccessList = data.access || [];

                // Ambil Nama Lengkap dari data_pegawai
                let fullName = data.role;
                try {
                    const { data: pData } = await supa.from('data_pegawai')
                        .select('nama')
                        .eq('nip', username)
                        .single();
                    if (pData) fullName = pData.nama;
                } catch (e) {
                    console.warn('Gagal mengambil nama pegawai:', e);
                }

                currentUserName = fullName;

                // Simpan sesi login
                localStorage.setItem('sipandu_userRole', currentUserRole);
                localStorage.setItem('sipandu_username', username);
                localStorage.setItem('sipandu_userName', fullName);
                localStorage.setItem('sipandu_loginTime', Date.now().toString());
                localStorage.setItem('sipandu_userAccess', JSON.stringify(userAccessList));

                trackVisitor(currentUserRole, fullName, username);
                loginError.classList.add('hidden');
                loginPage.classList.add('hidden');
                mainAppContent.classList.remove('hidden');
                
                // Update Profile UI
                updateProfileUI(fullName, currentUserRole);

                // Pastikan sidebar tampil normal setelah login
                const sidebar = document.getElementById('sidebar');
                if (sidebar) sidebar.classList.remove('hidden');

                showToastGagah(`Selamat datang, ${fullName}!`, 'user-check', 'text-emerald-400');

                // Terapkan izin menu berdasarkan role dan daftar akses spesifik
                applyMenuPermissionsByData(data);
                showPage('dashboard');
                
                // Show SIPANDU info modal
                showSipanduInfoModal();

                // Set auto logout 24 Jam
                setTimeout(() => {
                    handleLogoutSessionExpired();
                }, 24 * 60 * 60 * 1000);
            }
        })
        .catch(err => {
            console.error('Login Error:', err);
            loginError.innerText = err.message === 'timeout' ? 'Koneksi lambat, coba lagi.' : 'NIP atau Password salah.';
            loginError.classList.remove('hidden');
            loginButton.disabled = false;
            loginButton.innerHTML = originalContent;
            if (window.lucide) window.lucide.createIcons();
            showToastGagah('Akses Ditolak!', 'alert-triangle', 'text-rose-500');
        });
}

// Tambahkan listener untuk lookup role otomatis saat mengetik NIP
function initLoginLookup() {
    const usernameInput = document.getElementById('username-input');
    const roleDisplay = document.getElementById('role-display');

    if (usernameInput) {
        usernameInput.addEventListener('input', (e) => {
            const nip = e.target.value;
            if (nip.length >= 4) {
                // Pastikan supa sudah siap
                if (!supa) initSupabaseClient();
                
                if (supa) {
                    supa.from('user_access')
                        .select('role')
                        .eq('nip', nip)
                        .single()
                        .then(({ data }) => {
                            if (data) {
                                roleDisplay.value = data.role;
                                roleDisplay.classList.add('text-emerald-600');
                                roleDisplay.classList.remove('text-sky-600', 'text-amber-500', 'text-rose-400');
                            } else {
                                supa.from('data_pegawai')
                                    .select('nama')
                                    .eq('nip', nip)
                                    .single()
                                    .then(({ data: pData }) => {
                                        if (pData) {
                                            roleDisplay.value = 'Pegawai (Belum Ada Akses)';
                                            roleDisplay.classList.remove('text-emerald-600', 'text-sky-600', 'text-rose-400');
                                            roleDisplay.classList.add('text-amber-500');
                                        } else {
                                            roleDisplay.value = 'User Belum Terdaftar';
                                            roleDisplay.classList.remove('text-emerald-600', 'text-sky-600', 'text-amber-500');
                                            roleDisplay.classList.add('text-rose-400');
                                        }
                                    });
                            }
                        });
                }
            } else {
                roleDisplay.value = '';
            }
        });
    }
}

// Visitor Statistics Logic
function trackVisitor(role, nama, nip) {
    let stats;
    try {
        stats = JSON.parse(localStorage.getItem('visitor_stats')) || {
            totalVisits: 0,
            roleVisits: {},
            recentLogins: []
        };
    } catch (e) {
        stats = {
            totalVisits: 0,
            roleVisits: {},
            recentLogins: []
        };
    }

    stats.totalVisits++;
    stats.roleVisits[role] = (stats.roleVisits[role] || 0) + 1;

    const now = new Date();
    const loginTime = now.toLocaleString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    stats.recentLogins.unshift({
        role: role,
        nama: nama,
        nip: nip,
        time: loginTime
    });

    if (stats.recentLogins.length > 10) stats.recentLogins.pop();

    localStorage.setItem('visitor_stats', JSON.stringify(stats));
    
    // Simpan ke Supabase
    if (!supa) initSupabaseClient();
    if (supa) {
        try {
            supa.from('visitor_logs').insert({
                nip: nip,
                nama: nama,
                role: role,
                activity_type: 'login',
                page_name: null
            });
        } catch (err) {
            console.warn('Error saving login to Supabase:', err);
        }
    }
}

// Track Page Visits
async function trackPageVisit(pageName) {
    const nip = localStorage.getItem('sipandu_username');
    const nama = localStorage.getItem('sipandu_userName');
    const role = localStorage.getItem('sipandu_userRole');

    if (!nip || !nama || !role) return;

    // Supabase tracking
    if (!supa) initSupabaseClient();
    if (supa) {
        try {
            await supa.from('visitor_logs').insert({
                nip: nip,
                nama: nama,
                role: role,
                activity_type: 'page_visit',
                page_name: pageName
            });
        } catch (err) {
            console.warn('Error saving page visit to Supabase:', err);
        }
    }
}

function updateProfileUI(name, role) {
    const nameEl = document.getElementById('profile-name');
    const roleEl = document.getElementById('profile-role');
    const initialsEl = document.getElementById('profile-initials');

    if (nameEl) nameEl.innerText = name || 'User';
    if (roleEl) roleEl.innerText = role || 'Guest';
    if (initialsEl && name) {
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        initialsEl.innerText = initials;
    }
}

function handleLogout() {
    const modal = document.getElementById('logout-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }
}

function closeLogoutModal() {
    const modal = document.getElementById('logout-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function confirmLogout() {
    closeLogoutModal();

    // Bersihkan sesi
    localStorage.removeItem('sipandu_userRole');
    localStorage.removeItem('sipandu_username');
    localStorage.removeItem('sipandu_userName');
    localStorage.removeItem('sipandu_loginTime');
    localStorage.removeItem('sipandu_userAccess');
    localStorage.removeItem('sipandu_pin');
    sessionStorage.removeItem('sipanduModalShown');

    // Langsung arahkan ke index.html untuk reset total
    window.location.href = 'index.html';
}

function handleLogoutSessionExpired() {
    // Bersihkan sesi karena expired
    localStorage.removeItem('sipandu_userRole');
    localStorage.removeItem('sipandu_username');
    localStorage.removeItem('sipandu_userName');
    localStorage.removeItem('sipandu_loginTime');
    localStorage.removeItem('sipandu_userAccess');
    localStorage.removeItem('sipandu_pin');
    sessionStorage.removeItem('sipanduModalShown');

    // Langsung arahkan ke index.html untuk reset total
    window.location.href = 'index.html';
}

// Fungsi untuk kembali ke login
window.handleBackToLogin = function() {
    window.location.href = 'index.html';
};

// Fungsi untuk menampilkan halaman ganti password dari login
function showForgotPassword() {
    const loginPage = document.getElementById('login-page');
    const mainAppContent = document.getElementById('main-app-content');
    const sidebar = document.getElementById('sidebar');
    
    if (loginPage) loginPage.classList.add('hidden');
    if (mainAppContent) mainAppContent.classList.remove('hidden');
    
    // SEMBUNYIKAN SIDEBAR saat ganti password dari login agar tidak bisa akses dashboard
    if (sidebar) sidebar.classList.add('hidden');
    
    showPage('ganti-password');
}

// Panggil showPage saat halaman dimuat pertama kali
document.addEventListener('DOMContentLoaded', () => {
    initIcons();

    // Cek sesi login yang ada
    const savedRole = localStorage.getItem('sipandu_userRole');
    const savedUsername = localStorage.getItem('sipandu_username');
    const savedName = localStorage.getItem('sipandu_userName');
    const savedAccess = localStorage.getItem('sipandu_userAccess');
    const loginTime = localStorage.getItem('sipandu_loginTime');
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (savedRole && savedUsername && loginTime && (Date.now() - parseInt(loginTime) < twentyFourHours)) {
        // Sesi masih valid, langsung masuk
        const loginPage = document.getElementById('login-page');
        const mainAppContent = document.getElementById('main-app-content');
        if (loginPage) loginPage.classList.add('hidden');
        if (mainAppContent) mainAppContent.classList.remove('hidden');
        
        currentUserRole = savedRole;
        currentUserName = savedName;
        try {
            currentUserAccess = savedAccess ? JSON.parse(savedAccess) : [];
        } catch(e) {
            currentUserAccess = [];
        }
        
        updateProfileUI(savedName, savedRole);
        applyMenuPermissionsByData({ role: savedRole, access: currentUserAccess });
        showPage('dashboard');
        
        // Show SIPANDU info modal on auto-login
        showSipanduInfoModal();
    } else {
        // Belum login, tampilkan semua menu tapi DISABLED
        applyMenuPermissionsByData(null);
    }

    // Tambahkan event listener untuk tombol login
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    // Inisialisasi lookup role otomatis
    initLoginLookup();

    // Tambahkan event listener untuk input Password (tekan Enter)
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleLogin();
            }
        });
    }

    // Tambahkan event listener untuk tombol logout
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
});

function initMutasiForm() {
    const form = document.getElementById('mutasiForm');
    const tabInput = document.getElementById('mutasiInputTab');
    const tabHistory = document.getElementById('mutasiHistoryTab');
    const btnInput = document.getElementById('mutasiTabInputBtn');
    const btnHistory = document.getElementById('mutasiTabHistoryBtn');
    const tableBody = document.getElementById('mutasiTableBody');
    const searchEl = document.getElementById('mutasiSearch');
    const filterEl = document.getElementById('mutasiFilterUnit');
    const filterStartEl = document.getElementById('mutasiFilterStart');
    const filterEndEl = document.getElementById('mutasiFilterEnd');
    let editingId = null;
    const useDB = !!supa; // switch to online DB mode if Supabase configured

    if (!form || !tabInput || !tabHistory) return;

    const switchTab = (tab) => {
        const isInput = tab === 'input';
        tabInput.classList.toggle('hidden', !isInput);
        tabHistory.classList.toggle('hidden', isInput);
        if (btnInput && btnHistory) {
            btnInput.classList.toggle('bg-emerald-500', isInput);
            btnInput.classList.toggle('bg-slate-500', !isInput);
            btnHistory.classList.toggle('bg-emerald-500', !isInput);
            btnHistory.classList.toggle('bg-slate-500', isInput);
        }
        initIcons();
    };

    if (btnInput) btnInput.addEventListener('click', () => switchTab('input'));
    if (btnHistory) btnHistory.addEventListener('click', () => switchTab('history'));

    ['jumlahAwal', 'pmMasuk', 'pmKeluar'].forEach(name => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) input.addEventListener('input', calculateMutasiAkhir);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = Object.fromEntries(fd.entries());
        data.jumlahAwal = Number(data.jumlahAwal) || 0;
        data.pmMasuk = Number(data.pmMasuk) || 0;
        data.pmKeluar = Number(data.pmKeluar) || 0;
        data.jumlahAkhir = (data.jumlahAwal + data.pmMasuk) - data.pmKeluar;

        const pdfFile = fd.get('pdfFile');

        if (useDB) {
            try {
                // Upload PDF ke Supabase Storage (opsional)
                let pdfUrl = '';
                let pdfName = '';
                if (pdfFile && pdfFile.name) {
                    if (pdfFile.type !== 'application/pdf') {
                        alert('File harus berupa PDF');
                        return;
                    }
                    if (pdfFile.size > 5 * 1024 * 1024) {
                        alert('Ukuran PDF maksimal 5MB');
                        return;
                    }
                    const bucket = window.SUPABASE_BUCKET || 'pdf';
                    const safe = pdfFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
                    const filePath = `mutasi_pm/${Date.now()}_${safe}`;
                    const upRes = await supa.storage.from(bucket).upload(filePath, pdfFile, {
                        contentType: 'application/pdf',
                        upsert: true,
                        cacheControl: '3600'
                    });
                    if (upRes.error) {
                        console.error("Supabase Storage Error:", upRes.error);
                        throw upRes.error;
                    }
                    const pub = supa.storage.from(bucket).getPublicUrl(filePath);
                    pdfUrl = (pub && pub.data && pub.data.publicUrl) ? pub.data.publicUrl : '';
                    pdfName = pdfFile.name;
                }

                const payload = {
                    unitPelayanan: data.unitPelayanan || '',
                    bulanTahun: data.bulanTahun || '',
                    jumlahAwal: data.jumlahAwal,
                    pmMasuk: data.pmMasuk,
                    pmKeluar: data.pmKeluar,
                    jumlahAkhir: data.jumlahAkhir,
                    catatan: data.catatan || '',
                    pdfUrl,
                    pdfName,
                    updatedAt: new Date().toISOString()
                };

                if (editingId) {
                    const up = await supa.from('mutasi_pm').update(payload).eq('id', editingId).select().single();
                    if (up.error) throw up.error;
                    editingId = null;
                } else {
                    payload.createdAt = new Date().toISOString();
                    const ins = await supa.from('mutasi_pm').insert([payload]).select().single();
                    if (ins.error) throw ins.error;
                }

                form.reset();
                calculateMutasiAkhir();
                if (typeof fetchData === 'function') await fetchData();
                switchTab('history');
                return;
            } catch (err) {
                console.error('Supabase error:', err);
                alert('Gagal menyimpan ke database online');
                return;
            }
        }

        // Fallback lokal (simulasi) jika Supabase belum dikonfigurasi
        if (pdfFile && pdfFile.name) {
            if (pdfFile.type !== 'application/pdf') {
                alert('File harus berupa PDF');
                return;
            }
            if (pdfFile.size > 5 * 1024 * 1024) {
                alert('Ukuran PDF maksimal 5MB');
                return;
            }
            data.pdfName = pdfFile.name;
            data.pdfUrl = URL.createObjectURL(pdfFile);
        } else {
            data.pdfName = '';
            data.pdfUrl = '';
        }

        if (editingId) {
            const idx = mutasiDataList.findIndex(x => x.id === editingId);
            if (idx !== -1) mutasiDataList[idx] = { ...mutasiDataList[idx], ...data };
            editingId = null;
        } else {
            data.id = Date.now().toString();
            mutasiDataList.unshift(data);
        }

        form.reset();
        calculateMutasiAkhir();
        renderTable();
        switchTab('history');
    });

    form.addEventListener('reset', () => {
        setTimeout(calculateMutasiAkhir, 0);
    });

    function matchFilter(item) {
        const q = ((searchEl && searchEl.value) ? searchEl.value : '').toLowerCase();
        const unit = (item.unitPelayanan || '').toLowerCase();
        const periode = (item.bulanTahun || '');
        const unitFilter = (filterEl && filterEl.value) ? filterEl.value : 'Semua';
        const start = (filterStartEl && filterStartEl.value) ? filterStartEl.value : '';
        const end = (filterEndEl && filterEndEl.value) ? filterEndEl.value : '';

        const searchOk = unit.includes(q) || periode.toLowerCase().includes(q);
        const unitOk = unitFilter === 'Semua' || item.unitPelayanan === unitFilter;

        let periodOk = true;
        if (start && end) {
            periodOk = (periode >= start && periode <= end);
        } else if (start) {
            periodOk = (periode === start);
        } else if (end) {
            periodOk = (periode === end);
        }

        return searchOk && unitOk && periodOk;
    }

    // Fetch data from Supabase if configured
    async function fetchData() {
        if (!useDB) { renderTable(); return; }
        try {
            const q = (searchEl && searchEl.value) ? searchEl.value : '';
            const unit = (filterEl && filterEl.value) ? filterEl.value : 'Semua';
            const start = (filterStartEl && filterStartEl.value) ? filterStartEl.value : '';
            const end = (filterEndEl && filterEndEl.value) ? filterEndEl.value : '';

            let query = supa.from('mutasi_pm').select('*').order('updatedAt', { ascending: false });
            if (unit && unit !== 'Semua') query = query.eq('unitPelayanan', unit);
            if (start && end) query = query.gte('bulanTahun', start).lte('bulanTahun', end);
            else if (start) query = query.eq('bulanTahun', start);
            else if (end) query = query.eq('bulanTahun', end);
            if (q) query = query.or(`unitPelayanan.ilike.%${q}%,bulanTahun.ilike.%${q}%`);

            const { data, error } = await query;
            if (error) throw error;
            mutasiDataList = data || [];
            renderTable();
        } catch (err) {
            console.error('Supabase fetch error:', err);
            alert('Gagal mengambil data dari database online');
        }
    }

    function renderTable() {
        if (!tableBody) return;
        tableBody.innerHTML = '';
        const rows = mutasiDataList.filter(matchFilter);
        if (rows.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="p-10 text-center text-slate-500">Belum ada data.</td></tr>';
            return;
        }
        rows.forEach(item => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50/80 transition-all group';
            tr.innerHTML = `
                <td class="p-4 pl-6">
                    <div class="flex flex-col">
                        <span class="font-black text-sm text-slate-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">${item.unitPelayanan}</span>
                        <span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">ID: ${item.id.slice(-8)}</span>
                    </div>
                </td>
                <td class="p-4 text-center">
                    <span class="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-wider">${item.bulanTahun || '-'}</span>
                </td>
                <td class="p-4">
                    <div class="flex items-center justify-center gap-4">
                        <div class="text-center">
                            <p class="text-[8px] font-black text-slate-300 uppercase">Awal</p>
                            <p class="font-bold text-slate-600">${item.jumlahAwal}</p>
                        </div>
                        <div class="w-px h-6 bg-slate-100"></div>
                        <div class="text-center">
                            <p class="text-[8px] font-black text-emerald-400 uppercase">Masuk</p>
                            <p class="font-bold text-emerald-600">+${item.pmMasuk}</p>
                        </div>
                        <div class="w-px h-6 bg-slate-100"></div>
                        <div class="text-center">
                            <p class="text-[8px] font-black text-rose-400 uppercase">Keluar</p>
                            <p class="font-bold text-rose-600">-${item.pmKeluar}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4 text-center">
                    <div class="inline-block bg-slate-900 text-white px-4 py-2 rounded-2xl text-sm font-black shadow">${item.jumlahAkhir}</div>
                </td>
                <td class="p-4 text-center">
                    <span class="text-slate-600 text-sm">${item.catatan || '-'}</span>
                </td>
                <td class="p-4 pr-6">
                    <div class="flex items-center justify-end gap-3">
                        ${item.pdfUrl ? `<a href="${item.pdfUrl}" target="_blank" class="px-3 py-2 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black hover:bg-amber-100" title="Lihat PDF">PDF</a>` : ''}
                        <button data-action="edit" data-id="${item.id}" class="p-2.5 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all" title="Edit Data">
                            <i data-lucide="edit-3" class="w-4 h-4"></i>
                        </button>
                        <button data-action="delete" data-id="${item.id}" class="p-2.5 text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-600 hover:text-white transition-all" title="Hapus Data">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </td>`;
            tableBody.appendChild(tr);
        });

        // Delegasi event untuk tombol aksi
        tableBody.querySelectorAll('button[data-action]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                const action = btn.getAttribute('data-action');
                if (action === 'delete') {
                    const isConfirmed = await confirmGagah();
                    if (isConfirmed) {
                        const row = btn.closest('tr');
                        if (row) row.classList.add('row-deleting');

                        setTimeout(async () => {
                            if (useDB) {
                                const del = await supa.from('mutasi_pm').delete().eq('id', id);
                                if (del.error) {
                                    alert('Gagal menghapus data online');
                                    if (row) row.classList.remove('row-deleting');
                                    return;
                                }
                                await fetchData();
                            } else {
                                mutasiDataList = mutasiDataList.filter(x => x.id !== id);
                                renderTable();
                            }
                            showToastGagah('Data berhasil dihapus selamanya');
                        }, 500); // Tunggu animasi selesai
                    }
                } else if (action === 'edit') {
                    const item = mutasiDataList.find(x => x.id === id);
                    if (!item) return;
                    // Isi form
                    Object.entries(item).forEach(([k, v]) => {
                        const input = form.querySelector(`[name="${k}"]`);
                        if (input && input.type !== 'file') input.value = v;
                    });
                    editingId = id;
                    calculateMutasiAkhir();
                    if (btnInput) btnInput.click();
                }
            });
        });

        initIcons();
    }

    if (searchEl) searchEl.addEventListener('input', () => { useDB ? fetchData() : renderTable(); });
    if (filterEl) filterEl.addEventListener('change', () => { useDB ? fetchData() : renderTable(); });
    if (filterStartEl) filterStartEl.addEventListener('change', () => { useDB ? fetchData() : renderTable(); });
    if (filterEndEl) filterEndEl.addEventListener('change', () => { useDB ? fetchData() : renderTable(); });

    calculateMutasiAkhir();
    if (useDB) { fetchData(); } else { renderTable(); }
}

function calculateMutasiAkhir() {
    const form = document.getElementById('mutasiForm');
    if (!form) return;

    const awal = parseInt(form.querySelector('[name="jumlahAwal"]').value) || 0;
    const masuk = parseInt(form.querySelector('[name="pmMasuk"]').value) || 0;
    const keluar = parseInt(form.querySelector('[name="pmKeluar"]').value) || 0;
    const akhir = (awal + masuk) - keluar;
    const out = document.getElementById('mutasiJumlahAkhir');
    if (out) out.value = akhir;
}

// Render file form eksternal (F_*.html) ke dalam frame konten utama
function loadFormInFrame(src, title) {
    const pageTitleEl = document.getElementById('page-title-display');
    if (pageTitleEl) pageTitleEl.innerText = (title || src || '').toUpperCase();
    const container = document.getElementById('page-content');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-center gap-3">
                <i data-lucide="file-text" class="w-5 h-5 text-sky-600"></i>
                <h3 class="text-xl font-black text-slate-800">${title || 'Form'}</h3>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <iframe src="${src}" class="w-full min-h-[72vh]" style="border:0;" loading="lazy"></iframe>
            </div>
        </div>
    `;

    if (window.innerWidth < 1024) {
        // tutup sidebar di mobile agar fokus ke konten
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar.classList.add('collapsed');
        mainContent.classList.remove('lg:ml-72');
        overlay.classList.remove('active');
        isSidebarOpen = false;
    }
    initIcons();
}

window.addEventListener('resize', () => {
    const mainContent = document.getElementById('main-content');
    if (window.innerWidth < 1024) {
        isSidebarOpen = false;
        document.getElementById('sidebar').classList.add('collapsed');
        mainContent.classList.remove('lg:ml-72');
    } else {
        isSidebarOpen = true;
        document.getElementById('sidebar').classList.remove('collapsed');
        mainContent.classList.add('lg:ml-72');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initSupabaseClient();
    initIcons();
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('current-date');
    const dayEl = document.getElementById('current-day');

    function updateTime() {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (dateEl) dateEl.textContent = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
        if (dayEl) dayEl.textContent = now.toLocaleDateString('id-ID', { weekday: 'long' });
    }

    updateTime();
    setInterval(updateTime, 1000);

    if (window.innerWidth < 1024) {
        isSidebarOpen = false;
        document.getElementById('sidebar').classList.add('collapsed');
        document.getElementById('main-content').classList.remove('lg:ml-72');
    }

    // Intersep klik tautan form di sidebar agar tampil di frame
    const nav = document.querySelector('nav');
    if (nav) {
        nav.addEventListener('click', (e) => {
            const a = e.target.closest('a[href]');
            if (!a) return;
            const href = a.getAttribute('href');
            if (!href) return;
            // Cegah pindah halaman untuk file form lokal
            const isLocalForm = href.startsWith('F_') || href === 'form_mutasi_static.html';
            if (isLocalForm) {
                e.preventDefault();
                const title = (a.textContent || href).trim();
                loadFormInFrame(href, title);
            }
        });
    }

    // Cek sesi login
    const storedRole = localStorage.getItem('sipandu_userRole');
    const loginTime = localStorage.getItem('sipandu_loginTime');
    const storedAccess = localStorage.getItem('sipandu_userAccess');

    if (storedRole && loginTime) {
        const now = Date.now();
        const diff = now - parseInt(loginTime, 10);
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 Jam

        if (diff < sessionDuration) {
            // Sesi valid
            currentUserRole = storedRole;
            try {
                currentUserAccess = storedAccess ? JSON.parse(storedAccess) : [];
            } catch(e) {
                currentUserAccess = [];
            }
            
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-app-content').classList.remove('hidden');
            
            // Terapkan izin menu
            applyMenuPermissionsByData({ role: currentUserRole, access: currentUserAccess });

            // Set timeout sisa waktu
            setTimeout(() => {
                handleLogoutSessionExpired();
            }, sessionDuration - diff);
        } else {
            // Sesi expired
            localStorage.removeItem('sipandu_userRole');
            localStorage.removeItem('sipandu_username');
            localStorage.removeItem('sipandu_loginTime');
            localStorage.removeItem('sipandu_userAccess');
            localStorage.removeItem('sipandu_pin');
        }
    }

    // Tampilkan Dashboard secara otomatis saat load awal
    showPage('dashboard');

    // Siapkan element modal kustom "Gagah"
    createCoolElements();

    // Event listener untuk link yang dinonaktifkan
    document.addEventListener('click', (e) => {
        const targetLink = e.target.closest('a.disabled-link');
        if (targetLink) {
            e.preventDefault();
            showToastGagah('Anda tidak memiliki akses ke menu ini.', 'lock', 'text-rose-500');
        }
    });
});

// Fungsi untuk membuat elemen UI pendukung (modal & toast)
function createCoolElements() {
    if (document.getElementById('cool-modal-overlay')) return;

    // Modal HTML
    const modalHTML = `
        <div id="cool-modal-overlay" class="custom-modal-overlay">
            <div class="custom-modal">
                <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <i data-lucide="alert-triangle" class="w-10 h-10"></i>
                </div>
                <h3 class="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Konfirmasi Hapus</h3>
                <p class="text-slate-500 text-sm mb-8 leading-relaxed">Apakah Anda yakin ingin menghapus data ini secara permanen? Tindakan ini tidak dapat dibatalkan.</p>
                <div class="flex gap-3">
                    <button id="cool-modal-cancel" class="flex-1 px-6 py-3.5 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all">Batal</button>
                    <button id="cool-modal-confirm" class="flex-1 px-6 py-3.5 bg-rose-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-rose-700 shadow-lg shadow-rose-200 hover:-translate-y-0.5 transition-all">Hapus Sekarang</button>
                </div>
            </div>
        </div>
        <div id="cool-toast" class="toast-gagah">
            <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
            <span id="cool-toast-msg">Data berhasil dihapus</span>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initIcons();
}

// Fungsi Konfirmasi Gagah
function confirmGagah() {
    return new Promise((resolve) => {
        const overlay = document.getElementById('cool-modal-overlay');
        const btnConfirm = document.getElementById('cool-modal-confirm');
        const btnCancel = document.getElementById('cool-modal-cancel');

        const close = (result) => {
            overlay.classList.remove('active');
            resolve(result);
        };

        btnConfirm.onclick = () => close(true);
        btnCancel.onclick = () => close(false);
        overlay.onclick = (e) => { if (e.target === overlay) close(false); };

        overlay.classList.add('active');
    });
}

// Fungsi untuk menangani klik pada Profile Admin
function handleAdminClick() {
    const password = prompt("Masukkan Password Admin:");
    if (password === "888") {
        const adminLinks = document.getElementById('admin-links');
        if (adminLinks) {
            adminLinks.classList.toggle('hidden');
            if (!adminLinks.classList.contains('hidden')) {
                showToastGagah("Akses Diterima - Menu Admin Terbuka", "unlock", "text-sky-400");
            } else {
                showToastGagah("Menu Admin Ditutup", "lock", "text-slate-400");
            }
        }
    } else if (password !== null) {
        showToastGagah("Password Salah!", "alert-circle", "text-rose-500");
    }
}

// Fungsi Toast Gagah
function showToastGagah(msg = 'Data berhasil dihapus', icon = 'check-circle', color = 'text-emerald-400') {
    const toast = document.getElementById('cool-toast');
    const msgEl = document.getElementById('cool-toast-msg');
    const iconEl = toast.querySelector('i');

    msgEl.innerText = msg;
    if (iconEl) {
        iconEl.setAttribute('data-lucide', icon);
        iconEl.className = `w-5 h-5 ${color}`;
        initIcons();
    }

    toast.classList.add('active');
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}