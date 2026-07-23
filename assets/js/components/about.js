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
      <h3>Desenvolvedor Full Stack de Software</h3>
      <p>
        Desenvolvedor Full Stack com aproximadamente 4 anos de experiência em
        desenvolvimento de software, projetos de saúde pública, sistemas de
        informação e coordenação técnica de equipas.
      </p>
      <p>
        Actualmente, trabalho no Ministério da Saúde (MISAU) no desenvolvimento do
        Sistema de Informação Hospitalar utilizado em unidades sanitárias nacionais,
        com participação no lançamento do primeiro hospital digital de Moçambique no
        Hospital Geral de Mavalane. Lidero tecnicamente o Sistema de Gestão
        Centralizada de Unidades Sanitárias e desenvolvo aplicações móveis em
        CommCare/CommCareHQ para o sistema upSCALE.
      </p>
      <p>
        Licenciado em Desenvolvimento de Software pela Universidade São Tomás de
        Moçambique (USTM), 2020–2024. Certificado em CommCare/CommCareHQ para
        desenvolvimento e configuração de aplicações móveis.
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
