import type { GlobalConfig } from "payload";

export const Parameters: GlobalConfig = {
  slug: "parameters",
  label: "Paramètres",
  fields: [
    {
      name: "phone",
      label: "Numero de téléphone",
      type: "text",
    },
    {
      name: "email",
      label: "Adresse email",
      type: "email",
    },
  ],
};
