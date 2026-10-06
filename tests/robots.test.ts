import assert from "node:assert/strict";
import { describe, it } from "node:test";
import robots from "../app/robots";
import { aiCrawlers } from "../lib/site";

function groupsFor(userAgent: string) {
  const rules = robots().rules;
  const list = Array.isArray(rules) ? rules : [rules];

  return list.filter((rule) => {
    const agents = Array.isArray(rule.userAgent)
      ? rule.userAgent
      : [rule.userAgent];
    return agents.includes(userAgent);
  });
}

const asList = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value : value ? [value] : [];

describe("robots", () => {
  it("lets every AI crawler read the public site", () => {
    for (const crawler of aiCrawlers) {
      const groups = groupsFor(crawler);
      assert.ok(groups.length > 0, `${crawler} has no group`);

      for (const group of groups) {
        assert.ok(
          !asList(group.disallow).includes("/"),
          `${crawler} is blocked`,
        );
        assert.ok(
          asList(group.allow).includes("/"),
          `${crawler} is not allowed`,
        );
      }
    }
  });

  it("keeps the admin and the API private for every group, AI crawlers included", () => {
    const rules = robots().rules;
    const list = Array.isArray(rules) ? rules : [rules];

    for (const group of list) {
      const disallowed = asList(group.disallow);
      assert.ok(disallowed.includes("/admin"), "admin is exposed");
      assert.ok(disallowed.includes("/api/"), "api is exposed");
    }
  });

  it("points to the sitemap", () => {
    assert.equal(
      robots().sitemap,
      "https://www.douche-senior-france.com/sitemap.xml",
    );
  });
});
