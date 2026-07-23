// ==============================================
// CONTACT.JS - CONTACT COMPONENT
// ==============================================
document.addEventListener("DOMContentLoaded", function () {
  initializeContact();
});

function initializeContact() {
  const container = document.getElementById("contact-container");
  if (!container) return;

  renderContact(container);

  const r = container.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    container.classList.add("animate-in", "show");
  }


}

const contactData = {
  location: "Maputo, Matola, Vale do Infulene",
  phoneDisplay: "+258 84 26 88 078",
  phoneHref: "+258842688078",
  email: "rodriguesdomingosf@gmail.com",
  socials: [
    {
      icon: "fab fa-linkedin",
      href: "https://www.linkedin.com/in/rodriguesfundo/",
    },
    { icon: "fab fa-github", href: "https://github.com/RodriguesFundo" },
    {
      icon: "fab fa-instagram",
      href: "https://www.instagram.com/rodrigues_fundo/",
    },
    {
      icon: "fab fa-facebook",
      href: "https://web.facebook.com/rodrigues.domingos.92/",
    },
  ],
};

function renderContact(container) {
  const socialsHTML = contactData.socials
    .map(
      (s) => `
        <a href="${
          s.href
        }" target="_blank" rel="noopener" aria-label="${getAriaFromIcon(
        s.icon
      )}">
          <i class="${s.icon}"></i>
        </a>`
    )
    .join("");


  container.innerHTML = `
    <div class="contact-info">
      <h3>Entre em Contato</h3>
      <p>Estou sempre aberto a novas oportunidades e colaborações interessantes.</p>

      <div class="contact-details">
        <div class="contact-item">
          <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
          <div>
            <h4>Localização</h4>
            <p>${escapeHTML(contactData.location)}</p>
          </div>
        </div>
        <div class="contact-item">
          <i class="fas fa-phone" aria-hidden="true"></i>
          <div>
            <h4>Telefone</h4>
            <p>
              <a href="tel:${contactData.phoneHref}" class="project-link">
                ${escapeHTML(contactData.phoneDisplay)}
              </a>
            </p>
          </div>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          <div>
            <h4>Email</h4>
            <p>
              <a href="mailto:${contactData.email}" class="project-link">
                ${escapeHTML(contactData.email)}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div class="social-links">
        ${socialsHTML}
      </div>
    </div>

    <div class="contact-form">
      <form id="contact-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <input type="text" name="name" placeholder="Seu Nome" aria-label="Seu Nome" required />
          </div>
          <div class="form-group">
            <input type="email" name="email" placeholder="Seu Email" aria-label="Seu Email" required />
          </div>
        </div>
        <div class="form-group">
          <input type="text" name="subject" placeholder="Assunto" aria-label="Assunto" required />
        </div>
        <div class="form-group">
          <textarea name="message" placeholder="Sua Mensagem" rows="6" aria-label="Sua Mensagem" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-paper-plane"></i>
          Enviar Mensagem
        </button>
      </form>
    </div>
  `;
}

function getAriaFromIcon(iconClass) {
  if (iconClass.includes("linkedin")) return "LinkedIn";
  if (iconClass.includes("github")) return "GitHub";
  if (iconClass.includes("instagram")) return "Instagram";
  if (iconClass.includes("facebook")) return "Facebook";
  return "Link social";
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
      }[c])
  );
}
