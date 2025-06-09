// --- Mock Product Data (Base Price in USD) ---
const products = [
  {
    id: 1,
    name: 'Graffiti Blast Tee',
    basePrice: 35.0,
    image: 'https://placehold.co/300x300/FDE047/111827?text=CT+Tee+1&font=montserrat',
  },
  {
    id: 2,
    name: 'Urban Camo Hoodie',
    basePrice: 75.0,
    image: 'https://placehold.co/300x300/EC4899/FFFFFF?text=CT+Hoodie&font=montserrat',
  },
  {
    id: 3,
    name: 'Rebel Skull Cap',
    basePrice: 25.0,
    image: 'https://placehold.co/300x300/6D28D9/FFFFFF?text=CT+Cap&font=montserrat',
  },
  {
    id: 4,
    name: 'Street Art Joggers',
    basePrice: 60.0,
    image: 'https://placehold.co/300x300/10B981/FFFFFF?text=CT+Joggers&font=montserrat',
  },
  {
    id: 5,
    name: 'Future Funk Jacket',
    basePrice: 120.0,
    image: 'https://placehold.co/300x300/F59E0B/111827?text=CT+Jacket&font=montserrat',
  },
  {
    id: 6,
    name: 'Concrete Jungle Sneakers',
    basePrice: 95.0,
    image: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=CT+Kicks&font=montserrat',
  },
  {
    id: 7,
    name: 'Acid Wash Denim Vest',
    basePrice: 65.0,
    image: 'https://placehold.co/300x300/EF4444/FFFFFF?text=CT+Vest&font=montserrat',
  },
  {
    id: 8,
    name: 'Neon Drip Backpack',
    basePrice: 50.0,
    image: 'https://placehold.co/300x300/8B5CF6/FFFFFF?text=CT+Bag&font=montserrat',
  },
  {
    id: 9,
    name: 'Skate Lord Deck',
    basePrice: 80.0,
    image: 'https://placehold.co/300x300/FDE047/111827?text=CT+Deck&font=montserrat',
  },
  {
    id: 10,
    name: 'Riot Gear Shorts',
    basePrice: 45.0,
    image: 'https://placehold.co/300x300/EC4899/FFFFFF?text=CT+Shorts&font=montserrat',
  },
  {
    id: 11,
    name: 'Tag King Beanie',
    basePrice: 22.0,
    image: 'https://placehold.co/300x300/6D28D9/FFFFFF?text=CT+Beanie&font=montserrat',
  },
  {
    id: 12,
    name: 'Anarchy Socks (3-Pack)',
    basePrice: 18.0,
    image: 'https://placehold.co/300x300/10B981/FFFFFF?text=CT+Socks&font=montserrat',
  },
  {
    id: 13,
    name: 'Cyberpunk Shades',
    basePrice: 40.0,
    image: 'https://placehold.co/300x300/F59E0B/111827?text=CT+Shades&font=montserrat',
  },
  {
    id: 14,
    name: 'Underground Sound Tee',
    basePrice: 38.0,
    image: 'https://placehold.co/300x300/3B82F6/FFFFFF?text=CT+Tee+2&font=montserrat',
  },
  {
    id: 15,
    name: 'Glitch Art Hoodie',
    basePrice: 78.0,
    image: 'https://placehold.co/300x300/EF4444/FFFFFF?text=CT+Hoodie+2&font=montserrat',
  },
];
let cart = [];
let currentCurrency = localStorage.getItem('selectedCurrency') || 'USD';
const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  NGN: 1450.5,
};
const currencySymbols = {
  USD: '$',
  EUR: '€',
  NGN: '₦',
};

