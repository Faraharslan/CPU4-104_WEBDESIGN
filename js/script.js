/*
  NovaVolt Electronics
  Student: Farah Arslan | CPU4104 Web Development

  This single JavaScript file supplies the product data and all page
  interactivity. It uses standard DOM methods only - no framework or library.
*/

"use strict";

const PRODUCTS = [
  {
    id: 1,
    name: "AirOne Smartphone",
    category: "Smartphones",
    price: 599,
    image: "../media/images/smartphone.svg",
    badge: "Popular",
    featured: true,
    summary: "A bright 6.4-inch phone with all-day battery life.",
    description: "AirOne combines a clear OLED display, dependable battery and simple dual-camera system in a lightweight design made for everyday use.",
    features: ["6.4-inch OLED display", "128 GB storage", "48 MP main camera", "Up to 30 hours battery"]
  },
  {
    id: 2,
    name: "SlateBook 14 Laptop",
    category: "Laptops",
    price: 849,
    image: "../media/images/laptop.svg",
    badge: "New",
    featured: true,
    summary: "A slim 14-inch laptop for study, work and streaming.",
    description: "SlateBook 14 balances useful performance with a comfortable keyboard, sharp screen and light body that is easy to carry.",
    features: ["14-inch Full HD display", "16 GB memory", "512 GB solid-state drive", "Up to 12 hours battery"]
  },
  {
    id: 3,
    name: "EchoBuds Pro",
    category: "Audio",
    price: 89,
    image: "../media/images/earbuds.svg",
    badge: "Best value",
    featured: true,
    summary: "Wireless earbuds with clear calls and noise control.",
    description: "EchoBuds Pro offer balanced sound, active noise control and a compact charging case for commuting, exercise and calls.",
    features: ["Active noise control", "Six hours per charge", "Pocket charging case", "Sweat-resistant design"]
  },
  {
    id: 4,
    name: "PulseWatch S2",
    category: "Wearables",
    price: 179,
    image: "../media/images/smartwatch.svg",
    badge: "Staff pick",
    featured: true,
    summary: "A simple smartwatch for activity, sleep and messages.",
    description: "PulseWatch S2 keeps useful information on your wrist, with clear health summaries and up to seven days between charges.",
    features: ["Heart-rate tracking", "Sleep summaries", "Message notifications", "Seven-day battery"]
  },
  {
    id: 5,
    name: "ViewTab 11",
    category: "Tablets",
    price: 329,
    image: "../media/images/tablet.svg",
    badge: "",
    featured: false,
    summary: "An 11-inch tablet for reading, video and note-taking.",
    description: "ViewTab 11 has a bright screen, stereo speakers and enough storage for everyday learning and entertainment.",
    features: ["11-inch display", "128 GB storage", "Stereo speakers", "Optional pen support"]
  },
  {
    id: 6,
    name: "ClickPro Wireless Mouse",
    category: "Accessories",
    price: 39,
    image: "../media/images/mouse.svg",
    badge: "",
    featured: false,
    summary: "A quiet, comfortable mouse with two connection modes.",
    description: "ClickPro is shaped for long sessions and can switch between Bluetooth and its included USB receiver.",
    features: ["Bluetooth and USB receiver", "Quiet buttons", "Adjustable pointer speed", "Up to 18 months battery"]
  },
  {
    id: 7,
    name: "KeyWave Mechanical Keyboard",
    category: "Accessories",
    price: 74,
    image: "../media/images/keyboard.svg",
    badge: "",
    featured: false,
    summary: "A compact mechanical keyboard with soft backlighting.",
    description: "KeyWave saves desk space while keeping dedicated arrow keys, comfortable switches and adjustable white backlighting.",
    features: ["Compact 75% layout", "Tactile key switches", "White backlight", "Detachable USB-C cable"]
  },
  {
    id: 8,
    name: "SonicArc Headset",
    category: "Audio",
    price: 109,
    image: "../media/images/headset.svg",
    badge: "Immersive",
    featured: false,
    summary: "Comfortable over-ear audio with a removable microphone.",
    description: "SonicArc delivers spacious sound for games and films, with soft ear cushions and a microphone that can be removed for music.",
    features: ["Over-ear memory foam", "Removable microphone", "USB-C wireless receiver", "Up to 28 hours battery"]
  },
  {
    id: 9,
    name: "PocketCharge 20K",
    category: "Power",
    price: 49,
    image: "../media/images/powerbank.svg",
    badge: "",
    featured: false,
    summary: "A 20,000 mAh portable charger with fast USB-C output.",
    description: "PocketCharge keeps phones and tablets running on longer days and displays the remaining battery as a clear percentage.",
    features: ["20,000 mAh capacity", "Fast USB-C charging", "Two-device output", "Battery percentage display"]
  },
  {
    id: 10,
    name: "Beam Mini Speaker",
    category: "Audio",
    price: 64,
    image: "../media/images/speaker.svg",
    badge: "",
    featured: false,
    summary: "A compact waterproof speaker with room-filling sound.",
    description: "Beam Mini is easy to carry, simple to pair and protected from splashes for listening indoors or outside.",
    features: ["Water-resistant design", "Twelve-hour battery", "Bluetooth pairing", "Pair two speakers together"]
  },
  {
    id: 11,
    name: "ClearCam 1080",
    category: "Accessories",
    price: 55,
    image: "../media/images/webcam.svg",
    badge: "",
    featured: false,
    summary: "A Full HD webcam with automatic light adjustment.",
    description: "ClearCam 1080 improves video calls with a sharp picture, dual microphones and a built-in privacy cover.",
    features: ["1080p Full HD video", "Dual microphones", "Automatic light correction", "Sliding privacy cover"]
  },
  {
    id: 12,
    name: "SwiftDrive 1 TB SSD",
    category: "Storage",
    price: 94,
    image: "../media/images/ssd.svg",
    badge: "Fast storage",
    featured: false,
    summary: "Pocket-sized external storage for files and backups.",
    description: "SwiftDrive transfers large folders quickly and uses a durable aluminium body that fits easily into a bag.",
    features: ["1 TB capacity", "USB-C connection", "Up to 1,000 MB/s", "Aluminium case"]
  }
];

