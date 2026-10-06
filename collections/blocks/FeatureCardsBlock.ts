import type { Block } from "payload";
import { backgroundField, iconField } from "./shared";

export const FeatureCardsBlock: Block = {
  slug: "featureCards",
  interfaceName: "FeatureCardsBlock",
  labels: { singular: "Cartes d'arguments", plural: "Cartes d'arguments" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre de section" },
    { name: "intro", type: "textarea", label: "Texte d'introduction" },
    {
      name: "layout",
      type: "select",
      label: "Présentation des cartes",
      required: true,
      defaultValue: "centered",
      options: [
        { label: "Icône au dessus, centré", value: "centered" },
        { label: "Icône au dessus, aligné à gauche", value: "left" },
        { label: "Icône dans le titre", value: "inline" },
      ],
    },
    {
      name: "columns",
      type: "select",
      label: "Colonnes",
      required: true,
      defaultValue: "4",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    {
      name: "spacing",
      type: "select",
      label: "Espacement des cartes centrées sur 4 colonnes",
      defaultValue: "compact",
      options: [
        { label: "Serré, 4 colonnes dès la tablette", value: "compact" },
        {
          label: "Aéré, 2 colonnes sur tablette puis 4 sur grand écran",
          value: "spacious",
        },
      ],
      admin: {
        condition: (_data, siblingData) =>
          siblingData?.layout === "centered" && siblingData?.columns === "4",
      },
    },
    {
      name: "cards",
      type: "array",
      label: "Cartes",
      required: true,
      minRows: 1,
      fields: [
        iconField,
        { name: "title", type: "text", label: "Titre", required: true },
        { name: "text", type: "textarea", label: "Texte", required: true },
      ],
    },
  ],
};
