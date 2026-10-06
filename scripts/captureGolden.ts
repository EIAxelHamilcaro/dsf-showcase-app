import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extractMainText } from "../lib/seo/extractMainText";
import { parityPages } from "./parityPages";

const [sourceDir] = process.argv.slice(2);

if (!sourceDir) {
  console.log(
    "usage: bun scripts/captureGolden.ts <directory containing <slug>.html>",
  );
  process.exit(1);
}

const fixtureDir = new URL("../tests/fixtures/mainText/", import.meta.url);
await mkdir(fixtureDir, { recursive: true });

for (const slug of parityPages) {
  const html = await readFile(`${sourceDir}/${slug}.html`, "utf8");
  const text = extractMainText(html);
  await writeFile(new URL(`${slug}.txt`, fixtureDir), `${text}\n`);
  console.log(`${slug}: ${text.split(" ").length} words`);
}
