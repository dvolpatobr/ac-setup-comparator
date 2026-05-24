import { parseIni } from "./parse-ini.js";
import { diffMappedSetups, STATUS_LABELS } from "./compare.js";
import { loadSetupMap } from "./setup-map.js";
import { getHelpForKey } from "./fha-2025-help.js";
import { initTooltips } from "./tooltip.js";

const fileA = document.getElementById("file-a");
const fileB = document.getElementById("file-b");
const pasteA = document.getElementById("paste-a");
const pasteB = document.getElementById("paste-b");
const filenameA = document.getElementById("filename-a");
const filenameB = document.getElementById("filename-b");
const presetA = document.getElementById("preset-a");
const presetB = document.getElementById("preset-b");
const presetHintA = document.getElementById("preset-hint-a");
const presetHintB = document.getElementById("preset-hint-b");
const btnCompare = document.getElementById("btn-compare");
const btnLoadExamples = document.getElementById("btn-load-examples");
const btnClear = document.getElementById("btn-clear");
const btnDownloadA = document.getElementById("btn-download-a");
const btnDownloadB = document.getElementById("btn-download-b");
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results-section");
const summaryCards = document.getElementById("summary-cards");
const resultsGroups = document.getElementById("results-groups");
const filterDiffsOnly = document.getElementById("filter-diffs-only");
const searchInput = document.getElementById("search-input");
const emptyFilterMsg = document.getElementById("empty-filter-msg");
const mapStatus = document.getElementById("map-status");

/** @type {import("./compare.js").DiffRow[] | null} */
let currentRows = null;

/** @type {import("./setup-map.js").SetupMap | null} */
let setupMap = null;

const PRESET_HELP_TEXT = {
  "setup-cola-total": "Cola Total: máximo downforce, foco em curvas lentas/médias. Pistas: Monaco, Singapore, Hungaroring, Madrid urbano.",
  "setup-ataque-urbano": "Ataque Urbano: alta downforce com boa estabilidade em frenagens. Pistas: Baku, Montreal, Melbourne, Miami.",
  "setup-equilibrio-universal": "Equilíbrio Universal: acerto coringa de médio downforce. Pistas: Barcelona, Áustria, Silverstone, Suzuka, Zandvoort.",
  "setup-reta-com-freada": "Reta com Freada: baixo-médio downforce para retas longas e frenagens fortes. Pistas: Monza, Jeddah, Shanghai, Spa.",
  "setup-velocidade-maxima": "Velocidade Máxima: mínimo downforce para velocidade final. Pistas: Las Vegas, Monza (asa extrema), setores de reta de Baku.",
};

async function initMap() {
  try {
    setupMap = await loadSetupMap();
    if (mapStatus) {
      mapStatus.textContent = `Mapa carregado: ${setupMap.fields.length} parâmetros · RSS Formula Hybrid Alpine`;
    }
  } catch (err) {
    if (mapStatus) {
      mapStatus.textContent = "Mapa de parâmetros não carregado.";
    }
    showError(
      err instanceof Error ? err.message : "Erro ao carregar mapa de setups."
    );
  }
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.hidden = !msg;
}

function getContent(textarea) {
  return textarea.value.trim();
}

function updateCompareButton() {
  const hasA = getContent(pasteA).length > 0;
  const hasB = getContent(pasteB).length > 0;
  btnCompare.disabled = !(hasA && hasB && setupMap);
  btnDownloadA.disabled = !hasA;
  btnDownloadB.disabled = !hasB;
}

function updatePresetHint(selectEl, hintEl) {
  const selected = selectEl.value;
  if (!selected || !PRESET_HELP_TEXT[selected]) {
    const fallback = "Selecione um preset para ver descrição e pistas sugeridas.";
    if (hintEl) hintEl.textContent = fallback;
    return;
  }
  if (hintEl) hintEl.textContent = PRESET_HELP_TEXT[selected];
}

