import type { Block } from "payload";

export const LegalContentBlock: Block = {
  slug: "legalContent",
  interfaceName: "LegalContentBlock",
  labels: { singular: "Texte légal", plural: "Textes légaux" },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre de la page",
      required: true,
      admin: {
        description:
          "Titre principal de la page, à utiliser sans bloc Hero au dessus",
      },
    },
    {
      name: "sections",
      type: "array",
      label: "Sections",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "heading",
          type: "text",
          label: "Titre de la section",
          admin: {
            description:
              "Laisser vide pour continuer la section précédente après une liste ou un tableau",
          },
        },
        {
          name: "paragraphs",
          type: "array",
          label: "Paragraphes",
          fields: [
            {
              name: "text",
              type: "textarea",
              label: "Texte",
              required: true,
              admin: {
                description:
                  "Un retour à la ligne est conservé, une adresse https devient un lien",
              },
            },
          ],
        },
        {
          name: "items",
          type: "array",
          label: "Liste à puces",
          fields: [
            { name: "text", type: "text", label: "Élément", required: true },
          ],
        },
        {
          name: "headers",
          type: "array",
          label: "Tableau, en-têtes des colonnes",
          fields: [
            { name: "label", type: "text", label: "En-tête", required: true },
          ],
        },
        {
          name: "rows",
          type: "array",
          label: "Tableau, lignes",
          fields: [
            {
              name: "cells",
              type: "array",
              label: "Cellules",
              required: true,
              minRows: 1,
              fields: [
                {
                  name: "text",
                  type: "text",
                  label: "Cellule",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
