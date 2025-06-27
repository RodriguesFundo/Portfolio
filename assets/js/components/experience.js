// ==============================================
// EXPERIENCE.JS - EXPERIENCE COMPONENT
// ==============================================
document.addEventListener("DOMContentLoaded", function () {
  initializeExperience();
});
function initializeExperience() {
  const container = document.getElementById("experience-container");
  if (!container) return;
  renderExperience(container);
  console.log("Experience component initialized");
}
// Dados fictícios de exemplo
const experienceData = [
  {
    date: "2023 - Atual",
    title: "Desenvolvedor Mobile",
    company: "Ministério da Saúde - Moçambique",
    description:
      "Desenvolvimento de aplicativos para processos clínicos, usando React Native e Firebase.",
  },
  {
    date: "2021 - 2023",
    title: "Desenvolvedor Full Stack",
    company: "Startup Local",
    description: "Desenvolvimento de sistemas web e desktop em C# e React.",
  },
];
function renderExperience(container) {
  container.innerHTML = "";
  experienceData.forEach((item, index) => {
    const element = document.createElement("div");
    element.className = "timeline-item";
    element.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">${item.date}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-company">${item.company}</p>
        <p class="timeline-description">${item.description}</p>
      </div>
    `;
    container.appendChild(element);
  });
}
