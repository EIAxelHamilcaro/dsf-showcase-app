# Guide de l'admin : pages ville

Toutes les pages ville (`/douche-senior-<ville>`) suivent le même modèle. Seuls changent le nom, les communes, le texte local, les questions fréquentes et, s'il existe, un témoignage.

## Ajouter une ville (rubrique Villes, « Créer »)

- **Nom de la ville** : remplace `{ville}` partout dans le modèle.
- **Adresse de la page** : fin de l'URL, par exemple `douche-senior-vendome`. Refusée si une page l'utilise déjà.
- **Département** : obligatoire. Fournit `{departement}` et `{code}`, le fil d'Ariane et la liste des villes de la page du département. Un département qui a des villes ne peut pas être supprimé.
- **Communes et quartiers desservis** : la ville en 1re ligne. Les 2e et 3e lignes remplacent `{communes}` dans la description pour les moteurs de recherche.
- **Texte local** et **Questions fréquentes** : propres à la ville, c'est ce qui distingue les pages entre elles.
- **Témoignage** (facultatif) : seulement un avis et une note réellement donnés par un client.
- **Référencement propre à la ville** : à laisser vide pour suivre le modèle. Nom officiel : seulement s'il diffère (Romorantin-Lanthenay).
- La page est publiée à l'enregistrement, sans développeur ni redéploiement.

## Modifier le texte commun (rubrique Modèle des pages ville)

Haut de page, cartes d'arguments, titre des communes, prestations, aides financières, appel à l'action, titre et description de recherche. Un changement s'applique aussitôt à toutes les villes. Tout repère autre que `{ville}`, `{departement}`, `{code}` et `{communes}` est refusé à l'enregistrement.
