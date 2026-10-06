# Runbook de mise en production : pages CMS, SEO, formulaires

État au 06/10/2026 : rédigé, jamais exécuté. Rien dans le dépôt ne lance cette procédure. Elle revient à la personne qui détient la base de production (Neon) et le projet Vercel.

Ce qui a été vérifié l'a été en local (base `127.0.0.1:5544`, répétition `scripts/rehearseMigration.sh` sur une sauvegarde de la production). Ce qui dépend de Vercel, Neon ou Cloudflare est marqué « à vérifier ».

## Règles

- Jamais `migrate:down`, `migrate:fresh`, `migrate:reset` ni `migrate:refresh` sur la production. Le `down` des 10 migrations lève une erreur exprès, les trois autres commandes suppriment des tables.
- Migrer d'abord, déployer ensuite : le build lit la base (`generateStaticParams`, `sitemap.xml`, `llms.txt`).
- `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm test` et `pnpm payload` passent par `scripts/local.sh`, qui force la base locale et refuse tout hôte autre que `127.0.0.1` ou `localhost`. Ce garde-fou ne se contourne pas et ne se modifie pas.
- Le `.env` du poste pointe vers la production. Toute commande `pnpm exec payload ...` ou `next ...` lancée sans le wrapper touche donc la production.
- Après la migration, ne plus jamais lancer en mode dev un code antérieur au commit `e167873` avec le `.env` de production : avant ce commit le schéma est poussé automatiquement (`push`), ce qui proposerait de supprimer les nouvelles tables.

## 1. Correctif de sécurité, à livrer tout de suite et seul

Le commit `b6243b1` ferme trois accès anonymes de l'API : lecture de `/api/leads` (nom, téléphone, email, adresse), suppression des leads, modification de la configuration du site. Sur `main` ces accès valent `() => true`.

Pourquoi d'abord : des données personnelles sont exposées, le correctif tient en 3 lignes dans `collections/Leads.ts` et `collections/Config.ts`, sans migration, sans variable, sans changement visible. Le site public lit par l'API locale et n'est pas touché.

Constat avant (code HTTP seul, sans afficher les données) :

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.douche-senior-france.com/api/leads
```

`200` confirme que l'accès est ouvert.

Livraison :

```bash
git fetch origin
git switch -c fix/close-public-leads-api origin/main
git cherry-pick b6243b1
git push -u origin fix/close-public-leads-api
gh pr create --base main --title "fix(security): stop exposing leads and site config to anonymous visitors"
```

`b6243b1` a pour parent le sommet actuel de `main` (`4a91aab`) : le cherry-pick s'applique sans conflit tant que `origin/main` n'a pas bougé. Fusionner la PR, laisser Vercel déployer.

Contrôle après déploiement : la même commande `curl` répond `403` (mesuré en local sur la branche). Vérifier que `/admin` affiche toujours les leads une fois connecté.

La branche de la release contient déjà ce commit : sa PR fusionnera sans doublon.

## 2. Avant la release

### Sauvegarde

```bash
export PROD_URI='postgresql://<user>:<password>@<host>/<database>?sslmode=require'
psql "$PROD_URI" -Atc "select current_database(), version();"
mkdir -p ~/.local/share/dsf-backups
pg_dump -Fc "$PROD_URI" -f ~/.local/share/dsf-backups/dsf-prod-$(date +%F).dump
pg_restore --list ~/.local/share/dsf-backups/dsf-prod-$(date +%F).dump | head -20
```

- La chaîne vient des réglages du projet Vercel ou de la console Neon. Elle ne s'écrit dans aucun fichier du dépôt.
- À vérifier : `pg_dump` local de version égale ou supérieure au serveur (la ligne `version()` la donne), et chaîne de connexion directe plutôt que le pooler Neon.
- À vérifier dans la console Neon : durée de l'historique de restauration, puis créer une branche Neon depuis la production juste avant la migration et noter l'heure.

### Répétition sur la sauvegarde fraîche (locale, sans risque)

```bash
DSF_BACKUP=~/.local/share/dsf-backups/dsf-prod-$(date +%F).dump ./scripts/rehearseMigration.sh
```

Le script restaure la sauvegarde dans la base locale `dsf_rehearsal` (conteneur Docker `dsf-local-pg`, PostgreSQL 17.11), marque la baseline, migre, compare, puis rejoue les deux migrations de contenu sur une copie modifiée comme le ferait un éditeur. Il doit finir par :

```
replay: second run changed nothing, editor changes kept
OK: no existing row lost or altered beyond scripts/sql/expectedCellChanges.txt
```

Toute ligne `FAIL` arrête la release. C'est ici, et pas en production, que se lisent les lignes de journal décrites en section 3.

### Variables d'environnement Vercel

À créer, portées Production ET Preview (noms dans `.env.example`) :

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique du widget Cloudflare Turnstile des 3 formulaires. Lue au build : la créer avant le build, redéployer si elle change. |
| `TURNSTILE_SECRET_KEY` | Clé secrète qui valide le jeton côté serveur. |

- Créer le widget dans Cloudflare (Turnstile, Add widget) pour le domaine de production. À vérifier : les noms d'hôte autorisés du widget couvrent aussi les URL de preview si elles servent aux essais.
- Les clés de test de `.env.example` sont refusées sur tout déploiement Vercel : dès que `VERCEL_ENV` existe, les formulaires rejettent toute demande et le serveur journalise `[contact] Turnstile is not usable`. Sans clé, même refus (fermé par défaut).
- À vérifier : l'option Vercel qui expose les variables système (`VERCEL_ENV`, `NEXT_PUBLIC_VERCEL_ENV`) est active. Sans elle, le refus des clés de test ne joue plus.

Déjà utilisées par `main`, présence à vérifier : `DATABASE_URI`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `GMAIL_CONTACT`, `GMAIL_PASS`, `GMAIL_USER`, `NEXT_PUBLIC_SERVER_URL` (URL de l'aperçu en direct dans l'admin, désormais aussi pour les pages : sans elle l'aperçu vise `http://localhost:3000`).

