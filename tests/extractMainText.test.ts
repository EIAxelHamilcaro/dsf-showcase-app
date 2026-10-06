import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeEntities, extractMainText } from "../lib/seo/extractMainText";

const wrap = (inner: string) =>
  `<html><body><header>Menu</header><main id="main-content">${inner}</main><footer>Pied</footer></body></html>`;

describe("extractMainText", () => {
  it("keeps only what is inside main, including a nested main", () => {
    const html = wrap(`<main class="x"><h1>Titre</h1></main>`);
    assert.equal(extractMainText(html), "Titre");
  });

  it("joins text nodes split by React comments without adding a space", () => {
    assert.equal(
      extractMainText(wrap("<p>Bonjour<!-- -->monde</p>")),
      "Bonjourmonde",
    );
  });

  it("separates block elements and glues inline elements", () => {
    const html = wrap(
      `<div>A</div><div>B</div><p>Avant <span>milieu</span> après</p><p>l'<span>Indre</span></p>`,
    );
    assert.equal(extractMainText(html), "A B Avant milieu après l'Indre");
  });

  it("is not fooled by a greater-than sign inside a class attribute", () => {
    const html = wrap(
      `<a class="has-[>svg]:px-3 flex" href="/x"><svg><path d="M0 0"/></svg>Appeler</a>`,
    );
    assert.equal(extractMainText(html), "Appeler");
  });

  it("decodes entities and collapses whitespace", () => {
    const html = wrap(
      "<p>Handibat &amp; Silverbat&nbsp;l&#x27;été\n   &#233;</p>",
    );
    assert.equal(extractMainText(html), "Handibat & Silverbat l'été é");
  });

  it("drops scripts and styles", () => {
    const html = wrap(
      `<p>Texte</p><script>var a = "<b>x</b>";</script><style>p{}</style>`,
    );
    assert.equal(extractMainText(html), "Texte");
  });

  it("ignores navs named in ignoredNavLabels, with an escaped apostrophe", () => {
    const html = wrap(
      `<nav aria-label="Fil d&#x27;Ariane"><ol><li>Accueil</li></ol></nav><p>Corps</p><nav aria-label="Autre"><a>Garde</a></nav>`,
    );
    assert.equal(
      extractMainText(html, { ignoredNavLabels: ["Fil d'Ariane"] }),
      "Corps Garde",
    );
  });

  it("throws when there is no main element", () => {
    assert.throws(() => extractMainText("<html><body>x</body></html>"));
  });
});

describe("decodeEntities", () => {
  it("leaves unknown entities untouched", () => {
    assert.equal(decodeEntities("a &unknown; b"), "a &unknown; b");
  });
});
