import type { Block } from "payload";
import { validateHttpsUrl } from "../../lib/cms/validators";
import { backgroundField } from "./shared";

export const FaqBlock: Block = {
  slug: "faq",
  interfaceName: "FaqBlock",
  labels: { singular: "Questions fréquentes", plural: "Questions fréquentes" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    {
      name: "items",
      type: "array",
      label: "Questions",
      required: true,
      minRows: 1,
      fields: [
        { name: "question", type: "text", label: "Question", required: true },
        { name: "answer", type: "textarea", label: "Réponse", required: true },
        {
          name: "sources",
          type: "array",
          label: "Sources officielles",
          admin: {
            description:
              "Affichées sous la réponse, avec un lien vers la page officielle",
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: "Nom de la source et date de vérification",
              required: true,
            },
            {
              name: "url",
              type: "text",
              label: "Lien https",
              required: true,
              validate: validateHttpsUrl,
            },
          ],
        },
      ],
    },
  ],
};
