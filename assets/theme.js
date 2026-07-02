/* ==========================================================================
   Sorella — theme JS
   Adaptive nav dock, drawers (cart / mobile nav / mega-menu), accordions,
   quantity selectors, reveal-on-scroll, cart AJAX, variant price updates.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion (live).
   ========================================================================== */
(function () {
  'use strict';

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduceMotion = motionQuery.matches;

  /* ----------------------------------------------------------------------
     Reduced motion — live preference tracking.
     Pauses hero background video while the preference is active and
     resumes it (only if we paused it) when the preference flips back.
     ---------------------------------------------------------------------- */
  function applyMotionPreference() {
    document.querySelectorAll('.sorella-hero video').forEach(function (video) {
      if (reduceMotion) {
        if (video.hasAttribute('autoplay')) {
          video.dataset.sorellaHadAutoplay = 'true';
          video.removeAttribute('autoplay');
        }
        if (!video.paused) video.dataset.sorellaMotionPaused = 'true';
        video.pause();
      } else {
        if (video.dataset.sorellaHadAutoplay === 'true') video.setAttribute('autoplay', '');
        if (video.dataset.sorellaMotionPaused === 'true' || video.dataset.sorellaHadAutoplay === 'true') {
          delete video.dataset.sorellaMotionPaused;
          var playing = video.play();
          if (playing && playing.catch) playing.catch(function () {});
        }
      }
    });
  }

  function onMotionPreferenceChange(e) {
    reduceMotion = e && typeof e.matches === 'boolean' ? e.matches : motionQuery.matches;
    applyMotionPreference();
    if (reduceMotion) {
      revealAllNow();
    } else {
      initReveal(document);
    }
  }

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', onMotionPreferenceChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(onMotionPreferenceChange);
  }

  /* ----------------------------------------------------------------------
     Reveal-on-scroll (entrance choreography)
     Adds .reveal-pending, then .is-revealed once the element intersects.
     CSS for both classes lives in base.css. Skipped under reduced motion.
     ---------------------------------------------------------------------- */
  var REVEAL_SELECTOR = '.glass-panel, .sorella-card, .sorella-bento-cell, [data-reveal]';
  var revealObserver = null;

  function getRevealObserver() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    }
    return revealObserver;
  }

  function initReveal(root) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var scope = root || document;
    var nodes = [];
    if (scope !== document && scope.matches && scope.matches(REVEAL_SELECTOR)) nodes.push(scope);
    Array.prototype.push.apply(nodes, scope.querySelectorAll(REVEAL_SELECTOR));
    nodes.forEach(function (el) {
      if (el.classList.contains('reveal-pending') || el.classList.contains('is-revealed')) return;
      el.classList.add('reveal-pending');
      getRevealObserver().observe(el);
    });
  }

  // Reduced motion switched on mid-session: make everything visible at once.
  function revealAllNow() {
    document.querySelectorAll('.reveal-pending').forEach(function (el) {
      el.classList.add('is-revealed');
    });
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }
  }

  /* ----------------------------------------------------------------------
     Adaptive Nav Dock (Art Direction §9)
     Transparent at top -> glass dock on scroll; hide on scroll-down,
     reveal on scroll-up once docked.
     ---------------------------------------------------------------------- */
  function initNavDock() {
    var dock = document.querySelector('[data-nav-dock]');
    if (!dock || dock.dataset.initialized === 'true') return;
    dock.dataset.initialized = 'true';

    var hideOnScroll = dock.getAttribute('data-scroll-hide') === 'true';
    // Trigger tied to hero bottom edge when available, else a sensible fallback.
    var heroSentinel = document.querySelector('[data-hero-sentinel]');
    var lastY = window.scrollY;
    var docked = false;

    function setDocked(state) {
      if (state === docked) return;
      docked = state;
      dock.classList.toggle('nav-dock--top', !state);
      dock.classList.toggle('nav-dock--docked', state);
    }

    // No hero on this template → the dock is always in its solid docked state,
    // but while the in-flow announcement bar is still visible at the top of the
    // page the dock shifts below it (.nav-dock--offset) instead of covering it.
    if (!heroSentinel) {
      setDocked(true);
      var announcementH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--announcement-height')
      ) || 0;
      if (announcementH > 0) {
        var syncOffset = function () {
          dock.classList.toggle('nav-dock--offset', window.scrollY < announcementH);
        };
        syncOffset();
        window.addEventListener('scroll', syncOffset, { passive: true });
      }
      return;
    }

    // Use IntersectionObserver on the hero sentinel for a height-independent trigger.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        setDocked(!entries[0].isIntersecting);
      }, { rootMargin: '-80px 0px 0px 0px', threshold: 0 });
      io.observe(heroSentinel);
    } else {
      // Fallback: fixed-ish threshold.
      window.addEventListener('scroll', function () {
        setDocked(window.scrollY > 120);
      }, { passive: true });
    }

    if (hideOnScroll) {
      window.addEventListener('scroll', function () {
        if (!dock.isConnected) return;
        var y = window.scrollY;
        if (!docked) { lastY = y; return; }
        if (y > lastY && y > 200) {
          dock.classList.add('nav-dock--hidden');   // scrolling down
        } else {
          dock.classList.remove('nav-dock--hidden'); // scrolling up
        }
        lastY = y;
      }, { passive: true });
    }
  }

  /* ----------------------------------------------------------------------
     Generic drawer / panel toggling (cart, mobile nav, search)
     [data-open-target="id"] opens, [data-close] / scrim / Esc closes.
     Open/close/Esc are delegated at document level so buttons re-rendered
     by AJAX (e.g. the cart drawer's X after a refresh) keep working.
     Panels behave as modal dialogs: aria-modal + focus trap.
     ---------------------------------------------------------------------- */
  var openPanel = null;

  var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function focusablesIn(panel) {
    return Array.prototype.filter.call(panel.querySelectorAll(FOCUSABLE_SELECTOR), isVisible);
  }

  function lockScroll(lock) { document.body.classList.toggle('is-locked', lock); }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    panel.removeAttribute('aria-modal');
    var scrim = panel.__scrim;
    if (scrim) scrim.classList.remove('is-open');
    lockScroll(false);
    if (openPanel === panel) openPanel = null;
    var opener = panel.__opener;
    panel.__opener = null;
    if (opener) { try { opener.focus(); } catch (e) {} }
  }

  function openPanelEl(panel, opener) {
    if (!panel) return;
    if (openPanel && openPanel !== panel) closePanel(openPanel);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    panel.setAttribute('aria-modal', 'true');
    var scrim = panel.__scrim;
    if (scrim) scrim.classList.add('is-open');
    lockScroll(true);
    openPanel = panel;
    panel.__opener = opener || null;
    var autofocus = panel.querySelector('[autofocus]');
    var focusable = (autofocus && isVisible(autofocus)) ? autofocus : focusablesIn(panel)[0];
    if (focusable) { try { focusable.focus(); } catch (e) {} }
  }

  // Keep Tab cycling inside the open panel.
  function trapFocus(e) {
    if (!openPanel || e.key !== 'Tab') return;
    var focusables = focusablesIn(openPanel);
    if (!focusables.length) {
      e.preventDefault();
      return;
    }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;
    var inside = openPanel.contains(active);
    if (e.shiftKey) {
      if (!inside || active === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (!inside || active === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function closeMegaMenus() {
    document.querySelectorAll('[data-megamenu].is-open').forEach(function (wrap) {
      wrap.classList.remove('is-open');
      var trigger = wrap.querySelector('[data-megamenu-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  var panelEventsBound = false;

  function bindPanelEvents() {
    if (panelEventsBound) return;
    panelEventsBound = true;

    document.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-open-target]');
      if (opener) {
        e.preventDefault();
        openPanelEl(document.getElementById(opener.getAttribute('data-open-target')), opener);
        return;
      }
      var closer = e.target.closest('[data-close]');
      if (closer) {
        var panel = closer.closest('[data-panel]') || openPanel;
        if (panel) {
          e.preventDefault();
          closePanel(panel);
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (openPanel) closePanel(openPanel);
        closeMegaMenus();
        return;
      }
      trapFocus(e);
    });
  }

  function initPanels(root) {
    var scope = root || document;
    var panels = [];
    if (scope !== document && scope.matches && scope.matches('[data-panel]')) panels.push(scope);
    Array.prototype.push.apply(panels, scope.querySelectorAll('[data-panel]'));
    panels.forEach(function (panel) {
      if (panel.dataset.initialized === 'true') return;
      panel.dataset.initialized = 'true';
      var scrimSel = panel.getAttribute('data-scrim');
      if (scrimSel) panel.__scrim = document.querySelector(scrimSel);
      if (panel.__scrim && panel.__scrim.dataset.scrimInitialized !== 'true') {
        panel.__scrim.dataset.scrimInitialized = 'true';
        // Scrims can be shared between panels — always close whichever panel
        // is currently open, not the panel that happened to bind first.
        panel.__scrim.addEventListener('click', function () { closePanel(openPanel || panel); });
      }
    });
    bindPanelEvents();
  }

  /* ----------------------------------------------------------------------
     Mega-menu (desktop hover/focus, click on touch)
     ---------------------------------------------------------------------- */
  function initMegaMenu(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-megamenu]').forEach(function (wrap) {
      if (wrap.dataset.initialized === 'true') return;
      wrap.dataset.initialized = 'true';
      var trigger = wrap.querySelector('[data-megamenu-trigger]');
      var panel = wrap.querySelector('[data-megamenu-panel]');
      if (!trigger || !panel) return;
      var timer;
      function show() { clearTimeout(timer); wrap.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); }
      function hide() { timer = setTimeout(function () { wrap.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }, 120); }
      wrap.addEventListener('mouseenter', show);
      wrap.addEventListener('mouseleave', hide);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        wrap.classList.contains('is-open') ? hide() : show();
      });
      wrap.addEventListener('focusout', function (e) {
        if (!wrap.contains(e.relatedTarget)) hide();
      });
    });
  }

  /* ----------------------------------------------------------------------
     Accordions (FAQ, product details) — delegated, a11y buttons
     ---------------------------------------------------------------------- */
  var accordionsBound = false;

  function initAccordions() {
    if (accordionsBound) return;
    accordionsBound = true;
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-accordion-trigger]');
      if (!trigger) return;
      var item = trigger.closest('[data-accordion-item]');
      var content = item && item.querySelector('[data-accordion-content]');
      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (content) {
        if (expanded) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = reduceMotion ? 'none' : content.scrollHeight + 'px';
        }
      }
    });
  }

  /* ----------------------------------------------------------------------
     Quantity selectors — delegated so steppers never double-fire after
     section re-init or cart re-render.
     ---------------------------------------------------------------------- */
  var quantityBound = false;

  function initQuantity() {
    if (quantityBound) return;
    quantityBound = true;
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-qty-step]');
      if (!btn) return;
      var wrap = btn.closest('[data-quantity]');
      var input = wrap && wrap.querySelector('input');
      if (!input) return;
      var step = parseInt(btn.getAttribute('data-qty-step'), 10);
      var min = parseInt(input.getAttribute('min') || '1', 10);
      var val = Math.max(min, (parseInt(input.value, 10) || min) + step);
      input.value = val;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* ----------------------------------------------------------------------
     Money formatting — consumes window.Sorella.moneyFormat, defined in
     layout/theme.liquid from shop.money_format.
     ---------------------------------------------------------------------- */
  function formatMoney(cents) {
    var value = parseInt(cents, 10);
    if (isNaN(value)) value = 0;
    var format = window.Sorella && window.Sorella.moneyFormat;
    if (!format || typeof format !== 'string') return (value / 100).toFixed(2);

    function withDelimiters(num, precision, thousands, decimal) {
      var fixed = (num / 100).toFixed(precision);
      var parts = fixed.split('.');
      var whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
      return parts[1] ? whole + decimal + parts[1] : whole;
    }

    return format.replace(/\{\{\s*(\w+)\s*\}\}/g, function (match, placeholder) {
      switch (placeholder) {
        case 'amount': return withDelimiters(value, 2, ',', '.');
        case 'amount_no_decimals': return withDelimiters(value, 0, ',', '.');
        case 'amount_with_comma_separator': return withDelimiters(value, 2, '.', ',');
        case 'amount_no_decimals_with_comma_separator': return withDelimiters(value, 0, '.', ',');
        case 'amount_with_apostrophe_separator': return withDelimiters(value, 2, "'", '.');
        default: return withDelimiters(value, 2, ',', '.');
      }
    });
  }

  /* ----------------------------------------------------------------------
     Cart — AJAX add + re-render of every [data-cart-contents] container
     (drawer AND main cart page) via the Section Rendering API.
     ---------------------------------------------------------------------- */
  function refreshCartContents() {
    var containers = document.querySelectorAll('[data-cart-contents]');
    if (!containers.length) return Promise.resolve();

    var sectionEls = [];
    containers.forEach(function (container) {
      var sectionEl = container.closest('[id^="shopify-section-"]');
      if (sectionEl && sectionEls.indexOf(sectionEl) === -1) sectionEls.push(sectionEl);
    });

    var jobs = sectionEls.map(function (sectionEl) {
      var sectionId = sectionEl.id.replace('shopify-section-', '');
      var url = window.location.pathname + '?section_id=' + encodeURIComponent(sectionId);
      return fetch(url)
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var parsed = new DOMParser().parseFromString(html, 'text/html');
          var fresh = parsed.querySelectorAll('[data-cart-contents]');
          var live = sectionEl.querySelectorAll('[data-cart-contents]');
          live.forEach(function (container, i) {
            if (fresh[i]) container.innerHTML = fresh[i].innerHTML;
          });
        })
        .catch(function () {});
    });

    return Promise.all(jobs);
  }

  function updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = count;
      el.hidden = count === 0;
    });
  }

  function initAddToCart() {
    document.addEventListener('submit', function (e) {
      var form = e.target.closest('form[action$="/cart/add"], form[action*="/cart/add"]');
      if (!form || form.hasAttribute('data-no-ajax')) return;
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      if (btn) { btn.classList.add('is-loading'); btn.setAttribute('aria-disabled', 'true'); }
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (r) { return r.json(); })
        .then(function () { return fetch('/cart.js').then(function (r) { return r.json(); }); })
        .then(function (cart) {
          updateCartCount(cart.item_count);
          return refreshCartContents();
        })
        .then(function () {
          var drawer = document.getElementById('cart-drawer');
          if (drawer) openPanelEl(drawer, btn);
        })
        .catch(function () { form.submit(); })
        .finally(function () { if (btn) { btn.classList.remove('is-loading'); btn.removeAttribute('aria-disabled'); } });
    });
  }

  function initCartLineActions() {
    document.addEventListener('click', function (e) {
      var change = e.target.closest('[data-line-change]');
      if (!change) return;
      e.preventDefault();
      var line = change.getAttribute('data-line');
      var qty = change.getAttribute('data-line-change');
      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ line: parseInt(line, 10), quantity: parseInt(qty, 10) })
      })
        .then(function (r) { return r.json(); })
        .then(function (cart) { updateCartCount(cart.item_count); return refreshCartContents(); })
        .catch(function () {});
    });
  }

  /* ----------------------------------------------------------------------
     Variant selector — maps option radios to a variant id + updates price.
     Prefers the pre-rendered price HTML map embedded by
     sorella-product-info.liquid (<script data-variant-price-map>), falling
     back to formatMoney() wrapped in the theme's price markup.
     ---------------------------------------------------------------------- */
  function initVariantSelectors(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-variant-selector]').forEach(function (wrap) {
      if (wrap.dataset.initialized === 'true') return;
      wrap.dataset.initialized = 'true';
      var dataEl = wrap.querySelector('[data-variant-data]');
      if (!dataEl) return;
      var variants;
      try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }
      var form = wrap.closest('form');
      var idInput = form && form.querySelector('input[name="id"]');
      var priceHost = document.querySelector('[data-variant-price]');
      var submitBtn = form && form.querySelector('[type="submit"]');

      var priceMap = null;
      var mapEl = (form && form.querySelector('[data-variant-price-map]')) ||
        wrap.querySelector('[data-variant-price-map]') ||
        document.querySelector('[data-variant-price-map]');
      if (mapEl) {
        try { priceMap = JSON.parse(mapEl.textContent); } catch (e) { priceMap = null; }
      }

      function selectedOptions() {
        var opts = [];
        wrap.querySelectorAll('[data-option-index]:checked').forEach(function (input) {
          opts[parseInt(input.getAttribute('data-option-index'), 10) - 1] = input.value;
        });
        return opts;
      }

      function update() {
        var chosen = selectedOptions();
        var match = variants.find(function (v) {
          return (v.options || []).every(function (o, i) { return o === chosen[i]; });
        });
        if (!match) return;
        if (idInput) idInput.value = match.id;
        if (priceHost) {
          var priceHtml = priceMap && priceMap[String(match.id)];
          if (priceHtml) {
            priceHost.innerHTML = priceHtml;
          } else {
            var span = document.createElement('span');
            span.className = 't-price text-gold';
            span.innerHTML = formatMoney(match.price);
            priceHost.innerHTML = '';
            priceHost.appendChild(span);
          }
        }
        if (submitBtn) {
          submitBtn.toggleAttribute('aria-disabled', !match.available);
          var label = submitBtn.querySelector('[data-btn-label]') || submitBtn;
          if (match.available && submitBtn.dataset.labelAdd) label.textContent = submitBtn.dataset.labelAdd;
          if (!match.available && submitBtn.dataset.labelSold) label.textContent = submitBtn.dataset.labelSold;
        }
      }

      wrap.addEventListener('change', function (e) {
        if (e.target.matches('[data-option-index]')) update();
      });
    });
  }

  /* ----------------------------------------------------------------------
     Product gallery — thumbnail swaps the main image
     ---------------------------------------------------------------------- */
  function initGallery(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-gallery]').forEach(function (gallery) {
      if (gallery.dataset.initialized === 'true') return;
      gallery.dataset.initialized = 'true';
      var main = gallery.querySelector('#gallery-main') || gallery.querySelector('.sorella-gallery__img');
      gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var full = thumb.getAttribute('data-full');
          if (main && full) { main.src = full; main.srcset = ''; }
          gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (t) { t.classList.remove('is-active'); });
          thumb.classList.add('is-active');
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     Collection filter/sort — auto-submit form on change; mobile toggle
     ---------------------------------------------------------------------- */
  function initFilters(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-filter-form]').forEach(function (form) {
      if (form.dataset.initialized === 'true') return;
      form.dataset.initialized = 'true';
      form.addEventListener('change', function () { form.submit(); });
    });
    scope.querySelectorAll('[data-filter-toggle]').forEach(function (btn) {
      if (btn.dataset.initialized === 'true') return;
      btn.dataset.initialized = 'true';
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('data-filter-toggle'));
        if (!panel) return;
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ----------------------------------------------------------------------
     Product recommendations — sections/sorella-product-carousel.liquid emits
     [data-recommendations][data-url] (Section Rendering API endpoint). Fetch
     the section re-rendered with the recommendations drop and swap in its
     body; on any failure keep the server-rendered collection fallback.
     ---------------------------------------------------------------------- */
  function initRecommendations(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-recommendations][data-url]').forEach(function (el) {
      if (el.dataset.recommendationsLoaded === 'true') return;
      el.dataset.recommendationsLoaded = 'true';
      fetch(el.getAttribute('data-url'))
        .then(function (res) {
          if (!res.ok) throw new Error('recommendations ' + res.status);
          return res.text();
        })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var fresh = doc.querySelector('[data-recommendations]');
          if (fresh && fresh.querySelector('.sorella-card')) {
            el.innerHTML = fresh.innerHTML;
            initReveal(el);
          }
        })
        .catch(function () { /* graceful fallback: keep existing markup */ });
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function boot() {
    initNavDock();
    initPanels();
    initMegaMenu();
    initAccordions();
    initQuantity();
    initVariantSelectors();
    initGallery();
    initFilters();
    initAddToCart();
    initCartLineActions();
    initRecommendations(document);
    initReveal(document);
    applyMotionPreference();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Re-init dynamic bits when Shopify theme editor injects/reloads sections.
  // Scoped to the loaded section; per-element data-initialized guards and
  // document-level delegation prevent duplicate listeners/observers.
  document.addEventListener('shopify:section:load', function (event) {
    var root = event.target || document;
    initNavDock();
    initPanels(root);
    initMegaMenu(root);
    initVariantSelectors(root);
    initGallery(root);
    initFilters(root);
    initRecommendations(root);
    initReveal(root);
    applyMotionPreference();
  });
})();
