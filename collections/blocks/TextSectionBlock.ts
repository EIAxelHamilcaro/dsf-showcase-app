import type { Block } from "payload";
import { backgroundField } from "./shared";

export const TextSectionBlock: Block = {
  slug: "textSection",
  interfaceName: "TextSectionBlock",
  labels: { singular: "Section de texte", plural: "Sections de texte" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    {
      name: "paragraphs",
      type: "array",
      label: "Paragraphes",
      required: true,
      minRows: 1,
      fields: [
        { name: "text", type: "textarea", label: "Texte", required: true },
      ],
    },
  ],
};
