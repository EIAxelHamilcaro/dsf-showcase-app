#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
database="${DSF_DB:-dsf}"

export DATABASE_URI="${DSF_LOCAL_DB_URI:-postgresql://postgres:dsf@127.0.0.1:5544/${database}}"
export NEXT_PUBLIC_SERVER_URL="http://localhost:3100"
export GMAIL_PASS=""
export NEXT_PUBLIC_TURNSTILE_SITE_KEY="1x00000000000000000000AA"
export TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"

host="$(node -e 'process.stdout.write(new URL(process.env.DATABASE_URI).host)')"
case "${host}" in
  127.0.0.1:*|localhost:*) ;;
  *)
    echo "refused: DATABASE_URI points to ${host}, only 127.0.0.1 and localhost are allowed" >&2
    exit 1
    ;;
esac

token_line="$(grep -E '^BLOB_READ_WRITE_TOKEN=' "${root}/.env" || true)"
token="${token_line#BLOB_READ_WRITE_TOKEN=}"
token="${token//\"/}"
store_id="$(printf '%s' "${token}" | cut -d_ -f4)"
if [ -z "${store_id}" ]; then
  echo "refused: no blob store id found in .env, media URLs cannot be built" >&2
  exit 1
fi
export BLOB_READ_WRITE_TOKEN="vercel_blob_rw_${store_id}_localonlynosecret"

echo "local stack: database ${host}/${DATABASE_URI##*/}, blob store ${store_id}, blob writes disabled" >&2
exec "$@"
