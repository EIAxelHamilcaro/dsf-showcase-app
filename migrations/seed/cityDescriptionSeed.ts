import { originalSearchTexts } from "./cityModelSeed";

export const sharedDescription = {
  from: "Installation douche sécurisée à {ville} et agglo ({communes}). Artisan certifié. Installation 1 jour.",
  to: "Installation douche sécurisée à {ville} et agglo. Artisan certifié. Installation 1 jour.",
};

export const clientDescriptions = originalSearchTexts.map(
  ({ slug, description }) => ({ slug, description }),
);
