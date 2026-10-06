import { type GlobalConfig, ValidationError } from "payload";
import {
  listPlaceholderProblems,
  placeholderNames,
} from "../lib/pages/placeholders";
import { CtaBlock } from "./blocks/CtaBlock";
import { FeatureCardsBlock } from "./blocks/FeatureCardsBlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { fieldsOf } from "./blocks/shared";
import { ZoneListBlock } from "./blocks/ZoneListBlock";
import { revalidateSiteAfterGlobalChange } from "./hooks/revalidateSite";

const placeholderList = placeholderNames.map((name) => `{${name}}`).join(", ");

const CityTemplate: GlobalConfig = {
  slug: "cityTemplate",
  label: "Modèle des pages ville",
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    description: `Texte commun à toutes les pages ville. ${placeholderList} sont remplacés par le nom de la ville, le nom et le numéro de son département`,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        const problems = listPlaceholderProblems(data);

        if (problems.length === 0) {
          return data;
        }

        throw new ValidationError(
          {
            global: "cityTemplate",
            errors: problems.map(({ path, names }) => ({
              path,
              message: `Repère inconnu : ${names.map((name) => `{${name}}`).join(", ")}. Repères acceptés : ${placeholderList}`,
            })),
          },
          req.t,
        );
      },
    ],
    afterChange: [revalidateSiteAfterGlobalChange],
  },
  fields: [
    {
      name: "navLabel",
      type: "text",
      label: "Nom court",
      required: true,
      admin: {
        description:
          "Utilisé dans le fil d'Ariane et les liens vers la page, par exemple Douche Senior {ville}",
      },
    },
    {
      name: "seo",
      type: "group",
      label: "Référencement",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Titre (60 caractères maximum une fois la ville insérée)",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label:
            "Description (160 caractères maximum une fois la ville insérée)",
          required: true,
        },
      ],
    },
    {
      name: "hero",
      type: "group",
      label: "Haut de page",
      fields: fieldsOf(HeroBlock),
    },
    {
      name: "featureCards",
      type: "group",
      label: "Cartes d'arguments",
      fields: fieldsOf(FeatureCardsBlock),
    },
    {
      name: "zoneList",
      type: "group",
      label: "Liste des communes",
      admin: {
        description: "Les communes elles-mêmes se saisissent dans chaque ville",
      },
      fields: fieldsOf(ZoneListBlock, ["items", "columns"]),
    },
    {
      name: "cta",
      type: "group",
      label: "Appel à l'action de fin de page",
      fields: fieldsOf(CtaBlock),
    },
  ],
};

export default CityTemplate;
