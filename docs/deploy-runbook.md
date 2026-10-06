# Runbook de mise en production : pages CMS, SEO, formulaires

État au 06/10/2026 : rédigé, jamais exécuté. L'amorçage de la base (section 3) et la fusion dans `main` reviennent à la personne qui détient la base de production (Neon) et le projet Vercel. Une fois la base amorcée, chaque déploiement de production migre seul.

Ce qui a été vérifié l'a été en local (base `127.0.0.1:5544`, répétition `scripts/rehearseMigration.sh` sur une sauvegarde de la production). Ce qui dépend de Vercel, Neon ou Cloudflare est marqué « à vérifier ».

## Règles

- Jamais `migrate:down`, `migrate:fresh`, `migrate:reset` ni `migrate:refresh` sur la production. Le `down` des 16 migrations lève une erreur exprès, les trois autres commandes suppriment des tables.
- La migration fait partie du build de production : `scripts/vercelBuild.sh` lance `payload migrate` puis `next build`, qui lit la base (`generateStaticParams`, `sitemap.xml`, `llms.txt`). Plus aucun `payload migrate` à la main sur la production.
- Seul `VERCEL_ENV=production` migre. Les previews et les déploiements de développement ne migrent jamais, même s'ils partagent la base de production.
- `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm test` et `pnpm payload` passent par `scripts/local.sh`, qui force la base locale et refuse tout hôte autre que `127.0.0.1` ou `localhost`. Ce garde-fou ne se contourne pas et ne se modifie pas.
- Le `.env` du poste pointe vers la production. Toute commande `pnpm exec payload ...` ou `next ...` lancée sans le wrapper vise donc la production : le second garde-fou ci-dessous la refuse. `pnpm build:production` ne se lance pas sur un poste : son `next build` lirait la production. Sa partie migration, elle, refuse hors Vercel toute base autre que `127.0.0.1` ou `localhost`.
- Second garde-fou, dans l'application : `payload.config.ts` refuse de se charger quand l'hôte de `DATABASE_URI` n'est pas `127.0.0.1`, `localhost` ou `::1` (ou quand la chaîne porte une chaîne de requête ou un fragment), sauf sur un déploiement Vercel (`VERCEL=1` et `VERCEL_ENV` différent de `development`). L'erreur commence par `Database refused:` et ne nomme que l'hôte. Une commande lancée sans le wrapper (`pnpm exec payload ...`, `next ...`) échoue donc au lieu de toucher la production.
- Opération volontaire sur la production avec une commande qui charge la configuration Payload : ajouter `DSF_ALLOW_REMOTE_DATABASE=1` devant cette seule commande, jamais dans `.env` ni en `export`. Exemple : `DSF_ALLOW_REMOTE_DATABASE=1 pnpm exec payload migrate:status`. Les commandes `psql` de ce document (sauvegarde, amorçage, contrôles) ne chargent pas cette configuration : elles n'en ont pas besoin et le garde-fou ne les protège pas, d'où la relecture de l'hôte avant chacune.
- Après l'amorçage, ne plus jamais lancer en mode dev un code antérieur au commit `e167873` avec le `.env` de production : avant ce commit le schéma est poussé automatiquement (`push`), ce qui proposerait de supprimer les nouvelles tables.

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
- À vérifier dans la console Neon : durée de l'historique de restauration, puis créer une branche Neon depuis la production juste avant l'amorçage et noter l'heure.

### Répétition sur la sauvegarde fraîche (locale, sans risque)

```bash
DSF_BACKUP=~/.local/share/dsf-backups/dsf-prod-$(date +%F).dump ./scripts/rehearseMigration.sh
```

Le script restaure la sauvegarde dans la base locale `dsf_rehearsal` (conteneur Docker `dsf-local-pg`, PostgreSQL 17.11) puis joue le vrai chemin de déploiement, `scripts/vercelBuild.sh --migrate-only` (sans `next build`), dans quatre situations :

```
(a) OK: schema and data untouched
(b) OK: refused with the dev mode row, refused with an unrecorded baseline, nothing written
(c) OK: 16 of 16 migrations recorded
(d) OK: schema and data untouched
(e) OK: 6 city records, 1 template, 0 city page documents
```

