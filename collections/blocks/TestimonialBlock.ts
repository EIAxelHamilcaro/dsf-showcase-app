import type { Block } from "payload";
import { validateReviewRating } from "../../lib/cms/validators";
import { backgroundField } from "./shared";

export const TestimonialBlock: Block = {
  slug: "testimonial",
  interfaceName: "TestimonialBlock",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  fields: [
    backgroundField,
    {
      name: "quote",
      type: "textarea",
      label: "Avis (sans guillemets)",
      required: true,
    },
    { name: "author", type: "text", label: "Signature", required: true },
    {
      name: "rating",
      type: "number",
      label: "Note sur 5",
      min: 1,
      max: 5,
      validate: validateReviewRating,
      admin: {
        description:
          "Note donnée par le client, entier de 1 à 5. Laisser vide pour ne pas afficher d'étoiles.",
      },
    },
  ],
};
