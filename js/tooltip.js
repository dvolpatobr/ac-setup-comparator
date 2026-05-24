/** @typedef {import("./fha-2025-help.js").HelpEntry} HelpEntry */

import { getHelpForKey } from "./fha-2025-help.js";

let tooltipEl = null;
let activeTrigger = null;

function ensureTooltip() {
  if (tooltipEl) return tooltipEl;
  tooltipEl = document.createElement("div");
  tooltipEl.id = "setup-tooltip";
  tooltipEl.className = "setup-tooltip";
  tooltipEl.setAttribute("role", "tooltip");
  tooltipEl.hidden = true;
  document.body.appendChild(tooltipEl);
  return tooltipEl;
}

/**
 * @param {HTMLElement} trigger
 * @param {HelpEntry} help
 */
function showTooltip(trigger, help) {
  const el = ensureTooltip();
  activeTrigger = trigger;

  el.innerHTML = `
    <header class="setup-tooltip__header">
      <strong class="setup-tooltip__title">${escapeHtml(help.title)}</strong>
      <button type="button" class="setup-tooltip__close" aria-label="Fechar">×</button>
    </header>
    <p class="setup-tooltip__body">${escapeHtml(help.body)}</p>
    ${help.source ? `<p class="setup-tooltip__source">${escapeHtml(help.source)}</p>` : ""}
  `;

  el.hidden = false;
  trigger.setAttribute("aria-expanded", "true");

  el.querySelector(".setup-tooltip__close")?.addEventListener("click", hideTooltip, {
    once: true,
  });

  positionTooltip(trigger, el);
}

function hideTooltip() {
  if (!tooltipEl) return;
  tooltipEl.hidden = true;
  if (activeTrigger) {
    activeTrigger.setAttribute("aria-expanded", "false");
    activeTrigger = null;
  }
}

/**
 * @param {HTMLElement} trigger
 * @param {HTMLElement} el
 */
function positionTooltip(trigger, el) {
  const margin = 12;
  const rect = trigger.getBoundingClientRect();
  el.style.visibility = "hidden";
  el.hidden = false;
  const tipRect = el.getBoundingClientRect();
  el.style.visibility = "";

  let top = rect.bottom + margin;
  let left = rect.left + rect.width / 2 - tipRect.width / 2;

  if (left + tipRect.width > window.innerWidth - margin) {
    left = window.innerWidth - tipRect.width - margin;
  }
  if (left < margin) left = margin;

  if (top + tipRect.height > window.innerHeight - margin) {
    top = rect.top - tipRect.height - margin;
  }
  if (top < margin) top = margin;

  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function onDocumentClick(e) {
  const target = /** @type {HTMLElement} */ (e.target);
  if (
    tooltipEl &&
    !tooltipEl.hidden &&
    !tooltipEl.contains(target) &&
    !target.closest(".help-trigger")
  ) {
    hideTooltip();
  }
}

function onKeyDown(e) {
  if (e.key === "Escape") hideTooltip();
}

/**
 * @param {HTMLElement} root
 */
export function initTooltips(root) {
  root.querySelectorAll(".help-trigger").forEach((btn) => {
    const key = btn.getAttribute("data-help-key");
    if (!key) return;
    if (btn.dataset.tooltipBound === "true") return;
    btn.dataset.tooltipBound = "true";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const help = getHelpForKey(key);
      if (!help) return;

      if (activeTrigger === btn && tooltipEl && !tooltipEl.hidden) {
        hideTooltip();
        return;
      }
      hideTooltip();
      showTooltip(/** @type {HTMLElement} */ (btn), help);
    });
  });

}

if (!window.__setupTooltipInit) {
  window.__setupTooltipInit = true;
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onKeyDown);
  window.addEventListener(
    "resize",
    () => {
      if (activeTrigger && tooltipEl && !tooltipEl.hidden) {
        positionTooltip(activeTrigger, tooltipEl);
      }
    },
    { passive: true }
  );
}

export { hideTooltip };