- (a) build de preview : aucune migration.
- (b) build de production sur une base non amorcée : refus, rien d'écrit.
- (c) amorçage (`scripts/sql/markBaselineApplied.sql`) puis build de production : les 15 migrations passent.
- (d) second build de production : rien ne change.
- (e) les 6 pages ville sont devenues 6 fiches ville et un modèle, il ne reste aucun document de page de type ville.

Il compare ensuite la base avant et après, puis rejoue les migrations de contenu sur des copies modifiées comme le ferait un éditeur : les trois premières sur l'état qui précède les fiches ville (elles exigent les 6 documents de page ville), puis `city_pages_from_template` et `city_pages_share_one_model` sur leur propre résultat, avec une ville supprimée entre-temps. Il doit finir par :

```
replay 1: second run changed nothing, editor changes kept
replay 2: second run changed nothing, editor changes kept, deleted city not recreated
OK: no existing row lost or altered beyond scripts/sql/expectedCellChanges.txt
```

Toute ligne `FAIL` arrête la release. C'est ici, et pas en production, que se lisent les lignes de journal décrites en section 4.

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

### Commande de build et portées

`vercel.json` impose `pnpm build:production`, soit `scripts/vercelBuild.sh`. Le script `build` passe par `scripts/local.sh` et échoue exprès sur Vercel.

À vérifier par le propriétaire dans le tableau de bord Vercel :

- Aucune commande de build n'y remplace celle de `vercel.json`, et la branche de production est bien `main`.
- Portées de `DATABASE_URI` : laquelle sert Production, laquelle sert Preview. Si Preview vise la base de production, c'est toléré (une preview ne migre jamais), mais le build d'une preview lit alors la production : tant qu'elle n'est pas migrée, la table `pages` manque et ce build échoue, sans effet sur la production.
- Les variables système sont exposées au build (`VERCEL=1`, `VERCEL_ENV`). Sans `VERCEL_ENV=production` le build ne migre pas, sans `VERCEL=1` il refuse de migrer une base distante.
- `DATABASE_URI` et `PAYLOAD_SECRET` sont disponibles pendant le build de production.

Non vérifiable depuis le dépôt : `payload migrate` n'a jamais tourné dans un build Vercel de ce projet, ni à travers le pooler Neon. Le premier build de production en est le premier essai réel. S'il échoue, l'ancien déploiement reste en ligne.

## 3. Amorçage de la base de production, une seule fois

La production a été créée en mode dev : `payload_migrations` contient une ligne `dev` de lot `-1`. La baseline (`20261006_105338_baseline`) décrit le schéma existant : elle se marque comme appliquée, elle ne s'exécute pas.

Tant que ce n'est pas fait, tout build de production est refusé (section 4). Mesuré en local sur une copie de la sauvegarde, sans le garde-fou :

- avec la ligne `dev`, `payload migrate` affiche une question (`Would you like to proceed?`) et attend sans fin, même sans terminal : le build resterait bloqué jusqu'au délai maximal de Vercel ;
- sans la ligne `dev` et sans baseline marquée, il rejoue la baseline, échoue sur `CREATE TABLE "leads"` (code 1) et n'écrit rien.

L'amorçage se fait avec `psql`, après la sauvegarde (section 2), avant de fusionner la release. Ces commandes `psql` ne passent pas par l'application : `DSF_ALLOW_REMOTE_DATABASE=1` ne leur sert à rien. Si une commande Payload devait un jour s'y ajouter, elle le demanderait (voir Règles). Il ne change rien pour le site en ligne. Avant chaque commande, relire l'hôte :

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

### 3.2 Marquer la baseline et retirer la ligne dev

Le même fichier que la répétition fait les deux écritures dans une transaction :

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

### 3.3 Vérifier

```bash
psql "$PROD_URI" -Atc "select name, batch from payload_migrations order by id;"
```

Attendu, une seule ligne :

```
20261006_105338_baseline|1
```

Après cela, ne plus jamais lancer en mode dev un code antérieur au commit `e167873` sur cette base (voir Règles).

## 4. Déploiement : le build migre

Ordre :

1. Sauvegarde et répétition (section 2).
2. Variables Turnstile et vérifications Vercel (section 2).
3. Amorçage (section 3).
4. Fusionner la PR de la release dans `main`. Ne lancer qu'un seul déploiement de production à la fois : rien ne verrouille deux migrations simultanées.
5. Lire le journal du build (ci-dessous), puis contrôler la base et le site (section 5).

