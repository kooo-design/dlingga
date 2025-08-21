// Global Variables
let cart = [];
let activeSection = "home";
let isMenuOpen = false;

// Menu Items Data
const menuItems = [
  // Minuman - Coffee
  {
    name: "ES KOPI LINGGA",
    price: "Rp18.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/ice.png",
  },
  {
    name: "BUTTERSCOTCH",
    price: "Rp12.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/butter.png",
  },
  {
    name: "MOCATELLA",
    price: "Rp16.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/tella.jpg",
  },
  {
    name: "KIWI BLACK",
    price: "Rp20.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/kiwi.jpg",
  },
  {
    name: "LEMONADE COFFEE",
    price: "Rp16.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/lemonade.jpg",
  },
  {
    name: "RED BERRY",
    price: "Rp20.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/berry.jpg",
  },
  // Minuman - Non Coffee
  {
    name: "Matcha Latte",
    price: "Rp22.000",
    category: "Minuman",
    subcategory: "Non Coffee",
  },
  {
    name: "Chocolate",
    price: "Rp18.000",
    category: "Minuman",
    subcategory: "Non Coffee",
  },
  {
    name: "Lemon Tea",
    price: "Rp15.000",
    category: "Minuman",
    subcategory: "Non Coffee",
  },
  // Makanan
  {
    name: "Croissant",
    price: "Rp15.000",
    category: "Makanan",
  },
  {
    name: "Banana Bread",
    price: "Rp14.000",
    category: "Makanan",
  },
  {
    name: "Sandwich",
    price: "Rp22.000",
    category: "Makanan",
  },
];

// Utility Functions
function getPriceNumber(priceStr) {
  return Number(priceStr.replace(/[^0-9]/g, ""));
}

function formatRupiah(angka) {
  return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getCartItemQty(coffeeName) {
  const found = cart.find((item) => item.name === coffeeName);
  return found ? found.qty : 0;
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  closeMobileMenu();
}

function closeMobileMenu() {
  isMenuOpen = false;
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");
  mobileMenu.classList.remove("show");
  hamburger.classList.remove("active");
}

// Cart Functions
function addToCart(coffee) {
  const found = cart.find((item) => item.name === coffee.name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ ...coffee, qty: 1 });
  }
  updateCartDisplay();
  updateMenuQuantities();
  showCartModal();
}

function decreaseQty(coffee) {
  const found = cart.find((item) => item.name === coffee.name);
  if (found && found.qty > 1) {
    found.qty -= 1;
  } else if (found) {
    cart = cart.filter((item) => item.name !== coffee.name);
  }
  updateCartDisplay();
  updateMenuQuantities();
}

function updateCartDisplay() {
  const cartBadge = document.getElementById("cart-badge");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Update badge
  if (cart.length > 0) {
    cartBadge.textContent = cart.length;
    cartBadge.classList.remove("hidden");
  } else {
    cartBadge.classList.add("hidden");
  }

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Keranjang kosong.</p>";
    cartTotal.innerHTML = "";
  } else {
    cartItems.innerHTML = cart
      .map(
        (item, idx) => `
            <div class="cart-item">
                <span>${item.name} x ${item.qty}</span>
                <span>${formatRupiah(
                  getPriceNumber(item.price) * item.qty
                )}</span>
            </div>
        `
      )
      .join("");

    const total = cart.reduce(
      (sum, item) => sum + getPriceNumber(item.price) * item.qty,
      0
    );
    cartTotal.innerHTML = `Total: ${formatRupiah(total)}`;
  }
}

function updateMenuQuantities() {
  const quantityDisplays = document.querySelectorAll(".quantity-display");
  quantityDisplays.forEach((display) => {
    const itemName = display.dataset.item;
    display.textContent = getCartItemQty(itemName);
  });

  // Update decrease button states
  const decreaseBtns = document.querySelectorAll(".quantity-btn:not(.add)");
  decreaseBtns.forEach((btn) => {
    const itemName = btn.dataset.item;
    btn.disabled = getCartItemQty(itemName) === 0;
  });
}

function showCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.add("show");
}

function hideCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.classList.remove("show");
}

function printReceipt() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let receipt = "=== Dlingga Coffee Receipt ===\n\n";
  cart.forEach((item, idx) => {
    receipt += `${idx + 1}. ${item.name} x ${item.qty} - ${formatRupiah(
      getPriceNumber(item.price) * item.qty
    )}\n`;
  });

  const total = cart.reduce(
    (sum, item) => sum + getPriceNumber(item.price) * item.qty,
    0
  );
  receipt += `\nTotal: ${formatRupiah(total)}`;
  receipt += "\n\nThank you for your order!";

  alert(receipt);
}

