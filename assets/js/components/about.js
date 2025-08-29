// ==============================================
// ABOUT.JS - ABOUT COMPONENT
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  initializeAbout();
});

function initializeAbout() {
  const mount = document.getElementById("about-container");
  if (!mount) return;

  renderAbout(mount);

  if (typeof initIntersectionObserver === "function") {
    try {
      initIntersectionObserver();
    } catch (e) {
      console.error(e);
    }
  }

  console.log("About component initialized");
}

function renderAbout(container) {
  container.innerHTML = `
    <div class="about-text">
      <h3>Desenvolvedor Mobile & Full Stack</h3>
      <p>
        Sou um jovem desenvolvedor apaixonado por tecnologia e inovação.
        Com experiência sólida em desenvolvimento mobile usando React
        Native, também trabalho com tecnologias web e desktop.
      </p>
      <p>
        Atualmente, contribuo para a digitalização de processos
        hospitalares no Ministério da Saúde, desenvolvendo soluções que
        impactam positivamente a vida das pessoas.
      </p>

      <div class="about-stats">
        <div class="stat-item">
          <span class="stat-number">2+</span>
          <span class="stat-label">Anos de Experiência</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">15+</span>
          <span class="stat-label">Projetos Concluídos</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">100%</span>
          <span class="stat-label">Dedicação</span>
        </div>
      </div>

      <!-- ⚠️ Aqui depois adicionaremos um botão "Baixar CV" como reforço -->
    </div>

    <div class="about-image">
      <div class="image-wrapper">
        <img src="assets/img/I.JPG" alt="Rodrigues Fundo coding" />
        <div class="tech-badges">
          <span class="tech-badge">React Native</span>
          <span class="tech-badge">JavaScript</span>
          <span class="tech-badge">C#</span>
          <span class="tech-badge">PHP</span>
        </div>
      </div>
    </div>
  `;

  const r = container.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    container.classList.add("animate-in", "show");
  }
}
