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
}

function renderAbout(container) {
  container.innerHTML = `
    <div class="about-text">
      <h3>Desenvolvedor Full Stack</h3>
      <p>
        Sou um desenvolvedor Full Stack com aproximadamente 4 anos de experiência 
        em desenvolvimento de software, atuando em projetos de saúde pública e 
        sistemas de informação.
      </p>
      <p>
        Actualmente, trabalho no Ministério da Saúde (MISAU) desenvolvendo o Sistema 
        de Informação Hospitalar implementado nas unidades sanitárias da província 
        de Maputo. Participei do lançamento do primeiro hospital digital de Moçambique, 
        no Hospital Geral de Mavalane, e lidero tecnicamente o desenvolvimento do 
        Sistema de Gestão Centralizada de Unidades Sanitárias.
      </p>
      <p>
        Formado em Desenvolvimento de Software pela Universidade São Tomás de 
        Moçambique (USTM).
      </p>
    </div>

    <div class="about-image">
      <div class="image-wrapper">
        <img src="assets/img/dev.jpeg" alt="Rodrigues Fundo" />

      </div>
    </div>
  `;

  const r = container.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    container.classList.add("animate-in", "show");
  }
}
