#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mode="${1:-}"
environment="${VERCEL_ENV:-}"

if [ "$#" -gt 1 ] || { [ -n "${mode}" ] && [ "${mode}" != "--migrate-only" ]; }; then
  echo "usage: vercelBuild.sh [--migrate-only]" >&2
  exit 2
fi

cd "${root}"

if [ "${environment}" = "production" ]; then
  node scripts/checkMigrationBootstrap.mjs
  pnpm exec payload migrate
else
  echo "migrations skipped: VERCEL_ENV is '${environment:-unset}', only production deployments migrate"
fi

if [ "${mode}" = "--migrate-only" ]; then
  exit 0
fi

exec pnpm exec next build --webpack
