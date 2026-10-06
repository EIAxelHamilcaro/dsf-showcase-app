<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Douche Senior France

Site vitrine d'un artisan (douches sécurisées pour seniors, Centre-Val de Loire). Next.js App Router + Payload CMS (Postgres), Tailwind 4, shadcn, Biome, bun test, pnpm. Les visiteurs sont surtout des personnes âgées : accessibilité et lisibilité priment.

## Environnement

- `.env` pointe sur la base Neon de production : toute commande passe par `./scripts/local.sh` (Postgres Docker sur 127.0.0.1:5544), ce que font déjà les scripts pnpm.
- `pnpm dev`, `pnpm build` (webpack), `pnpm test`, `pnpm check`, `pnpm fix`, `pnpm exec tsc --noEmit` (ignorer les erreurs sous `.next/types`).
- `pnpm build` écrase le `.next` d'un `pnpm start` en cours : le relancer ensuite.
- Les migrations Payload tournent au build Vercel de production (`scripts/vercelBuild.sh`). Après une montée de version Payload : `pnpm payload migrate:create <nom>` puis `pnpm payload migrate`, sinon 500 sur colonne manquante.
- `pnpm up --latest` monte `graphql` en 17, Payload exige ^16.
- `pnpm ui:add <composant> --overwrite` écrit `from "cn"` : remettre `@/lib/utils` et retirer le paquet `cn`.
- Docs : `docs/cms-guide.md`, `docs/deploy-runbook.md`, `docs/client-checklist.md`.

## Interface

- Tout le style vit dans `app/globals.css` : tokens dans `:root` et `@theme inline`, classes sémantiques en `@layer components` (`.section[data-tone]`, `.tile-wall`, `.tile`, `.split`, `.lead`, `.prose`, `.choice`, `.notice`). Dans les composants : classes de placement uniquement, jamais de `style`.
- `components/ui` ne se modifie pas : shadcn se redimensionne par des règles non layerisées sur `[data-slot]` dans `globals.css`.
- Une section = `PageSection` (`tone`, `layout`) + `SectionHeader` (`app/_components/pageSection.tsx`).
- Racine à 18px mais les media queries comptent en rem de 16px : `xl` = 1280px.
- Police unique Lexend. Couleurs de la marque figées.
- Accessibilité : cibles de 3rem, focus de 3px, pas de placeholder (indice visible), pas d'avance automatique dans le formulaire en étapes, FAQ en `forceMount` (contenu présent dans le HTML servi). Viser 0 violation axe-core sur chaque gabarit, de 320 à 1440px.

## Contenu et maillage

- Pages pilotées par le CMS (`pageType` : service, department, city, legal), rendues par `app/(frontend)/[slug]/page.tsx` et `app/_components/blocks/blockRenderer.tsx`.
- Maillage interne : `lib/pages/pageLinks.ts` (fil d'Ariane, pied de page, « À lire aussi ») et `lib/pages/mentionLinks.ts` (noms de villes et de départements liés dans les paragraphes, un lien par paragraphe, une cible une fois par page).
- Les textes sont validés par le client : ne pas inventer de prix, de montants d'aides ni d'avis.

## Vercel

- Projet `dsf-showcase-app`, team `ei-axel-hamilcaro`, plan hobby. La production suit `main`.
- Pare-feu : `vercel firewall rules list|add|edit --project dsf-showcase-app`, puis `vercel firewall publish`. Bot Protection reste en `log` : en `challenge`, tout client non navigateur reçoit un 429 (robots IA et outils SEO non vérifiés compris).
