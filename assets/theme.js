/* ==========================================================================
   Sorella — theme JS
   Adaptive nav dock, drawers (cart / mobile nav / mega-menu), accordions,
   quantity selectors, predictive search hook, cart AJAX.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------------
     Adaptive Nav Dock (Art Direction §9)
     Transparent at top -> glass dock on scroll; hide on scroll-down,
     reveal on scroll-up once docked.
     ---------------------------------------------------------------------- */
  function initNavDock() {
    var dock = document.querySelector('[data-nav-dock]');
    if (!dock) return;

    var hideOnScroll = dock.getAttribute('data-scroll-hide') === 'true';
    var trigger = dock.querySelector('[data-dock-trigger]');
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

    // No hero on this template → the dock is always in its solid docked state.
    if (!heroSentinel) {
      setDocked(true);
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
     ---------------------------------------------------------------------- */
  var openPanel = null;

  function lockScroll(lock) { document.body.classList.toggle('is-locked', lock); }

  function closePanel(panel) {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    var scrim = panel.__scrim;
    if (scrim) scrim.classList.remove('is-open');
    lockScroll(false);
    if (openPanel === panel) openPanel = null;
    var opener = panel.__opener;
    if (opener) { try { opener.focus(); } catch (e) {} }
  }

  function openPanelEl(panel, opener) {
    if (!panel) return;
    if (openPanel) closePanel(openPanel);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    var scrim = panel.__scrim;
    if (scrim) scrim.classList.add('is-open');
    lockScroll(true);
    openPanel = panel;
    panel.__opener = opener || null;
    var focusable = panel.querySelector('[autofocus], button, [href], input, select, textarea');
    if (focusable) { try { focusable.focus(); } catch (e) {} }
  }

  function initPanels() {
    document.querySelectorAll('[data-panel]').forEach(function (panel) {
      var scrimSel = panel.getAttribute('data-scrim');
      if (scrimSel) panel.__scrim = document.querySelector(scrimSel);
      if (panel.__scrim) panel.__scrim.addEventListener('click', function () { closePanel(panel); });
      panel.querySelectorAll('[data-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { closePanel(panel); });
      });
    });

    document.querySelectorAll('[data-open-target]').forEach(function (opener) {
      opener.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(opener.getAttribute('data-open-target'));
        openPanelEl(target, opener);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openPanel) closePanel(openPanel);
    });
  }

  /* ----------------------------------------------------------------------
     Mega-menu (desktop hover/focus, click on touch)
     ---------------------------------------------------------------------- */
  function initMegaMenu() {
    document.querySelectorAll('[data-megamenu]').forEach(function (wrap) {
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
     Accordions (FAQ, product details) — <details>-free, a11y buttons
     ---------------------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
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
    });
  }

  /* ----------------------------------------------------------------------
     Quantity selectors
     ---------------------------------------------------------------------- */
  function initQuantity() {
    document.querySelectorAll('[data-quantity]').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      wrap.querySelectorAll('[data-qty-step]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var step = parseInt(btn.getAttribute('data-qty-step'), 10);
          var min = parseInt(input.getAttribute('min') || '1', 10);
          var val = Math.max(min, (parseInt(input.value, 10) || min) + step);
          input.value = val;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  /* ----------------------------------------------------------------------
     Cart — AJAX add + drawer refresh
     ---------------------------------------------------------------------- */
  function refreshCartDrawer() {
    var drawer = document.getElementById('cart-drawer');
    if (!drawer) return Promise.resolve();
    return fetch('/?section_id=sorella-cart-drawer')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var parsed = new DOMParser().parseFromString(html, 'text/html');
        var next = parsed.querySelector('#cart-drawer [data-cart-contents]');
        var current = drawer.querySelector('[data-cart-contents]');
        if (next && current) current.replaceWith(next);
      })
      .catch(function () {});
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
          return refreshCartDrawer();
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
        .then(function (cart) { updateCartCount(cart.item_count); return refreshCartDrawer(); })
        .catch(function () {});
    });
  }

  /* ----------------------------------------------------------------------
     Variant selector — maps option radios to a variant id + updates price
     ---------------------------------------------------------------------- */
  function initVariantSelectors() {
    document.querySelectorAll('[data-variant-selector]').forEach(function (wrap) {
      var dataEl = wrap.querySelector('[data-variant-data]');
      if (!dataEl) return;
      var variants;
      try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }
      var form = wrap.closest('form');
      var idInput = form && form.querySelector('input[name="id"]');
      var priceHost = document.querySelector('[data-variant-price]');
      var submitBtn = form && form.querySelector('[type="submit"]');

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
          priceHost.innerHTML = window.Shopify && window.Shopify.formatMoney
            ? window.Shopify.formatMoney(match.price)
            : (match.price / 100).toFixed(2);
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
  function initGallery() {
    document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
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
  function initFilters() {
    document.querySelectorAll('[data-filter-form]').forEach(function (form) {
      form.addEventListener('change', function () { form.submit(); });
    });
    document.querySelectorAll('[data-filter-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('data-filter-toggle'));
        if (!panel) return;
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Re-init dynamic bits when Shopify theme editor injects/reloads sections.
  document.addEventListener('shopify:section:load', function () {
    initAccordions();
    initQuantity();
    initMegaMenu();
    initNavDock();
  });
})();
