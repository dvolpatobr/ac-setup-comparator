/**
 * Parser for Assetto Corsa setup .ini files.
 * @typedef {Record<string, Record<string, string>>} IniSections
 * @typedef {{ version: string | null, sections: IniSections, warnings: string[] }} ParseResult
 */

const DEFAULT_SECTION = "__root__";

/**
 * Strip inline comments (; or //) from a line.
 * @param {string} line
 * @returns {string}
 */
function stripComment(line) {
  let inString = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === ";" || (ch === "/" && line[i + 1] === "/")) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line.trimEnd();
}

/**
 * @param {string} text
 * @returns {ParseResult}
 */
export function parseIni(text) {
  const warnings = [];
  const sections = /** @type {IniSections} */ ({});
  let version = null;
  let currentSection = DEFAULT_SECTION;

  if (!text || !text.trim()) {
    return { version: null, sections: {}, warnings: ["Arquivo vazio."] };
  }

  const lines = text.replace(/\r\n/g, "\n").split("\n");

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const raw = lines[lineNum];
    const line = stripComment(raw.trim());
    if (!line) continue;

    const sectionMatch = line.match(/^\[([^\]]+)\]\s*$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      if (!sections[currentSection]) {
        sections[currentSection] = {};
      }
      continue;
    }

    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) {
      warnings.push(`Linha ${lineNum + 1}: ignorada (sem '=').`);
      continue;
    }

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();

    if (!key) {
      warnings.push(`Linha ${lineNum + 1}: chave vazia.`);
      continue;
    }

    if (currentSection === DEFAULT_SECTION && key.toUpperCase() === "VERSION") {
      version = value;
    }

    if (!sections[currentSection]) {
      sections[currentSection] = {};
    }

    if (sections[currentSection][key] !== undefined) {
      warnings.push(
        `Linha ${lineNum + 1}: chave "${key}" duplicada em [${currentSection}]; último valor usado.`
      );
    }

    sections[currentSection][key] = value;
  }

  if (sections[DEFAULT_SECTION] && Object.keys(sections[DEFAULT_SECTION]).length === 0) {
    delete sections[DEFAULT_SECTION];
  }

  const sectionCount = Object.keys(sections).length;
  if (sectionCount === 0 && !version) {
    warnings.push("Nenhuma seção ou chave válida encontrada.");
  }

  return { version, sections, warnings };
}

/**
 * @param {string} value
 * @returns {number | null}
 */
export function parseNumericValue(value) {
  if (value === "" || value == null) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}
