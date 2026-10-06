import type { CollectionConfig } from "payload";
import {
  revalidateSiteAfterChange,
  revalidateSiteAfterDelete,
} from "./hooks/revalidateSite";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    imageSizes: [], // ou avec des tailles si tu veux
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSiteAfterChange],
    afterDelete: [revalidateSiteAfterDelete],
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