// DOM Elements
const productContainerEl = document.getElementById('productContainer');
const cartIconEl = document.getElementById('cartIcon');
const cartIconMobileEl = document.getElementById('cartIconMobile');
const cartItemCountDisplay = document.getElementById('cartItemCount');
const cartItemCountMobileDisplay = document.getElementById('cartItemCountMobile');
const cartSidebarEl = document.getElementById('cartSidebar');
const cartOverlayEl = document.getElementById('cartOverlay');
const closeCartButtonEl = document.getElementById('closeCartButton');
const cartItemsContainerEl = document.getElementById('cartItemsContainer');
const cartTotalDisplay = document.getElementById('cartTotal');
const mobileMenuButtonEl = document.getElementById('mobileMenuButton');
const mobileMenuEl = document.getElementById('mobileMenu');
const searchInputDesktopEl = document.getElementById('searchInputDesktop');
const searchInputMobileEl = document.getElementById('searchInputMobile');
const emptyCartMessageEl = document.getElementById('emptyCartMessage');
const preloaderEl = document.getElementById('preloader');
const themeToggleEl = document.getElementById('themeToggle');
const themeToggleMobileEl = document.getElementById('themeToggleMobile');
const themeIconMoonEl = document.getElementById('themeIconMoon');
const themeIconSunEl = document.getElementById('themeIconSun');
const themeIconMoonMobileEl = document.getElementById('themeIconMoonMobile');
const themeIconSunMobileEl = document.getElementById('themeIconSunMobile');
const currencySwitcherDesktop = document.getElementById('currencySwitcherDesktop');
const currencySwitcherMobile = document.getElementById('currencySwitcherMobile');
const currentYearEl = document.getElementById('currentYear');
const footerFormEl = document.querySelector('.email-form');

function formatPrice(price, currency) {
  const symbol = currencySymbols[currency] || '$';
  if (currency === 'NGN') {
    return `${symbol}${Math.round(price).toLocaleString()}`;
  }
  return `${symbol}${price.toFixed(2)}`;
}

function convertPrice(basePrice, targetCurrency) {
  return basePrice * (exchangeRates[targetCurrency] || 1);
}

function updateCurrency(newCurrency) {
  currentCurrency = newCurrency;
  localStorage.setItem('selectedCurrency', newCurrency);
  if (currencySwitcherDesktop) currencySwitcherDesktop.value = newCurrency;
  if (currencySwitcherMobile) currencySwitcherMobile.value = newCurrency;
  renderProducts(products);
  updateCart();
}

function renderProducts(productsToRender = products) {
  productContainerEl.innerHTML = '';
  if (productsToRender.length === 0) {
    productContainerEl.innerHTML = `<p class="no-products-message" style="grid-column: 1 / -1; text-align: center; color: var(--color-text-gray-500-light); padding: 2rem 0;">No products found.</p>`;
    return;
  }
  productsToRender.forEach((product, index) => {
    const displayPrice = convertPrice(product.basePrice, currentCurrency);
    const card = `
                    <a href="product.html?id=${
                      product.id
                    }" class="product-card pagelink reveal" style="transition-delay: ${
      index * 50
    }ms">
                        <div class="product-card-image-wrapper">
                             <img src="${product.image}" alt="${
      product.name
    }" class="product-image" onerror="this.onerror=null;this.src='https://placehold.co/300x300/cccccc/969696?text=Image+Not+Found';">
                        </div>
                        <div class="product-info">
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-price">${formatPrice(
                              displayPrice,
                              currentCurrency
                            )}</p>
                            <button class="btn btn-primary add-to-cart-btn" data-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    </a>
                `;
    productContainerEl.insertAdjacentHTML('beforeend', card);
  });
  addCartButtonListeners();
  setupScrollAnimations(); // Re-run observer for new elements
}

function addCartButtonListeners() {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(parseInt(button.dataset.id), button);
    });
  });
}

function addToCart(productId, buttonElement) {
  const productToAdd = products.find(p => p.id === productId);
  if (!productToAdd) return;
  const existingCartItem = cart.find(item => item.id === productId);
  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    cart.push({ ...productToAdd, quantity: 1, price: productToAdd.basePrice });
  }

  // Visual feedback on the button
  if (buttonElement) {
    buttonElement.classList.add('added');
    buttonElement.innerHTML = '<i class="fas fa-check"></i> Added!';
    buttonElement.disabled = true;
    setTimeout(() => {
      buttonElement.classList.remove('added');
      buttonElement.innerHTML = 'Add to Cart';
      buttonElement.disabled = false;
    }, 1500);
  }

  updateCart();
  openCart();
}

