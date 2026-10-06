import type { Block } from "payload";

export const CtaBlock: Block = {
  slug: "cta",
  interfaceName: "CtaBlock",
  labels: { singular: "Appel à l'action", plural: "Appels à l'action" },
  fields: [
    { name: "heading", type: "text", label: "Titre", required: true },
    { name: "text", type: "textarea", label: "Texte", required: true },
    {
      name: "ctaLabel",
      type: "text",
      label: "Libellé du bouton devis",
      required: true,
    },
    {
      name: "phoneLabel",
      type: "text",
      label: "Libellé du bouton téléphone",
      admin: {
        description: "Laisser vide pour afficher le numéro de téléphone",
      },
    },
  ],
};