const CART_STORAGE_KEY = "novavoltCart";
const ANALYTICS_STORAGE_KEY = "novavoltPageViews";
let toastTimer;

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  updateCurrentYear();
  updateCartCount();
  recordPageView();

  const page = document.body.dataset.page;

  if (page === "home") {
    renderFeaturedProducts();
    setupNewsletterForm();
  }

  if (page === "products") {
    setupProductListing();
  }

  if (page === "product-detail") {
    renderProductDetail();
  }

  if (page === "cart") {
    renderCart();
    setupCheckoutForm();
  }

  if (page === "contact") {
    setupContactForm();
  }
});

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  if (!toggle || !navigation) return;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    const label = toggle.querySelector(".sr-only");
    if (label) label.textContent = "Open navigation menu";
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
    const label = toggle.querySelector(".sr-only");
    if (label) label.textContent = isOpen ? "Open navigation menu" : "Close navigation menu";
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 920) closeMenu();
  });
}

function updateCurrentYear() {
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP"
  }).format(value);
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.productId = String(product.id);

  card.innerHTML = `
    <a class="product-card-image" href="product.html?id=${product.id}" tabindex="-1" aria-hidden="true">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <img src="${product.image}" width="800" height="600" alt="">
    </a>
    <div class="product-card-body">
      <p class="product-category">${product.category}</p>
      <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
      <p class="product-summary">${product.summary}</p>
      <div class="product-card-footer">
        <span class="product-price">${formatMoney(product.price)}</span>
        <button class="card-button" type="button" data-add-product="${product.id}" aria-label="Add ${product.name} to cart">Add to cart</button>
      </div>
    </div>
  `;

  card.querySelector("[data-add-product]").addEventListener("click", () => {
    addToCart(product.id);
  });

  return card;
}

function renderFeaturedProducts() {
  const container = document.querySelector("#featuredProducts");
  if (!container) return;

  PRODUCTS.filter((product) => product.featured)
    .slice(0, 4)
    .forEach((product) => container.append(createProductCard(product)));
}

