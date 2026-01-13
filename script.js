// 1. Fungsi Mobile Menu
function toggleMenu() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
}

// 2. Logika Keranjang Belanja
let cart = JSON.parse(localStorage.getItem('lanting_cart')) || [];

function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);
    
    if (itemIndex > -1) {
        cart[itemIndex].qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    
    saveCart();
    renderCart();
    alert(name + " berhasil ditambahkan!");
}

function saveCart() {
    localStorage.setItem('lanting_cart', JSON.stringify(cart));
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('cart-total-price');
    
    if (!cartContainer) return; // Mencegah error di halaman non-produk

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        cartContainer.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                <span>${item.name} (x${item.qty})</span>
                <span>Rp ${subtotal.toLocaleString()} 
                <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer; margin-left:10px;">X</button></span>
            </div>
        `;
    });

    totalDisplay.innerText = total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// 3. WhatsApp Checkout
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let phone = "6281806943026"; // Ganti dengan nomor WhatsApp UMKM
    let text = "Halo Lanting Fikri, saya mau pesan:%0A%0A";
    let total = 0;

    cart.forEach(item => {
        text += `- ${item.name} (${item.qty} pcs) = Rp ${(item.price * item.qty).toLocaleString()}%0A`;
        total += (item.price * item.qty);
    });

    text += `%0A*Total: Rp ${total.toLocaleString()}*`;
    
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

// Jalankan render saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderCart);
