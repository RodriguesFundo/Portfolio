document.addEventListener("DOMContentLoaded", function () {
  initializeProjects();
});

function initializeProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const projectsData = [
    {
      title: "App Saúde Digital",
      description: "Aplicativo para digitalização de processos hospitalares.",
      tech: ["React Native", "Firebase"],
      type: "mobile",
      image: "assets/img/Project/saude.jpg",
      live: "#",
      repo: "#",
      date: "2025-08-01",
      featured: true,
    },
    {
      title: "Painel Administrativo",
      description: "Sistema web para gestão hospitalar.",
      tech: ["React.js", "Node.js", "MongoDB"],
      type: "web",
      image: "assets/img/projects/admin.jpg",
      live: "#",
      repo: "#",
      date: "2025-06-20",
      featured: false,
    },
  ];

  const state = {
    all: projectsData.map(normalize),
    current: [],
    filter: "all",
    query: "",
    sort: "featured",
    view: "grid",
  };

  state.current = [...state.all];
  renderProjects(container, state.current);

  setupProjectFiltering(state, container);
  setupProjectSearch(state, container);
  setupProjectSorting(state, container);
  setupViewToggle(state, container);

  if (typeof initIntersectionObserver === "function") {
    try {
      initIntersectionObserver();
    } catch (e) {
      console.error(e);
    }
  }

}

function normalize(p) {
  return {
    title: p.title || "Projeto",
    description: p.description || "",
    tech: Array.isArray(p.tech) ? p.tech : [],
    type: p.type || "web",
    image: p.image || "assets/img/projects/placeholder.jpg",
    live: p.live || "#",
    repo: p.repo || "#",
    date: p.date ? new Date(p.date) : new Date(),
    featured: !!p.featured,
  };
}

function renderProjects(container, list) {
  container.innerHTML = "";
  list.forEach((project) => {
    const card = document.createElement("div");
    card.className = `project-card ${project.type}`;
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${escapeHTML(project.title)}" />
        <div class="project-overlay">
          <a class="btn btn-primary" href="${
            project.live
          }" target="_blank" rel="noopener">Ver</a>
          <a class="btn btn-outline" href="${
            project.repo
          }" target="_blank" rel="noopener">Código</a>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.description)}</p>
        <div class="project-tech">
          ${project.tech
            .map((t) => `<span class="tech-tag">${escapeHTML(t)}</span>`)
            .join("")}
        </div>
      </div>
    `;
    container.appendChild(card);

    // se já estiver visível no viewport, mostra logo
    const r = card.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      card.classList.add("animate-in", "show");
    }
  });
}

function setupProjectFiltering(state, container) {
  const buttons = document.querySelectorAll(".filter-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter || "all";
      applyAndRender(state, container);
    });
  });
}

function setupProjectSearch(state, container) {
  const input = document.getElementById("projects-search");
  if (!input) return;
  input.addEventListener("input", () => {
    state.query = input.value.trim().toLowerCase();
    applyAndRender(state, container);
  });
}

function setupProjectSorting(state, container) {
  const select = document.getElementById("projects-sort");
  if (!select) return;
  select.addEventListener("change", () => {
    state.sort = select.value;
    applyAndRender(state, container);
  });
}

function setupViewToggle(state, container) {
  const viewBtns = document.querySelectorAll(".view-btn");
  if (!viewBtns.length) return;
  viewBtns.forEach((b) => {
    b.addEventListener("click", () => {
      viewBtns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      state.view = b.dataset.view === "list" ? "list" : "grid";
      container.classList.toggle("projects-grid--list", state.view === "list");
      // sem re-render, só muda o layout
    });
  });
}

function applyAndRender(state, container) {
  let list = state.all.filter(
    (p) => state.filter === "all" || p.type === state.filter
  );
  if (state.query) {
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(state.query) ||
        p.description.toLowerCase().includes(state.query) ||
        p.tech.join(" ").toLowerCase().includes(state.query)
    );
  }
  switch (state.sort) {
    case "title-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      list.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "recent":
      list.sort((a, b) => b.date - a.date);
      break;
    case "featured":
    default:
      list.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.date - a.date
      );
  }
  state.current = list;
  renderProjects(container, state.current);

  if (typeof initIntersectionObserver === "function") {
    try {
      initIntersectionObserver();
    } catch (e) {
      console.error(e);
    }
  }
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
