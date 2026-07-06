/* Sorella — light storefront interactions. Progressive: forms still work without JS.
   Hooks:
   [data-qty] wrapper · [data-qty-step="-1|1"] buttons · input[data-qty-input]
   [data-menu-toggle="id"] · [data-close] · panel[data-panel][id]
   [data-gallery-thumb] inside a gallery with [data-gallery-main]
   [data-size] radios/labels within [data-sizes]
*/
(function () {
  'use strict';

  // Quantity steppers
  document.addEventListener('click', function (e) {
    var step = e.target.closest('[data-qty-step]');
    if (step) {
      var wrap = step.closest('[data-qty]');
      var input = wrap && wrap.querySelector('[data-qty-input]');
      if (input) {
        var v = parseInt(input.value || input.textContent || '1', 10) || 1;
        v = Math.max(1, v + parseInt(step.getAttribute('data-qty-step'), 10));
        if ('value' in input) input.value = v; else input.textContent = v;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    // Cart drawer toggle — opens the [data-panel] id="cart-drawer".
    // (Namespaced convenience hook; header/PDP add-to-cart can call this after
    //  a /cart/add.js to reveal the drawer. Progressive: falls back to /cart.)
    var cartToggle = e.target.closest('[data-cart-toggle]');
    if (cartToggle) {
      var cartPanel = document.getElementById(cartToggle.getAttribute('data-cart-toggle') || 'cart-drawer');
      if (cartPanel) {
        e.preventDefault();
        cartPanel.classList.add('is-open');
        document.body.classList.add('is-locked');
      }
      return;
    }

    // Panels (mobile menu / drawers)
    var toggle = e.target.closest('[data-menu-toggle]');
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute('data-menu-toggle'));
      if (panel) { panel.classList.toggle('is-open'); document.body.classList.toggle('is-locked', panel.classList.contains('is-open')); }
      return;
    }
    var closer = e.target.closest('[data-close]');
    if (closer) {
      var openPanel = closer.closest('[data-panel]') || document.querySelector('[data-panel].is-open');
      if (openPanel) { openPanel.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
      return;
    }

    // Carousel prev/next arrows — scroll the [data-carousel-track] by one viewport
    var arrow = e.target.closest('[data-carousel-prev],[data-carousel-next]');
    if (arrow) {
      var carousel = arrow.closest('[data-carousel]');
      var track = carousel && carousel.querySelector('[data-carousel-track]');
      if (track) {
        var dir = arrow.hasAttribute('data-carousel-prev') ? -1 : 1;
        track.scrollBy({ left: dir * Math.round(track.clientWidth * 0.85), behavior: 'smooth' });
      }
      return;
    }

    // Gallery thumbnails
    var thumb = e.target.closest('[data-gallery-thumb]');
    if (thumb) {
      var gal = thumb.closest('[data-gallery]');
      if (gal) {
        gal.querySelectorAll('[data-gallery-thumb]').forEach(function (t) { t.classList.remove('on'); });
        thumb.classList.add('on');
        var main = gal.querySelector('[data-gallery-main] img');
        var src = thumb.getAttribute('data-full') || (thumb.querySelector('img') && thumb.querySelector('img').src);
        if (main && src) main.src = src;
      }
      return;
    }

    // Size ladder selection (visual)
    var size = e.target.closest('[data-size]');
    if (size) {
      var sizes = size.closest('[data-sizes]');
      if (sizes) { sizes.querySelectorAll('[data-size]').forEach(function (s) { s.classList.remove('on'); }); size.classList.add('on'); }
    }
  });

  // Esc closes panels
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('[data-panel].is-open');
      if (open) { open.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
    }
  });
})();
