import type { Config1 } from "../../payload-types";

type Testimonial = NonNullable<Config1["testimonials_section"]>[number];

export interface RatedReview {
  author: string;
  text: string;
  rating: number;
  date?: string;
  source: "direct" | "google";
}

export interface AggregateRating {
  ratingValue: number;
  reviewCount: number;
  origin: "google" | "testimonials";
}

const isValidRating = (value: number | null | undefined): value is number =>
  typeof value === "number" && value >= 1 && value <= 5;

const roundTwo = (value: number) => Math.round(value * 100) / 100;

export function toRatedReview(
  testimonial: Testimonial,
): RatedReview | undefined {
  if (!isValidRating(testimonial.rating)) {
    return undefined;
  }

  return {
    author: testimonial.title ?? "",
    text: testimonial.text ?? "",
    rating: testimonial.rating,
    date: testimonial.date?.slice(0, 10),
    source: testimonial.source ?? "direct",
  };
}

export function getRatedReviews(config: Config1): RatedReview[] {
  const testimonials = config.testimonials_section ?? [];

  return testimonials.flatMap((testimonial) => {
    const review = toRatedReview(testimonial);

    return review ? [review] : [];
  });
}

export function computeAggregateRating(
  config: Config1,
): AggregateRating | undefined {
  const googleRating = config.google_rating;
  const googleCount = config.google_review_count;

  if (
    isValidRating(googleRating) &&
    typeof googleCount === "number" &&
    googleCount > 0
  ) {
    return {
      ratingValue: googleRating,
      reviewCount: googleCount,
      origin: "google",
    };
  }

  const reviews = getRatedReviews(config);

  if (reviews.length === 0) {
    return undefined;
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return {
    ratingValue: roundTwo(total / reviews.length),
    reviewCount: reviews.length,
    origin: "testimonials",
  };
}

export function formatRating(value: number): string {
  return String(value).replace(".", ",");
}

export function formatReviewDate(date: string): string {
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}
