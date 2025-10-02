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
        description: "Numéro de téléphone affiché dans l’en-tête / le footer",
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
          admin: {
            description: "Texte principal affiché sur le badge de l’image Hero",
          },
        },
        {
          name: "hero_image_label_2",
          label: "Sous-texte du badge",
          type: "text",
          admin: {
            description:
              "Texte secondaire affiché sous le texte principal du badge",
          },
        },
      ],
    },
    {
      name: "main_title",
      type: "richText",
      label: "Titre principal",
      admin: {
        description:
          "Utiliser uniquement le **gras** pour mettre en valeur des mots",
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => defaultFeatures,
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
        description: "Texte des 3 tags affichés sous le titre principal",
      },
      fields: [
        {
          name: "main_tag_1",
          label: "Tag 1",
          type: "text",
          admin: {
            description: "Première étiquette",
          },
        },
        {
          name: "main_tag_2",
          label: "Tag 2",
          type: "text",
          admin: {
            description: "Deuxième étiquette",
          },
        },
        {
          name: "main_tag_3",
          label: "Tag 3",
          type: "text",
          admin: {
            description: "Troisième étiquette",
          },
        },
      ],
    },
    {
      name: "main_button",
      label: "Boutons principaux",
      type: "group",
      admin: {
        description: "Texte et option du(s) bouton(s) dans la Hero",
      },
      fields: [
        {
          name: "main_button_1",
          label: "Bouton 1",
          type: "text",
          admin: {
            description: "Libellé du premier bouton",
          },
        },
        {
          name: "main_button_2",
          label: "Bouton 2",
          type: "text",
          admin: {
            description: "Libellé du second bouton",
          },
        },
        {
          name: "guide_pdf",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
          label: "PDF du guide",
          admin: {
            description: "Fichier PDF à télécharger via le bouton",
          },
        },
      ],
    },
    // --- Section À Propos ---
    {
      name: "about_title",
      label: "Titre Section « À Propos »",
      type: "text",
      admin: {
        description: "Titre de la section À propos",
      },
    },
    {
      name: "about_text",
      label: "Texte Section « À Propos »",
      type: "text",
      admin: {
        description: "Texte ou paragraphe présentant le site ou l’entreprise",
      },
    },
    {
      name: "about_features",
      label: "Nos services (À Propos)",
      type: "group",
      admin: {
        description: "Quatre services présentés avec titre + description",
      },
      fields: [
        {
          name: "about_feature_1",
          label: "Service n°1",
          type: "group",
          admin: {
            description: "Premier service détaillé",
          },
          fields: [
            {
              name: "about_feature_title_1",
              label: "Titre du service 1",
              type: "text",
              required: true,
              admin: {
                description: "Titre de ce service",
              },
            },
            {
              name: "about_feature_text_1",
              label: "Description du service 1",
              type: "text",
              required: true,
              admin: {
                description: "Description détaillée du service",
              },
            },
          ],
        },
        {
          name: "about_feature_2",
          label: "Service n°2",
          type: "group",
          admin: {
            description: "Deuxième service détaillé",
          },
          fields: [
            {
              name: "about_feature_title_2",
              label: "Titre du service 2",
              type: "text",
              required: true,
              admin: {
                description: "Titre de ce service",
              },
            },
            {
              name: "about_feature_text_2",
              label: "Description du service 2",
              type: "text",
              required: true,
              admin: {
                description: "Description détaillée du service",
              },
            },
          ],
        },
        {
          name: "about_feature_3",
          label: "Service n°3",
          type: "group",
          admin: {
            description: "Troisième service détaillé",
          },
          fields: [
            {
              name: "about_feature_title_3",
              label: "Titre du service 3",
              type: "text",
              required: true,
              admin: {
                description: "Titre de ce service",
              },
            },
            {
              name: "about_feature_text_3",
              label: "Description du service 3",
              type: "text",
              required: true,
              admin: {
                description: "Description détaillée du service",
              },
            },
          ],
        },
        {
          name: "about_feature_4",
          label: "Service n°4",
          type: "group",
          admin: {
            description: "Quatrième service détaillé",
          },
          fields: [
            {
              name: "about_feature_title_4",
              label: "Titre du service 4",
              type: "text",
              required: true,
              admin: {
                description: "Titre de ce service",
              },
            },
            {
              name: "about_feature_text_4",
              label: "Description du service 4",
              type: "text",
              required: true,
              admin: {
                description: "Description détaillée du service",
              },
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
        description: "Image utilisée pour illustrer la section À Propos",
      },
    },

    {
      name: "about_section",
      label: "Section À Propos",
      type: "group",
      admin: {
        description: "Bloc complet : titre + paragraphes + image + avantages",
      },
      fields: [
        {
          name: "about_heading",
          label: "Titre de la section",
          type: "text",
          required: true,
          admin: {
            description: "Titre principal de cette section",
          },
        },
        {
          name: "about_paragraphs",
          label: "Paragraphes explicatifs",
          type: "group",
          admin: {
            description: "Textes explicatifs de la section",
          },
          fields: [
            {
              name: "para_1",
              label: "Paragraphe 1",
              type: "text",
              admin: {
                description: "Premier paragraphe",
              },
            },
            {
              name: "para_2",
              label: "Paragraphe 2",
              type: "text",
              admin: {
                description: "Deuxième paragraphe",
              },
            },
            {
              name: "para_3",
              label: "Paragraphe 3",
              type: "text",
              admin: {
                description: "Troisième paragraphe",
              },
            },
          ],
        },
      ],
    },
    {
      name: "caroussel_section",
      label: "Carrousel Avant/Après",
      type: "array",
      admin: {
        description:
          "Image(s) avant / après pour démontrer les transformations",
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
            description: "Image illustrant un chantier avant modifications",
          },
        },
        {
          name: "after",
          label: "Photo Après",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
          admin: {
            description: "Image illustrant le chantier après modifications",
          },
        },
        {
          name: "title",
          label: "Titre de l’image",
          type: "text",
          required: true,
          admin: {
            description: "Titre pour ce couple avant/après",
          },
        },
        {
          name: "description",
          label: "Description de l’image",
          type: "text",
          required: true,
          admin: {
            description: "Texte explicatif de ce qu’on voit sur les images",
          },
        },
      ],
    },
    {
      name: "testimonials_section",
      label: "Section témoignages",
      type: "array",
      admin: {
        description: "Liste des avis / témoignages des clients",
      },
      fields: [
        {
          name: "title",
          label: "Nom de la personne",
          type: "text",
          admin: {
            description: "Nom du client ou témoin",
          },
        },
        {
          name: "age",
          label: "Âge de la personne",
          type: "text",
          admin: {
            description: "Âge du client (optionnel)",
          },
        },
        {
          name: "text",
          label: "Avis",
          type: "text",
          admin: {
            description: "Contenu du témoignage",
          },
        },
        {
          name: "location",
          label: "Lieu",
          type: "text",
          admin: {
            description: "Ville, région ou lieu du client",
          },
        },
      ],
    },
    {
      name: "services_section",
      label: "Services",
      type: "group",
      admin: {
        description: "Présentation des services offerts",
      },
      fields: [
        {
          name: "title",
          label: "Titre de la section",
          type: "text",
          admin: {
            description: "Titre pour la section des services",
          },
        },
        {
          name: "description",
          label: "Description de la section",
          type: "text",
          admin: {
            description: "Texte introductif des services",
          },
        },
        {
          name: "about_feature_1",
          label: "Service n°1",
          type: "group",
          admin: {
            description: "Détail du 1ᵉʳ service",
          },
          fields: [
            {
              name: "about_feature_title_1",
              label: "Titre du service 1",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_1",
              label: "Description du service 1",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
        {
          name: "about_feature_2",
          label: "Service n°2",
          type: "group",
          admin: {
            description: "Détail du 2ᵉ service",
          },
          fields: [
            {
              name: "about_feature_title_2",
              label: "Titre du service 2",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_2",
              label: "Description du service 2",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
        {
          name: "about_feature_3",
          label: "Service n°3",
          type: "group",
          admin: {
            description: "Détail du 3ᵉ service",
          },
          fields: [
            {
              name: "about_feature_title_3",
              label: "Titre du service 3",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_3",
              label: "Description du service 3",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
        {
          name: "about_feature_4",
          label: "Service n°4",
          type: "group",
          admin: {
            description: "Détail du 4ᵉ service",
          },
          fields: [
            {
              name: "about_feature_title_4",
              label: "Titre du service 4",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_4",
              label: "Description du service 4",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
        {
          name: "about_feature_5",
          label: "Service n°5",
          type: "group",
          admin: {
            description: "Détail du 5ᵉ service",
          },
          fields: [
            {
              name: "about_feature_title_5",
              label: "Titre du service 5",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_5",
              label: "Description du service 5",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
        {
          name: "about_feature_6",
          label: "Service n°6",
          type: "group",
          admin: {
            description: "Détail du 6ᵉ service",
          },
          fields: [
            {
              name: "about_feature_title_6",
              label: "Titre du service 6",
              type: "text",
              admin: {
                description: "Nom du service",
              },
            },
            {
              name: "about_feature_text_6",
              label: "Description du service 6",
              type: "text",
              admin: {
                description: "Description du service",
              },
            },
          ],
        },
      ],
    },
    {
      name: "financial_section",
      label: "Information financement",
      type: "group",
      admin: {
        description: "Infos sur les aides ou financement possibles",
      },
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "text",
          admin: {
            description: "Titre de la section financement",
          },
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          admin: {
            description: "Texte de description générale du financement",
          },
        },
        {
          name: "sub_description",
          label: "Sous-description",
          type: "text",
          admin: {
            description: "Texte secondaire ou complémentaire",
          },
        },
        {
          name: "financial_help_1",
          label: "Détail de l’aide 1",
          type: "group",
          admin: {
            description: "Premier détail d’aide financière",
          },
          fields: [
            {
              name: "icon_text",
              label: "Texte de l’icône",
              type: "text",
              admin: {
                description: "Texte sur la bulle/icône",
              },
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre de cette aide",
              },
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              admin: {
                description: "Détails de cette aide",
              },
            },
          ],
        },
        {
          name: "financial_help_2",
          label: "Détail de l’aide 2",
          type: "group",
          admin: {
            description: "Deuxième aide détaillée",
          },
          fields: [
            {
              name: "icon_text",
              label: "Texte de l’icône",
              type: "text",
              admin: {
                description: "Texte sur l’icône",
              },
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre de cette aide",
              },
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              admin: {
                description: "Détails de cette aide",
              },
            },
          ],
        },
        {
          name: "financial_help_3",
          label: "Détail de l’aide 3",
          type: "group",
          admin: {
            description: "Troisième aide détaillée",
          },
          fields: [
            {
              name: "icon_text",
              label: "Texte de l’icône",
              type: "text",
              admin: {
                description: "Texte sur l’icône",
              },
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre de cette aide",
              },
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              admin: {
                description: "Détails de cette aide",
              },
            },
          ],
        },
        {
          name: "financial_help_4",
          label: "Détail de l’aide 4",
          type: "group",
          admin: {
            description: "Quatrième aide détaillée",
          },
          fields: [
            {
              name: "icon_text",
              label: "Texte de l’icône",
              type: "text",
              admin: {
                description: "Texte sur l’icône",
              },
            },
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre de cette aide",
              },
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              admin: {
                description: "Détails de cette aide",
              },
            },
          ],
        },
      ],
    },
    {
      name: "form_section",
      label: "Détails de la section formulaire",
      type: "group",
      admin: {
        description: "Champs pour configurer le formulaire de contact",
      },
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "text",
          admin: {
            description: "Titre du formulaire",
          },
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          admin: {
            description: "Texte explicatif du formulaire",
          },
        },
        {
          name: "disponibility",
          label: "Disponibilité",
          type: "text",
          admin: {
            description: "Texte indiquant la disponibilité (ex : horaires)",
          },
        },
        {
          name: "work_zone",
          label: "Zone d’intervention",
          type: "group",
          admin: {
            description: "Définition de la zone géographique d’intervention",
          },
          fields: [
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre du bloc zone",
              },
            },
            {
              name: "region",
              label: "Région",
              type: "text",
              admin: {
                description: "Nom de la région d’intervention",
              },
            },
            {
              name: "radius",
              label: "Rayon d’intervention",
              type: "text",
              admin: {
                description: "Rayon autour de la région (km par ex.)",
              },
            },
          ],
        },
        {
          name: "time_section",
          label: "Durée d’intervention",
          type: "group",
          admin: {
            description: "Délais estimés pour devis + travaux + total",
          },
          fields: [
            {
              name: "title",
              label: "Titre",
              type: "text",
              admin: {
                description: "Titre du bloc temporal",
              },
            },
            {
              name: "list",
              label: "Les délais de réponse",
              type: "group",
              admin: {
                description: "Durées pour chaque étape",
              },
              fields: [
                {
                  name: "devis",
                  label: "Durée du devis",
                  type: "text",
                  admin: {
                    description: "Temps estimé pour fournir le devis",
                  },
                },
                {
                  name: "travaux",
                  label: "Durée des travaux",
                  type: "text",
                  admin: {
                    description: "Durée estimée des travaux",
                  },
                },
                {
                  name: "total",
                  label: "Durée totale",
                  type: "text",
                  admin: {
                    description: "Somme des délais devis + travaux",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "faq_section",
      label: "Détails de la partie Questions/Réponses",
      type: "group",
      admin: {
        description: "Champs pour configurer la partie FAQ",
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
          name: "faq",
          label: "Liste questions/réponses",
          type: "array",
          fields: [
            {
              name: "question",
              label: "Question ?",
              type: "text",
            },
            {
              name: "answer",
              label: "Réponse",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "footer_section",
      label: "Détails du footer",
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
          name: "region",
          label: "Région",
          type: "text",
        },
      ],
    },
  ],
};

export default Config;
