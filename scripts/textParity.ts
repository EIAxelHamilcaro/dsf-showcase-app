import { readFile } from "node:fs/promises";
import { extractMainText } from "../lib/seo/extractMainText";
import {
  acceptedAdditions,
  applyAcceptedAdditions,
  ignoredNavLabels,
} from "./parityAdditions";
import { parityPages } from "./parityPages";

const baseUrl = process.env.PARITY_BASE_URL ?? "http://localhost:3100";
const fixtureDir = new URL("../tests/fixtures/mainText/", import.meta.url);

const pathFor = (slug: string) => (slug === "home" ? "/" : `/${slug}`);

function firstDifference(expected: string, actual: string): string {
  const limit = Math.min(expected.length, actual.length);
  let index = 0;

  while (index < limit && expected[index] === actual[index]) {
    index += 1;
  }

  const from = Math.max(0, index - 60);

  return [
    `first difference at character ${index}`,
    `  expected: ...${expected.slice(from, index + 80)}`,
    `  actual:   ...${actual.slice(from, index + 80)}`,
  ].join("\n");
}

async function checkPage(slug: string): Promise<string | null> {
  const golden = (
    await readFile(new URL(`${slug}.txt`, fixtureDir), "utf8")
  ).trim();
  const expected = applyAcceptedAdditions(
    golden,
    acceptedAdditions[slug] ?? [],
  );
  const response = await fetch(`${baseUrl}${pathFor(slug)}`);

  if (!response.ok) {
    return `HTTP ${response.status}`;
  }

  const actual = extractMainText(await response.text(), { ignoredNavLabels });

  return actual === expected ? null : firstDifference(expected, actual);
}

let failures = 0;

for (const slug of parityPages) {
  const problem = await checkPage(slug);

  if (problem) {
    failures += 1;
    console.log(`FAIL ${slug}\n${problem}`);
    continue;
  }

  console.log(`ok   ${slug}`);
}

console.log(`${parityPages.length - failures}/${parityPages.length} identical`);
process.exit(failures === 0 ? 0 : 1);
