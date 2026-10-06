export const placeholderNames = ["ville", "departement", "code"] as const;

export const retiredPlaceholderNames = ["communes"];

export type PlaceholderName = (typeof placeholderNames)[number];

export type PlaceholderValues = Record<PlaceholderName, string>;

const placeholderPattern = /\{([^{}]*)\}/g;

const isPlaceholderName = (name: string): name is PlaceholderName =>
  placeholderNames.some((known) => known === name);

export function findUnknownPlaceholders(
  text: string,
  alsoAccepted: string[] = [],
): string[] {
  const names = [...text.matchAll(placeholderPattern)].map(
    ([, name = ""]) => name,
  );

  return [
    ...new Set(
      names.filter(
        (name) => !(isPlaceholderName(name) || alsoAccepted.includes(name)),
      ),
    ),
  ];
}

export function fillPlaceholders(
  text: string,
  values: PlaceholderValues,
): string {
  return text.replace(placeholderPattern, (match, name: string) =>
    isPlaceholderName(name) ? values[name] : match,
  );
}

export function fillAllPlaceholders<T>(value: T, values: PlaceholderValues): T {
  if (typeof value === "string") {
    return fillPlaceholders(value, values) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => fillAllPlaceholders(item, values)) as T;
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        fillAllPlaceholders(child, values),
      ]),
    ) as T;
  }

  return value;
}

export interface PlaceholderProblem {
  path: string;
  names: string[];
}

export function listPlaceholderProblems(
  value: unknown,
  alsoAccepted: string[] = [],
  path = "",
): PlaceholderProblem[] {
  if (typeof value === "string") {
    const names = findUnknownPlaceholders(value, alsoAccepted);

    return names.length > 0 ? [{ path, names }] : [];
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    listPlaceholderProblems(child, alsoAccepted, path ? `${path}.${key}` : key),
  );
}