### Ce que fait le build

| `VERCEL_ENV` | Effet |
| --- | --- |
| `production` | contrôle de l'amorçage, `payload migrate`, puis `next build --webpack` |
| autre valeur ou absent | `next build --webpack` seul, avec la ligne `migrations skipped: VERCEL_ENV is 'preview', only production deployments migrate` |

Journal attendu d'un build de production : `bootstrap check passed: database <hôte>/<base>, 1 migration(s) recorded`, puis 15 couples `Migrating:` / `Migrated:` dans cet ordre, puis `Done.`, puis le build Next :

1. `pages_and_site_settings`
2. `block_display_options`
3. `feature_cards_spacing`
4. `testimonial_block_rating`
5. `faq_text_and_legal_blocks`
6. `home_seo_and_information_pages`
7. `cities_and_city_template`
8. `seed_pages_and_site_identity`
9. `city_template_service_and_aid_sections`
10. `blois_testimonial_rating`
11. `turnkey_content`
12. `content_review_fixes`
13. `home_seo_and_aid_conditions`
14. `city_pages_from_template`
15. `city_pages_share_one_model`

Les builds suivants affichent `16 migration(s) recorded` puis `Done.` sans rien migrer, jusqu'à la prochaine migration ajoutée au dépôt.

Lignes de journal attendues (comptées sur la répétition du 06/10/2026) :

| Migration | Lignes | Détail |
| --- | --- | --- |
| `turnkey_content` | 18 | 14 `corrected`, 1 `removed`, 1 `swapped`, 1 `Google profile link set`, 1 `34 media described, 0 already had a description` |
| `content_review_fixes` | 15 | 15 `corrected` |
| `home_seo_and_aid_conditions` | 4 | 1 `corrected`, 1 `marked as an information page`, 1 `home title set`, 1 `home description set` |
| `city_pages_from_template` | 57 | 1 `city page template created`, 6 `converted`, 50 `now uses the template wording` (Blois 15, Bourges 5, Châteauroux 9, Orléans 3, Romorantin 7, Tours 11) |
| `city_pages_share_one_model` | 27 | 12 `template ... set to`, 2 `filled from the section of douche-senior-blois`, 1 `no longer carries its own serviceCards and aidCards`, 9 `emptied, the template pattern applies`, 3 `search title already follows the template` (Bourges, Châteauroux, Orléans : attendu) |

Soit 30 `corrected`, 1 `removed`, 1 `swapped`, 3 `set`, 1 `marked`, 1 `created`, 6 `converted`, 50 `now uses the template wording`, 12 `set to`, 2 `filled`, 9 `emptied`.

`city_pages_from_template` remplace les 6 documents de page ville, créés par `seed_pages_and_site_identity` dans ce même build (aucune donnée du client), par 6 fiches de la rubrique Villes et un modèle commun. Chaque fiche est relue et comparée à sa page avant que la page soit supprimée. Les lignes `now uses the template wording` listent chaque texte d'une ville remplacé par celui du modèle. `city_pages_share_one_model` pose ensuite le texte définitif du modèle (celui de la page Tours), y déplace les sections prestations et aides de Blois pour toutes les villes, et vide les titres et descriptions de recherche propres aux villes pour que ceux du modèle s'appliquent. Chaque valeur n'est touchée que si elle est encore celle écrite par `city_pages_from_template`.

### Fenêtre pendant le build

Les migrations écrivent dans la base dès qu'elles passent, donc pendant le build, avant que le nouveau code soit en ligne. Pendant le reste du build (durée de `next build` sur Vercel non mesurée, quelques minutes), l'ancien site affiche déjà les données modifiées : les 3 textes du crédit d'impôt de l'accueil et la paire de photos de la réalisation 2. Si `next build` échoue après une migration réussie, cet état dure jusqu'au build suivant, qui ne remigre pas.

L'ancien code reste compatible avec le schéma migré. Vérifié par lecture des 8 migrations de schéma : elles ne font que créer des types et des tables, ajouter des colonnes sans `NOT NULL` aux tables existantes (`config`, `config_testimonials_section`, `media`, `payload_locked_documents_rels`), des index et des clés étrangères. Aucun `DROP`, aucun renommage, aucun changement de type.

