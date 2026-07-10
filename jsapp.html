document.addEventListener("DOMContentLoaded", () => {
    // Jalankan Service Worker PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/sw.js');
    }

    // Timer Splash Screen 2.5 Detik
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
    }, 2500);

    // Pemutar Audio Efek Sistem
    function playSound(type) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if(type === 'success') {
            oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            oscillator.start(); oscillator.stop(audioCtx.currentTime + 0.25);
        }
    }

    // Realtime Clock Engine
    setInterval(() => {
        const now = new Date();
        document.getElementById('digital-clock').innerText = now.toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }, 1000);

    // Integrasi Login & Simulasi OTP Flow
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nickname = document.getElementById('login-name').value;
        const phone = document.getElementById('login-phone').value;
        const password = document.getElementById('login-pass').value;

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nickname, phone, password })
            });
            const data = await res.json();

            if (res.ok && data.status === "OTP_SENT") {
                // Prompt Verifikasi Input OTP Menggunakan SweetAlert2 Premium Popup
                const { value: otpCode } = await Swal.fire({
                    title: 'Masukkan Kode OTP',
                    text: 'Silakan periksa log konsol server VS Code untuk menyalin 6 digit kode simulasi OTP.',
                    input: 'text',
                    inputPlaceholder: '123456',
                    showCancelButton: true,
                    confirmButtonText: 'Verifikasi'
                });

                if (otpCode) {
                    const otpRes = await fetch('/api/auth/verify-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ otp: otpCode })
                    });
                    const otpData = await otpRes.json();

                    if (otpRes.ok) {
                        playSound('success');
                        Swal.fire('Berhasil!', 'Selamat datang kembali.', 'success');
                        document.getElementById('login-container').classList.add('hidden');
                        document.getElementById('app-container').classList.remove('hidden');
                        loadDashboard();
                    } else {
                        Swal.fire('Gagal', otpData.message, 'error');
                    }
                }
            } else {
                Swal.fire('Akses Ditolak', data.message, 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Gagal terhubung ke server.', 'error');
        }
    });

    // Dashboard Loader Engine
    async function loadDashboard() {
        try {
            const res = await fetch('/api/dashboard');
            const data = await res.json();
            if(!res.ok) return;

            document.getElementById('greeting-text').innerText = `Halo, ${data.user.avatar} ${data.user.nickname}!`;
            document.getElementById('stat-photos').innerText = data.stats.photos || 0;
            document.getElementById('stat-videos').innerText = data.stats.videos || 0;
            
            // Integrasi OpenWeather API Palsu/Statis jika Kunci Kosong demi Kelancaran Tampilan UX
            document.getElementById('weather-info').innerText = "⛅ 29°C, Cerah";
            
            loadGallery();
        } catch(e){}
    }

    // Render Dokumentasi Galeri Foto & Video
    async function loadGallery() {
        const res = await fetch('/api/gallery');
        const files = await res.json();
        const grid = document.getElementById('gallery-grid');
        grid.innerHTML = '';

        if(files.length === 0) {
            grid.innerHTML = `<p class="text-muted text-center py-4">Belum ada dokumentasi media terkini.</p>`;
            return;
        }

        files.forEach(file => {
            const card = document.createElement('div');
            card.className = 'col-6 col-md-4 mb-4';
            card.innerHTML = `
                <div class="glass-card p-2">
                    ${file.file_type.includes('image') ? 
                        `<img src="/uploads/${file.filename}" class="img-fluid rounded mb-2" style="max-height:180px; width:100%; object-fit:cover;">` : 
                        `<video src="/uploads/${file.filename}" class="img-fluid rounded mb-2" style="max-height:180px; width:100%;" controls></video>`
                    }
                    <h6>${file.title}</h6>
                    <small class="text-muted d-block"><i class="fas fa-tag me-1"></i>${file.album}</small>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Dark/Light Theme Switcher Engine Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme);
        themeBtn.innerHTML = targetTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Form Upload Engine File Input Trigger Listener
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', async () => {
        if(fileInput.files.length === 0) return;
        const formData = new FormData();
        for(let i=0; i<fileInput.files.length; i++) {
            formData.append('files', fileInput.files[i]);
        }
        formData.append('album', 'Liburan');

        Swal.fire({ title: 'Sedang mengunggah...', didOpen: () => Swal.showLoading() });

        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if(res.ok) {
            playSound('success');
            Swal.fire({ title: 'Upload Berhasil', text: 'Media album keluarga diperbarui.', icon: 'success', showConfirmButton: false, timer: 1500 });
            loadDashboard();
        } else {
            Swal.fire('Gagal', 'Terjadi kesalahan sistem upload.', 'error');
        }
    });
});
