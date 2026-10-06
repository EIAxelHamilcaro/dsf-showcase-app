import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertDatabaseAllowed } from "../lib/databaseGuard";

const remote =
  "postgresql://owner:s3cretPass@ep-prod.eu-central-1.aws.neon.tech/neondb?sslmode=require";

describe("assertDatabaseAllowed", () => {
  it("allows a loopback database", () => {
    for (const DATABASE_URI of [
      "postgresql://postgres:dsf@127.0.0.1:5544/dsf",
      "postgresql://postgres:dsf@localhost:5544/dsf",
      "postgresql://postgres:dsf@[::1]:5544/dsf",
    ]) {
      assert.doesNotThrow(
        () => assertDatabaseAllowed({ DATABASE_URI }),
        DATABASE_URI,
      );
    }
  });

  it("refuses a remote database and names its host", () => {
    assert.throws(
      () => assertDatabaseAllowed({ DATABASE_URI: remote }),
      /remote host ep-prod\.eu-central-1\.aws\.neon\.tech.*DSF_ALLOW_REMOTE_DATABASE=1/,
    );
  });

  it("refuses a loopback host whose query string or fragment can redirect the connection", () => {
    for (const DATABASE_URI of [
      "postgresql://postgres:dsf@localhost:5544/dsf?host=ep-prod.neon.tech",
      "postgresql://postgres:dsf@127.0.0.1:5544/dsf#x",
    ]) {
      assert.throws(
        () => assertDatabaseAllowed({ DATABASE_URI }),
        /query string or a fragment/,
        DATABASE_URI,
      );
    }
  });

  it("allows a remote database on a Vercel deployment", () => {
    for (const VERCEL_ENV of ["production", "preview", undefined]) {
      assert.doesNotThrow(
        () =>
          assertDatabaseAllowed({
            DATABASE_URI: remote,
            VERCEL: "1",
            VERCEL_ENV,
          }),
        String(VERCEL_ENV),
      );
    }
  });

  it("refuses a remote database when the Vercel variables come from a workstation", () => {
    assert.throws(() =>
      assertDatabaseAllowed({
        DATABASE_URI: remote,
        VERCEL: "1",
        VERCEL_ENV: "development",
      }),
    );
    assert.throws(() =>
      assertDatabaseAllowed({ DATABASE_URI: remote, VERCEL: "true" }),
    );
  });

  it("allows a remote database only with the explicit flag set to 1", () => {
    assert.doesNotThrow(() =>
      assertDatabaseAllowed({
        DATABASE_URI: remote,
        DSF_ALLOW_REMOTE_DATABASE: "1",
      }),
    );
    assert.throws(() =>
      assertDatabaseAllowed({
        DATABASE_URI: remote,
        DSF_ALLOW_REMOTE_DATABASE: "true",
      }),
    );
  });

  it("never prints the user, the password or the URI", () => {
    const message = (() => {
      try {
        assertDatabaseAllowed({ DATABASE_URI: remote });
      } catch (error) {
        return error instanceof Error ? error.message : "";
      }

      return "";
    })();

    assert.ok(message.includes("ep-prod.eu-central-1.aws.neon.tech"));

    for (const secret of ["owner", "s3cretPass", "neondb", "sslmode", "://"]) {
      assert.equal(message.includes(secret), false, secret);
    }
  });

  it("leaves an empty or unparsable value to the database adapter", () => {
    for (const DATABASE_URI of [undefined, "", "not a url"]) {
      assert.doesNotThrow(
        () => assertDatabaseAllowed({ DATABASE_URI }),
        String(DATABASE_URI),
      );
    }
  });
});
