import { parseNumericValue } from "./parse-ini.js";

/**
 * @typedef {{ type: 'enum', labels: Map<string, string> }} EnumRule
 * @typedef {{ type: 'range', min: number, max: number, modifiers?: string }} RangeRule
 */

/**
 * @typedef {Object} SetupField
 * @property {string} iniKey
 * @property {string} title
 * @property {string} group
 * @property {Array<EnumRule | RangeRule>} rules
 */

/**
 * @typedef {Object} SetupMap
 * @property {SetupField[]} fields
 * @property {Map<string, SetupField>} byKey
 * @property {string[]} groups
 */

const GROUP_LINE = /^---\s*(.+?)\s*---\s*$/;
const SECTION_LINE = /^\[([^\]]+)\]\s*(.*)$/;
const VALUE_LINE = /^VALUE=(.+)$/i;

/**
 * @param {string} rest
 * @returns {string}
 */
function parseSectionTitle(rest) {
  const trimmed = rest.trim();
  if (!trimmed) return "";

  const sameAs = trimmed.match(/SAME AS\s+"([^"]+)"/i);
  if (sameAs) return sameAs[1].trim();

  const quoted = trimmed.match(/^"([^"]+)"\s*$/);
  if (quoted) return quoted[1].trim();

  const dashQuoted = trimmed.match(/^-\s*"([^"]+)"\s*$/);
  if (dashQuoted) return dashQuoted[1].trim();

  const dashPlain = trimmed.match(/^-\s*(.+)$/);
  if (dashPlain) return dashPlain[1].trim();

  return "";
}

/**
 * @param {string} valuePart
 * @returns {EnumRule | RangeRule | null}
 */
function parseValueRule(valuePart) {
  const trimmed = valuePart.trim();

  const enumMatch = trimmed.match(/^(-?\d+(?:\.\d+)?)\s*-\s*(.+)$/);
  if (enumMatch) {
    return {
      type: "enum",
      labels: new Map([[enumMatch[1], enumMatch[2].trim()]]),
    };
  }

  const rangeMatch = trimmed.match(
    /^from\s+(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?)(?:\s*,\s*(.+))?$/i
  );
  if (rangeMatch) {
    return {
      type: "range",
      min: Number(rangeMatch[1]),
      max: Number(rangeMatch[2]),
      modifiers: rangeMatch[3]?.trim() ?? "",
    };
  }

  const singleNum = trimmed.match(/^(-?\d+(?:\.\d+)?)$/);
  if (singleNum) {
    return {
      type: "range",
      min: Number(singleNum[1]),
      max: Number(singleNum[1]),
      modifiers: "",
    };
  }

  return null;
}

/**
 * @param {string} text
 * @returns {SetupMap}
 */
export function parseSetupMap(text) {
  /** @type {SetupField[]} */
  const fields = [];
  const byKey = new Map();
  const groups = [];
  let currentGroup = "Geral";
  /** @type {SetupField | null} */
  let currentField = null;

  const lines = text.replace(/\r\n/g, "\n").split("\n");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const groupMatch = line.match(GROUP_LINE);
    if (groupMatch) {
      currentGroup = groupMatch[1].trim();
      if (!groups.includes(currentGroup)) groups.push(currentGroup);
      currentField = null;
      continue;
    }

    const sectionMatch = line.match(SECTION_LINE);
    if (sectionMatch) {
      const iniKey = sectionMatch[1].trim();
      const titleFromLine = parseSectionTitle(sectionMatch[2]);
      const title = titleFromLine || humanizeKey(iniKey);

      if (!groups.includes(currentGroup)) groups.push(currentGroup);

      currentField = {
        iniKey,
        title,
        group: currentGroup,
        rules: [],
      };

      const existing = byKey.get(iniKey);
      if (existing) {
        existing.title = title;
        existing.group = currentGroup;
        existing.rules = [];
        currentField = existing;
      } else {
        fields.push(currentField);
        byKey.set(iniKey, currentField);
      }
      continue;
    }

    const valueMatch = line.match(VALUE_LINE);
    if (valueMatch && currentField) {
      const rule = parseValueRule(valueMatch[1]);
      if (!rule) continue;

      if (rule.type === "enum") {
        const last = currentField.rules[currentField.rules.length - 1];
        if (last?.type === "enum") {
          for (const [k, v] of rule.labels) last.labels.set(k, v);
        } else {
          currentField.rules.push(rule);
        }
      } else {
        currentField.rules.push(rule);
      }
    }
  }

  return { fields, byKey, groups };
}

/**
 * @param {string} key
 */
