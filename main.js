// Menu Data inspired by user image
const products = [
    {
        id: 1,
        name: "Pepperoni Clásica",
        category: "pizzas",
        price: 28000,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
        description: "Doble porción de pepperoni crujiente, queso mozzarella fundido y salsa de tomate casera.",
        recommended: true
    },
    {
        id: 2,
        name: "Vegetariana Suprema",
        category: "pizzas",
        price: 26000,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        description: "Pimientos frescos, champiñones, aceitunas negras, cebolla morada y albahaca fresca.",
        recommended: true
    },
    {
        id: 3,
        name: "Hawaiana Especial",
        category: "pizzas",
        price: 27000,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
        description: "Piña caramelizada en almíbar, jamón ahumado selecto y queso mozzarella suave.",
        recommended: false
    },
    {
        id: 4,
        name: "Carnes Mixta",
        category: "pizzas",
        price: 32000,
        image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
        description: "Salami, carne desmechada, salchicha italiana, tocineta crujiente y toque picante.",
        recommended: true
    },
    {
        id: 5,
        name: "Combo Familiar Amigos",
        category: "combos",
        price: 55000,
        image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80",
        description: "2 Pizzas Grandes a elección + 1 Gaseosa 1.5L + Pan de Ajo.",
        recommended: true
    },
    {
        id: 6,
        name: "Bebida Gaseosa 1.5L",
        category: "bebidas",
        price: 7000,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
        description: "Refrescante gaseosa helada para acompañar tu banquete.",
        recommended: false
    }
];

// Shopping Cart State
let cart = [];

// DOM Loaded Init + Interactive Hero Pizza
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    renderRecommended();
    updateCartUI();

    // Interactividad 3D con el cursor para la pizza principal
    const heroPizzaContainer = document.querySelector('.hero-pizza-glow')?.parentElement;
    const heroPizzaImg = document.querySelector('.hero-pizza-glow');

    if (heroPizzaContainer && heroPizzaImg) {
        // Quitar la animación lenta por defecto para permitir el control 3D manual
        heroPizzaImg.classList.remove('spin-slow');
        heroPizzaContainer.style.perspective = '1000px';
        heroPizzaImg.style.transition = 'transform 0.15s ease-out, filter 0.3s ease';

        // Seguir el cursor y aplicar inclinación 3D
        heroPizzaContainer.addEventListener('mousemove', (e) => {
            const rect = heroPizzaContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = (-y / (rect.height / 2)) * 25; // Ángulo vertical
            const rotateY = (x / (rect.width / 2)) * 25;  // Ángulo horizontal

            heroPizzaImg.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            heroPizzaImg.style.filter = 'drop-shadow(0 25px 35px rgba(217, 155, 0, 0.45))';
        });

        // Restablecer posición cuando el cursor sale
        heroPizzaContainer.addEventListener('mouseleave', () => {
            heroPizzaImg.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
            heroPizzaImg.style.filter = 'drop-shadow(0 20px 30px rgba(217, 155, 0, 0.25))';
        });

        // Efecto visual de rebote al presionar (click)
        heroPizzaContainer.addEventListener('mousedown', () => {
            heroPizzaImg.style.transform += ' scale(0.95)';
        });

        heroPizzaContainer.addEventListener('mouseup', () => {
            heroPizzaImg.style.transform = heroPizzaImg.style.transform.replace(' scale(0.95)', '');
        });
    }
});