Verrous : chaque `ALTER TABLE` d'une migration de schéma prend un verrou exclusif bref sur sa table (`config`, `config_testimonials_section`, `media` pour les tables existantes). Ni `scripts/vercelBuild.sh` ni `payload migrate` ne posent de `lock_timeout` : si une transaction longue tient déjà la table, la migration attend derrière elle et les lectures du site attendent derrière la migration. Choisir donc un moment calme : hors des heures d'ouverture, personne en train d'enregistrer dans l'admin, et aucune transaction ouverte juste avant de fusionner :

```bash
psql "$PROD_URI" -Atc "select pid, state, now() - xact_start, left(query, 60) from pg_stat_activity where datname = current_database() and xact_start is not null and pid <> pg_backend_pid() order by xact_start;"
```

Attendu : aucune ligne. Une ligne qui dure : attendre qu'elle disparaisse avant de fusionner.

Ce qui n'est pas couvert :

- L'ancien code n'a pas été exécuté sur une base migrée : la compatibilité repose sur la lecture des migrations.
- Pendant cette fenêtre, puis après un éventuel retour arrière, ne pas enregistrer la configuration depuis l'admin de l'ancien code : il ignore les nouvelles colonnes et son comportement à l'enregistrement n'a pas été testé.

### Build refusé

Le journal contient une ligne `refused:` suivie de `No migration ran. Bootstrap procedure: docs/deploy-runbook.md, section 3.`, le build échoue, l'ancien déploiement reste en ligne, rien n'est écrit.

| Message | Quoi faire |
| --- | --- |
| `still carries a dev mode row (batch -1)` | faire l'amorçage (section 3) |
| `does not record the baseline migration` | faire l'amorçage (section 3) |
| `has no payload_migrations table` | `DATABASE_URI` de la portée Production vise une base vide ou une autre base : corriger la variable |
| `DATABASE_URI is not set` ou `is not a valid URL` | corriger la variable de la portée Production |
| `outside a Vercel build only a loopback database` | `VERCEL=1` absent : exposer les variables système au build |
| `cannot read payload_migrations` | base injoignable, lire le message qui suit |

Puis relancer le déploiement.

### Migration en échec

`Error running migration <nom>` : la commande sort en code 1, le build échoue, l'ancien déploiement reste en ligne. Chaque migration tourne dans sa propre transaction : celle qui échoue n'écrit rien, les précédentes restent appliquées. Cas prévus par le code : une ligne `config` absente ou multiple, une page attendue absente, un média de `migrations/seed/mediaAltSeed.ts` introuvable (identifiant et nom de fichier), une page de type ville hors des 6 prévues, une page ville sans département ou modifiée d'une façon qu'une fiche ville ne peut pas contenir (blocs ajoutés ou déplacés, image de partage). Corriger la cause puis redéployer : la migration reprend à la première manquante.

### Lignes à surveiller dans un build réussi

Ces lignes ne font pas échouer le build. Les chercher dans le journal juste après le déploiement, et d'abord dans la répétition, qui les montre avant la production :

- `left as is`, `not found`, `found more than once`, `found 0 times`, `skipped`, `already corrected`, `already exists`, `already has`, `already filled`, `left empty` ou `is already a city record` (sauf les 3 `search title already follows the template` du tableau) : le contenu de production diffère de celui de la répétition, une correction n'a pas été posée.
- Un compte qui diffère du tableau.

### État de la base après le build

```bash
B=~/.local/share/dsf-backups
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/rowCounts.sql > $B/rows-after.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/dataChecksums.sql > $B/checksums-after.txt
psql "$PROD_URI" -v ON_ERROR_STOP=1 -At -f scripts/sql/cellDump.sql > $B/cells-after.txt
diff $B/rows-before.txt $B/rows-after.txt
diff $B/checksums-before.txt $B/checksums-after.txt
diff $B/cells-before.txt $B/cells-after.txt | grep '^<'
psql "$PROD_URI" -Atc "select name, batch from payload_migrations order by id;"
```

Attendu :

