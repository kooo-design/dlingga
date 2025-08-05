// Global Variables
let cart = [];
let activeSection = "home";
let isMenuOpen = false;

// Animation Variables
let scrollIntervals = {};

// Menu Items Data - Extended for better animation
const menuItems = [
  // Minuman - Coffee
  {
    name: "ES KOPI LINGGA",
    description: "Rich espresso with steamed milk foam",
    price: "Rp18.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/1.jpg",
  },
  {
    name: "BUTTERSCOTH",
    description: "Pure, concentrated coffee shot",
    price: "Rp12.000",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "MOCATELLA",
    description: "Espresso with a dollop of foam",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/1.jpg",
  },
  {
    name: "KIWI BLACK",
    description: "Smooth espresso with steamed milk",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "LEMONADE COFFEE",
    description: "Diluted espresso with hot water",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/1.jpg",
  },
  {
    name: "RED BERRY",
    description: "Espresso with chocolate and steamed milk",
    category: "Minuman",
    subcategory: "Coffee",
    image: "./img/2.jpg",
  },
  // Minuman - Non Coffee
  {
    name: "Matcha Latte",
    description: "Japanese green tea with milk",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "Hot Chocolate",
    description: "Rich hot chocolate drink",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "Lemon Tea",
    description: "Fresh lemon tea",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "Earl Grey Tea",
    description: "Classic Earl Grey black tea",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/1.jpg",
  },
  {
    name: "Chai Latte",
    description: "Spiced tea with steamed milk",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/2.jpg",
  },
  {
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    category: "Minuman",
    subcategory: "Non Coffee",
    image: "./img/1.jpg",
  },
  // Makanan
  {
    name: "Croissant",
    description: "Buttery flaky French pastry",
    category: "Makanan",
    image: "./img/2.jpg",
  },
  {
    name: "Banana Bread",
    description: "Moist banana bread with nuts",
    category: "Makanan",
    image: "./img/2.jpg",
  },
  {
    name: "Club Sandwich",
    description: "Fresh sandwich with vegetables and meat",
    category: "Makanan",
    image: "./img/2.jpg",
  },
  {
    name: "Blueberry Muffin",
    description: "Fresh baked muffin with blueberries",
    category: "Makanan",
    image: "./img/1.jpg",
  },
  {
    name: "Avocado Toast",
    description: "Toasted bread with fresh avocado",
    category: "Makanan",
    image: "./img/2.jpg",
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake slice",
    category: "Makanan",
    image: "./img/1.jpg",
  },
];

// Animation Functions
function startAutoScroll(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Stop any existing animation for this container
  stopAutoScroll(containerId);

  scrollIntervals[containerId] = setInterval(() => {
    const scrollAmount = 1; // Pixels per frame
    const itemWidth = container.querySelector(".menu-item")?.offsetWidth || 270;
    const gap = 20; // Gap between items
    const singleSetWidth = itemWidth + gap;

    // Get original items count
    const originalItemsCount = getOriginalItemsCount(containerId);
    const resetPoint = singleSetWidth * originalItemsCount;

    if (container.scrollLeft >= resetPoint) {
      // Seamlessly reset to beginning of second set
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += scrollAmount;
    }
  }, 20); // 50fps animation
}

function getOriginalItemsCount(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return 0;

  // Count items based on container type
  if (containerId === "coffee-menu") {
    return menuItems.filter(
      (item) => item.category === "Minuman" && item.subcategory === "Coffee"
    ).length;
  } else if (containerId === "non-coffee-menu") {
    return menuItems.filter(
      (item) => item.category === "Minuman" && item.subcategory === "Non Coffee"
    ).length;
  } else if (containerId === "food-menu") {
    return menuItems.filter((item) => item.category === "Makanan").length;
  }
  return 0;
}

function stopAutoScroll(containerId) {
  if (scrollIntervals[containerId]) {
    clearInterval(scrollIntervals[containerId]);
    delete scrollIntervals[containerId];
  }
}

function pauseAutoScroll(containerId) {
  stopAutoScroll(containerId);
}

function resumeAutoScroll(containerId) {
  startAutoScroll(containerId);
}

