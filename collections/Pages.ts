import { APIError, type CollectionConfig } from "payload";
import { AidCardsBlock } from "./blocks/AidCardsBlock";
import { CtaBlock } from "./blocks/CtaBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { FeatureCardsBlock } from "./blocks/FeatureCardsBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { LegalContentBlock } from "./blocks/LegalContentBlock";
import { LinkCardsBlock } from "./blocks/LinkCardsBlock";
import { ServiceCardsBlock } from "./blocks/ServiceCardsBlock";
import { StepsBlock } from "./blocks/StepsBlock";
import { TestimonialBlock } from "./blocks/TestimonialBlock";
import { TextSectionBlock } from "./blocks/TextSectionBlock";
import { ZoneListBlock } from "./blocks/ZoneListBlock";
import {
  revalidateSiteAfterChange,
  revalidateSiteAfterDelete,
} from "./hooks/revalidateSite";
import { validateSlugUnusedBy } from "./validateSharedSlug";

const isDepartmentPage = (data: { pageType?: string } | undefined) =>
  data?.pageType === "department";

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
    description:
      "Pages du site : départements, services, pages légales. Les villes ont leur propre rubrique",
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/${data?.slug ?? ""}`,
    },
  },
  hooks: {
    beforeDelete: [
      async ({ id, req }) => {
        const { docs } = await req.payload.find({
          collection: "cities",
          where: { department: { equals: id } },
          limit: 0,
          pagination: false,
          depth: 0,
          req,
        });

        if (docs.length === 0) {
          return;
        }

        throw new APIError(
          `Des villes sont encore rattachées à ce département : ${docs.map((city) => city.name).join(", ")}. Rattachez-les à un autre département ou supprimez-les, puis supprimez cette page`,
          400,
          undefined,
          true,
        );
      },
    ],
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
      validate: validateSlugUnusedBy(
        "cities",
        "Une ville utilise déjà cette adresse",
      ),
      admin: {
        description: "Partie finale de l'URL, par exemple aides-financieres",
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
      filterOptions: ({ options, req }) =>
        req.user
          ? options.filter(
              (option) => typeof option !== "string" && option.value !== "city",
            )
          : options,
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "pages",
      label: "Département de la ville",
      filterOptions: { pageType: { equals: "department" } },
      admin: { hidden: true },
    },
    {
      name: "areaName",
      type: "text",
      label: "Nom du territoire",
      admin: {
        description: "Nom du département, repris dans les données structurées",
        condition: isDepartmentPage,
      },
    },
    {
      name: "departmentCode",
      type: "text",
      label: "Numéro du département",
      admin: { condition: isDepartmentPage },
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
        {
          name: "informationOnly",
          type: "checkbox",
          label: "Page d'information (pas une prestation vendue)",
          admin: {
            description:
              "Cochée : la page n'est pas décrite comme un service de l'entreprise dans les données structurées",
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
        TextSectionBlock,
        FaqBlock,
        LegalContentBlock,
        CtaBlock,
      ],
    },
  ],
};

export default Pages;
