document.addEventListener("DOMContentLoaded", function () {
  initializeArticles();
});

function initializeArticles() {
  const container = document.getElementById("articles-container");
  if (!container) return;
  renderArticles(container);
}

const articlesData = [
  {
    title: "Hackathon USTM - 1º Lugar",
    excerpt:
      "Conquista do primeiro lugar na 1ª edição do Hackathon da Universidade São Tomás de Moçambique, desenvolvendo solução inovadora em equipe.",
    tags: ["Hackathon", "Competição", "Inovação"],
    date: "2023",
    image: "assets/img/Artigos/hackathon_ustm.png",
    link: "https://fcti.ustm.ac.mz/2023/11/13/xvi-jornada-cientifica/",
  },
  {
    title: "Artigos Técnicos no Medium",
    excerpt:
      "Escrita de artigos técnicos sobre desenvolvimento de software, compartilhando conhecimentos e experiências com a comunidade de desenvolvedores.",
    tags: ["Medium", "Escrita Técnica", "Comunidade"],
    date: "2023 - 2024",
    image:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*RB1rxSK_TBmcC5D2PN30JA.png",
    link: "https://medium.com/@rodriguesfundo",
  },
  {
    title: "Colaboração na Equipe Room",
    excerpt:
      "Participação ativa em equipe independente de desenvolvimento, contribuindo para projetos colaborativos e aprendizado conjunto.",
    tags: ["Colaboração", "Equipe", "Projetos"],
    date: "2023 - 2024",
    image:
      "https://github.com/room-organization/.github/assets/98264322/fca9c16f-bda0-437b-884d-4ba3ee4777d2",
    link: "https://github.com/room-organization",
  },
  {
    title: "Análise de Dados em Sistemas de Saúde",
    excerpt:
      "Participação na triangulação e análise de dados logísticos provenientes dos sistemas SISMA e SELV, com foco na melhoria da qualidade dos dados.",
    tags: ["SISMA", "SELV", "Análise de Dados", "Saúde Pública"],
    date: "2024",
    image:
      "https://saudedigital.misau.gov.mz/wp-content/uploads/2024/10/SIS_H.jpeg",
    link: "#",
  },
  {
    title: "Estratégia RED-REC (MISAU/UNICEF/OMS)",
    excerpt:
      "Envolvimento em atividades da estratégia RED-REC (Reaching Every District/Reaching Every Community), apoiada pela UNICEF, com foco na imunização de rotina e mobilização comunitária.",
    tags: ["RED-REC", "ODK", "Saúde Pública", "UNICEF"],
    date: "2024",
    image: "assets/img/Artigos/RED_REC.jpeg",
    link: "#",
  },
];

function renderArticles(container) {
  container.innerHTML = "";
  articlesData.forEach((article, index) => {
    const card = document.createElement("div");
    card.className = "article-card";
    card.innerHTML = `
      <div class="article-image">
        <img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" />
        <div class="article-date">${escapeHTML(article.date)}</div>
      </div>
      <div class="article-content">
        <h3 class="article-title">${escapeHTML(article.title)}</h3>
        <p class="article-excerpt">${escapeHTML(article.excerpt)}</p>
        <div class="article-tags">
          ${article.tags
            .map((tag) => `<span class="article-tag">${escapeHTML(tag)}</span>`)
            .join("")}
        </div>
        ${
          article.link !== "#"
            ? `
        <a class="article-link" href="${escapeHTML(article.link)}" target="_blank" rel="noopener">
          Ver mais <i class="fas fa-arrow-right"></i>
        </a>
        `
            : ""
        }
      </div>
    `;
    container.appendChild(card);
  });
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
