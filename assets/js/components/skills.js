const skillsData = {
  frontend: {
    title: "Frontend Development",
    icon: "fas fa-laptop-code",
    skills: [
      {
        name: "React Native",
        level: 90,
        icon: "fab fa-react",
        description: "Desenvolvimento de aplicações mobile multiplataforma",
      },
      {
        name: "JavaScript",
        level: 85,
        icon: "fab fa-js-square",
        description: "Linguagem principal para desenvolvimento web e mobile",
      },
      {
        name: "TypeScript",
        level: 80,
        icon: "fab fa-js-square",
        description: "JavaScript tipado para projetos robustos",
      },
      {
        name: "React.js",
        level: 85,
        icon: "fab fa-react",
        description: "Desenvolvimento de interfaces web modernas",
      },
      {
        name: "HTML5",
        level: 90,
        icon: "fab fa-html5",
        description: "Marcação semântica e estrutural",
      },
      {
        name: "CSS3",
        level: 85,
        icon: "fab fa-css3-alt",
        description: "Estilização avançada e animações",
      },
      {
        name: "Tailwind CSS",
        level: 75,
        icon: "fas fa-paint-brush",
        description: "Framework CSS utility-first",
      },
    ],
  },
  backend: {
    title: "Backend Development",
    icon: "fas fa-server",
    skills: [
      {
        name: "C#",
        level: 80,
        icon: "fab fa-microsoft",
        description: "Desenvolvimento de APIs e aplicações desktop",
      },
      {
        name: "PHP",
        level: 75,
        icon: "fab fa-php",
        description: "Desenvolvimento web server-side",
      },
      {
        name: "Laravel",
        level: 70,
        icon: "fab fa-laravel",
        description: "Framework PHP para desenvolvimento web",
      },
      {
        name: "Node.js",
        level: 75,
        icon: "fab fa-node-js",
        description: "Runtime JavaScript para backend",
      },
      {
        name: "Express.js",
        level: 70,
        icon: "fas fa-code",
        description: "Framework minimalista para Node.js",
      },
      {
        name: "REST APIs",
        level: 85,
        icon: "fas fa-exchange-alt",
        description: "Desenvolvimento de APIs RESTful",
      },
    ],
  },
  database: {
    title: "Database & Cloud",
    icon: "fas fa-database",
    skills: [
      {
        name: "MySQL",
        level: 80,
        icon: "fas fa-database",
        description: "Sistema de gerenciamento de banco relacional",
      },
      {
        name: "PostgreSQL",
        level: 75,
        icon: "fas fa-database",
        description: "Banco de dados relacional avançado",
      },
      {
        name: "MongoDB",
        level: 70,
        icon: "fas fa-leaf",
        description: "Banco de dados NoSQL orientado a documentos",
      },
      {
        name: "Firebase",
        level: 75,
        icon: "fas fa-fire",
        description: "Plataforma de desenvolvimento mobile e web",
      },
      {
        name: "SQLite",
        level: 85,
        icon: "fas fa-database",
        description: "Banco de dados leve para aplicações mobile",
      },
    ],
  },
  tools: {
    title: "Tools & Technologies",
    icon: "fas fa-tools",
    skills: [
      {
        name: "Git",
        level: 85,
        icon: "fab fa-git-alt",
        description: "Controle de versão distribuído",
      },
      {
        name: "GitHub",
        level: 80,
        icon: "fab fa-github",
        description: "Plataforma de hospedagem de código",
      },
      {
        name: "VS Code",
        level: 90,
        icon: "fas fa-code",
        description: "Editor de código principal",
      },
      {
        name: "Figma",
        level: 70,
        icon: "fab fa-figma",
        description: "Design de interfaces e prototipagem",
      },
      {
        name: "Postman",
        level: 80,
        icon: "fas fa-satellite-dish",
        description: "Teste e documentação de APIs",
      },
      {
        name: "Docker",
        level: 65,
        icon: "fab fa-docker",
        description: "Containerização de aplicações",
      },
      {
        name: "Linux",
        level: 70,
        icon: "fab fa-linux",
        description: "Sistema operacional e administração",
      },
    ],
  },
};

document.addEventListener("DOMContentLoaded", function () {
  initializeSkills();
});

function initializeSkills() {
  const skillsContainer = document.getElementById("skills-container");

  if (!skillsContainer) {
    console.warn("Skills container not found");
    return;
  }

  renderSkills(skillsContainer);
  setupSkillsAnimations();
}