### Commande de build

`vercel.json` impose `pnpm build:production` (`next build --webpack`). Le script `build` passe par `scripts/local.sh` et échoue exprès sur Vercel. À vérifier : aucun réglage du tableau de bord ne remplace cette commande, et la branche de production est bien `main`.

À savoir : le build d'une preview de cette branche lit la base de la portée Preview. Si c'est la production et qu'elle n'est pas migrée, la table `pages` manque et le build doit échouer. Sans effet sur la production.

## 3. Migration de la production

La production a été créée en mode dev : `payload_migrations` contient une ligne `dev` de lot `-1`. La baseline (`20261006_105338_baseline`) décrit le schéma existant : elle se marque comme appliquée, elle ne s'exécute pas. Suivent 9 migrations.

Le wrapper refuse la production. Les commandes Payload ci-dessous sont donc appelées directement, avec `DATABASE_URI` exporté pour cette seule commande. Une variable déjà définie l'emporte sur `.env` et `.env.local`. Le `.env` du dépôt fournit `PAYLOAD_SECRET`, sans lequel Payload refuse de démarrer.

Avant chaque commande, relire l'hôte :

```bash
node -e 'console.log(new URL(process.env.PROD_URI).host)'
psql "$PROD_URI" -Atc "select current_database();"
```

### 3.1 État avant

```bash
B=~/.local/share/dsf-backups
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/rowCounts.sql > $B/rows-before.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/dataChecksums.sql > $B/checksums-before.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/cellDump.sql > $B/cells-before.txt
psql "$PROD_URI" -Atc "select name, batch from payload_migrations order by id;"
```

Attendu pour la dernière commande : une seule ligne `dev|-1`. Autre chose : arrêt.

### 3.2 Marquer la baseline

```bash
psql "$PROD_URI" -v ON_ERROR_STOP=1 -v baseline=20261006_105338_baseline -f scripts/sql/markBaselineApplied.sql
```

Attendu :

```
BEGIN
DELETE 1
INSERT 0 1
COMMIT
 20261006_105338_baseline |     1
```

Sans cette étape, `payload migrate` pose une question interactive sur la perte de données puis tente de recréer les tables existantes.

### 3.3 Migrer

```bash
DATABASE_URI="$PROD_URI" pnpm exec payload migrate:status
DATABASE_URI="$PROD_URI" pnpm exec payload migrate 2>&1 | tee ~/.local/share/dsf-backups/migrate-prod.log
```

`migrate:status` avant : baseline `Yes`, les 9 autres `No`.

`migrate` affiche 9 couples `Migrating:` / `Migrated:` dans cet ordre, puis `Done.` :

1. `pages_and_site_settings`
2. `block_display_options`
3. `feature_cards_spacing`
4. `testimonial_block_rating`
5. `faq_text_and_legal_blocks`
6. `seed_pages_and_site_identity`
7. `blois_testimonial_rating`
8. `turnkey_content`
9. `content_review_fixes`

Lignes de journal attendues (comptées sur la répétition du 06/10/2026) :

