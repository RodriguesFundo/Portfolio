const navbar = document.getElementById("navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("back-to-top");
const loadingScreen = document.getElementById("loading-screen");
const typedText = document.getElementById("typed-text");

document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

function initializePortfolio() {
  initNavigation();
  initScrollEffects();
  initTypingAnimation();
  initScrollAnimations();
  initContactForm();
  initParallaxEffects();
  initPreloader();

  addSmoothScrolling();

  initIntersectionObserver();

}

function initPreloader() {
  if (loadingScreen) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }
}

function initNavigation() {
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);
}

function toggleMobileMenu() {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

function closeMobileMenu() {
  navMenu.classList.remove("active");
  navToggle.classList.remove("active");
  document.body.classList.remove("menu-open");
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) {
        navLink.classList.add("active");
      }
    }
  });
}

function initScrollEffects() {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

function handleScroll() {
  const scrollY = window.scrollY;

  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  if (backToTopBtn) {
    if (scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initTypingAnimation() {
  if (!typedText) return;

  const texts = [
    "Desenvolvedor Full Stack",
    "Sistemas de Informação em Saúde",
    "Saúde Digital",
    "Especialista React Native",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeText, typingSpeed);
  }

  setTimeout(typeText, 1000);
}

function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        closeMobileMenu();
      }
    });
  });
}

function initScrollAnimations() {
  const animateElements = document.querySelectorAll(
    ".project-card, .timeline-item, .article-card, .skill-category"
  );

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
  });
}

function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        element.classList.add("animate-in");

        if (
          element.classList.contains("project-card") ||
          element.classList.contains("timeline-item") ||
          element.classList.contains("article-card")
        ) {
          element.classList.add("show");
        }

        if (element.classList.contains("skill-category")) {
          animateSkillBars(element);
        }

        if (element.classList.contains("stat-item")) {
          animateCounter(element);
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  const elementsToObserve = document.querySelectorAll(`
        .project-card, .timeline-item, .article-card, .skill-category,
        .stat-item, .about-text, .contact-info, .hero-content
    `);

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
}

function animateSkillBars(skillCategory) {
  const progressBars = skillCategory.querySelectorAll(".skill-progress-fill");

  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const percentage = bar.dataset.percentage || bar.style.width;
      bar.style.width = percentage;
    }, index * 200);
  });
}

function animateCounter(statItem) {
  const numberElement = statItem.querySelector(".stat-number");
  if (!numberElement) return;

  const finalNumber = numberElement.textContent;
  const isPercentage = finalNumber.includes("%");
  const targetNumber = parseInt(finalNumber.replace(/[^0-9]/g, ""));

  let currentNumber = 0;
  const increment = targetNumber / 50;
  const duration = 2000;
  const stepTime = duration / 50;

  const timer = setInterval(() => {
    currentNumber += increment;

    if (currentNumber >= targetNumber) {
      currentNumber = targetNumber;
      clearInterval(timer);
    }

    numberElement.textContent =
      Math.floor(currentNumber) + (isPercentage ? "%" : "+");
  }, stepTime);
}

function initParallaxEffects() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-particles");

    parallaxElements.forEach((element) => {
      const speed = 0.3;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", handleContactSubmit);

  const formInputs = form.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });
  });
}

async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  try {
    await simulateFormSubmission(formData);

    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    submitBtn.style.background = "var(--accent-color)";
    form.reset();
    showNotification("Mensagem enviada com sucesso!", "success");
  } catch (error) {
    console.error("Form submission error:", error);
    submitBtn.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Erro ao Enviar';
    submitBtn.style.background = "var(--secondary-color)";
    showNotification("Erro ao enviar mensagem. Tente novamente.", "error");
  }

  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.background = "";
  }, 3000);
}

function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve("Success");
      } else {
        reject("Network error");
      }
    }, 2000);
  });
}

function showNotification(message, type = "info") {
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: 8px;
        border-left: 4px solid var(--${
          type === "success" ? "accent" : "secondary"
        }-color);
        box-shadow: var(--shadow-card);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(100%);
        transition: var(--transition-smooth);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledScrollHandler = throttle(handleScroll, 16);
window.addEventListener("scroll", throttledScrollHandler);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeMobileMenu();
  }

  if (e.key === "Enter" && e.target.classList.contains("nav-link")) {
    e.target.click();
  }
});

window.addEventListener("load", function () {
  const loadTime = performance.now();

  if ("web-vital" in window) {
    console.log("Core Web Vitals tracking initialized");
  }
});

window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializePortfolio,
    showNotification,
    debounce,
    throttle,
  };
}
