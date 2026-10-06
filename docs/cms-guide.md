# Guide de l'admin : pages ville

Chaque page ville (`/douche-senior-<ville>`) est générée à partir du **Modèle des pages ville** (texte commun) et d'une fiche de la rubrique **Villes**.

## Ajouter une ville (rubrique Villes, « Créer »)

- **Nom de la ville** : remplace `{ville}` dans le modèle (titre, boutons, référencement).
- **Adresse de la page** : fin de l'URL, par exemple `douche-senior-vendome`. Refusée si une page l'utilise déjà.
- **Département** : obligatoire. Fournit `{departement}` et `{code}`, le fil d'Ariane et la liste des villes de la page du département. Un département qui a des villes ne peut pas être supprimé.
- **Communes et quartiers desservis**, **Texte local**, **Questions fréquentes** : le contenu propre à la ville.
- **Sections supplémentaires** (facultatif) : témoignage, prestations, aides, comme sur Blois. Ne saisir qu'un avis et une note réellement donnés par un client.
- Champs « propre à la ville » (nom officiel, ligne de localisation, titre des communes, référencement) : à laisser vides pour suivre le modèle.
- La page est publiée à l'enregistrement, sans développeur ni redéploiement.

## Modifier le texte commun (rubrique Modèle des pages ville)

Haut de page, 4 cartes d'arguments, titre des communes, appel à l'action, titre et description pour les moteurs de recherche. Un changement s'applique aussitôt à toutes les villes, sauf aux champs « propre à la ville » remplis. Les repères `{ville}`, `{departement}` et `{code}` s'écrivent tels quels : tout autre repère entre accolades est refusé à l'enregistrement.