function humanizeKey(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * @param {Record<string, Record<string, string>>} sections
 * @param {string} iniKey
 * @returns {string | null}
 */
export function extractSetupValue(sections, iniKey) {
  const block = sections[iniKey];
  if (!block) return null;
  if (Object.prototype.hasOwnProperty.call(block, "VALUE")) {
    return block.VALUE;
  }
  const keys = Object.keys(block);
  if (keys.length === 1) return block[keys[0]];
  return null;
}

/**
 * @param {string | null} raw
 * @param {SetupField} field
 * @returns {string}
 */
export function formatDisplayValue(raw, field) {
  if (raw == null || raw === "") return "—";

  const num = parseNumericValue(raw);
  const rawKey = String(raw).trim();

  for (const rule of field.rules) {
    if (rule.type === "enum") {
      if (rule.labels.has(rawKey)) return rule.labels.get(rawKey);
      if (num != null && rule.labels.has(String(num))) {
        return rule.labels.get(String(num));
      }
    }
  }

  if (num == null) return rawKey;

  for (const rule of field.rules) {
    if (rule.type !== "range" || !rule.modifiers) continue;
    const formatted = applyRangeModifiers(num, rule);
    if (formatted != null) return formatted;
  }

  for (const rule of field.rules) {
    if (rule.type === "range" && rule.modifiers) continue;
    if (rule.type === "range") return String(num);
  }

  return String(num);
}

/**
 * @param {number} num
 * @param {RangeRule} rule
 * @returns {string | null}
 */
function applyRangeModifiers(num, rule) {
  const m = rule.modifiers;
  if (!m) return null;

  if (/show in percents/i.test(m)) {
    return `${num}%`;
  }

  const fractionMatch = m.match(
    /showing as a fraction,\s*where\s+(-?\d+(?:\.\d+)?)\s+is\s+(\d+)\/(\d+)\s+and\s+(-?\d+(?:\.\d+)?)\s+is\s+(\d+)\/(\d+)/i
  );
  if (fractionMatch) {
    const startRaw = Number(fractionMatch[1]);
    const startNum = Number(fractionMatch[2]);
    const denom = Number(fractionMatch[3]);
    const numer = startNum + (num - startRaw);
    if (numer >= 1 && numer <= denom) return `${numer}/${denom}`;
  }

  const offsetMatch = m.match(
    /showing start by\s+(-?\d+(?:\.\d+)?)(?:%)?\s*,\s*where\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)(?:%)?\s*,\s*and\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)(?:%)?/i
  );
  if (offsetMatch) {
    const rawMin = Number(offsetMatch[2]);
    const rawMax = Number(offsetMatch[4]);
    const dispMin = Number(offsetMatch[3]);
    const dispMax = Number(offsetMatch[5]);
    const t = rawMax === rawMin ? 0 : (num - rawMin) / (rawMax - rawMin);
    const value = dispMin + t * (dispMax - dispMin);
    const hasPercent = m.includes("%");
    return hasPercent ? `${value.toFixed(2)}%` : formatNumber(value);
  }

  const startByMatch = m.match(
    /showing start by\s+(-?\d+(?:\.\d+)?)\s*,\s*where\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)/i
  );
  if (startByMatch && /where\s+0\s+is\s+1/i.test(m)) {
    return String(num + Number(startByMatch[3]));
  }

  const brakeMigrMatch = m.match(
    /where\s+(-?\d+(?:\.\d+)?)\s+is\s+(-?\d+(?:\.\d+)?)\s+and\s+(-?\d+(?:\.\d+)?)\s+is\s+(\+?-?\d+(?:\.\d+)?)/i
  );
  if (brakeMigrMatch && m.includes("0.0 from")) {
    const rawMin = Number(brakeMigrMatch[1]);
    const rawMax = Number(brakeMigrMatch[3]);
    const dispMin = Number(brakeMigrMatch[2]);
    const dispMax = Number(String(brakeMigrMatch[4]).replace("+", ""));
    const t = rawMax === rawMin ? 0 : (num - rawMin) / (rawMax - rawMin);
    const value = dispMin + t * (dispMax - dispMin);
    const sign = value > 0 ? "+" : "";
    return `${sign}${formatNumber(value)}`;
  }

  const percentRamp = m.match(/where\s+0\s+is\s+0%\s+and\s+(\d+)\s+is\s+100%/i);
  if (percentRamp) {
    const rawMax = Number(percentRamp[1]);
    const pct = rawMax === 0 ? 0 : (num / rawMax) * 100;
    return `${Math.round(pct)}%`;
  }

  return null;
}

/**
 * @param {number} n
 */
function formatNumber(n) {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, "");
}

/** @type {SetupMap | null} */
let cachedMap = null;

const MAP_URL = "examples/map-setup-assetto-FH%20Alpine.txt";

/**
 * @returns {Promise<SetupMap>}
 */
export async function loadSetupMap() {
  if (cachedMap) return cachedMap;
  const res = await fetch(MAP_URL);
  if (!res.ok) {
    throw new Error("Não foi possível carregar o mapa de setups (FH Alpine).");
  }
  cachedMap = parseSetupMap(await res.text());
  return cachedMap;
}
