// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
  // Cek apakah ada history sebelumnya
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Jika tidak ada history, bisa redirect ke halaman utama
    alert(
      "Tidak ada halaman sebelumnya. Anda akan diarahkan ke halaman utama."
    );
    // window.location.href = '/'; // Uncomment jika ada halaman utama
  }
}

// Event listener untuk saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Animasi fade in saat halaman dimuat
  const container = document.querySelector(".container");
  container.style.opacity = "0";
  container.style.transform = "translateY(30px)";

  setTimeout(() => {
    container.style.transition = "all 0.8s ease";
    container.style.opacity = "1";
    container.style.transform = "translateY(0)";
  }, 100);

  // Animasi untuk section saat di-hover
  const sections = document.querySelectorAll(".story-section");
  sections.forEach((section) => {
    section.addEventListener("mouseenter", function () {
      this.style.background = "rgba(139, 69, 19, 0.08)";
    });

    section.addEventListener("mouseleave", function () {
      this.style.background = "rgba(139, 69, 19, 0.05)";
    });
  });
});

// Animasi parallax sederhana untuk background
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const header = document.querySelector(".header");
  if (header) {
    header.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Fungsi untuk smooth scroll (opsional)
function smoothScrollTo(targetY, duration = 800) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = new Date().getTime();

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function step() {
    const elapsed = new Date().getTime() - startTime;
    const position = ease(elapsed, startY, distance, duration);

    window.scrollTo(0, position);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  }

  step();
}

// Event listener untuk keyboard navigation
document.addEventListener("keydown", function (event) {
  // ESC key untuk kembali
  if (event.key === "Escape") {
    goBack();
  }

  // Alt + Left Arrow untuk kembali
  if (event.altKey && event.key === "ArrowLeft") {
    event.preventDefault();
    goBack();
  }
});

// Intersection Observer untuk animasi saat scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements saat DOM loaded
document.addEventListener("DOMContentLoaded", function () {
  const elementsToObserve = document.querySelectorAll(
    ".story-section, .sources"
  );
  elementsToObserve.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Fungsi untuk copy link sumber
function copySourceLink(url) {
  navigator.clipboard
    .writeText(url)
    .then(function () {
      // Buat notifikasi sederhana
      const notification = document.createElement("div");
      notification.textContent = "Link berhasil disalin!";
      notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4A2C17;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: opacity 0.3s ease;
        `;

      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 2000);
    })
    .catch(function (err) {
      console.error("Gagal menyalin link: ", err);
    });
}

// Print functionality
function printPage() {
  window.print();
}

// Share functionality (jika diperlukan)
function shareContent() {
  if (navigator.share) {
    navigator.share({
      title: "D'Lingga Coffee - Informasi",
      text: "Informasi lengkap tentang D'Lingga Coffee di Sumedang",
      url: window.location.href,
    });
  } else {
    // Fallback untuk browser yang tidak support Web Share API
    copySourceLink(window.location.href);
  }
}
