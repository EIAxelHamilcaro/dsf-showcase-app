import type { Block } from "payload";
import { validateInternalPath } from "../../lib/cms/validators";
import { backgroundField } from "./shared";

export const ServiceCardsBlock: Block = {
  slug: "serviceCards",
  interfaceName: "ServiceCardsBlock",
  labels: {
    singular: "Cartes de prestations",
    plural: "Cartes de prestations",
  },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    {
      name: "columns",
      type: "select",
      label: "Colonnes",
      required: true,
      defaultValue: "2",
      options: [
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    },
    {
      name: "cards",
      type: "array",
      label: "Cartes",
      required: true,
      minRows: 1,
      fields: [
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "description", type: "textarea", label: "Description" },
        {
          name: "bullets",
          type: "array",
          label: "Liste à puces",
          fields: [
            { name: "text", type: "text", label: "Texte", required: true },
          ],
        },
        { name: "linkLabel", type: "text", label: "Libellé du lien" },
        {
          name: "linkHref",
          type: "text",
          label: "Lien",
          validate: validateInternalPath,
        },
      ],
    },
  ],
};
