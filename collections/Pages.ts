import type { CollectionConfig } from "payload";
import { validateSlug } from "../lib/cms/validators";
import { AidCardsBlock } from "./blocks/AidCardsBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { FeatureCardsBlock } from "./blocks/FeatureCardsBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { LinkCardsBlock } from "./blocks/LinkCardsBlock";
import { ServiceCardsBlock } from "./blocks/ServiceCardsBlock";
import { StepsBlock } from "./blocks/StepsBlock";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { ZoneListBlock } from "./blocks/ZoneListBlock";
import {
  revalidateSiteAfterChange,
  revalidateSiteAfterDelete,
} from "./hooks/revalidateSite";

const isAreaPage = (data: { pageType?: string } | undefined) =>
  data?.pageType === "city" || data?.pageType === "department";

const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: "navLabel",
    defaultColumns: ["navLabel", "slug", "pageType", "updatedAt"],
    description: "Pages du site : villes, départements, services",
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
      name: "slug",
      type: "text",
      label: "Adresse de la page",
      required: true,
      unique: true,
      index: true,
      validate: validateSlug,
      admin: {
        description: "Partie finale de l'URL, par exemple douche-senior-blois",
      },
    },
    {
      name: "navLabel",
      type: "text",
      label: "Nom court",
      required: true,
      admin: {
        description:
          "Utilisé dans le fil d'Ariane et les liens vers cette page",
      },
    },
    {
      name: "pageType",
      type: "select",
      label: "Type de page",
      required: true,
      options: [
        { label: "Ville", value: "city" },
        { label: "Département", value: "department" },
        { label: "Service", value: "service" },
        { label: "Page légale", value: "legal" },
      ],
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "pages",
      label: "Département de la ville",
      filterOptions: { pageType: { equals: "department" } },
      admin: { condition: (data) => data?.pageType === "city" },
    },
    {
      name: "areaName",
      type: "text",
      label: "Nom du territoire",
      admin: {
        description:
          "Nom de la ville ou du département, repris dans les données structurées",
        condition: isAreaPage,
      },
    },
    {
      name: "departmentCode",
      type: "text",
      label: "Numéro du département",
      admin: { condition: (data) => data?.pageType === "department" },
    },
    {
      name: "seo",
      type: "group",
      label: "Référencement",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titre (60 caractères maximum)",
          required: true,
          maxLength: 60,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description (160 caractères maximum)",
          required: true,
          maxLength: 160,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Image de partage",
          admin: {
            description:
              "Image 1200 x 630, remplacée par l'image par défaut si vide",
          },
        },
      ],
    },
    {
      name: "layout",
      type: "blocks",
      label: "Contenu",
      required: true,
      minRows: 1,
      blocks: [
        HeroBlock,
        FeatureCardsBlock,
        ZoneListBlock,
        TestimonialBlock,
        ServiceCardsBlock,
        AidCardsBlock,
        StepsBlock,
        LinkCardsBlock,
        CtaBlock,
      ],
    },
  ],
};

export default Pages;