// Render Products Grid
function renderProducts(category) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-10 text-brand-cream/60">
                <i class="fa-solid fa-pizza-slice text-4xl mb-2 text-brand-gold"></i>
                <p>No hay opciones disponibles en esta categoría por el momento.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = "bg-brand-woodCard border border-brand-gold/20 rounded-2xl overflow-hidden shadow-lg hover:border-brand-gold/60 transition-all duration-300 flex flex-col sm:flex-row group";
        
        card.innerHTML = `
            <!-- Image Column -->
            <div class="sm:w-2/5 relative overflow-hidden bg-brand-woodDark flex items-center justify-center">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="w-full h-48 sm:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     onerror="this.src='https://placehold.co/400x400/2c1a12/d99b00?text=Pizza'">
                ${product.recommended ? `<span class="absolute top-2 left-2 bg-brand-gold text-brand-woodDark text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">Top</span>` : ''}
            </div>

            <!-- Content Column -->
            <div class="sm:w-3/5 p-5 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="font-serif font-bold text-lg text-white group-hover:text-brand-gold transition-colors">${product.name}</h3>
                    </div>
                    <p class="text-xs text-brand-cream/70 leading-relaxed mb-4 line-clamp-2">${product.description}</p>
                </div>

                <div class="pt-3 border-t border-brand-gold/10 flex items-center justify-between mt-auto">
                    <div>
                        <span class="text-xs text-brand-cream/50 block">Precio</span>
                        <span class="text-lg font-extrabold text-brand-gold">$${product.price.toLocaleString('es-CO')}</span>
                    </div>

                    <button onclick="addToCart(${product.id})" class="px-4 py-2 bg-brand-gold hover:bg-yellow-400 text-brand-woodDark font-bold text-xs rounded-xl shadow transition-all duration-200 flex items-center gap-1.5 active:scale-95">
                        <i class="fa-solid fa-plus"></i>
                        <span>Agregar</span>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Render Recommended Carousel
function renderRecommended() {
    const container = document.getElementById('recommended-container');
    container.innerHTML = '';

    const recs = products.filter(p => p.recommended);

    recs.forEach(product => {
        const item = document.createElement('div');
        item.className = "min-w-[280px] sm:min-w-[320px] bg-brand-woodCard border border-brand-gold/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between snap-start hover:border-brand-gold transition-all";
        
        item.innerHTML = `
            <div class="relative mb-4 overflow-hidden rounded-xl h-40">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/400x300/2c1a12/d99b00?text=Pizza'">
                <span class="absolute bottom-2 right-2 bg-brand-woodDark/90 border border-brand-gold/30 text-brand-gold text-xs font-bold px-2 py-1 rounded-lg">
                    Recomendado
                </span>
            </div>

            <h4 class="font-bold text-white text-base mb-1">${product.name}</h4>
            <p class="text-xs text-brand-cream/60 mb-4">${product.description}</p>

            <div class="flex items-center justify-between pt-2 border-t border-brand-gold/10">
                <span class="font-extrabold text-brand-gold">$${product.price.toLocaleString('es-CO')}</span>
                <button onclick="addToCart(${product.id})" class="px-3 py-1.5 bg-brand-gold hover:bg-yellow-400 text-brand-woodDark font-bold text-xs rounded-lg transition-all">
                    + Añadir
                </button>
            </div>
        `;
        container.appendChild(item);
    });
}

// Category Filter Navigation
function filterCategory(cat) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === cat) {
            btn.classList.add('bg-brand-gold', 'text-brand-woodDark', 'shadow-md');
            btn.classList.remove('bg-brand-woodDark', 'text-brand-cream', 'border-brand-gold/30');
        } else {
            btn.classList.remove('bg-brand-gold', 'text-brand-woodDark', 'shadow-md');
            btn.classList.add('bg-brand-woodDark', 'text-brand-cream', 'border-brand-gold/30');
        }
    });
    renderProducts(cat);
}

// Cart Actions
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Subtle notification pulse
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.classList.add('scale-125');
    setTimeout(() => cartBtn.classList.remove('scale-125'), 200);
}

function changeQuantity(id, delta) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const countElem = document.getElementById('cart-count');
    const itemsContainer = document.getElementById('cart-items');
    const subtotalElem = document.getElementById('cart-subtotal');
    const totalElem = document.getElementById('cart-total');

    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    countElem.innerText = totalItems;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-center text-brand-cream/50 py-12">
                <i class="fa-solid fa-cart-flatbed text-5xl mb-3 text-brand-gold/40"></i>
                <p class="text-sm font-medium">Tu carrito está vacío</p>
                <span class="text-xs mt-1 text-brand-cream/40">¡Agrega deliciosas pizzas para comenzar!</span>
            </div>
        `;
    } else {
        itemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between bg-brand-woodMedium/80 p-3 rounded-xl border border-brand-gold/10">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover">
                <div class="flex-1 px-3">
                    <h5 class="text-sm font-bold text-white line-clamp-1">${item.name}</h5>
                    <span class="text-xs text-brand-gold font-semibold">$${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                </div>
                <div class="flex items-center space-x-2 bg-brand-woodDark px-2 py-1 rounded-lg border border-brand-gold/20">
                    <button onclick="changeQuantity(${item.id}, -1)" class="text-brand-cream hover:text-brand-gold text-xs px-1">-</button>
                    <span class="text-xs font-bold text-white">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="text-brand-cream hover:text-brand-gold text-xs px-1">+</button>
                </div>
            </div>
        `).join('');
    }

    subtotalElem.innerText = `$${subtotal.toLocaleString('es-CO')}`;
    totalElem.innerText = `$${subtotal.toLocaleString('es-CO')}`;
}

// Cart Offcanvas Drawer Toggle
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const panel = document.getElementById('cart-panel');

    if (drawer.classList.contains('opacity-0')) {
        drawer.classList.remove('opacity-0', 'pointer-events-none');
        panel.classList.remove('translate-x-full');
    } else {
        panel.classList.add('translate-x-full');
        setTimeout(() => {
            drawer.classList.add('opacity-0', 'pointer-events-none');
        }, 300);
    }
}

// Scroll Controls
function scrollRecommended(direction) {
    const container = document.getElementById('recommended-container');
    container.scrollBy({ left: direction * 300, behavior: 'smooth' });
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Checkout & User Modals
function checkout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de realizar tu pedido.');
        return;
    }

    const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const summary = document.getElementById('checkout-summary');

    summary.innerHTML = `
        <p class="font-bold text-brand-gold mb-2">Resumen de la orden:</p>
        <ul class="space-y-1 text-xs text-brand-cream/80">
            ${cart.map(i => `<li>• ${i.quantity}x ${i.name} ($${(i.price * i.quantity).toLocaleString('es-CO')})</li>`).join('')}
        </ul>
        <div class="pt-2 mt-2 border-t border-brand-gold/20 font-bold text-white flex justify-between">
            <span>Total a pagar:</span>
            <span class="text-brand-gold">$${total.toLocaleString('es-CO')}</span>
        </div>
    `;

    toggleCart();
    document.getElementById('checkout-modal').classList.remove('hidden');
    cart = [];
    updateCartUI();
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function openUserModal() {
    document.getElementById('user-modal').classList.remove('hidden');
}

function closeUserModal() {
    document.getElementById('user-modal').classList.hidden = true;
    document.getElementById('user-modal').classList.add('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    alert('¡Sesión iniciada con éxito!');
    closeUserModal();
}