function renderSkills(container) {
  container.innerHTML = "";

  Object.keys(skillsData).forEach((categoryKey, index) => {
    const category = skillsData[categoryKey];
    const skillCategoryElement = createSkillCategory(category, index);
    container.appendChild(skillCategoryElement);
  });
}

function createSkillCategory(category, index) {
  const categoryElement = document.createElement("div");
  categoryElement.className = "skill-category";
  categoryElement.style.animationDelay = `${index * 0.1}s`;

  categoryElement.innerHTML = `
        <h3>
            <i class="${category.icon}"></i>
            ${category.title}
        </h3>
        <div class="skill-list">
            ${category.skills.map((skill) => createSkillItem(skill)).join("")}
        </div>
    `;

  return categoryElement;
}

function createSkillItem(skill) {
  return `
        <div class="skill-item" data-skill="${skill.name
          .toLowerCase()
          .replace(/\s+/g, "-")}">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-info">
                <div class="skill-header">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-progress-fill" 
                         data-percentage="${skill.level}%" 
                         style="width: 0%">
                    </div>
                </div>
                <div class="skill-description">${skill.description}</div>
            </div>
        </div>
    `;
}

function setupSkillsAnimations() {
  const skillCategories = document.querySelectorAll(".skill-category");

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillCategory(entry.target);
        skillsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillCategories.forEach((category) => {
    skillsObserver.observe(category);
  });
}

function animateSkillCategory(categoryElement) {
  const skillItems = categoryElement.querySelectorAll(".skill-item");
  const progressBars = categoryElement.querySelectorAll(".skill-progress-fill");

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";

      addSkillHoverEffects(item);
    }, index * 100);
  });

  setTimeout(() => {
    animateProgressBars(progressBars);
  }, 200);
}

function animateProgressBars(progressBars) {
  progressBars.forEach((bar, index) => {
    setTimeout(() => {
      const percentage = bar.dataset.percentage;
      bar.style.width = percentage;

      animatePercentageCounter(bar, percentage);
    }, index * 150);
  });
}

function animatePercentageCounter(progressBar, targetPercentage) {
  const skillItem = progressBar.closest(".skill-item");
  const percentageElement = skillItem.querySelector(".skill-percentage");
  const targetValue = parseInt(targetPercentage);

  let currentValue = 0;
  const increment = targetValue / 30;
  const duration = 1000;
  const stepTime = duration / 30;

  const counter = setInterval(() => {
    currentValue += increment;

    if (currentValue >= targetValue) {
      currentValue = targetValue;
      clearInterval(counter);
    }

    percentageElement.textContent = `${Math.round(currentValue)}%`;
  }, stepTime);
}

function addSkillHoverEffects(skillItem) {
  const skillIcon = skillItem.querySelector(".skill-icon");
  const skillDescription = skillItem.querySelector(".skill-description");

  skillItem.addEventListener("mouseenter", function () {
    skillIcon.style.transform = "scale(1.1)";
    skillIcon.style.boxShadow = "0 0 20px rgba(99, 102, 241, 0.3)";

    skillDescription.style.opacity = "1";
    skillDescription.style.maxHeight = "100px";

    const progressBar = skillItem.querySelector(".skill-progress-fill");
    progressBar.style.animation = "pulse 1s ease-in-out";
  });

  skillItem.addEventListener("mouseleave", function () {
    skillIcon.style.transform = "scale(1)";
    skillIcon.style.boxShadow = "none";

    skillDescription.style.opacity = "0";
    skillDescription.style.maxHeight = "0";

    const progressBar = skillItem.querySelector(".skill-progress-fill");
    progressBar.style.animation = "none";
  });

  skillItem.addEventListener("click", function () {
    const isActive = skillItem.classList.contains("active");

    document.querySelectorAll(".skill-item").forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      skillItem.classList.add("active");
    }
  });
}

function initializeSkillFiltering() {
  const filterButtons = document.querySelectorAll(".skill-filter-btn");
  const skillCategories = document.querySelectorAll(".skill-category");

  if (filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      skillCategories.forEach((category) => {
        if (filter === "all" || category.dataset.category === filter) {
          ategory.style.display = "block";
          setTimeout(() => {
            category.style.opacity = "1";
            category.style.transform = "translateY(0)";
          }, 100);
        } else {
          setTimeout(() => {
            category.style.opacity = "0";
            category.style.transform = "translateY(20px)";
            setTimeout(() => {
              category.style.display = "none";
            }, 300);
          }, 100);
        }
      });
    });
  });
}
