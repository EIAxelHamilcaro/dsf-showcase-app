const inlineTags = new Set([
  "a",
  "abbr",
  "b",
  "strong",
  "em",
  "i",
  "span",
  "small",
  "sub",
  "sup",
  "u",
  "mark",
  "label",
]);

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  rarr: "→",
};

const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9-]*)(?:"[^"]*"|'[^']*'|[^'">])*>/g;
const attributePart = `(?:"[^"]*"|'[^']*'|[^'">])*`;

export interface ExtractOptions {
  ignoredNavLabels?: string[];
}

export function decodeEntities(text: string): string {
  return text.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (match, entity: string) => {
      if (entity.startsWith("#x") || entity.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
      }

      if (entity.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
      }

      return namedEntities[entity.toLowerCase()] ?? match;
    },
  );
}

function escapePattern(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeNav(html: string, label: string): string {
  const labelPattern = escapePattern(label).replace(/'/g, "(?:'|&#x27;|&#39;)");
  const pattern = new RegExp(
    `<nav\\b${attributePart}aria-label="${labelPattern}"${attributePart}>[\\s\\S]*?<\\/nav>`,
    "g",
  );

  return html.replace(pattern, " ");
}

export function extractMainText(
  html: string,
  options: ExtractOptions = {},
): string {
  const start = html.indexOf("<main");
  const end = html.lastIndexOf("</main>");

  if (start === -1 || end === -1 || end < start) {
    throw new Error("No <main> element found in the page");
  }

  const withoutNavs = (options.ignoredNavLabels ?? []).reduce(
    removeNav,
    html.slice(start, end),
  );

  const text = withoutNavs
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template|noscript|svg)\b[\s\S]*?<\/\1>/gi, "")
    .replace(tagPattern, (_tag, name: string) =>
      inlineTags.has(name.toLowerCase()) ? "" : " ",
    );

  return decodeEntities(text).replace(/\s+/g, " ").trim();
}
