import type { Block } from "payload";
import { backgroundField } from "./shared";

export const ZoneListBlock: Block = {
  slug: "zoneList",
  interfaceName: "ZoneListBlock",
  labels: { singular: "Liste de zones", plural: "Listes de zones" },
  fields: [
    backgroundField,
    { name: "heading", type: "text", label: "Titre", required: true },
    {
      name: "showMapIcon",
      type: "checkbox",
      label: "Repère à côté du titre",
      defaultValue: false,
    },
    {
      name: "columns",
      type: "select",
      label: "Colonnes sur grand écran",
      defaultValue: "5",
      options: [
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
    },
    { name: "intro", type: "textarea", label: "Texte avant la liste" },
    {
      name: "items",
      type: "array",
      label: "Zones",
      required: true,
      minRows: 1,
      fields: [{ name: "name", type: "text", label: "Nom", required: true }],
    },
    { name: "outro", type: "textarea", label: "Texte après la liste" },
  ],
};