| Migration | Lignes | Détail |
| --- | --- | --- |
| `turnkey_content` | 18 | 14 `corrected`, 1 `removed`, 1 `swapped`, 1 `Google profile link set`, 1 `34 media described, 0 already had a description` |
| `content_review_fixes` | 15 | 15 `corrected` |

Soit 29 `corrected`, 1 `removed`, 1 `swapped`, 1 `set`.

Conditions d'arrêt (ne pas déployer, enquêter) :

- Une ligne contient `left as is`, `not found`, `found more than once`, `found 0 times`, `skipped`, `already corrected`, `already exists` ou `already has` : le contenu de production diffère de celui de la répétition, une correction n'a pas été posée.
- Un compte diffère du tableau.
- `Error running migration` : chaque migration tourne dans sa propre transaction, celle qui échoue n'écrit rien, les précédentes restent appliquées et la commande sort en code 1. Cas prévus par le code : une ligne `config` absente ou multiple, une page attendue absente, un média de `migrations/seed/mediaAltSeed.ts` introuvable (identifiant et nom de fichier). Corriger la cause puis relancer `payload migrate`, qui reprend à la migration manquante.

### 3.4 État après

```bash
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/rowCounts.sql > $B/rows-after.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/dataChecksums.sql > $B/checksums-after.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/cellDump.sql > $B/cells-after.txt
diff $B/rows-before.txt $B/rows-after.txt
diff $B/checksums-before.txt $B/checksums-after.txt
diff $B/cells-before.txt $B/cells-after.txt | grep '^<'
DATABASE_URI="$PROD_URI" pnpm exec payload migrate:status
```

Attendu :