- Comptes : une seule ligne `<`, `payload_migrations|1` (devenue `16`). Les lignes `>` sont les nouvelles tables, dont `pages|11`, `cities|6`, `city_template|1`, `cities_zones|52`, `cities_faq_items|24`, `cities_blocks_testimonial|1`, `cities_blocks_service_cards|0`, `city_template_service_cards_cards|2`, `city_template_aid_cards_cards|2`, `config_menu_services|4`, `pages_blocks_faq|9`, `pages_blocks_legal_content|2`. Toute autre ligne `<` : une table existante a perdu ou gagné des lignes, enquêter (un lead arrivé entre-temps change `leads` : le vérifier dans l'admin).
- Sommes de contrôle : aucune différence sur `leads`, `users`, `users_sessions`, `config_faq_section_faq`, `config_testimonials_section` (hors colonnes ajoutées `rating`, `date`, `source`). Une différence sur `leads`, `users` ou `users_sessions` peut venir d'un lead ou d'une connexion à l'admin entre-temps : le confirmer.
- Cellules : exactement 6 lignes `<`, toutes prévues par `scripts/sql/expectedCellChanges.txt` :
  - `config|1|financial_section_financial_help_1_title`, `..._icon_text`, `..._description` (crédit d'impôt supprimé) ;
  - `config|1|updated_at` ;
  - `config_caroussel_section|2|before_id` et `after_id` (photos avant et après inversées).
- `payload_migrations` : 16 lignes, la baseline en lot 1, les 15 autres en lot 2.
- Villes : `select (select count(*) from cities), (select count(*) from city_template), (select count(*) from pages where page_type = 'city');` répond `6|1|0`.

Cette release modifie donc 3 textes de l'accueil et une paire de photos existants, et remplit des colonnes neuves (identité légale, lien de la fiche Google, description des 34 médias, titre et description de l'accueil pour les moteurs de recherche). Aucune ligne existante n'est supprimée.

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

- Code : redéployer le build précédent depuis Vercel (promotion de l'ancien déploiement). Une promotion ne reconstruit rien, donc ne migre pas. Le schéma migré lui convient, avec les limites de la section 4.
- Attention : ne jamais promouvoir un build antérieur au correctif de sécurité `b6243b1` (section 1). Il rouvrirait l'accès public à `/api/leads` (nom, téléphone, email, adresse des demandes), ainsi que la suppression des leads et la modification de la configuration sans connexion. Avant toute promotion, vérifier que le déploiement choisi contient ce commit, puis relancer le `curl` de la section 1 : il doit répondre `403`.
- Schéma et données : aucun `down`. Les 16 migrations lèvent une erreur à l'annulation, parce que leurs écritures ne se distinguent plus de celles d'un éditeur.
- Dernier recours : restaurer. De préférence la branche Neon ou le point de restauration notés avant l'amorçage, sinon `pg_restore` de la sauvegarde dans une base neuve, puis changer `DATABASE_URI` dans Vercel et redéployer. Perdu dans ce cas : les leads reçus et les modifications faites dans l'admin depuis la sauvegarde. Exporter d'abord les leads récents depuis l'admin. Les fichiers médias sont dans Vercel Blob et ne font pas partie de la sauvegarde.
- Un essai laissé en base (lead de test, page créée par erreur) se supprime par l'admin, jamais en SQL.

## 7. Points ouverts pour le propriétaire

- Défi anti-robots de Vercel : il a été signalé qu'il répond `429` aux clients qui ne sont pas des navigateurs. Non vérifiable depuis le dépôt. Si c'est le cas, les robots IA que `robots.txt` autorise ne peuvent lire ni `robots.txt`, ni `sitemap.xml`, ni `llms.txt`. Mesure : `curl -sI -A "GPTBot" https://www.douche-senior-france.com/robots.txt`. Où regarder : onglet Firewall du projet Vercel (mode Attack Challenge, règles de gestion des robots et des robots IA, intitulés à vérifier dans le tableau de bord). Décision : laisser passer ou non ces robots.
- `docs/client-checklist.md` : identité légale à confirmer, assurance décennale, médiateur, partenaires du formulaire (point bloquant pour le RGPD), affirmations sans source, accord des clients cités, photos. Rien de tout cela ne bloque la procédure technique, la décision de publier revient au propriétaire.
- Note Google : la fiche affiche 3,9/5 sur 11 avis d'après la checklist. Ces chiffres ne sont ni saisis ni publiés, seul le lien de la fiche est renseigné. Décision à prendre : les saisir dans le CMS (`google_rating`, `google_review_count`) ou non. La note Google n'entre dans les données structurées que si les deux champs sont remplis.
- Robots IA : `robots.txt` les autorise pour la visibilité dans les réponses des assistants. À confirmer avec le client.
