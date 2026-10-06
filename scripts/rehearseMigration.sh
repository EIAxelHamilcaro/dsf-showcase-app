#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
backup="${DSF_BACKUP:-$HOME/.local/share/dsf-backups/dsf-before-cms-refresh.dump}"
target="dsf_rehearsal"
work="$(mktemp -d)"

run_psql() { docker exec -i dsf-local-pg psql -U postgres "$@"; }

if [ ! -f "${backup}" ]; then
  echo "missing backup ${backup}" >&2
  exit 1
fi

baselines=("${root}"/migrations/*_baseline.ts)
if [ "${#baselines[@]}" -ne 1 ] || [ ! -f "${baselines[0]}" ]; then
  echo "expected exactly one migrations/*_baseline.ts file" >&2
  exit 1
fi

baseline="$(basename "${baselines[0]}" .ts)"

run_psql -c "drop database if exists ${target} with (force)" >/dev/null
run_psql -c "create database ${target}" >/dev/null
docker exec -i dsf-local-pg pg_restore -U postgres -d "${target}" --no-owner --no-privileges < "${backup}"

run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/rowCounts.sql" > "${work}/rows-before.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/dataChecksums.sql" > "${work}/checksums-before.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -v baseline="${baseline}" -f - < "${root}/scripts/sql/markBaselineApplied.sql"

DSF_DB="${target}" "${root}/scripts/local.sh" pnpm exec payload migrate

run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/rowCounts.sql" > "${work}/rows-after.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/dataChecksums.sql" > "${work}/checksums-after.txt"

echo "--- row counts (lines starting with < are old tables whose count changed or vanished)"
diff "${work}/rows-before.txt" "${work}/rows-after.txt" || true

removed="$(diff "${work}/rows-before.txt" "${work}/rows-after.txt" | grep '^<' | grep -v '^< payload_migrations|' || true)"
if [ -n "${removed}" ]; then
  echo "FAIL: existing table counts changed:" >&2
  echo "${removed}" >&2
  exit 1
fi

if ! diff -u "${work}/checksums-before.txt" "${work}/checksums-after.txt"; then
  echo "FAIL: data checksums changed" >&2
  exit 1
fi

echo "OK: no existing row lost or altered (work files in ${work})"
