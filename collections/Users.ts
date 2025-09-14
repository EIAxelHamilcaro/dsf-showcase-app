import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    plural: "Utilisateurs",
    singular: "Utilisateur",
  },
  admin: {
    useAsTitle: "",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
