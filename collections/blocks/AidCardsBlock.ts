import type { Block } from "payload";
import { validateInternalPath } from "../../lib/cms/validators";
import { backgroundField, iconField } from "./shared";

export const AidCardsBlock: Block = {
  slug: "aidCards",
  interfaceName: "AidCardsBlock",
  labels: { singular: "Aides financières", plural: "Aides financières" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    { name: "intro", type: "textarea", label: "Texte d'introduction" },
    {
      name: "cards",
      type: "array",
      label: "Cartes d'aides",
      fields: [
        iconField,
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "text", type: "textarea", label: "Texte", required: true },
        { name: "highlight", type: "text", label: "Ligne mise en avant" },
        {
          name: "details",
          type: "array",
          label: "Détails",
          fields: [
            { name: "label", type: "text", label: "Intitulé", required: true },
            { name: "text", type: "text", label: "Valeur", required: true },
          ],
        },
        { name: "note", type: "textarea", label: "Encadré" },
      ],
    },
    { name: "buttonLabel", type: "text", label: "Libellé du bouton" },
    {
      name: "buttonHref",
      type: "text",
      label: "Lien du bouton",
      validate: validateInternalPath,
    },
  ],
};
