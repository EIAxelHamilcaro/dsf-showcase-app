import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "../app/robots";
import { aiCrawlers } from "../lib/site";

const asList = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value : value ? [value] : [];

function groups() {
  const rules = robots().rules;

  return Array.isArray(rules) ? rules : [rules];
}

function groupFor(userAgent: string) {
  const named = groups().find((group) =>
    asList(group.userAgent).includes(userAgent),
  );

  return (
    named ?? groups().find((group) => asList(group.userAgent).includes("*"))
  );
}

function ruleMatches(rule: string, path: string) {
  const anchored = rule.endsWith("$");
  const body = anchored ? rule.slice(0, -1) : rule;
  const source = body
    .split("*")
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");

  return new RegExp(`^${source}${anchored ? "$" : ""}`).test(path);
}

function longestMatch(rules: string[], path: string) {
  const lengths = rules
    .filter((rule) => ruleMatches(rule, path))
    .map((rule) => rule.length);

  return Math.max(-1, ...lengths);
}

function canCrawl(userAgent: string, path: string) {
  const group = groupFor(userAgent);
  assert.ok(group, `${userAgent} has no group`);

  const allowed = longestMatch(asList(group.allow), path);
  const disallowed = longestMatch(asList(group.disallow), path);

  return allowed >= disallowed;
}

const crawlers = ["Googlebot", "facebookexternalhit", ...aiCrawlers];

const openPaths = [
  "/",
  "/douche-senior-blois",
  "/administration-aides",
  "/apiculture",
  "/api/media/file/x.jpg",
  "/_next/static/chunks/main.js",
];

const closedPaths = [
  "/admin",
  "/admin/login",
  "/api",
  "/api/leads",
  "/api/users/me",
  "/api/media",
];

describe("robots", () => {
  it("gives every AI crawler its own group", () => {
    for (const crawler of aiCrawlers) {
      const named = groups().some((group) =>
        asList(group.userAgent).includes(crawler),
      );
      assert.ok(named, `${crawler} has no group`);
    }
  });

  it("lets every crawler read the public pages and the CMS share images", () => {
    for (const crawler of crawlers) {
      for (const path of openPaths) {
        assert.ok(canCrawl(crawler, path), `${crawler} cannot read ${path}`);
      }
    }
  });

  it("keeps the admin and the API private for every crawler", () => {
    for (const crawler of crawlers) {
      for (const path of closedPaths) {
        assert.ok(!canCrawl(crawler, path), `${crawler} can read ${path}`);
      }
    }
  });

  it("points to the sitemap", () => {
    assert.equal(
      robots().sitemap,
      "https://www.douche-senior-france.com/sitemap.xml",
    );
  });
});
