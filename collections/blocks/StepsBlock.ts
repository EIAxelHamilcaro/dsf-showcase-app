import type { Block } from "payload";
import { backgroundField } from "./shared";

export const StepsBlock: Block = {
  slug: "steps",
  interfaceName: "StepsBlock",
  labels: { singular: "Étapes", plural: "Étapes" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    {
      name: "withCards",
      type: "checkbox",
      label: "Chaque étape dans une carte",
      defaultValue: false,
    },
    {
      name: "items",
      type: "array",
      label: "Étapes",
      required: true,
      minRows: 1,
      fields: [
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "text", type: "textarea", label: "Texte", required: true },
      ],
    },
  ],
};
