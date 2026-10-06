import type { Block } from "payload";
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
  ],
};