function setupProductListing() {
  const grid = document.querySelector("#productGrid");
  const search = document.querySelector("#productSearch");
  const category = document.querySelector("#categoryFilter");
  const sort = document.querySelector("#sortProducts");
  const clear = document.querySelector("#clearFilters");
  const results = document.querySelector("#resultsCount");
  const empty = document.querySelector("#noProducts");

  if (!grid || !search || !category || !sort || !clear || !results || !empty) return;

  const requestedCategory = new URLSearchParams(window.location.search).get("category");
  const validCategory = [...category.options].some((option) => option.value === requestedCategory);
  if (requestedCategory && validCategory) category.value = requestedCategory;

  function renderProducts() {
    const searchTerm = search.value.trim().toLowerCase();
    let filtered = PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.summary.toLowerCase().includes(searchTerm);
      const matchesCategory = category.value === "All" || product.category === category.value;
      return matchesSearch && matchesCategory;
    });

    if (sort.value === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort.value === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sort.value === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

    grid.replaceChildren();
    filtered.forEach((product) => grid.append(createProductCard(product)));

    results.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "product" : "products"}`;
    empty.hidden = filtered.length !== 0;
    grid.hidden = filtered.length === 0;
  }

  search.addEventListener("input", renderProducts);
  category.addEventListener("change", renderProducts);
  sort.addEventListener("change", renderProducts);
  clear.addEventListener("click", () => {
    search.value = "";
    category.value = "All";
    sort.value = "featured";
    window.history.replaceState({}, "", "products.html");
    renderProducts();
    search.focus();
  });

  renderProducts();
}

function renderProductDetail() {
  const container = document.querySelector("#productDetail");
  const breadcrumb = document.querySelector("#breadcrumbProduct");
  if (!container) return;

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h1>Product not found</h1>
        <p>The product link may be incorrect or no longer available.</p>
        <a class="button button-primary" href="products.html">Return to products</a>
      </div>
    `;
    return;
  }

  document.title = `${product.name} | NovaVolt Electronics`;
  if (breadcrumb) breadcrumb.textContent = product.name;

  const features = product.features.map((feature) => `<li>${feature}</li>`).join("");

  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image">
        <img src="${product.image}" width="800" height="600" alt="${product.name}">
      </div>
      <div class="product-detail-copy">
        <p class="detail-category">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="detail-price">${formatMoney(product.price)}</p>
        <p class="detail-description">${product.description}</p>
        <h2 class="sr-only">Key features</h2>
        <ul class="feature-list">${features}</ul>
        <div class="detail-actions">
          <button class="button button-primary" type="button" data-detail-add>Add to cart</button>
          <a class="button button-dark" href="cart.html">View cart</a>
        </div>
        <p class="stock-note">✓ In stock and ready for demo delivery</p>
      </div>
    </div>
  `;

  container.querySelector("[data-detail-add]").addEventListener("click", () => {
    addToCart(product.id);
  });
}

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    if (!Array.isArray(stored)) return [];

    return stored
      .filter((item) => PRODUCTS.some((product) => product.id === Number(item.id)))
      .map((item) => ({
        id: Number(item.id),
        quantity: Math.min(10, Math.max(1, Number(item.quantity) || 1))
      }));
  } catch (error) {
    console.warn("The saved cart could not be read and was reset.", error);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("The cart could not be saved in this browser.", error);
  }
  updateCartCount();
}

function addToCart(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  const cart = readCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity = Math.min(10, existing.quantity + 1);
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart(cart);
  showToast(`${product.name} was added to your cart.`);
}

function updateCartCount() {
  const count = readCart().reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = String(count);
  });

  document.querySelectorAll(".cart-link").forEach((link) => {
    link.setAttribute("aria-label", `Shopping cart with ${count} ${count === 1 ? "item" : "items"}`);
  });
}

function renderCart() {
  const emptyState = document.querySelector("#cartEmpty");
  const content = document.querySelector("#cartContent");
  const itemsContainer = document.querySelector("#cartItems");
  const subtotalElement = document.querySelector("#cartSubtotal");
  const deliveryElement = document.querySelector("#deliveryCost");
  const totalElement = document.querySelector("#cartTotal");

  if (!emptyState || !content || !itemsContainer || !subtotalElement || !deliveryElement || !totalElement) return;

  const cart = readCart();
  emptyState.hidden = cart.length !== 0;
  content.hidden = cart.length === 0;
  itemsContainer.replaceChildren();

  if (cart.length === 0) return;

  let subtotal = 0;

  cart.forEach((cartItem) => {
    const product = PRODUCTS.find((item) => item.id === cartItem.id);
    if (!product) return;

    subtotal += product.price * cartItem.quantity;
    const item = document.createElement("article");
    item.className = "cart-item";
    item.dataset.cartItem = String(product.id);
    item.innerHTML = `
      <a class="cart-item-image" href="product.html?id=${product.id}" tabindex="-1" aria-hidden="true">
        <img src="${product.image}" width="800" height="600" alt="">
      </a>
      <div class="cart-item-main">
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <p class="cart-item-category">${product.category}</p>
        <div class="cart-item-actions">
          <div>
            <div class="quantity-control" aria-label="Quantity for ${product.name}">
              <button type="button" data-cart-action="decrease" aria-label="Decrease ${product.name} quantity">−</button>
              <span aria-live="polite">${cartItem.quantity}</span>
              <button type="button" data-cart-action="increase" aria-label="Increase ${product.name} quantity">+</button>
            </div>
            <button class="remove-button" type="button" data-cart-action="remove">Remove</button>
          </div>
          <span class="cart-item-price">${formatMoney(product.price * cartItem.quantity)}</span>
        </div>
      </div>
    `;
    itemsContainer.append(item);
  });

  const delivery = subtotal >= 50 ? 0 : 4.99;
  subtotalElement.textContent = formatMoney(subtotal);
  deliveryElement.textContent = delivery === 0 ? "Free" : formatMoney(delivery);
  totalElement.textContent = formatMoney(subtotal + delivery);

  itemsContainer.querySelectorAll("[data-cart-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemElement = button.closest("[data-cart-item]");
      const productId = Number(itemElement.dataset.cartItem);
      updateCartItem(productId, button.dataset.cartAction);
    });
  });
}

function updateCartItem(productId, action) {
  const cart = readCart();
  const item = cart.find((cartItem) => cartItem.id === productId);
  const product = PRODUCTS.find((productItem) => productItem.id === productId);
  if (!item || !product) return;

  if (action === "increase") item.quantity = Math.min(10, item.quantity + 1);
  if (action === "decrease") item.quantity -= 1;

  const updatedCart =
    action === "remove" || item.quantity < 1
      ? cart.filter((cartItem) => cartItem.id !== productId)
      : cart;

  saveCart(updatedCart);
  renderCart();

  if (action === "remove" || item.quantity < 1) {
    showToast(`${product.name} was removed from your cart.`);
  }
}

function setupCheckoutForm() {
  const form = document.querySelector("#checkoutForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (readCart().length === 0) {
      showFormMessage(form, "Your cart is empty. Add a product before checking out.", false);
      return;
    }

    if (!validateForm(form)) return;

    const name = form.elements.name.value.trim().split(" ")[0];
    showFormMessage(form, `Thank you, ${name}. Your demonstration order was placed successfully.`, true);
    saveCart([]);
    form.reset();
    window.setTimeout(renderCart, 1600);
  });
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(form)) return;

    const name = form.elements.name.value.trim().split(" ")[0];
    showFormMessage(form, `Thank you, ${name}. Your demonstration message has been checked and accepted.`, true);
    form.reset();
    clearFormErrors(form);
  });
}

function setupNewsletterForm() {
  const form = document.querySelector("#newsletterForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.elements.email;

    if (!email.validity.valid) {
      showFormMessage(form, "Please enter a valid email address.", false);
      email.focus();
      return;
    }

    showFormMessage(form, "You have joined the demonstration updates list.", true);
    form.reset();
  });
}

function validateForm(form) {
  clearFormErrors(form);
  const fields = [...form.querySelectorAll("input[required], select[required], textarea[required]")];
  let firstInvalid = null;

  fields.forEach((field) => {
    let message = "";
    const value = field.type === "checkbox" ? field.checked : field.value.trim();

    if (!value) {
      message = field.type === "checkbox" ? "Please confirm this statement." : "This field is required.";
    } else if (field.type === "email" && !field.validity.valid) {
      message = "Enter a valid email address.";
    } else if (field.minLength > 0 && typeof value === "string" && value.length < field.minLength) {
      message = `Enter at least ${field.minLength} characters.`;
    } else if (field.name === "postcode" && !/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(value)) {
      message = "Enter a valid UK postcode, for example RM8 1XE.";
    }

    if (message) {
      field.setAttribute("aria-invalid", "true");
      const error = form.querySelector(`[data-error-for="${field.id}"]`);
      if (error) {
        error.textContent = message;
        if (!error.id) error.id = `${field.id}Error`;
        field.setAttribute("aria-describedby", `${field.getAttribute("aria-describedby") || ""} ${error.id}`.trim());
      }
      if (!firstInvalid) firstInvalid = field;
    }
  });

  if (firstInvalid) {
    showFormMessage(form, "Please correct the highlighted information.", false);
    firstInvalid.focus();
    return false;
  }

  return true;
}

function clearFormErrors(form) {
  form.querySelectorAll("[aria-invalid='true']").forEach((field) => {
    field.removeAttribute("aria-invalid");
  });
  form.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}

function showFormMessage(form, message, isSuccess) {
  const messageElement = form.querySelector("[data-form-message]");
  if (!messageElement) return;

  messageElement.textContent = message;
  messageElement.classList.toggle("is-success", isSuccess);
  messageElement.classList.toggle("is-error", !isSuccess);
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;

  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function recordPageView() {
  /*
    This is a small local analytics demonstration for the coursework.
    It records only a page name and count in this browser. No data is sent.
  */
  try {
    const views = JSON.parse(localStorage.getItem(ANALYTICS_STORAGE_KEY)) || {};
    const pageName = document.body.dataset.page || "unknown";
    views[pageName] = (views[pageName] || 0) + 1;
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(views));
  } catch (error) {
    console.warn("Local page-view tracking is unavailable.", error);
  }
}
