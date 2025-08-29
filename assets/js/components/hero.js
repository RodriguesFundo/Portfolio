// ==============================================
// HERO.JS - HERO COMPONENT
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  initializeHero();
});

function initializeHero() {
  const mount = document.getElementById("hero-container");
  if (!mount) return;

  renderHero(mount);

  // Reanexa observer para .hero-content, etc.
  if (typeof initIntersectionObserver === "function") {
    try {
      initIntersectionObserver();
    } catch (e) {
      console.error(e);
    }
  }

  console.log("Hero component initialized");
}

function renderHero(container) {
  container.innerHTML = `
    <div class="hero-text">
      <h1 class="hero-title">
        Olá, eu sou
        <span class="hero-name" data-text="Rodrigues Fundo">Rodrigues Fundo</span>
      </h1>
      <p class="hero-subtitle">
        <span id="typed-text"></span>
        <span class="cursor">|</span>
      </p>
      <p class="hero-description">
        Desenvolvedor Mobile especializado em React Native, criando
        experiências digitais inovadoras e funcionais.
      </p>
      <div class="hero-buttons">
        <a href="#projects" class="btn btn-primary">
          <i class="fas fa-code"></i>
          Ver Projetos
        </a>
        <a href="#contact" class="btn btn-outline">
          <i class="fas fa-envelope"></i>
          Entrar em Contato
        </a>
        <!-- ⚠️ Aqui depois colocaremos o botão "Baixar CV" -->
      </div>
    </div>

    <div class="hero-image">
      <div class="hero-avatar">
        <img src="assets/img/I.JPG" alt="Rodrigues Fundo" />
        <div class="avatar-ring"></div>
      </div>
    </div>
  `;

  // Se já estiver visível, marca
  const r = container.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    container.classList.add("animate-in", "show");
  }
}
