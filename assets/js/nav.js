/* Mobile navigation toggle.
   Progressive enhancement: without JS the nav is still reachable, since the
   panel is only hidden at the mobile breakpoint and every page links to every
   other page from the footer. */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (!toggle || !nav) { return; }

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Close on Escape and return focus to the toggle.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close when a link is chosen (matters for same-page #anchors, which do not
  // trigger a page load and would otherwise leave the panel covering content).
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { setOpen(false); }
  });

  // Reset state if the viewport grows past the mobile breakpoint while open,
  // so the desktop nav never inherits a stale is-open class.
  var mq = window.matchMedia('(min-width: 861px)');
  var onChange = function (e) { if (e.matches) { setOpen(false); } };

  if (mq.addEventListener) {
    mq.addEventListener('change', onChange);
  } else if (mq.addListener) {
    mq.addListener(onChange); // Safari < 14
  }
})();
