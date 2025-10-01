import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { media } from "@/payload-generated-schema";

const Config: CollectionConfig = {
  slug: "config",
  access: {
    create: () => false,
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
        {
          name: "guide_pdf",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
          label: "PDF du guide",
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
    {
      name: "caroussel_section",
      label: "Caroussel Avant/Aprés",
      type: "array",
      admin: {
        description: "",
      },
      fields: [
        {
          name: "before",
          label: "Photo Avant",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
          admin: {
            description: "Image illustratrice d'un chantier avant changements",
          },
        },
        {
          name: "after",
          label: "Photo Apres",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
          admin: {
            description: "Image illustratrice d'un chantier apres changements",
          },
        },
        {
          name: "title",
          label: "Titre de l'image",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Description de l'image",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "testimonials_section",
      label: "mettre un label",
      type: "array",
      admin: {
        description: "",
      },
      fields: [
        {
          name: "title",
          label: "Nom de la personnes",
          type: "text",
        },
        {
          name: "age",
          label: "Age de la personnes",
          type: "text",
        },
        {
          name: "text",
          label: "Avis",
          type: "text",
        },
        {
          name: "location",
          label: "lieu",
          type: "text",
        },
      ],
    },
    {
      name: "services_section",
      label: "Services",
      type: "group",
      admin: {
        description: "",
      },
      fields: [
        {
          name: "title",
          label: "Titre de la section",
          type: "text",
        },
        {
          name: "description",
          label: "Description de la section",
          type: "text",
        },
        {
          name: "about_feature_1",
          label: "Service n°1",
          type: "group",
          fields: [
            {
              name: "about_feature_title_1",
              label: "Titre du service 1",
              type: "text",
            },
            {
              name: "about_feature_text_1",
              label: "Description du service 1",
              type: "text",
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
            },
            {
              name: "about_feature_text_2",
              label: "Description du service 2",
              type: "text",
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
            },
            {
              name: "about_feature_text_3",
              label: "Description du service 3",
              type: "text",
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
            },
            {
              name: "about_feature_text_4",
              label: "Description du service 4",
              type: "text",
            },
          ],
        },
        {
          name: "about_feature_5",
          label: "Service n°5",
          type: "group",
          fields: [
            {
              name: "about_feature_title_5",
              label: "Titre du service 5",
              type: "text",
            },
            {
              name: "about_feature_text_5",
              label: "Description du service 5",
              type: "text",
            },
          ],
        },
        {
          name: "about_feature_6",
          label: "Service n°6",
          type: "group",
          fields: [
            {
              name: "about_feature_title_6",
              label: "Titre du service 6",
              type: "text",
            },
            {
              name: "about_feature_text_6",
              label: "Description du service 6",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "financial_section",
      label: "Information financement",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
        {
          name: "sub_descrition",
          label: "Sous Description",
          type: "text",
        },
        {
          name: "financial_help_1",
          label: "Détail de l'aide 1",
          type: "group",
          fields: [
            {
              name: "icon_text",
              label: "Text de la bulle",
              type: "text",
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
          ],
        },
        {
          name: "financial_help_2",
          label: "Détail de l'aide 2",
          type: "group",
          fields: [
            {
              name: "icon_text",
              label: "Text de la bulle",
              type: "text",
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
          ],
        },
        {
          name: "financial_help_3",
          label: "Détail de l'aide 3",
          type: "group",
          fields: [
            {
              name: "icon_text",
              label: "Text de la bulle",
              type: "text",
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
          ],
        },
        {
          name: "financial_help_4",
          label: "Détail de l'aide 4",
          type: "group",
          fields: [
            {
              name: "icon_text",
              label: "Text de la bulle",
              type: "text",
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "description",
              label: "Description",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "form_section",
      label: "Détails de la section formulaire",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "text",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
        {
          name: "work_zone",
          label: "Zone d'intervention",
          type: "group",
          fields: [
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "region",
              label: "Région",
              type: "text",
            },
            {
              name: "radius",
              label: "Rayon d'intervention",
              type: "text",
            },
          ],
        },
        {
          name: "time_section",
          label: "Durée d'intervention",
          type: "group",
          fields: [
            {
              name: "title",
              label: "Titre",
              type: "text",
            },
            {
              name: "list",
              label: "Les délaie de réponse",
              type: "group",
              fields: [
                {
                  name: "devis",
                  label: "Durée du devis",
                  type: "text",
                },
                {
                  name: "travaux",
                  label: "Durée des travaux",
                  type: "text",
                },
                {
                  name: "total",
                  label: "Durée total",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Config;
