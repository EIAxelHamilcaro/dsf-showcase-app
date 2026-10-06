#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
backup="${DSF_BACKUP:-$HOME/.local/share/dsf-backups/dsf-before-cms-refresh.dump}"
target="dsf_rehearsal"
replay="dsf_rehearsal_replay"
unrecorded="dsf_rehearsal_unrecorded"
work="$(mktemp -d)"

run_psql() { docker exec -i dsf-local-pg psql -U postgres "$@"; }

deploy() {
  DSF_DB="$1" "${root}/scripts/local.sh" env VERCEL_ENV="$2" "${root}/scripts/vercelBuild.sh" --migrate-only
}

fingerprint() {
  docker exec -i dsf-local-pg pg_dump -U postgres -d "$1" | grep -v -E '^\\(un)?restrict ' | sha256sum
}

expect_untouched() {
  if [ "$(fingerprint "$1")" != "$2" ]; then
    echo "FAIL: $3" >&2
    exit 1
  fi
}

expect_refusal() {
  if deploy "$1" production; then
    echo "FAIL: $2" >&2
    exit 1
  fi
}

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

city_migrations=("${root}"/migrations/*_city_pages_from_template.ts "${root}"/migrations/*_city_pages_share_one_model.ts)
if [ "${#city_migrations[@]}" -ne 2 ] || [ ! -f "${city_migrations[0]}" ] || [ ! -f "${city_migrations[1]}" ]; then
  echo "expected exactly one migrations/*_city_pages_from_template.ts and one migrations/*_city_pages_share_one_model.ts file" >&2
  exit 1
fi

run_psql -c "drop database if exists ${target} with (force)" >/dev/null
run_psql -c "create database ${target}" >/dev/null
docker exec -i dsf-local-pg pg_restore -U postgres -d "${target}" --no-owner --no-privileges < "${backup}"

run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/rowCounts.sql" > "${work}/rows-before.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/dataChecksums.sql" > "${work}/checksums-before.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/cellDump.sql" > "${work}/cells-before.txt"

restored="$(fingerprint "${target}")"

echo "--- deploy path (a): a preview build does not migrate"
deploy "${target}" preview
expect_untouched "${target}" "${restored}" "a preview build changed the database"
echo "(a) OK: schema and data untouched"

echo "--- deploy path (b): a production build refuses a database that is not bootstrapped"
expect_refusal "${target}" "the guard accepted a database that still has its dev mode row"
expect_untouched "${target}" "${restored}" "a refused production build changed the database"

run_psql -c "drop database if exists ${unrecorded} with (force)" >/dev/null
run_psql -c "create database ${unrecorded} template ${target}" >/dev/null
run_psql -d "${unrecorded}" -v ON_ERROR_STOP=1 -c "delete from payload_migrations where batch = -1" >/dev/null
without_dev_row="$(fingerprint "${unrecorded}")"
expect_refusal "${unrecorded}" "the guard accepted a database whose baseline is not recorded"
expect_untouched "${unrecorded}" "${without_dev_row}" "a refused production build changed the database"
run_psql -c "drop database ${unrecorded} with (force)" >/dev/null
echo "(b) OK: refused with the dev mode row, refused with an unrecorded baseline, nothing written"

echo "--- deploy path (c): bootstrap, then a production build applies every migration"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -v baseline="${baseline}" -f - < "${root}/scripts/sql/markBaselineApplied.sql"
deploy "${target}" production

migration_files=("${root}"/migrations/[0-9]*.ts)
recorded="$(run_psql -d "${target}" -v ON_ERROR_STOP=1 -Atc "select count(*) from payload_migrations where batch > 0")"
if [ "${recorded}" -ne "${#migration_files[@]}" ]; then
  echo "FAIL: ${recorded} migration(s) recorded, ${#migration_files[@]} expected" >&2
  exit 1
fi
echo "(c) OK: ${recorded} of ${#migration_files[@]} migrations recorded"

echo "--- deploy path (d): a second production build is a no-op"
migrated="$(fingerprint "${target}")"
deploy "${target}" production
expect_untouched "${target}" "${migrated}" "a second production build changed the database"
echo "(d) OK: schema and data untouched"

echo "--- city pages: one template, one record per city, no city page document left"
city_state="$(run_psql -d "${target}" -v ON_ERROR_STOP=1 -Atc "select (select count(*) from cities) || ' city records, ' || (select count(*) from city_template) || ' template, ' || (select count(*) from pages where page_type = 'city') || ' city page documents'")"
if [ "${city_state}" != "6 city records, 1 template, 0 city page documents" ]; then
  echo "FAIL: ${city_state}" >&2
  exit 1
fi
echo "(e) OK: ${city_state}"

run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/rowCounts.sql" > "${work}/rows-after.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/dataChecksums.sql" > "${work}/checksums-after.txt"
run_psql -d "${target}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/cellDump.sql" > "${work}/cells-after.txt"

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

awk -F'|' '
  function cell_key() { return $1 "|" $2 "|" $3 }
  function cell_value() { return substr($0, length(cell_key()) + 2) }
  NR == FNR { before[cell_key()] = cell_value(); next }
  { after[cell_key()] = cell_value() }
  END {
    for (key in after) {
      if (!(key in before)) {
        if (after[key] != "null") print key "\t(new column)\t" after[key]
        continue
      }
      if (before[key] != after[key]) print key "\t" before[key] "\t" after[key]
    }
    for (key in before) {
      if (!(key in after)) print key "\t" before[key] "\t(removed)"
    }
  }
' "${work}/cells-before.txt" "${work}/cells-after.txt" | sort > "${work}/cells-changed.txt"

echo "--- config, gallery and media: every changed cell (table|row|column, before, after)"
unexpected=""
while IFS=$'\t' read -r key before after; do
  IFS='|' read -r table _row column <<< "${key}"
  printf '%s\n    before: %s\n    after:  %s\n' "${key}" "${before}" "${after}"
  if ! grep -Fxq -e "${key}" -e "${table}|*|${column}" "${root}/scripts/sql/expectedCellChanges.txt"; then
    unexpected="${unexpected}${key}"$'\n'
  fi
done < "${work}/cells-changed.txt"

if [ -n "${unexpected}" ]; then
  echo "FAIL: cells changed outside scripts/sql/expectedCellChanges.txt:" >&2
  printf '%s' "${unexpected}" >&2
  exit 1
fi

dump_content() {
  docker exec -i dsf-local-pg pg_dump -U postgres -d "${replay}" --data-only --column-inserts --exclude-table='payload_migrations*' 2>/dev/null \
    | grep -v -E '^\\(un)?restrict '
}

replay_twice() {
  dump_content > "${work}/replay-before.sql"

  DSF_DB="${replay}" "${root}/scripts/local.sh" pnpm exec payload migrate

  dump_content > "${work}/replay-after.sql"

  if ! diff -u "${work}/replay-before.sql" "${work}/replay-after.sql"; then
    echo "FAIL: $1" >&2
    exit 1
  fi

  run_psql -c "drop database ${replay} with (force)" >/dev/null
}

echo "--- replay 1: turnkey_content, content_review_fixes and home_seo_and_aid_conditions run again on their own result, after editor changes, on the state that precedes the city records"
run_psql -c "drop database if exists ${replay} with (force)" >/dev/null
run_psql -c "create database ${replay}" >/dev/null
docker exec -i dsf-local-pg pg_restore -U postgres -d "${replay}" --no-owner --no-privileges < "${backup}"
run_psql -d "${replay}" -v ON_ERROR_STOP=1 -v baseline="${baseline}" -f - < "${root}/scripts/sql/markBaselineApplied.sql" >/dev/null
for city_migration in "${city_migrations[@]}"; do
  run_psql -d "${replay}" -v ON_ERROR_STOP=1 -c "insert into payload_migrations (name, batch) values ('$(basename "${city_migration}" .ts)', 1)" >/dev/null
done
DSF_DB="${replay}" "${root}/scripts/local.sh" pnpm exec payload migrate >/dev/null
run_psql -d "${replay}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/editorEdits.sql"
replay_twice "running the content migrations a second time changed data or overwrote an editor change"
echo "replay 1: second run changed nothing, editor changes kept"

echo "--- replay 2: city_pages_from_template and city_pages_share_one_model run again on their own result, after editor changes"
run_psql -c "create database ${replay} template ${target}" >/dev/null
run_psql -d "${replay}" -v ON_ERROR_STOP=1 -At -f - < "${root}/scripts/sql/cityEditorEdits.sql"
replay_twice "running the city migrations a second time changed data, overwrote an editor change or brought back a deleted city"
echo "replay 2: second run changed nothing, editor changes kept, deleted city not recreated"

echo "OK: no existing row lost or altered beyond scripts/sql/expectedCellChanges.txt (work files in ${work})"
