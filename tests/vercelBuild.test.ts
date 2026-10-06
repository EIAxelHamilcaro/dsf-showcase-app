import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";

const script = path.resolve(import.meta.dirname, "../scripts/vercelBuild.sh");

const stub = `#!/usr/bin/env bash
call="$(basename "$0") $*"
echo "\${call}" >> "\${STUB_LOG}"
if [ -n "\${STUB_FAIL:-}" ] && [ "\${call}" = "\${STUB_FAIL}" ]; then
  exit 1
fi
`;

const check = "node scripts/checkMigrationBootstrap.mjs";
const migrate = "pnpm exec payload migrate";
const build = "pnpm exec next build --webpack";

interface RunInput {
  vercelEnv?: string;
  args?: string[];
  failingCall?: string;
}

const run = ({ vercelEnv, args = [], failingCall }: RunInput) => {
  const shims = mkdtempSync(path.join(tmpdir(), "vercel-build-"));
  const log = path.join(shims, "calls.log");
  writeFileSync(log, "");
  for (const name of ["node", "pnpm"]) {
    writeFileSync(path.join(shims, name), stub, { mode: 0o755 });
  }

  const env: NodeJS.ProcessEnv = {
    NODE_ENV: "test",
    PATH: `${shims}:/usr/bin:/bin`,
    STUB_LOG: log,
  };
  if (vercelEnv !== undefined) {
    env.VERCEL_ENV = vercelEnv;
  }
  if (failingCall) {
    env.STUB_FAIL = failingCall;
  }

  const result = spawnSync("bash", [script, ...args], {
    env,
    encoding: "utf8",
  });
  const calls = readFileSync(log, "utf8").split("\n").filter(Boolean);

  return { status: result.status, stdout: result.stdout, calls };
};

describe("vercelBuild.sh", () => {
  it("checks the bootstrap, migrates, then builds on a production deployment", () => {
    const outcome = run({ vercelEnv: "production" });

    assert.equal(outcome.status, 0);
    assert.deepEqual(outcome.calls, [check, migrate, build]);
  });

  for (const vercelEnv of [
    "preview",
    "development",
    "Production",
    "",
    undefined,
  ]) {
    it(`only builds and says migrations were skipped when VERCEL_ENV is ${JSON.stringify(vercelEnv)}`, () => {
      const outcome = run({ vercelEnv });

      assert.equal(outcome.status, 0);
      assert.deepEqual(outcome.calls, [build]);
      assert.match(outcome.stdout, /^migrations skipped: VERCEL_ENV is /);
    });
  }

  it("fails without migrating or building when the bootstrap check refuses", () => {
    const outcome = run({ vercelEnv: "production", failingCall: check });

    assert.notEqual(outcome.status, 0);
    assert.deepEqual(outcome.calls, [check]);
  });

  it("fails without building when a migration fails", () => {
    const outcome = run({ vercelEnv: "production", failingCall: migrate });

    assert.notEqual(outcome.status, 0);
    assert.deepEqual(outcome.calls, [check, migrate]);
  });

  it("never builds with --migrate-only", () => {
    const production = run({
      vercelEnv: "production",
      args: ["--migrate-only"],
    });
    const preview = run({ vercelEnv: "preview", args: ["--migrate-only"] });

    assert.deepEqual(production.calls, [check, migrate]);
    assert.deepEqual(preview.calls, []);
  });

  it("rejects an unknown argument before running anything", () => {
    const outcome = run({ vercelEnv: "production", args: ["--force"] });

    assert.equal(outcome.status, 2);
    assert.deepEqual(outcome.calls, []);
  });
});
