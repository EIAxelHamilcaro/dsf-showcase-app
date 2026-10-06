# Guide de l'admin : pages ville

Toutes les pages ville (`/douche-senior-<ville>`) suivent le même modèle. Seuls changent le nom, les communes, le texte local, les questions fréquentes et, s'il existe, un témoignage.

## Ajouter une ville (rubrique Villes, « Créer »)

- **Nom de la ville** : remplace `{ville}` partout dans le modèle.
- **Adresse de la page** : fin de l'URL, par exemple `douche-senior-vendome`. Refusée si une page l'utilise déjà.
- **Département** : obligatoire. Fournit `{departement}` et `{code}`, le fil d'Ariane et la liste des villes de la page du département. Un département qui a des villes ne peut pas être supprimé : le message nomme les villes à rattacher ailleurs ou à supprimer d'abord.
- **Nom officiel de la commune** : seulement s'il diffère du nom de la ville (Romorantin-Lanthenay). Repris dans les données structurées, jamais affiché.
- **Communes et quartiers desservis** : la ville en 1re ligne, puis une ligne par commune ou quartier.
- **Texte local** et **Questions fréquentes** : propres à la ville, c'est ce qui distingue les pages entre elles.
- **Témoignage** (facultatif) : seulement un avis et une note réellement donnés par un client.
- **Référencement propre à la ville** : vides, le titre et la description d'une nouvelle ville viennent du modèle. Le titre ne dépasse jamais 60 caractères : si celui du modèle est trop long avec le nom de la ville (Saint-Amand-Montrond), l'enregistrement est refusé tant qu'un titre plus court n'est pas saisi ici. Description : 160 caractères au plus. Les 6 villes d'origine ont déjà la leur.
- La page est publiée à l'enregistrement, sans développeur ni redéploiement.

## Modifier le texte commun (rubrique Modèle des pages ville)

Haut de page, cartes d'arguments, titre des communes, prestations, aides financières, appel à l'action, titre et description de recherche. Un changement s'applique aussitôt à toutes les villes. Tout repère autre que `{ville}`, `{departement}` et `{code}` est refusé à l'enregistrement. Le titre de recherche est refusé s'il dépasse 60 caractères pour une ville qui n'a pas son propre titre : le message nomme les villes concernées.