async function loadPreset(presetName, targetTextarea, targetFilename, targetFileInput) {
  if (!presetName) return;
  try {
    const response = await fetch(`examples/${presetName}.ini`);
    if (!response.ok) throw new Error("Não foi possível carregar o preset selecionado.");
    targetTextarea.value = await response.text();
    targetFilename.textContent = `examples/${presetName}.ini`;
    targetFileInput.value = "";
    showError("");
    updateCompareButton();
  } catch (err) {
    showError(err instanceof Error ? err.message : "Erro ao carregar preset.");
  }
}

function downloadSetup(text, fallbackName) {
  const content = text.trim();
  if (!content) return;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fallbackName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function readFile(file, textarea, filenameEl) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    textarea.value = /** @type {string} */ (reader.result);
    filenameEl.textContent = file.name;
    updateCompareButton();
    showError("");
  };
  reader.onerror = () => {
    showError(`Não foi possível ler o arquivo "${file.name}". Use UTF-8.`);
  };
  reader.readAsText(file, "UTF-8");
}

fileA.addEventListener("change", () => {
  const file = fileA.files?.[0];
  if (file) readFile(file, pasteA, filenameA);
});

fileB.addEventListener("change", () => {
  const file = fileB.files?.[0];
  if (file) readFile(file, pasteB, filenameB);
});

pasteA.addEventListener("input", updateCompareButton);
pasteB.addEventListener("input", updateCompareButton);
presetA.addEventListener("change", () => {
  updatePresetHint(presetA, presetHintA);
  loadPreset(presetA.value, pasteA, filenameA, fileA);
});
presetB.addEventListener("change", () => {
  updatePresetHint(presetB, presetHintB);
  loadPreset(presetB.value, pasteB, filenameB, fileB);
});
btnDownloadA.addEventListener("click", () =>
  downloadSetup(getContent(pasteA), "setup-a-export.ini")
);
btnDownloadB.addEventListener("click", () =>
  downloadSetup(getContent(pasteB), "setup-b-export.ini")
);

function parseSetup(text, label) {
  const result = parseIni(text);
  if (result.warnings.length) {
    for (const w of result.warnings) {
      console.warn(`[${label}] ${w}`);
    }
  }
  if (!setupMap) {
    throw new Error("Mapa de parâmetros ainda não foi carregado.");
  }
  return result;
}

function renderSummary(summary) {
  const items = [
    { label: "Iguais", value: summary.equal, className: "summary-card--equal" },
    { label: "Diferentes", value: summary.different, className: "summary-card--diff" },
    { label: "Só em A", value: summary.onlyA, className: "summary-card--only-a" },
    { label: "Só em B", value: summary.onlyB, className: "summary-card--only-b" },
    { label: "Parâmetros", value: summary.total, className: "" },
  ];

  summaryCards.innerHTML = items
    .map(
      (item) => `
    <div class="summary-card ${item.className}">
      <span class="value">${item.value}</span>
      <span class="label">${item.label}</span>
    </div>`
    )
    .join("");
}

function formatDelta(delta) {
  const sign = delta > 0 ? "+" : "";
  return `${sign}${delta}`;
}

