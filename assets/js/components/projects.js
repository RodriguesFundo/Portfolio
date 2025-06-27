// ==============================================
// PROJECTS.JS - PROJECTS COMPONENT
// ==============================================
document.addEventListener("DOMContentLoaded", function () {
  initializeProjects();
});
function initializeProjects() {
  const projectsContainer = document.getElementById("projects-container");
  if (!projectsContainer) return;
  renderProjects(projectsContainer);
  setupProjectFiltering();
  console.log("Projects component initialized");
}
// Mock project data (exemplo, pode substituir)
const projectsData = [
  {
    title: "App Saúde Digital",
    description: "Aplicativo para digitalização de processos hospitalares.",
    tech: ["React Native", "Firebase"],
    type: "mobile",
    image: "assets/img/projects/saude.jpg",
    live: "#",
    repo: "#",
  },
  {
    title: "Painel Administrativo",
    description: "Sistema web para gestão hospitalar.",
    tech: ["React.js", "Node.js", "MongoDB"],
    type: "web",
    image: "assets/img/projects/admin.jpg",
    live: "#",
    repo: "#",
  },
];
function renderProjects(container) {
  container.innerHTML = "";
  projectsData.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = `project-card ${project.type}`;
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" />
        <div class="project-overlay">
          <a class="btn btn-primary" href="${
            project.live
          }" target="_blank">Ver</a>
          <a class="btn btn-outline" href="${
            project.repo
          }" target="_blank">Código</a>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech
            .map((tag) => `<span class="tech-tag">${tag}</span>`)
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
function setupProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      projectCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
