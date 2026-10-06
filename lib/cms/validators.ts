import { reservedSlugs } from "../site";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sirenPattern = /^\d{9}$/;
const internalPathPattern = /^\/(?![/\\])[^\s\\]*$/;

export function validateSlug(value: string | null | undefined): true | string {
  if (!value) {
    return "Le slug est obligatoire";
  }

  if (!slugPattern.test(value)) {
    return "Le slug ne contient que des minuscules, des chiffres et des tirets simples";
  }

  if (reservedSlugs.includes(value)) {
    return "Ce slug est réservé au fonctionnement du site";
  }

  return true;
}

export function validateInternalPath(
  value: string | null | undefined,
): true | string {
  if (!value) {
    return true;
  }

  if (!internalPathPattern.test(value)) {
    return "Le lien doit commencer par / (page du site, sans espace)";
  }

  return true;
}

export function validateRequiredInternalPath(
  value: string | null | undefined,
): true | string {
  if (!value) {
    return "Le lien est obligatoire";
  }

  return validateInternalPath(value);
}

export function validateReviewRating(
  value: number | null | undefined,
): true | string {
  if (value === null || value === undefined) {
    return true;
  }

  if (!Number.isInteger(value) || value < 1 || value > 5) {
    return "La note est un nombre entier de 1 à 5";
  }

  return true;
}

export function validateReviewCount(
  value: number | null | undefined,
): true | string {
  if (value === null || value === undefined) {
    return true;
  }

  if (!Number.isInteger(value) || value < 0) {
    return "Le nombre d'avis est un nombre entier, 0 ou plus";
  }

  return true;
}

export function validateHttpsUrl(
  value: string | null | undefined,
): true | string {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    if (url.protocol === "https:" && url.hostname.includes(".")) {
      return true;
    }
  } catch {
    return "Le lien doit être une adresse https complète";
  }

  return "Le lien doit être une adresse https complète";
}

export function validateSiren(value: string | null | undefined): true | string {
  if (!value) {
    return true;
  }

  if (!sirenPattern.test(value)) {
    return "Le SIREN comporte exactement 9 chiffres";
  }

  return true;
}
