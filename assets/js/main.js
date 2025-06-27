// ==============================================
// MAIN.JS - PORTFOLIO FUNCTIONALITY
// ==============================================

// DOM Elements
const navbar = document.getElementById("navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const backToTopBtn = document.getElementById("back-to-top");
const loadingScreen = document.getElementById("loading-screen");
const typedText = document.getElementById("typed-text");
const contactForm = document.getElementById("contact-form");

// ==============================================
// INITIALIZATION
// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

function initializePortfolio() {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initTypingAnimation();
  initScrollAnimations();
  initContactForm();
  initParallaxEffects();
  initPreloader();

  // Add smooth scrolling for all anchor links
  addSmoothScrolling();

  // Initialize intersection observer for animations
  initIntersectionObserver();

  console.log("Portfolio initialized successfully!");
}

// ==============================================
// PRELOADER
// ==============================================

function initPreloader() {
  if (loadingScreen) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";

        // Remove from DOM after animation
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }
}

// ==============================================
// NAVIGATION
// ==============================================

function initNavigation() {
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Active link highlighting
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

// ==============================================
// SCROLL EFFECTS
// ==============================================

function initScrollEffects() {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run once on load
}

function handleScroll() {
  const scrollY = window.scrollY;

  // Navbar background on scroll
  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Back to top button
  if (backToTopBtn) {
    if (scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  // Parallax effect for hero section
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
  }
}

// Back to top functionality
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==============================================
// TYPING ANIMATION
// ==============================================

function initTypingAnimation() {
  if (!typedText) return;

  const texts = [
    "Desenvolvedor Mobile",
    "Especialista React Native",
    "Desenvolvedor Full Stack",
    "Apaixonado por Tecnologia",
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
      // Pause before deleting
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeText, typingSpeed);
  }

  // Start typing animation
  setTimeout(typeText, 1000);
}

// ==============================================
// SMOOTH SCROLLING
// ==============================================

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

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// ==============================================
// SCROLL ANIMATIONS
// ==============================================

function initScrollAnimations() {
  // Animate elements on scroll
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

        // Add animation class
        element.classList.add("animate-in");

        // Add show class for specific elements
        if (
          element.classList.contains("project-card") ||
          element.classList.contains("timeline-item") ||
          element.classList.contains("article-card")
        ) {
          element.classList.add("show");
        }

        // Animate skill progress bars
        if (element.classList.contains("skill-category")) {
          animateSkillBars(element);
        }

        // Animate counters
        if (element.classList.contains("stat-item")) {
          animateCounter(element);
        }

        observer.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  const elementsToObserve = document.querySelectorAll(`
        .project-card, .timeline-item, .article-card, .skill-category,
        .stat-item, .about-text, .contact-info, .hero-content
    `);

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
}

// ==============================================
// SKILL BARS ANIMATION
// ==============================================

function animateSkillBars(skillCategory) {
  const progressBars = skillCategory.querySelectorAll(".skill-progress-fill");

  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const percentage = bar.dataset.percentage || bar.style.width;
      bar.style.width = percentage;
    }, index * 200);
  });
}

// ==============================================
// COUNTER ANIMATION
// ==============================================

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

// ==============================================
// PARALLAX EFFECTS
// ==============================================

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

// ==============================================
// CONTACT FORM
// ==============================================

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", handleContactSubmit);

  // Add input animations
  const formInputs = contactForm.querySelectorAll("input, textarea");
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

  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  try {
    // Simulate form submission (replace with your actual endpoint)
    await simulateFormSubmission(formData);

    // Success state
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
    submitBtn.style.background = "var(--accent-color)";

    // Reset form
    contactForm.reset();

    // Show success message
    showNotification("Mensagem enviada com sucesso!", "success");
  } catch (error) {
    console.error("Form submission error:", error);

    // Error state
    submitBtn.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Erro ao Enviar';
    submitBtn.style.background = "var(--secondary-color)";

    // Show error message
    showNotification("Erro ao enviar mensagem. Tente novamente.", "error");
  }

  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.background = "";
  }, 3000);
}

// Simulate form submission (replace with actual implementation)
function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail for demo
      if (Math.random() > 0.2) {
        resolve("Success");
      } else {
        reject("Network error");
      }
    }, 2000);
  });
}

// ==============================================
// NOTIFICATIONS
// ==============================================

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
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

  // Add styles
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

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto close after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ==============================================
// UTILITIES
// ==============================================

// Debounce function for performance
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

// Throttle function for scroll events
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

// Enhanced scroll handler with throttling
const throttledScrollHandler = throttle(handleScroll, 16);
window.addEventListener("scroll", throttledScrollHandler);

// ==============================================
// KEYBOARD NAVIGATION
// ==============================================

document.addEventListener("keydown", function (e) {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    closeMobileMenu();
  }

  // Enter key on navigation links
  if (e.key === "Enter" && e.target.classList.contains("nav-link")) {
    e.target.click();
  }
});

// ==============================================
// PERFORMANCE MONITORING
// ==============================================

// Monitor page load performance
window.addEventListener("load", function () {
  const loadTime =
    performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);

  // Track Core Web Vitals if available
  if ("web-vital" in window) {
    // Implementation for Core Web Vitals tracking
    console.log("Core Web Vitals tracking initialized");
  }
});

// ==============================================
// ERROR HANDLING
// ==============================================

window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  // You can add error reporting here
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
  // You can add error reporting here
});

// ==============================================
// EXPORT FOR MODULES (if using modules)
// ==============================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initializePortfolio,
    showNotification,
    debounce,
    throttle,
  };
}
