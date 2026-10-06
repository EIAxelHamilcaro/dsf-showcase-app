import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [], // ou avec des tailles si tu veux
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texte alternatif",
      admin: {
        description:
          "Description courte de l'image, lue par les lecteurs d'écran",
      },
    },
  ],
};
