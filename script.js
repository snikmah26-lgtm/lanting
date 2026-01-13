// Fungsi untuk mengarahkan ke WhatsApp
function pesanWA(namaProduk) {
    // Ganti dengan nomor WhatsApp Anda (Gunakan kode negara, misal 62 untuk Indonesia)
    const nomorWA = "6281234567890"; 
    
    // Pesan otomatis
    const pesan = "Halo Lanting Fikri Kebumen, saya ingin memesan produk: " + namaProduk;
    
    // Encode pesan agar sesuai format URL
    const url = "https://wa.me/" + nomorWA + "?text=" + encodeURIComponent(pesan);
    
    // Buka WhatsApp di tab baru
    window.open(url, '_blank');
}

// Efek scroll halus untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
