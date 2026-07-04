/* ==========================================================================
   sorella-scroll-hijack — full-page section-snap ("scroll hijack").
   One gesture = one panel: wheel tick, touch swipe, or arrow key advances
   the explicit activeSection state machine by exactly one, throttled so a
   fast gesture can't skip panels mid-animation.

   Vanilla JS, no dependencies. Scoped: initializes only on elements with
   [data-scroll-hijack]; every listener is bound to that wrapper (never to
   window/document input events), so the cart drawer, modals, and the rest
   of the storefront keep their own wheel/touch/key handling untouched.
   At the first/last panel the gesture is NOT preventDefault-ed, handing
   scrolling back to the page so the section never traps the visitor.
   ========================================================================== */
(function () {
  'use strict';

  var instances = new WeakMap();

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var self = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(self, args); }, wait);
    };
  }

  function init(root) {
    if (instances.has(root)) return;

    var track = root.querySelector('[data-hijack-track]');
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-hijack-panel]'));
    if (!track || panels.length === 0) return;
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-hijack-dot]'));

    var throttleMs = parseInt(root.getAttribute('data-throttle'), 10) || 1000;
    var touchThreshold = parseInt(root.getAttribute('data-touch-threshold'), 10) || 60;
    var breakpoint = parseInt(root.getAttribute('data-mobile-breakpoint'), 10) || 749;
    var disableOnMobile = root.hasAttribute('data-disable-mobile');
    var reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // All interactive state lives here — never in Liquid.
    var state = {
      active: 0,
      count: panels.length,
      throttled: false,
      hijacking: false,
      bound: false,
      touchStartY: null,
      throttleTimer: null
    };

    function applyActive(animate) {
      if (!animate) track.style.transition = 'none';
      track.style.transform = 'translateY(-' + state.active * 100 + '%)';
      if (!animate) {
        void track.offsetHeight; // flush so the no-transition jump lands first
        track.style.transition = '';
      }
      panels.forEach(function (panel, i) {
        // Off-screen panels are inert while hijacking so Tab can't reach
        // focusables the visitor can't see (no focus trap either way).
        var offscreen = state.hijacking && i !== state.active;
        if (offscreen) panel.setAttribute('inert', '');
        else panel.removeAttribute('inert');
        panel.setAttribute('aria-hidden', offscreen ? 'true' : 'false');
      });
      dots.forEach(function (dot, i) {
        var current = i === state.active;
        dot.classList.toggle('is-active', current);
        if (current) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }

    function goTo(index, animate) {
      state.active = Math.max(0, Math.min(state.count - 1, index));
      applyActive(animate !== false && !reducedQuery.matches);
    }

    // Returns true when a transition actually started — callers use this to
    // decide whether the native event should be swallowed.
    function step(direction) {
      if (state.throttled) return false;
      var next = state.active + direction;
      if (next < 0 || next > state.count - 1) return false; // boundary: release
      state.throttled = true;
      goTo(next);
      state.throttleTimer = setTimeout(function () {
        state.throttled = false;
      }, throttleMs);
      return true;
    }

    /* ---- input handlers (bound to the wrapper only) ---- */

    function onWheel(event) {
      if (!event.deltaY) return;
      var moved = step(event.deltaY > 0 ? 1 : -1);
      // Swallow the gesture while a transition is in flight; at a boundary
      // (nothing moved, not throttled) let the page scroll on past.
      if (moved || state.throttled) event.preventDefault();
    }

    function onTouchStart(event) {
      state.touchStartY = event.touches[0].clientY;
    }

    function onTouchMove(event) {
      if (state.touchStartY === null) return;
      var delta = state.touchStartY - event.touches[0].clientY;
      var released =
        (delta > 0 && state.active === state.count - 1) ||
        (delta < 0 && state.active === 0);
      if (!released) event.preventDefault(); // no native drag inside the viewport
    }

    function onTouchEnd(event) {
      if (state.touchStartY === null) return;
      var delta = state.touchStartY - event.changedTouches[0].clientY;
      state.touchStartY = null;
      if (Math.abs(delta) < touchThreshold) return;
      step(delta > 0 ? 1 : -1);
    }

    function onKeydown(event) {
      // Bound to the wrapper, so this only fires while focus is inside it —
      // arrow keys elsewhere on the page are never intercepted.
      var moved;
      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
          moved = step(1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          moved = step(-1);
          break;
        default:
          return;
      }
      if (moved) event.preventDefault();
    }

    function bind() {
      if (state.bound) return;
      state.bound = true;
      root.addEventListener('wheel', onWheel, { passive: false });
      root.addEventListener('touchstart', onTouchStart, { passive: true });
      root.addEventListener('touchmove', onTouchMove, { passive: false });
      root.addEventListener('touchend', onTouchEnd, { passive: true });
      root.addEventListener('keydown', onKeydown);
    }

    function unbind() {
      if (!state.bound) return;
      state.bound = false;
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('keydown', onKeydown);
    }

    /* Mode switch: hijack vs native stacked scroll (merchant mobile toggle).
       In native mode no hijack listeners are attached at all. */
    function setMode() {
      var native = disableOnMobile && window.innerWidth <= breakpoint;
      state.hijacking = !native;
      root.classList.toggle('is-native', native);
      if (native) {
        unbind();
        track.style.transform = '';
        panels.forEach(function (panel) {
          panel.removeAttribute('inert');
          panel.setAttribute('aria-hidden', 'false');
        });
      } else {
        bind();
        applyActive(false);
      }
    }

    var onResize = debounce(setMode, 150);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    setMode();
    window.addEventListener('resize', onResize, { passive: true });

    instances.set(root, {
      goTo: goTo,
      destroy: function () {
        unbind();
        clearTimeout(state.throttleTimer);
        window.removeEventListener('resize', onResize);
        instances.delete(root);
      }
    });
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-scroll-hijack]').forEach(init);
  }

  function destroyIn(scope) {
    scope.querySelectorAll('[data-scroll-hijack]').forEach(function (root) {
      var instance = instances.get(root);
      if (instance) instance.destroy();
    });
  }

  /* Theme editor lifecycle: sections re-render on every edit. Re-init on
     load (fresh DOM order = fresh panels array/bounds), tear down on unload
     so listeners never double-bind or leak. */
  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target);
  });
  document.addEventListener('shopify:section:unload', function (event) {
    destroyIn(event.target);
  });
  document.addEventListener('shopify:block:select', function (event) {
    var panel = event.target.closest('[data-hijack-panel]');
    if (!panel) return;
    var root = panel.closest('[data-scroll-hijack]');
    var instance = root && instances.get(root);
    if (instance) instance.goTo(parseInt(panel.getAttribute('data-index'), 10) || 0, false);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initAll(document); });
  } else {
    initAll(document);
  }
})();