function updateCart() {
  cartItemsContainerEl.innerHTML = '';
  let totalBaseAmount = 0;
  let itemCount = 0;
  if (cart.length === 0) {
    emptyCartMessageEl.classList.remove('hidden');
  } else {
    emptyCartMessageEl.classList.add('hidden');
    cart.forEach(item => {
      const displayPriceInCart = convertPrice(item.price, currentCurrency);
      const itemTotalDisplay = convertPrice(item.price * item.quantity, currentCurrency);
      const cartItemHTML = `
                        <div class="cart-item">
                            <div class="cart-item-details">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                                <div>
                                    <h4 class="cart-item-name">${item.name}</h4>
                                    <p class="cart-item-meta">${formatPrice(
                                      displayPriceInCart,
                                      currentCurrency
                                    )} x ${item.quantity}</p>
                                </div>
                            </div>
                            <div class="cart-item-actions">
                                <span class="cart-item-price-total">${formatPrice(
                                  itemTotalDisplay,
                                  currentCurrency
                                )}</span>
                                <button class="remove-from-cart-btn" data-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                                </button>
                            </div>
                        </div>`;
      cartItemsContainerEl.insertAdjacentHTML('beforeend', cartItemHTML);
      totalBaseAmount += item.price * item.quantity;
      itemCount += item.quantity;
    });
  }
  const displayTotal = convertPrice(totalBaseAmount, currentCurrency);
  cartTotalDisplay.textContent = formatPrice(displayTotal, currentCurrency);
  cartItemCountDisplay.textContent = itemCount;
  cartItemCountMobileDisplay.textContent = itemCount;
  document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
    button.addEventListener('click', e => {
      removeFromCart(parseInt(e.currentTarget.dataset.id));
    });
  });
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  updateCart();
}

function openCart() {
  cartSidebarEl.classList.add('open');
  cartOverlayEl.classList.remove('hidden');
  document.body.classList.add('overflow-hidden-custom');
  if (window.innerWidth >= 640) {
    document.body.classList.add('sm-overflow-auto');
  }
}
function closeCart() {
  cartSidebarEl.classList.remove('open');
  cartOverlayEl.classList.add('hidden');
  document.body.classList.remove('overflow-hidden-custom');
  document.body.classList.remove('sm-overflow-auto');
}

function toggleMobileMenu() {
  mobileMenuEl.classList.toggle('hidden');
}

function filterProducts(searchTerm) {
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
  const filtered = lowerCaseSearchTerm
    ? products.filter(p => p.name.toLowerCase().includes(lowerCaseSearchTerm))
    : products;
  renderProducts(filtered);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeIconMoonEl) themeIconMoonEl.classList.add('hidden');
    if (themeIconSunEl) themeIconSunEl.classList.remove('hidden');
    if (themeIconMoonMobileEl) themeIconMoonMobileEl.classList.add('hidden');
    if (themeIconSunMobileEl) themeIconSunMobileEl.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    if (themeIconMoonEl) themeIconMoonEl.classList.remove('hidden');
    if (themeIconSunEl) themeIconSunEl.classList.add('hidden');
    if (themeIconMoonMobileEl) themeIconMoonMobileEl.classList.remove('hidden');
    if (themeIconSunMobileEl) themeIconSunMobileEl.classList.add('hidden');
  }
}
function toggleTheme() {
  const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  if (preloaderEl)
    setTimeout(() => {
      preloaderEl.classList.add('hidden');
    }, 1500);

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  updateCurrency(currentCurrency);

  if (cartIconEl) cartIconEl.addEventListener('click', openCart);
  if (cartIconMobileEl) cartIconMobileEl.addEventListener('click', openCart);
  if (closeCartButtonEl) closeCartButtonEl.addEventListener('click', closeCart);
  if (cartOverlayEl) cartOverlayEl.addEventListener('click', closeCart);
  if (mobileMenuButtonEl) mobileMenuButtonEl.addEventListener('click', toggleMobileMenu);
  if (searchInputDesktopEl)
    searchInputDesktopEl.addEventListener('input', e => filterProducts(e.target.value));
  if (searchInputMobileEl)
    searchInputMobileEl.addEventListener('input', e => filterProducts(e.target.value));
  if (themeToggleEl) themeToggleEl.addEventListener('click', toggleTheme);
  if (themeToggleMobileEl) themeToggleMobileEl.addEventListener('click', toggleTheme);
  if (currencySwitcherDesktop)
    currencySwitcherDesktop.addEventListener('change', e => updateCurrency(e.target.value));
  if (currencySwitcherMobile)
    currencySwitcherMobile.addEventListener('change', e => updateCurrency(e.target.value));

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a.pagelink');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('#') && link.target !== '_blank') {
        if (preloaderEl) preloaderEl.classList.remove('hidden');
      }
    }
  });

  if (footerFormEl) {
    footerFormEl.addEventListener('submit', e => {
      e.preventDefault();
      if (preloaderEl) preloaderEl.classList.remove('hidden');
      setTimeout(() => {
        alert('Thanks for subscribing!');
        if (preloaderEl) preloaderEl.classList.add('hidden');
        footerFormEl.reset();
      }, 1000);
    });
  }

  setupScrollAnimations();
});
