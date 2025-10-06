import type { CollectionConfig } from "payload";

const Leads: CollectionConfig = {
  slug: "leads",
  access: {
    create: () => false,
    delete: () => true,
    read: () => true,
    update: () => false,
  },
  admin: {
    description: "Liste des leads générés par le site",
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      label: "Nom",
      type: "text",
    },
    {
      name: "phone",
      label: "Téléphone",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "adress",
      label: "Adresse",
      type: "text",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
    },
    {
      name: "step1",
      label: "Propriétaire ou locataire",
      type: "text",
    },
    {
      name: "step2",
      label: "Maison ou Appartement",
      type: "text",
    },
    {
      name: "step3",
      label: "Baignoire ou Douche",
      type: "text",
    },
    {
      name: "step4",
      label: "+- 70ans",
      type: "text",
    },
    {
      name: "consentMain",
      label: "Mention légal Principal",
      type: "checkbox",
    },
    {
      name: "consentPartners",
      label: "Mention légal partenariat",
      type: "checkbox",
    },
  ],
};

export default Leads;
