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
    period: "2023 - Atual",
    title: "Desenvolvedor Mobile",
    company: "Ministério da Saúde - Moçambique",
    logo: "🏥",
    description:
      "Desenvolvimento de aplicativos móveis críticos para o sistema de saúde nacional, focando em soluções que impactam diretamente o atendimento médico e gestão hospitalar.",
    skills: [
      "React Native",
      "Firebase",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "REST APIs",
    ],
    achievements: [
      "Desenvolveu sistema de prontuário eletrônico usado em 50+ unidades de saúde",
      "Implementou notificações em tempo real que reduziram tempo de resposta em 40%",
      "Liderou equipe de 3 desenvolvedores em projetos críticos",
      "Otimizou performance da aplicação resultando em 60% menos crashes",
    ],
    current: true,
  },
  {
    period: "2021 - 2023",
    title: "Desenvolvedor Full Stack",
    company: "Startup Local",
    logo: "🚀",
    description:
      "Desenvolvimento end-to-end de aplicações web e desktop, participando ativamente do crescimento da empresa desde seus primeiros dias até se tornar líder no mercado local.",
    skills: ["C#", "React", "SQL Server", ".NET Core", "Azure", "Docker"],
    achievements: [
      "Participou do crescimento da empresa de 5 para 25 funcionários",
      "Arquitetou e desenvolveu 3 produtos principais da empresa",
      "Implementou arquitetura microserviços melhorando performance em 60%",
      "Mentoreou 2 desenvolvedores junior durante o crescimento da equipe",
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
        `<li class="achievement-item">${escapeHTML(achievement)}</li>`
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
    }
  );

  container
    .querySelectorAll(".timeline-experience")
    .forEach((item) => observer.observe(item));
}

function escapeHTML(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[
        c
      ])
  );
}
