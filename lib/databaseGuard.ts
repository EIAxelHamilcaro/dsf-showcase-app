export type DatabaseEnvironment = Readonly<Record<string, string | undefined>>;

const loopbackHosts: readonly string[] = ["127.0.0.1", "localhost", "[::1]"];
const overrideVariable = "DSF_ALLOW_REMOTE_DATABASE";

const parseUri = (value: string): URL | undefined => {
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
};

export function assertDatabaseAllowed(env: DatabaseEnvironment): void {
  const uri = parseUri(env.DATABASE_URI ?? "");

  if (!uri) {
    return;
  }

  const isOnVercel = env.VERCEL === "1" && env.VERCEL_ENV !== "development";
  const isDeliberate = env[overrideVariable] === "1";

  if (isOnVercel || isDeliberate) {
    return;
  }

  const isLoopbackHost = loopbackHosts.includes(uri.hostname);

  if (isLoopbackHost && !uri.search && !uri.hash) {
    return;
  }

  const reason = isLoopbackHost
    ? `DATABASE_URI names the host ${uri.hostname} but carries a query string or a fragment, which can point the connection to another host`
    : `DATABASE_URI points to the remote host ${uri.hostname}`;

  throw new Error(
    `Database refused: ${reason}. Local commands go through ./scripts/local.sh (pnpm dev, pnpm build, pnpm test, pnpm payload), which forces the local database. For a deliberate operation on a remote database, set ${overrideVariable}=1 on that single command`,
  );
}
