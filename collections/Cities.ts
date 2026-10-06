import type { CollectionConfig } from "payload";
import { AidCardsBlock } from "./blocks/AidCardsBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { ServiceCardsBlock } from "./blocks/ServiceCardsBlock";
import { fieldsOf } from "./blocks/shared";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { TextSectionBlock } from "./blocks/TextSectionBlock";
import {
  revalidateSiteAfterChange,
  revalidateSiteAfterDelete,
} from "./hooks/revalidateSite";
import { validateSlugUnusedBy } from "./validateSharedSlug";

const Cities: CollectionConfig = {
  slug: "cities",
  labels: { singular: "Ville", plural: "Villes" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "department", "updatedAt"],
    description:
      "Une fiche par ville. La page est générée à partir du modèle des pages ville et de cette fiche",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/${data?.slug ?? ""}`,
    },
  },
  hooks: {
    afterChange: [revalidateSiteAfterChange],
    afterDelete: [revalidateSiteAfterDelete],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom de la ville",
      required: true,
      admin: {
        description:
          "Remplace {ville} dans le modèle des pages ville, par exemple Tours",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Adresse de la page",
      required: true,
      unique: true,
      index: true,
      validate: validateSlugUnusedBy(
        "pages",
        "Une page utilise déjà cette adresse",
      ),
      admin: {
        description: "Partie finale de l'URL, par exemple douche-senior-tours",
      },
    },
    {
      name: "department",
      type: "relationship",
      relationTo: "pages",
      label: "Département",
      required: true,
      filterOptions: { pageType: { equals: "department" } },
      admin: {
        description:
          "Remplace {departement} et {code} dans le modèle, et place la ville dans le fil d'Ariane et sur la page du département",
      },
    },
    {
      name: "areaName",
      type: "text",
      label: "Nom officiel de la commune",
      admin: {
        description:
          "À remplir seulement s'il diffère du nom de la ville (Romorantin-Lanthenay). Repris dans les données structurées",
      },
    },
    {
      name: "locationLine",
      type: "text",
      label: "Ligne de localisation propre à la ville",
      admin: {
        description:
          "Laisser vide pour utiliser celle du modèle (ville, agglomération, département)",
      },
    },
    {
      name: "zonesHeading",
      type: "text",
      label: "Titre de la liste des communes propre à la ville",
      admin: { description: "Laisser vide pour utiliser celui du modèle" },
    },
    {
      name: "zones",
      type: "array",
      label: "Communes et quartiers desservis",
      required: true,
      minRows: 1,
      fields: [{ name: "name", type: "text", label: "Nom", required: true }],
    },
    {
      name: "extraSections",
      type: "blocks",
      label: "Sections supplémentaires",
      admin: {
        description:
          "Facultatif. Affichées entre la liste des communes et le texte local",
      },
      blocks: [TestimonialBlock, ServiceCardsBlock, AidCardsBlock],
    },
    {
      name: "localSection",
      type: "group",
      label: "Texte local",
      fields: fieldsOf(TextSectionBlock),
    },
    {
      name: "faq",
      type: "group",
      label: "Questions fréquentes",
      fields: fieldsOf(FaqBlock),
    },
    {
      name: "seo",
      type: "group",
      label: "Référencement propre à la ville",
      admin: {
        description:
          "Laisser vide pour utiliser le titre et la description du modèle",
      },
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titre (60 caractères maximum)",
          maxLength: 60,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description (160 caractères maximum)",
          maxLength: 160,
        },
      ],
    },
  ],
};

export default Cities;
