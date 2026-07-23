document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('footer-include');
  if (!el) return;
  el.innerHTML = `
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a href="index.html" class="logo on-dark">
          <img src="assets/logo-full-light.svg" alt="Pixel CPA" class="logo-img" width="144" height="26">
        </a>
        <p>Cabinet comptable moderne basé au Québec, dédié aux professionnels autonomes et petites entreprises.</p>
      </div>
      <div class="foot-col">
        <h5>Navigation</h5>
        <a href="index.html">Accueil</a>
        <a href="a-propos.html">À propos</a>
        <a href="services.html">Services</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="foot-col">
        <h5>Services</h5>
        <a href="services.html">Tenue de livres</a>
        <a href="services.html">Fiscalité &amp; impôts</a>
        <a href="services.html">Démarrage d'entreprise</a>
        <a href="services.html">Automatisation &amp; IA</a>
      </div>
      <div class="foot-col">
        <h5>Contact</h5>
        <a href="tel:+14188151471">+1 418 815-1471</a>
        <a href="mailto:bonjour@pixelcpa.ca">bonjour@pixelcpa.ca</a>
        <a href="contact.html">Québec, Canada</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Pixel CPA. Tous droits réservés.</span>
      <div class="foot-social">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0"/></svg></a>
        <a href="#" aria-label="Courriel"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>
      </div>
    </div>
  </div>`;
});
