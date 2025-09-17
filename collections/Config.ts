import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

const Config: CollectionConfig = {
  slug: "config",
  access: {
    create: () => true,
    delete: () => false,
    read: () => true,
    update: () => true,
  },
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    },
    description:
      "Configuration globale du site – titres, images, contacts, section À propos etc.",
    useAsTitle: "main_title", // ça aide dans l’admin comme titre
  },
  hooks: {
    beforeChange: [
      async ({ req, operation }) => {
        if (operation === "create") {
          const existing = await req.payload.find({
            collection: "config",
            limit: 1,
          });
          if (existing.docs.length > 0) {
            throw new Error("Un seul document de configuration autorisé.");
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "phone",
      type: "text",
      label: "Téléphone du contact",
      admin: {
        description: "Numéro de téléphone affiché dans l’en-tête / footer",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email de contact",
      required: true,
      admin: {
        description: "Adresse email visible pour les utilisateurs",
      },
    },
    {
      name: "hero_image",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: true,
      label: "Image principale (Hero)",
      admin: {
        description: "Image de fond de la section héroïque",
      },
    },
    {
      name: "hero_image_label",
      label: "Label de l’image Hero",
      type: "group",
      admin: {
        description: "Texte superposé sur l’image principale",
      },
      fields: [
        {
          name: "hero_image_label_1",
          label: "Texte principal du badge",
          type: "text",
        },
        {
          name: "hero_image_label_2",
          label: "Sous-texte du badge",
          type: "text",
        },
      ],
    },
    {
      name: "main_title",
      type: "richText",
      label: "Titre principal",
      admin: {
        description:
          "Utiliser uniquement le gras pour mettre en valeur des mots",
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures, // si tu veux limiter après, tu peux
      }),
      required: true,
    },
    {
      name: "sub_main_title",
      type: "text",
      label: "Sous-titre principal",
      admin: {
        description: "Petit texte affiché sous le titre principal",
      },
    },
    {
      name: "main_tags",
      label: "Étiquettes principales",
      type: "group",
      admin: {
        description: "Texte pour les 3 tags affichés sous le titre",
      },
      fields: [
        {
          name: "main_tag_1",
          label: "Tag 1",
          type: "text",
        },
        {
          name: "main_tag_2",
          label: "Tag 2",
          type: "text",
        },
        {
          name: "main_tag_3",
          label: "Tag 3",
          type: "text",
        },
      ],
    },
    {
      name: "main_button",
      label: "Boutons principaux",
      type: "group",
      admin: {
        description: "Texte des deux boutons principaux visible dans la Hero",
      },
      fields: [
        {
          name: "main_button_1",
          label: "Bouton 1",
          type: "text",
        },
        {
          name: "main_button_2",
          label: "Bouton 2",
          type: "text",
        },
      ],
    },
    // --- Section À Propos ---
    {
      name: "about_title",
      label: "Titre Section « À Propos »",
      type: "text",
      admin: {
        description: "Titre de la section À propos du site",
      },
    },
    {
      name: "about_text",
      label: "Texte Section « À Propos »",
      type: "text",
      admin: {
        description:
          "Paragraphe ou contenu riche (gras autorisé si nécessaire)",
      },
    },
    {
      name: "about_features",
      label: "Nos services (À Propos)",
      type: "group",
      admin: {
        description:
          "4 services que vous offrez — titre + description pour chacun",
      },
      fields: [
        {
          name: "about_feature_1",
          label: "Service n°1",
          type: "group",
          fields: [
            {
              name: "about_feature_title_1",
              label: "Titre du service 1",
              type: "text",
              required: true,
            },
            {
              name: "about_feature_text_1",
              label: "Description du service 1",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "about_feature_2",
          label: "Service n°2",
          type: "group",
          fields: [
            {
              name: "about_feature_title_2",
              label: "Titre du service 2",
              type: "text",
              required: true,
            },
            {
              name: "about_feature_text_2",
              label: "Description du service 2",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "about_feature_3",
          label: "Service n°3",
          type: "group",
          fields: [
            {
              name: "about_feature_title_3",
              label: "Titre du service 3",
              type: "text",
              required: true,
            },
            {
              name: "about_feature_text_3",
              label: "Description du service 3",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "about_feature_4",
          label: "Service n°4",
          type: "group",
          fields: [
            {
              name: "about_feature_title_4",
              label: "Titre du service 4",
              type: "text",
              required: true,
            },
            {
              name: "about_feature_text_4",
              label: "Description du service 4",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "about_image",
      label: "Image de la section À Propos",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
      admin: {
        description: "Image illustratrice pour la section À Propos",
      },
    },

    {
      name: "about_section",
      label: "Section À Propos",
      type: "group",
      admin: {
        description: "Titre + texte explicatif + image + avantages (liste)",
      },
      fields: [
        {
          name: "about_heading",
          label: "Titre de la section",
          type: "text",
          required: true,
        },
        {
          name: "about_paragraphs",
          label: "Paragraphes explicatifs",
          type: "group",
          fields: [
            {
              name: "para_1",
              label: "Paragraphe 1",
              type: "text",
            },
            {
              name: "para_2",
              label: "Paragraphe 2",
              type: "text",
            },
            {
              name: "para_3",
              label: "Paragraphe 3",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};

export default Config;
