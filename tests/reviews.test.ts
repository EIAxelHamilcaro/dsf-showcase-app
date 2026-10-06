import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeAggregateRating,
  formatRating,
  formatReviewDate,
  getRatedReviews,
  toReviewDay,
} from "../lib/seo/reviews";
import type { Config1 } from "../payload-types";

const testimonial = (
  rating?: number | null,
  source?: "direct" | "google" | null,
) => ({
  title: "Nom",
  age: "70 ans",
  text: "Texte",
  location: "Ville",
  rating,
  source,
});

const configWith = (overrides: Partial<Config1>): Config1 =>
  overrides as Config1;

describe("computeAggregateRating", () => {
  it("emits nothing when no rating is entered", () => {
    const config = configWith({
      testimonials_section: [testimonial(), testimonial(null)],
    });
    assert.equal(computeAggregateRating(config), undefined);
    assert.deepEqual(getRatedReviews(config), []);
  });

  it("emits nothing when there is no testimonial at all", () => {
    assert.equal(computeAggregateRating(configWith({})), undefined);
  });

  it("computes the exact mean and count from the rated testimonials only", () => {
    const config = configWith({
      testimonials_section: [
        testimonial(5),
        testimonial(4),
        testimonial(4),
        testimonial(),
        testimonial(5),
      ],
    });
    assert.deepEqual(computeAggregateRating(config), {
      ratingValue: 4.5,
      reviewCount: 4,
      origin: "testimonials",
    });
  });

  it("rounds the mean to two decimals", () => {
    const config = configWith({
      testimonials_section: [testimonial(5), testimonial(5), testimonial(4)],
    });
    assert.equal(computeAggregateRating(config)?.ratingValue, 4.67);
  });

  it("uses the Google figures when both rating and count are entered", () => {
    const config = configWith({
      google_rating: 4.8,
      google_review_count: 31,
      testimonials_section: [testimonial(5)],
    });
    assert.deepEqual(computeAggregateRating(config), {
      ratingValue: 4.8,
      reviewCount: 31,
      origin: "google",
    });
  });

  it("treats a Google rating without a review count as incomplete and falls back", () => {
    const withoutCount = configWith({ google_rating: 4.8 });
    assert.equal(computeAggregateRating(withoutCount), undefined);

    const withTestimonials = configWith({
      google_rating: 4.8,
      testimonials_section: [testimonial(4), testimonial(5)],
    });
    assert.deepEqual(computeAggregateRating(withTestimonials), {
      ratingValue: 4.5,
      reviewCount: 2,
      origin: "testimonials",
    });
  });

  it("ignores out of range ratings", () => {
    const config = configWith({
      testimonials_section: [testimonial(0), testimonial(6)],
    });
    assert.equal(computeAggregateRating(config), undefined);
  });
});

describe("getRatedReviews", () => {
  it("keeps only rated testimonials with their own text, author and source", () => {
    const config = configWith({
      testimonials_section: [
        { ...testimonial(5, "google"), title: "Marie", text: "Avis un" },
        testimonial(),
        {
          ...testimonial(4),
          title: "Paul",
          text: "Avis deux",
          date: "2026-03-02T00:00:00.000Z",
        },
      ],
    });
    assert.deepEqual(getRatedReviews(config), [
      {
        author: "Marie",
        text: "Avis un",
        rating: 5,
        date: undefined,
        source: "google",
      },
      {
        author: "Paul",
        text: "Avis deux",
        rating: 4,
        date: "2026-03-02",
        source: "direct",
      },
    ]);
  });
});

describe("formatRating", () => {
  it("uses the French decimal comma", () => {
    assert.equal(formatRating(4.5), "4,5");
    assert.equal(formatRating(5), "5");
    assert.equal(formatRating(4.67), "4,67");
  });
});

describe("formatReviewDate", () => {
  it("shows the day the JSON-LD publishes, in the French order", () => {
    assert.equal(formatReviewDate("2026-03-02"), "02/03/2026");
  });
});

describe("toReviewDay", () => {
  it("keeps the day the editor picked in the admin, stored as noon UTC", () => {
    assert.equal(toReviewDay("2026-03-02T12:00:00.000Z"), "2026-03-02");
    assert.equal(toReviewDay("2026-07-14T12:00:00.000Z"), "2026-07-14");
  });

  it("reads a date stored at midnight in France as that French day", () => {
    assert.equal(toReviewDay("2026-03-01T23:00:00.000Z"), "2026-03-02");
    assert.equal(toReviewDay("2026-07-13T22:00:00.000Z"), "2026-07-14");
  });

  it("gives nothing for an empty or unreadable date", () => {
    assert.equal(toReviewDay(null), undefined);
    assert.equal(toReviewDay(""), undefined);
    assert.equal(toReviewDay("pas une date"), undefined);
  });
});

describe("a rated testimonial without a name", () => {
  it("is not a review: it is neither listed nor counted", () => {
    const config = configWith({
      testimonials_section: [
        { ...testimonial(5), title: "  " },
        { ...testimonial(3), title: null },
        testimonial(4),
      ],
    });

    assert.equal(getRatedReviews(config).length, 1);
    assert.deepEqual(computeAggregateRating(config), {
      ratingValue: 4,
      reviewCount: 1,
      origin: "testimonials",
    });
  });
});
