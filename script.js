// 1. Menu Hamburger Mobile
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Tambahkan CSS untuk .nav-links.active di style.css jika perlu
    });
}

// 2. Logika Keranjang Belanja
let cart = JSON.parse(localStorage.getItem('lanting_cart')) || [];

function addToCart(name, price) {
    const item = { name, price, qty: 1 };
    
    // Cek jika barang sudah ada
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push(item);
    }
    
    saveCart();
    renderCart();
    alert(name + " berhasil ditambah!");
}

function saveCart() {
    localStorage.setItem('lanting_cart', JSON.stringify(cart));
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('cart-total-price');
    
    if (!cartItemsDiv) return;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Keranjang masih kosong.</p>';
        totalPriceSpan.innerText = 'Rp 0';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <span>${item.name} (x${item.qty})</span>
                <span>Rp ${(item.price * item.qty).toLocaleString()}</span>
                <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer">Hapus</button>
            </div>
        `;
        total += item.price * item.qty;
    });

    cartItemsDiv.innerHTML = html;
    totalPriceSpan.innerText = 'Rp ' + total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// 3. Checkout WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang Anda kosong!");
        return;
    }

    let nomorWA = "6281806943026"; // Ganti dengan nomor WhatsApp UMKM
    let pesan = "Halo Lanting Fikri, saya mau pesan:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        pesan += `- ${item.name} x${item.qty} (Rp ${(item.price * item.qty).toLocaleString()})%0A`;
        total += item.price * item.qty;
    });

    pesan += `%0A*Total: Rp ${total.toLocaleString()}*`;
    
    // Reset keranjang setelah checkout
    localStorage.removeItem('lanting_cart');
    cart = [];
    
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

// Jalankan fungsi tampilkan keranjang saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderCart);