function initMenuAnimations() {
  const menuContainers = ["coffee-menu", "non-coffee-menu", "food-menu"];

  menuContainers.forEach((containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Start auto scroll
    startAutoScroll(containerId);

    // Pause on hover
    container.addEventListener("mouseenter", () => {
      pauseAutoScroll(containerId);
    });

    // Resume on mouse leave
    container.addEventListener("mouseleave", () => {
      resumeAutoScroll(containerId);
    });

    // Pause on touch start (mobile)
    container.addEventListener("touchstart", () => {
      pauseAutoScroll(containerId);
    });

    // Resume after touch end with delay (mobile)
    container.addEventListener("touchend", () => {
      setTimeout(() => {
        resumeAutoScroll(containerId);
      }, 2000); // Resume after 2 seconds
    });
  });
}

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

// Helper function to duplicate menu items for smooth scrolling
function duplicateMenuItems(items, multiplier = 3) {
  const duplicated = [];
  for (let i = 0; i < multiplier; i++) {
    duplicated.push(...items);
  }
  return duplicated;
}

// Render Menu Items
function renderMenuItems() {
  // Coffee items
  const coffeeMenu = document.getElementById("coffee-menu");
  const coffeeItems = menuItems.filter(
    (item) => item.category === "Minuman" && item.subcategory === "Coffee"
  );

  // Duplicate items for smooth infinite scroll
  const duplicatedCoffeeItems = duplicateMenuItems(coffeeItems, 4);

  coffeeMenu.innerHTML = duplicatedCoffeeItems
    .map(
      (item, index) => `
      <div class="menu-item" data-original-index="${
        index % coffeeItems.length
      }">
          <div class="menu-item-image">
            ${
              item.image
                ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:16px;">`
                : "☕"
            }
          </div>
          <h3 class="menu-item-name">${item.name}</h3>
          <p class="menu-item-description">${item.description}</p>
          <div class="menu-item-footer">
              <!-- Harga dihapus -->
          </div>
      </div>
  `
    )
    .join("");

  // Non-coffee and Food items as 2-column carded list
  const nonCoffeeMenu = document.getElementById("non-coffee-menu");
  const foodMenu = document.getElementById("food-menu");
  const nonCoffeeItems = menuItems.filter(
    (item) => item.category === "Minuman" && item.subcategory === "Non Coffee"
  );
  const foodItems = menuItems.filter((item) => item.category === "Makanan");

  // Gabungkan dalam satu card dua kolom
  const menuListCard = `
  <div class="menu-list-card">
    <div class="menu-list-col">
      <h4 class="menu-list-title">Minuman Non-Coffee</h4>
      <ul class="menu-list">
        ${nonCoffeeItems
          .map(
            (item) => `
          <li class="menu-list-item">
            <span class="menu-item-name">${item.name}</span>
            <span class="menu-item-description">${item.description}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
    <div class="menu-list-col">
      <h4 class="menu-list-title">Makanan</h4>
      <ul class="menu-list">
        ${foodItems
          .map(
            (item) => `
          <li class="menu-list-item">
            <span class="menu-item-name">${item.name}</span>
            <span class="menu-item-description">${item.description}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  </div>
`;

  // Tampilkan card pada salah satu container, kosongkan yang lain
  nonCoffeeMenu.innerHTML = menuListCard;
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

  // Initialize menu animations
  setTimeout(() => {
    initMenuAnimations();
  }, 100); // Small delay to ensure DOM is fully rendered

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
    const email = document.getElementById("email-input").value;
    const subject = encodeURIComponent(
      "Newsletter Subscription Dlingga Coffee"
    );
    const body = encodeURIComponent("Email subscriber: " + email);
    window.location.href = `mailto:agungfirdaus@gmail.com?subject=${subject}&body=${body}`;
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

  // Handle page visibility change
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Pause all animations when page is not visible
      Object.keys(scrollIntervals).forEach((containerId) => {
        stopAutoScroll(containerId);
      });
    } else {
      // Resume animations when page becomes visible
      setTimeout(() => {
        initMenuAnimations();
      }, 100);
    }
  });
});
