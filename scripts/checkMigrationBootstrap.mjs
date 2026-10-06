import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sql } from "@payloadcms/db-postgres/drizzle";
import { drizzle } from "@payloadcms/db-postgres/drizzle/node-postgres";

const runbook = "docs/deploy-runbook.md, section 3";
const loopbackHosts = ["127.0.0.1", "localhost"];
const devBatch = -1;
const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.resolve(scriptsDir, "..", "migrations");

const refuse = (reason) => {
  process.stderr.write(
    `refused: ${reason}\nNo migration ran. Bootstrap procedure: ${runbook}.\n`,
  );
  process.exit(1);
};

const parseUri = (value) => {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
};

const baselines = readdirSync(migrationsDir).filter((file) =>
  file.endsWith("_baseline.ts"),
);
const [baselineFile] = baselines;
if (baselines.length !== 1 || !baselineFile) {
  refuse("expected exactly one migrations/*_baseline.ts file");
}

const baseline = path.basename(baselineFile, ".ts");

const connectionString = process.env.DATABASE_URI ?? "";
if (!connectionString) {
  refuse("DATABASE_URI is not set in the environment");
}

const uri = parseUri(connectionString);
if (!uri) {
  refuse("DATABASE_URI is not a valid URL");
}

const onVercel = process.env.VERCEL === "1";
const isLoopback =
  loopbackHosts.includes(uri.hostname) && !uri.search && !uri.hash;
if (!onVercel && !isLoopback) {
  refuse(
    `outside a Vercel build only a loopback database without query string can be migrated, DATABASE_URI points to ${uri.host}${uri.search && " with a query string"}`,
  );
}

const target = `${uri.host}${uri.pathname}`;
const database = drizzle({
  connection: { connectionString, connectionTimeoutMillis: 15000 },
});

const readState = async () => {
  const table = await database.execute(
    sql`select to_regclass('public.payload_migrations') is not null as present`,
  );
  if (!table.rows[0]?.present) {
    return { hasTable: false, rows: [] };
  }

  const migrations = await database.execute(
    sql`select name, batch from payload_migrations`,
  );

  return { hasTable: true, rows: migrations.rows };
};

const state = await readState()
  .catch((error) =>
    refuse(`cannot read payload_migrations on ${target}: ${error.message}`),
  )
  .finally(() => database.$client.end());

if (!state.hasTable) {
  refuse(`${target} has no payload_migrations table`);
}

if (state.rows.some((row) => Number(row.batch) === devBatch)) {
  refuse(
    `${target} still carries a dev mode row (batch ${devBatch}) in payload_migrations`,
  );
}

if (!state.rows.some((row) => row.name === baseline)) {
  refuse(`${target} does not record the baseline migration ${baseline}`);
}

process.stdout.write(
  `bootstrap check passed: database ${target}, ${state.rows.length} migration(s) recorded\n`,
);
