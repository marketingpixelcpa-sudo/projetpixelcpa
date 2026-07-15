// ============ PIXEL CPA — interactions ============

(() => {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = matchMedia('(hover: hover) and (pointer: fine)');
  const motionOK = () => !reduceMotion.matches;
  const richOK = () => motionOK() && canHover.matches;

  // One rAF-batched write per frame, keyed by name, so N listeners can't queue N frames.
  const frames = new Map();
  const schedule = (key, fn) => {
    if (frames.has(key)) return;
    frames.set(key, requestAnimationFrame(() => { frames.delete(key); fn(); }));
  };

  const ready = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn();

  ready(() => {

    /* ---- nav condense + scroll progress ---- */
    const nav = document.querySelector('.nav');
    const progress = document.querySelector('.scroll-progress');
    // Browsers with scroll-driven CSS animations drive the bar off the compositor; the JS
    // path below is only a fallback for those that don't.
    const cssProgress = CSS.supports('animation-timeline: scroll()');

    const onScroll = () => {
      if (nav) nav.classList.toggle('is-stuck', window.scrollY > 12);
      if (progress && !cssProgress) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
      }
    };
    document.addEventListener('scroll', () => schedule('scroll', onScroll), { passive: true });
    onScroll();

    /* ---- mobile burger ---- */
    const burger = document.querySelector('.nav-burger');
    const links = document.querySelector('.nav-links');
    if (burger && links) {
      const setMenu = (open) => {
        links.classList.toggle('mobile-open', open);
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
      };
      setMenu(false);
      burger.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenu(!links.classList.contains('mobile-open'));
      });
      links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
      document.addEventListener('click', (e) => {
        if (links.classList.contains('mobile-open') && !links.contains(e.target) && e.target !== burger) setMenu(false);
      });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
    }

    /* ---- headline word reveal: wrap each word in a mask it can slide up out of ---- */
    document.querySelectorAll('.split-words').forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = '';
      words.forEach((word, i) => {
        const mask = document.createElement('span');
        mask.className = 'w';
        mask.style.setProperty('--wi', i);
        const inner = document.createElement('i');
        inner.textContent = word;
        mask.appendChild(inner);
        el.appendChild(mask);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });

    /* ---- trust strip marquee: duplicate the items so the loop is seamless ---- */
    document.querySelectorAll('.strip .items').forEach((wrap) => {
      const track = document.createElement('div');
      track.className = 'items-track';
      track.innerHTML = wrap.innerHTML + wrap.innerHTML;
      wrap.textContent = '';
      wrap.appendChild(track);
    });

    /* ---- pointer-follow glow: dark deco panels + light cards ---- */
    if (richOK()) {
      const glow = (el) => {
        el.addEventListener('pointermove', (e) => {
          const r = el.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          schedule(el, () => {
            el.style.setProperty('--mx', `${x.toFixed(1)}%`);
            el.style.setProperty('--my', `${y.toFixed(1)}%`);
          });
        }, { passive: true });
      };
      document.querySelectorAll('.deco, .s-card, .why-card, .pr-card, .v-card').forEach(glow);
    }

    /* ---- tilt on service cards ---- */
    if (richOK()) {
      document.querySelectorAll('.s-card').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          schedule(`tilt-${card.dataset.k || (card.dataset.k = Math.random())}`, () => {
            card.style.transform =
              `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-8px)`;
          });
        }, { passive: true });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
      });
    }

    /* ---- magnetic buttons ---- */
    if (richOK()) {
      document.querySelectorAll('.btn').forEach((btn) => {
        btn.addEventListener('pointermove', (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) * 0.25;
          const dy = (e.clientY - r.top - r.height / 2) * 0.35;
          schedule(btn, () => { btn.style.transform = `translate(${dx.toFixed(1)}px, ${(dy - 2).toFixed(1)}px)`; });
        }, { passive: true });
        btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
      });
    }

    /* ---- scroll reveal ---- */
    const revealEls = document.querySelectorAll('[data-reveal], .split-words');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          requestAnimationFrame(() => el.classList.add('in'));
          // Drop will-change/blur once the transition lands, so a long page isn't holding
          // dozens of promoted layers for elements that will never animate again.
          el.addEventListener('transitionend', () => el.classList.add('done'), { once: true });
          io.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach((el, i) => {
        if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', i % 6);
        io.observe(el);
      });
    } else {
      revealEls.forEach((el) => el.classList.add('in', 'done'));
    }

    /* ---- animated counters ---- */
    const counters = document.querySelectorAll('[data-count]');
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.count.includes('.') ? 1 : 0;
      const render = (v) => { el.textContent = (decimals ? v.toFixed(1) : Math.round(v)) + suffix; };

      if (!motionOK()) { render(target); return; }

      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        render(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window && counters.length) {
      const co = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          co.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach((c) => co.observe(c));
    } else {
      counters.forEach((c) => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
    }

    /* ---- faq accordion ---- */
    document.querySelectorAll('.faq-item').forEach((item) => {
      const q = item.querySelector('.faq-q');
      const a = item.querySelector('.faq-a');
      if (!q || !a) return;

      const btn = q.querySelector('h4');
      q.setAttribute('role', 'button');
      q.setAttribute('tabindex', '0');
      q.setAttribute('aria-expanded', String(item.classList.contains('open')));

      const toggle = () => {
        const willOpen = !item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((o) => {
          if (o === item) return;
          o.classList.remove('open');
          o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        item.classList.toggle('open', willOpen);
        q.setAttribute('aria-expanded', String(willOpen));
        a.style.maxHeight = willOpen ? `${a.scrollHeight}px` : null;
      };

      q.addEventListener('click', toggle);
      q.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
      if (btn) btn.setAttribute('aria-hidden', 'false');

      // An open-by-default item is inlined with a fixed max-height; swap it for the real one.
      if (item.classList.contains('open')) a.style.maxHeight = `${a.scrollHeight}px`;
    });

    /* ---- pointer parallax on the floating pixel chips ---- */
    // Matches .chip AND .hero-chip: the hero's chips carry data-parallax but not .chip.
    const chips = document.querySelectorAll('[data-parallax]');
    if (chips.length && richOK()) {
      window.addEventListener('pointermove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        schedule('chips', () => {
          chips.forEach((chip) => {
            const depth = parseFloat(chip.dataset.parallax) || 10;
            // A translate here would fight the `float` keyframes' own transform, so the
            // offset rides on custom properties the keyframes compose with.
            chip.style.setProperty('--px', `${(x * depth).toFixed(1)}px`);
            chip.style.setProperty('--py', `${(y * depth).toFixed(1)}px`);
          });
        });
      }, { passive: true });
    }
  });
})();
