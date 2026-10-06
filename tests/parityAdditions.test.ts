import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { applyAcceptedAdditions } from "../scripts/parityAdditions";

describe("applyAcceptedAdditions", () => {
  it("inserts each accepted text right after its anchor and nowhere else", () => {
    const expected = applyAcceptedAdditions("Avant Question ? Après", [
      { after: "Question ?", text: "Réponse." },
    ]);

    assert.equal(expected, "Avant Question ? Réponse. Après");
  });

  it("leaves the golden text untouched when nothing is accepted", () => {
    assert.equal(
      applyAcceptedAdditions("Texte d'origine", []),
      "Texte d'origine",
    );
  });

  it("refuses an anchor that is missing or ambiguous in the golden text", () => {
    assert.throws(() =>
      applyAcceptedAdditions("Texte", [{ after: "Absent", text: "x" }]),
    );
    assert.throws(() =>
      applyAcceptedAdditions("Double Double", [{ after: "Double", text: "x" }]),
    );
  });
});