- Comptes : une seule ligne `<`, `payload_migrations|1` (devenue `10`). Les lignes `>` sont les nouvelles tables, dont `pages|17`, `config_menu_services|4`, `pages_blocks_faq|15`, `pages_blocks_legal_content|2`. Toute autre ligne `<` : une table existante a perdu ou gagné des lignes, arrêt (un lead arrivé pendant l'opération change `leads` : le vérifier dans l'admin).
- Sommes de contrôle : aucune différence sur `leads`, `users`, `users_sessions`, `config_faq_section_faq`, `config_testimonials_section` (hors colonnes ajoutées `rating`, `date`, `source`). Une différence sur `leads`, `users` ou `users_sessions` peut venir d'un lead ou d'une connexion à l'admin pendant l'opération : le confirmer avant de continuer.
- Cellules : exactement 6 lignes `<`, toutes prévues par `scripts/sql/expectedCellChanges.txt` :
  - `config|1|financial_section_financial_help_1_title`, `..._icon_text`, `..._description` (crédit d'impôt supprimé) ;
  - `config|1|updated_at` ;
  - `config_caroussel_section|2|before_id` et `after_id` (photos avant et après inversées).
- `migrate:status` : 10 lignes `Yes`, baseline en lot 1, les 9 autres en lot 2.

Cette release modifie donc 3 textes de l'accueil et une paire de photos existants, et remplit des colonnes neuves (identité légale, lien de la fiche Google, description des 34 médias). Aucune ligne existante n'est supprimée.

## 4. Ordre de déploiement

1. Migrer (section 3).
2. Créer les variables Turnstile (section 2).
3. Fusionner la PR de la release dans `main`, laisser Vercel construire.
4. Contrôler (section 5) avant de considérer l'ancien déploiement comme inutile.

L'ancien code reste compatible avec le schéma migré. Vérifié par lecture des 5 migrations de schéma : elles ne font que créer des types et des tables, ajouter des colonnes sans `NOT NULL` aux tables existantes (`config`, `config_testimonials_section`, `media`, `payload_locked_documents_rels`), des index et des clés étrangères. Aucun `DROP`, aucun renommage, aucun changement de type.

Ce qui n'est pas couvert :

- L'ancien code n'a pas été exécuté sur une base migrée : la compatibilité repose sur la lecture des migrations.
- Les migrations de données changent ce que l'ancien site affiche dès la migration : les 3 textes du crédit d'impôt sur l'accueil et la paire de photos de la réalisation 2.
- Entre la migration et le déploiement, puis après un éventuel retour arrière, ne pas enregistrer la configuration depuis l'admin de l'ancien code : il ignore les nouvelles colonnes et son comportement à l'enregistrement n'a pas été testé.

## 5. Contrôles après déploiement

```bash
site=https://www.douche-senior-france.com
for path in "" $(curl -s $site/sitemap.xml | grep -o "<loc>[^<]*</loc>" | sed -e "s#<loc>$site##" -e "s#</loc>##" | grep .); do
  printf "%s " "${path:-/}"; curl -s -o /dev/null -w "%{http_code}\n" "$site$path"
done
curl -s -o /dev/null -w "%{http_code}\n" $site/page-inconnue
curl -s $site/robots.txt
curl -s $site/sitemap.xml | grep -c "<loc>"
curl -s $site/llms.txt
curl -sI $site/llms.txt | grep -i content-type
curl -sI $site/ | grep -iE "content-security-policy|strict-transport-security|x-content-type-options|x-frame-options|referrer-policy|permissions-policy"
curl -sI $site/admin | grep -ci content-security-policy
curl -s -o /dev/null -w "%{http_code}\n" $site/api/leads
```

Attendu :

- 18 lignes `200` (accueil et 17 pages), puis `404` pour la page inconnue.
- `robots.txt` : `Allow: /` et `Allow: /api/media/file/`, `Disallow` sur `/admin` et `/api`, un bloc pour les robots IA listés dans `lib/site.ts`, la ligne `Sitemap`.
- `sitemap.xml` : `18`.
- `llms.txt` : type `text/plain`, sections Accueil, Services (4), Départements (5), Villes (6), Informations légales (2), Contact. Aucune note, aucun nombre d'avis.
- Les 6 en-têtes de sécurité sur `/`. `0` pour `/admin` : l'admin n'a pas de CSP, exprès.
- `403` sur `/api/leads`.
- Un `429` sur ces commandes renvoie au premier point de la section 6.

À la main :

- Ouvrir l'accueil, une page ville, un département, un service, les deux pages légales, sur mobile et sur ordinateur.
- Envoyer une vraie demande depuis chacun des 3 formulaires : le widget Turnstile s'affiche, le lead apparaît dans `/admin`, l'email arrive. Le lead est enregistré même si l'email échoue : contrôler les deux.
- Console du navigateur sans blocage CSP. Si un script Vercel est bloqué, ajouter l'hôte nommé par l'erreur à `script-src` ou `connect-src` dans `next.config.ts`.
- Test des résultats enrichis de Google sur une page ville : aucune erreur, pas de `aggregateRating` (mesuré en local : 0 sur l'accueil et sur Blois, aucune note n'étant saisie).
- Soumettre `sitemap.xml` dans la Search Console.
- Modifier puis rétablir un texte de page dans l'admin : la page publique, `sitemap.xml` et `llms.txt` se régénèrent.

## 6. Retour arrière

- Code : redéployer le build précédent depuis Vercel (promotion de l'ancien déploiement). Le schéma migré lui convient, avec les limites de la section 4.
- Schéma et données : aucun `down`. Les 10 migrations lèvent une erreur à l'annulation, parce que leurs écritures ne se distinguent plus de celles d'un éditeur.
- Dernier recours : restaurer. De préférence la branche Neon ou le point de restauration notés avant la migration, sinon `pg_restore` de la sauvegarde dans une base neuve, puis changer `DATABASE_URI` dans Vercel et redéployer. Perdu dans ce cas : les leads reçus et les modifications faites dans l'admin depuis la sauvegarde. Exporter d'abord les leads récents depuis l'admin. Les fichiers médias sont dans Vercel Blob et ne font pas partie de la sauvegarde.
- Un essai laissé en base (lead de test, page créée par erreur) se supprime par l'admin, jamais en SQL.

## 7. Points ouverts pour le propriétaire

- Défi anti-robots de Vercel : il a été signalé qu'il répond `429` aux clients qui ne sont pas des navigateurs. Non vérifiable depuis le dépôt. Si c'est le cas, les robots IA que `robots.txt` autorise ne peuvent lire ni `robots.txt`, ni `sitemap.xml`, ni `llms.txt`. Mesure : `curl -sI -A "GPTBot" https://www.douche-senior-france.com/robots.txt`. Où regarder : onglet Firewall du projet Vercel (mode Attack Challenge, règles de gestion des robots et des robots IA, intitulés à vérifier dans le tableau de bord). Décision : laisser passer ou non ces robots.
- `docs/client-checklist.md` : identité légale à confirmer, assurance décennale, médiateur, partenaires du formulaire (point bloquant pour le RGPD), affirmations sans source, accord des clients cités, photos. Rien de tout cela ne bloque la procédure technique, la décision de publier revient au propriétaire.
- Note Google : la fiche affiche 3,9/5 sur 11 avis d'après la checklist. Ces chiffres ne sont ni saisis ni publiés, seul le lien de la fiche est renseigné. Décision à prendre : les saisir dans le CMS (`google_rating`, `google_review_count`) ou non. La note Google n'entre dans les données structurées que si les deux champs sont remplis.
- Robots IA : `robots.txt` les autorise pour la visibilité dans les réponses des assistants. À confirmer avec le client.
