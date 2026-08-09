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
        <p>Cabinet comptable moderne basé au Québec, dédié aux professionnels et petites entreprises.</p>
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
        <a href="services.html">Optimisation numérique</a>
        <a href="services.html">Gestion de performance</a>
        <a href="services.html">Démarrage d'entreprise</a>
      </div>
      <div class="foot-col">
        <h5>Contact</h5>
        <a href="tel:+14188151471">+1 418 815-1471</a>
        <a href="mailto:info@pixelcpa.ca">info@pixelcpa.ca</a>
        <a href="contact.html">Québec, Canada</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Pixel CPA. Tous droits réservés.</span>
      <div class="foot-social">
        <a href="mailto:info@pixelcpa.ca" aria-label="Nous écrire par courriel"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>
        <a href="tel:+14188151471" aria-label="Nous appeler"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg></a>
        <a href="https://www.facebook.com/profile.php?id=61580697696968" target="_blank" rel="noopener" aria-label="Notre page Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.3l.4-2.85h-2.7V9.32c0-.82.23-1.38 1.4-1.38h1.5V5.4c-.26-.04-1.15-.11-2.18-.11-2.16 0-3.64 1.32-3.64 3.74v2.09H8.25V14h2.33v7h2.92z"/></svg></a>
      </div>
    </div>
  </div>`;
});
