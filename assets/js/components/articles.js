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
    title: "Boas Práticas em React Native",
    excerpt: "Dicas e padrões para criar aplicações móveis mais eficientes.",
    tags: ["React Native", "Mobile"],
    date: "Jun 2024",
    image: "assets/img/articles/react-native.jpg",
    link: "#",
  },
  {
    title: "Introdução ao Firebase para Apps",
    excerpt: "Como usar Firebase como backend completo para apps móveis.",
    tags: ["Firebase", "Backend"],
    date: "Mai 2024",
    image: "assets/img/articles/firebase.jpg",
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
        <img src="${article.image}" alt="${article.title}" />
        <div class="article-date">${article.date}</div>
      </div>
      <div class="article-content">
        <h3 class="article-title">${article.title}</h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-tags">
          ${article.tags
            .map((tag) => `<span class="article-tag">${tag}</span>`)
            .join("")}
        </div>
        <a class="article-link" href="${article.link}" target="_blank">
          Ler mais <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
    container.appendChild(card);
  });
}
