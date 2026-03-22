/**
 * Smoothly scroll to a section by CSS selector.
 * @param {string} selector - e.g. '#contact'
 */
export function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
}
