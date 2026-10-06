import type { Block } from "payload";
import { validateRequiredInternalPath } from "../../lib/cms/validators";
import { backgroundField } from "./shared";

export const LinkCardsBlock: Block = {
  slug: "linkCards",
  interfaceName: "LinkCardsBlock",
  labels: { singular: "Cartes de liens", plural: "Cartes de liens" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    { name: "intro", type: "textarea", label: "Texte d'introduction" },
    {
      name: "links",
      type: "array",
      label: "Liens",
      required: true,
      minRows: 1,
      fields: [
        { name: "label", type: "text", label: "Titre", required: true },
        {
          name: "description",
          type: "text",
          label: "Sous-titre",
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: "Lien",
          required: true,
          validate: validateRequiredInternalPath,
        },
      ],
    },
  ],
};
