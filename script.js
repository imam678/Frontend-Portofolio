/* ================================================
   script.js — FILE OTAK (JavaScript)
   Berisi semua logika interaktif website

   ISI FILE INI:
   1. Hamburger Menu (mobile)
   2. Navbar Shrink saat Scroll
   3. Scroll Reveal (elemen muncul saat terlihat)
   4. Active Link Navbar
   5. Project Card Klik
================================================ */


/* ================================================
   1. HAMBURGER MENU
   Klik tombol burger → menu mobile terbuka/tertutup
================================================ */

// Ambil elemen tombol burger dan daftar menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

// Saat tombol burger diklik
burger.addEventListener('click', function () {
    // toggle artinya: kalau ada kelas .open → hapus, kalau tidak ada → tambahkan
    navLinks.classList.toggle('open');
});

// Saat salah satu link di menu diklik → tutup menu
// Supaya menu tidak tetap terbuka setelah user memilih halaman
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('open');
    });
});


/* ================================================
   2. NAVBAR SHRINK SAAT SCROLL
   Saat user scroll ke bawah > 50px,
   navbar mengecil padding-nya (efek visual keren)
================================================ */

// Ambil elemen navbar
const navbar = document.getElementById('navbar');

// Setiap kali user scroll halaman
window.addEventListener('scroll', function () {

    if (window.scrollY > 50) {
        // Sudah scroll lebih dari 50px → kurangi padding navbar
        navbar.style.padding = '12px 5%';
    } else {
        // Masih di atas → kembalikan padding normal
        navbar.style.padding = '20px 5%';
    }

});


/* ================================================
   3. SCROLL REVEAL untuk Experience Items
   Elemen .exp-item awalnya tidak terlihat (di CSS)
   Ketika elemen masuk area layar → tambah kelas .visible
   → CSS akan menjalankan animasi muncul
   
   Menggunakan IntersectionObserver API bawaan browser
   Tidak perlu library tambahan!
================================================ */

// Ambil semua elemen experience
const expItems = document.querySelectorAll('.exp-item');

// Buat "pengamat" yang memantau apakah elemen masuk layar
const observer = new IntersectionObserver(function (entries) {

    // entries = daftar elemen yang sedang dipantau
    entries.forEach(function (entry) {

        // Kalau elemen sedang terlihat di layar
        if (entry.isIntersecting) {
            // Tambahkan kelas .visible → CSS animasi jalan
            entry.target.classList.add('visible');

            // Hentikan pengamatan elemen ini (animasi cukup sekali)
            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15 // Aktif saat 15% elemen sudah terlihat di layar
});

// Daftarkan setiap .exp-item ke pengamat
// Tambahkan delay berbeda agar muncul bergantian (stagger effect)
expItems.forEach(function (item, index) {
    // index 0 → delay 0s, index 1 → delay 0.15s, index 2 → delay 0.3s, dst
    item.style.transitionDelay = (index * 0.15) + 's';

    // Mulai mengamati elemen ini
    observer.observe(item);
});


/* ================================================
   4. ACTIVE LINK NAVBAR
   Saat user scroll, link navbar yang sesuai
   dengan section yang sedang dilihat akan
   berubah warna menjadi oranye
================================================ */

// Ambil semua section yang punya id
const sections = document.querySelectorAll('section[id]');
// Ambil semua link di navbar
const navAnchors = document.querySelectorAll('.nav-links a');

// Setiap kali user scroll
window.addEventListener('scroll', function () {

    let current = ''; // Menyimpan id section yang sedang aktif

    // Loop semua section, cek posisinya
    sections.forEach(function (sec) {
        // Posisi atas section dikurangi 100px (toleransi navbar)
        const sectionTop = sec.offsetTop - 100;

        // Kalau posisi scroll sudah melewati posisi section
        if (window.scrollY >= sectionTop) {
            current = sec.getAttribute('id'); // Catat id section ini
        }
    });

    // Update warna link navbar
    navAnchors.forEach(function (a) {
        a.style.color = ''; // Reset semua link ke warna default

        // Kalau link ini menuju section yang aktif → beri warna oranye
        if (a.getAttribute('href') === '#' + current) {
            a.style.color = 'var(--accent)';
        }
    });

});


/* ================================================
   5. PROJECT CARD KLIK
   Saat kartu proyek diklik → tampilkan notifikasi
   (Bisa diganti dengan membuka URL proyek sungguhan)
================================================ */

// Ambil semua kartu proyek
document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
        const url = card.getAttribute('data-url'); // Ambil URL proyek dari atribut data-url
        window.open(url, '_blank'); // Buka URL di tab baru
    });
});

// Ambil semua tombol sosial media
document.querySelectorAll('.social-links').forEach(function (link) {
    link.addEventListener('click', function() {
        const url = link.getAttribute('data-url'); // Ambil URL sosial media dari atribut data-url
        window.open(url, '_blank'); // Buka URL di tab baru
    })
})