// Render Menu Items
function renderMenuItems() {
  // Coffee items
  const coffeeMenu = document.getElementById("coffee-menu");
  const coffeeItems = menuItems.filter(
    (item) => item.category === "Minuman" && item.subcategory === "Coffee"
  );
  const infiniteCoffeeItems = [...coffeeItems, ...coffeeItems];

  coffeeMenu.innerHTML = infiniteCoffeeItems
    .map(
      (item, index) => `
      <div class="menu-item" data-original-index="${
        index % coffeeItems.length
      }">
        <div class="menu-item-image">
          ${
            item.image
              ? `<img src="${item.image}" alt="${item.name}" loading="lazy">`
              : `<div style="width:100%;height:100%;background:#8B4513;border-radius:32px;display:flex;align-items:center;justify-content:center;color:white;font-size:48px;">☕</div>`
          }
        </div>
        <h3 class="menu-item-name">${item.name}</h3>
      </div>
    `
    )
    .join("");

  // Non Coffee & Makanan in one card as list
  const nonCoffeeMenu = document.getElementById("non-coffee-menu");
  nonCoffeeMenu.innerHTML = `
  <div class="menu-item menu-item-list" style="justify-content:center;align-items:center;min-height:unset;">
    <a href="https://drive.google.com/file/d/182RcGG46QSnt-v8Ms8cv95KqJRNDTjkR/view" target="_blank" rel="noopener" class="menu-link-btn">
      Lihat Menu Lengkap Lainnya
    </a>
  </div>
`;

  // Kosongkan foodMenu agar tidak double
  const foodMenu = document.getElementById("food-menu");
  foodMenu.innerHTML = "";
}

// Handle scroll for active navigation
function handleScroll() {
  const sections = ["home", "about", "menu", "features"];
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      const { offsetTop, offsetHeight } = element;
      if (
        scrollPosition >= offsetTop &&
        scrollPosition < offsetTop + offsetHeight
      ) {
        activeSection = section;
        updateActiveNavigation();
      }
    }
  });
}

function updateActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const target = link.getAttribute("data-target");
    if (target === activeSection) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Render menu items
  renderMenuItems();
  updateCartDisplay();

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenuBtn.addEventListener("click", function () {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.add("show");
      hamburger.classList.add("active");
    } else {
      mobileMenu.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });

  // Navigation links
  const navLinks = document.querySelectorAll(
    ".nav-link, .nav-cta, .hero-btn, .about-btn, .cta-btn"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      if (target) {
        scrollToSection(target);
      }
    });
  });

  // Cart button
  const cartBtn = document.getElementById("cart-btn");
  cartBtn.addEventListener("click", function () {
    const cartModal = document.getElementById("cart-modal");
    if (cartModal.classList.contains("show")) {
      hideCartModal();
    } else {
      showCartModal();
    }
  });

  // Cart close button
  const closeCartBtn = document.getElementById("close-cart-btn");
  closeCartBtn.addEventListener("click", hideCartModal);

  // Print receipt button
  const printBtn = document.getElementById("print-btn");
  printBtn.addEventListener("click", printReceipt);

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email-input");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    emailInput.value = "";
  });

  // Scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Close cart modal when clicking outside
  document.addEventListener("click", function (e) {
    const cartModal = document.getElementById("cart-modal");
    const cartBtn = document.getElementById("cart-btn");

    if (!cartModal.contains(e.target) && !cartBtn.contains(e.target)) {
      hideCartModal();
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });

  // Testimonial Carousel
  const carousel = document.getElementById("testimonial-carousel");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  const currentEl = document.getElementById("testimonial-current");
  const totalEl = document.getElementById("testimonial-total");

  if (carousel && prevBtn && nextBtn && currentEl && totalEl) {
    const cards = carousel.querySelectorAll(".testimonial-card");
    let current = 0;
    const total = cards.length;
    totalEl.textContent = total;

    function updateCarousel() {
      carousel.style.transform = `translateX(-${current * 100}%)`;
      currentEl.textContent = current + 1;
    }

    prevBtn.addEventListener("click", function () {
      current = (current - 1 + total) % total;
      updateCarousel();
    });

    nextBtn.addEventListener("click", function () {
      current = (current + 1) % total;
      updateCarousel();
    });

    // Optional: swipe support for mobile
    let startX = null;
    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    carousel.addEventListener("touchend", (e) => {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) prevBtn.click();
      else if (startX - endX > 50) nextBtn.click();
      startX = null;
    });

    updateCarousel();
  }
});