function rowMatchesFilter(row) {
  if (filterDiffsOnly.checked && row.status === "equal") return false;
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return true;
  return (
    row.group.toLowerCase().includes(q) ||
    row.title.toLowerCase().includes(q) ||
    row.iniKey.toLowerCase().includes(q)
  );
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderResults() {
  if (!currentRows || !setupMap) return;

  const grouped = new Map();
  for (const row of currentRows) {
    if (!rowMatchesFilter(row)) continue;
    if (!grouped.has(row.group)) grouped.set(row.group, []);
    grouped.get(row.group).push(row);
  }

  let visibleCount = 0;
  const parts = [];

  for (const groupName of setupMap.groups) {
    const rows = grouped.get(groupName);
    if (!rows?.length) continue;

    const cards = rows
      .map((row) => {
        visibleCount++;
        const statusClass = `status-badge--${row.status.replace(/_/g, "-")}`;
        const isDiff = row.status === "different";
        const deltaHtml =
          row.numericDelta != null
            ? `<span class="numeric-delta">Δ ${formatDelta(row.numericDelta)}</span>`
            : "";

        const help = getHelpForKey(row.iniKey);
        const helpBtn = help
          ? `<button
              type="button"
              class="help-trigger"
              data-help-key="${escapeHtml(row.iniKey)}"
              aria-label="Ajuda: ${escapeHtml(help.title)}"
              aria-expanded="false"
              title="O que é este parâmetro?"
            >?</button>`
          : "";

        return `
        <article class="param-card ${isDiff ? "param-card--diff" : ""}">
          <header class="param-card__header">
            <div class="param-card__title-row">
              <h4 class="param-card__title">${escapeHtml(row.title)}</h4>
              ${helpBtn}
            </div>
            <span class="status-badge ${statusClass}">${STATUS_LABELS[row.status]}</span>
          </header>
          <div class="param-card__values">
            <div class="param-value param-value--a">
              <span class="param-value__label">A</span>
              <span class="param-value__text">${escapeHtml(row.displayA)}</span>
            </div>
            <div class="param-value param-value--b">
              <span class="param-value__label">B</span>
              <span class="param-value__text">${escapeHtml(row.displayB)}${deltaHtml}</span>
            </div>
          </div>
          <p class="param-card__key"><code>${escapeHtml(row.iniKey)}</code></p>
        </article>`;
      })
      .join("");

    parts.push(`
      <section class="compare-group" aria-labelledby="group-${slugify(groupName)}">
        <h3 id="group-${slugify(groupName)}" class="compare-group__title">${escapeHtml(groupName)}</h3>
        <div class="param-grid">${cards}</div>
      </section>`);
  }

  resultsGroups.innerHTML = parts.join("");
  emptyFilterMsg.hidden = visibleCount > 0;
  initTooltips(resultsGroups);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function runCompare() {
  showError("");
  try {
    if (!setupMap) throw new Error("Mapa de parâmetros não carregado.");

    const setupA = parseSetup(getContent(pasteA), "Setup A");
    const setupB = parseSetup(getContent(pasteB), "Setup B");

    const { rows, summary } = diffMappedSetups(
      setupA.sections,
      setupB.sections,
      setupMap
    );
    currentRows = rows;

    if (rows.length === 0) {
      throw new Error(
        "Nenhum parâmetro do mapa foi encontrado nos setups. Verifique se os arquivos são do RSS Formula Hybrid Alpine."
      );
    }

    renderSummary(summary);
    resultsSection.hidden = false;
    renderResults();
  } catch (err) {
    resultsSection.hidden = true;
    currentRows = null;
    showError(err instanceof Error ? err.message : "Erro ao comparar setups.");
  }
}

btnCompare.addEventListener("click", runCompare);
filterDiffsOnly.addEventListener("change", renderResults);
searchInput.addEventListener("input", renderResults);

async function loadExamples() {
  try {
    const [resA, resB] = await Promise.all([
      fetch("examples/setup-a.ini"),
      fetch("examples/setup-b.ini"),
    ]);
    if (!resA.ok || !resB.ok) {
      throw new Error("Não foi possível carregar os arquivos de exemplo.");
    }
    pasteA.value = await resA.text();
    pasteB.value = await resB.text();
    filenameA.textContent = "examples/setup-a.ini";
    filenameB.textContent = "examples/setup-b.ini";
    updateCompareButton();
    showError("");
    runCompare();
  } catch (err) {
    showError(
      err instanceof Error
        ? err.message
        : "Exemplos disponíveis apenas via servidor ou GitHub Pages."
    );
  }
}

btnLoadExamples.addEventListener("click", loadExamples);

btnClear.addEventListener("click", () => {
  pasteA.value = "";
  pasteB.value = "";
  fileA.value = "";
  fileB.value = "";
  presetA.value = "";
  presetB.value = "";
  updatePresetHint(presetA, presetHintA);
  updatePresetHint(presetB, presetHintB);
  filenameA.textContent = "Nenhum arquivo";
  filenameB.textContent = "Nenhum arquivo";
  filterDiffsOnly.checked = false;
  searchInput.value = "";
  resultsSection.hidden = true;
  currentRows = null;
  resultsGroups.innerHTML = "";
  summaryCards.innerHTML = "";
  showError("");
  updateCompareButton();
});

initMap().then(updateCompareButton);
updatePresetHint(presetA, presetHintA);
updatePresetHint(presetB, presetHintB);
