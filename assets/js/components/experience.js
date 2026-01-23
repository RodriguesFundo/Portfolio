document.addEventListener("DOMContentLoaded", function () {
  initializeExperience();
});

function initializeExperience() {
  const container = document.getElementById("experience-container");
  if (!container) return;

  renderExperience(container);

  if (typeof initIntersectionObserver === "function") {
    try {
      initIntersectionObserver();
    } catch (e) {
      console.error(e);
    }
  }
}

const experienceData = [
  {
    period: "Abril 2024 - Atual",
    title: "Desenvolvedor de Software (Full Stack)",
    company: "Ministério da Saúde (MISAU)",
    logo: "🏥",
    description:
      "Desenvolvimento do Sistema de Informação Hospitalar implementado nas unidades sanitárias da província de Maputo, com participação no lançamento do primeiro hospital digital de Moçambique.",
    skills: [
      "React",
      "React Native",
      "Node.js",
      "PHP",
      "Laravel",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "REST APIs",
      "Git",
    ],
    achievements: [
      "Participou no lançamento do primeiro hospital digital de Moçambique, no Hospital Geral de Mavalane (Unidade Sanitária Pivô)",
      "Treinou equipes médicas no uso do sistema de informação hospitalar",
      "Realizou implantação, manutenção e suporte contínuo no Hospital Geral da Machava (Centro de Excelência em Tuberculose)",
      "Liderou tecnicamente o desenvolvimento do Sistema de Gestão Centralizada de Unidades Sanitárias",
      "Implementou soluções em 50+ unidades sanitárias da província de Maputo",
      "Participou na Estratégia RED-REC (MISAU/UNICEF/OMS) usando ODK para coleta de dados em campo",
    ],
    current: true,
  },
  {
    period: "Fevereiro 2024 - Abril 2024",
    title: "Formador de Tecnologia",
    company: "Universidade São Tomás de Moçambique (USTM)",
    logo: "🎓",
    description:
      "Ministrou treinamentos em ferramentas do Office 365 e participou ativamente na transformação digital da universidade, elaborando manuais e guias de referência.",
    skills: [
      "Office 365",
      "Formação",
      "Documentação Técnica",
      "Transformação Digital",
    ],
    achievements: [
      "Ministrou treinamentos em ferramentas do Office 365 para docentes e funcionários",
      "Participou activamente na transformação digital da universidade",
      "Elaborou manuais e guias de referência para uso das ferramentas",
      "Contribuiu para a modernização dos processos académicos",
    ],
    current: false,
  },
  {
    period: "2020 - 2024",
    title: "Estudante & Desenvolvedor",
    company: "USTM & Projetos Pessoais",
    logo: "💻",
    description:
      "Desenvolvimento de competências em programação actravés da licenciatura em Desenvolvimento de Software e participação em projetos pessoais, hackathons e equipes independentes.",
    skills: [
      "HTML/CSS/JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "PHP",
      "C#",
      "ASP.NET",
      "SQL",
      "Git",
    ],
    achievements: [
      "1º lugar na 1ª edição do Hackathon da USTM",
      "Participou no desenvolvimento do módulo de empresas da aplicação MãeBiz (React Native)",
      "Colaborou com equipe independente: Room",
      "Escreveu artigos técnicos no Medium",
    ],
    current: false,
  },
];

function createTimelineItem(data, index) {
  const item = document.createElement("div");
  item.className = "timeline-experience";
  item.style.animationDelay = `${index * 0.2}s`;

  const statusBadge = data.current
    ? '<div class="status-badge">Atual</div>'
    : "";

  const skillsHTML = data.skills
    .map((skill) => `<div class="skill-item">${escapeHTML(skill)}</div>`)
    .join("");

  const achievementsHTML = data.achievements
    .map(
      (achievement) =>
        `<li class="achievement-item">${escapeHTML(achievement)}</li>`,
    )
    .join("");

  item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="experience-card">
            ${statusBadge}
            
            <div class="card-header">
                <div class="experience-period">${escapeHTML(data.period)}</div>
                <h3 class="job-title">${escapeHTML(data.title)}</h3>
                <div class="company-info">
                    <div class="company-logo">${data.logo}</div>
                    <div class="company-name">${escapeHTML(data.company)}</div>
                </div>
            </div>

            <div class="card-content">
                <p class="job-description">${escapeHTML(data.description)}</p>
                
                <button class="expand-toggle" onclick="toggleExpand(this)" aria-expanded="false">
                    Ver mais detalhes
                    <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m6 9 6 6 6-6"/>
                    </svg>
                </button>

                <div class="expanded-content">
                    <div class="skills-section">
                        <div class="skills-title">🛠️ Tecnologias & Ferramentas</div>
                        <div class="skills-grid">
                            ${skillsHTML}
                        </div>
                    </div>

                    <div class="achievements-section">
                        <div class="achievements-title">🏆 Principais Conquistas</div>
                        <ul class="achievements-list">
                            ${achievementsHTML}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

  return item;
}

function toggleExpand(button) {
  const expandedContent = button.nextElementSibling;
  const isExpanded = button.classList.contains("expanded");

  if (isExpanded) {
    button.classList.remove("expanded");
    expandedContent.classList.remove("show");
    expandedContent.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `
      Ver mais detalhes
      <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
  } else {
    button.classList.add("expanded");
    expandedContent.classList.add("show");
    expandedContent.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.innerHTML = `
      Ver menos detalhes
      <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 9 6 6 6-6"/>
      </svg>
    `;
  }
}

function renderExperience(container) {
  container.innerHTML = "";

  experienceData.forEach((data, index) => {
    const item = createTimelineItem(data, index);
    container.appendChild(item);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  container
    .querySelectorAll(".timeline-experience")
    .forEach((item) => observer.observe(item));
}

function escapeHTML(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
}
