import { parseNumericValue } from "./parse-ini.js";
import { extractSetupValue, formatDisplayValue } from "./setup-map.js";

/** @typedef {"equal" | "different" | "only_a" | "only_b"} DiffStatus */

/**
 * @typedef {import("./setup-map.js").SetupMap} SetupMap
 * @typedef {import("./setup-map.js").SetupField} SetupField
 */

/**
 * @typedef {Object} DiffRow
 * @property {string} group
 * @property {string} title
 * @property {string} iniKey
 * @property {string | null} rawA
 * @property {string | null} rawB
 * @property {string} displayA
 * @property {string} displayB
 * @property {DiffStatus} status
 * @property {string | null} displayDelta
 */

/**
 * @typedef {Object} DiffSummary
 * @property {number} equal
 * @property {number} different
 * @property {number} onlyA
 * @property {number} onlyB
 * @property {number} total
 */

/**
 * @param {Record<string, Record<string, string>>} sectionsA
 * @param {Record<string, Record<string, string>>} sectionsB
 * @param {SetupMap} map
 * @returns {{ rows: DiffRow[], summary: DiffSummary }}
 */
export function diffMappedSetups(sectionsA, sectionsB, map) {
  const rows = /** @type {DiffRow[]} */ ([]);
  const summary = { equal: 0, different: 0, onlyA: 0, onlyB: 0, total: 0 };

  for (const field of map.fields) {
    const rawA = extractSetupValue(sectionsA, field.iniKey);
    const rawB = extractSetupValue(sectionsB, field.iniKey);
    const hasA = rawA != null;
    const hasB = rawB != null;

    if (!hasA && !hasB) continue;

    let status;
    if (hasA && hasB) {
      status = rawA === rawB ? "equal" : "different";
    } else if (hasA) {
      status = "only_a";
    } else {
      status = "only_b";
    }

    let displayDelta = null;
    const displayA = formatDisplayValue(rawA, field);
    const displayB = formatDisplayValue(rawB, field);
    if (status === "different" && rawA != null && rawB != null) {
      const numA = parseNumericValue(rawA);
      const numB = parseNumericValue(rawB);
      if (numA != null && numB != null) {
        displayDelta = formatDisplayDelta(displayA, displayB, numB - numA);
      }
    }

    rows.push({
      group: field.group,
      title: field.title,
      iniKey: field.iniKey,
      rawA,
      rawB,
      displayA,
      displayB,
      status,
      displayDelta,
    });

    summary.total++;
    if (status === "equal") summary.equal++;
    else if (status === "different") summary.different++;
    else if (status === "only_a") summary.onlyA++;
    else summary.onlyB++;
  }

  return { rows, summary };
}

/** @type {Record<DiffStatus, string>} */
export const STATUS_LABELS = {
  equal: "igual",
  different: "diferente",
  only_a: "só em A",
  only_b: "só em B",
};

function formatDisplayDelta(displayA, displayB, rawDelta) {
  const parsedA = parseDisplayedNumber(displayA);
  const parsedB = parseDisplayedNumber(displayB);

  if (parsedA && parsedB && parsedA.suffix === parsedB.suffix) {
    return formatSignedNumber(parsedB.value - parsedA.value, parsedA.suffix);
  }

  return formatSignedNumber(rawDelta, "");
}

function parseDisplayedNumber(value) {
  const match = String(value).trim().match(/^(-?\d+(?:\.\d+)?)(%)?$/);
  if (!match) return null;
  return {
    value: Number(match[1]),
    suffix: match[2] ?? "",
  };
}

function formatSignedNumber(value, suffix) {
  const sign = value > 0 ? "+" : "";
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(/\.?0+$/, "");
  return `${sign}${formatted}${suffix}`;
}
