import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Hero", plural: "Hero" },
  fields: [
    {
      name: "location",
      type: "text",
      label: "Localisation",
      admin: {
        description:
          "Ligne affichée avec un repère au dessus du titre (villes)",
      },
    },
    {
      name: "titleBefore",
      type: "text",
      label: "Titre, début",
      required: true,
    },
    {
      name: "titleHighlight",
      type: "text",
      label: "Titre, partie en couleur",
      required: true,
    },
    { name: "titleAfter", type: "text", label: "Titre, fin" },
    { name: "intro", type: "textarea", label: "Introduction", required: true },
    {
      name: "ctaLabel",
      type: "text",
      label: "Libellé du bouton devis",
      required: true,
    },
  ],
};
