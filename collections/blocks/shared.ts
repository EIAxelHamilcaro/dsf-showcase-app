import type { Field } from "payload";

export const iconOptions = [
  { label: "Aucune", value: "none" },
  { label: "Repère", value: "mapPin" },
  { label: "Horloge", value: "clock" },
  { label: "Bouclier", value: "shield" },
  { label: "Euro", value: "euro" },
  { label: "Coche", value: "checkCircle" },
  { label: "Document", value: "fileText" },
];

export const backgroundField: Field = {
  name: "background",
  type: "select",
  label: "Fond de la section",
  required: true,
  defaultValue: "default",
  options: [
    { label: "Blanc", value: "default" },
    { label: "Gris clair", value: "muted" },
  ],
};

export const iconField: Field = {
  name: "icon",
  type: "select",
  label: "Icône",
  required: true,
  defaultValue: "none",
  options: iconOptions,
};
