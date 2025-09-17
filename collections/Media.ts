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
  fields: [],
};
