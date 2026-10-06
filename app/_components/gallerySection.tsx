import {
  computeAggregateRating,
  formatRating,
  formatReviewDate,
  toRatedReview,
} from "@/lib/seo/reviews";
import type { Config1 } from "@/payload-types";
import { GalleryCarousel } from "./galleryCarousel";
import { NewTabHint } from "./newTabHint";
import { PageSection, SectionHeader } from "./pageSection";

const sourceLabels = { direct: "avis direct", google: "avis Google" };

export interface GallerySectionProps {
  config: Config1;
}

export function GallerySection({ config }: GallerySectionProps) {
  const testimonials = config.testimonials_section ?? [];
  const aggregate = computeAggregateRating(config);

  return (
    <>
      <PageSection id="realisations" tone="muted">
        <SectionHeader
          heading="Nos réalisations avant / après"
          intro="Découvrez comment nous transformons les salles de bain."
        />
        <GalleryCarousel projects={config.caroussel_section ?? []} />
      </PageSection>

      <PageSection id="temoignages">
        <header className="section-header">
          <h2>Témoignages clients</h2>
          {aggregate ? (
            <p className="lead soft">
              {formatRating(aggregate.ratingValue)}/5 sur{" "}
              {aggregate.reviewCount}{" "}
              {aggregate.origin === "google" ? "avis Google" : "avis"}
              {aggregate.origin === "google" && config.google_profile_url ? (
                <>
                  {". "}
                  <a
                    className="link"
                    href={config.google_profile_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Voir la fiche Google
                    <NewTabHint />
                  </a>
                </>
              ) : null}
            </p>
          ) : null}
        </header>

        <ul className="tile-wall sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const review = toRatedReview(testimonial);

            return (
              <li
                className="tile grid content-start gap-stack"
                key={testimonial.id ?? index.toString()}
              >
                <figure className="grid gap-stack">
                  <blockquote className="quote">
                    <p>« {testimonial.text} »</p>
                  </blockquote>
                  <figcaption>
                    <strong>{testimonial.title}</strong>
                    <p className="small soft">
                      {[testimonial.age, testimonial.location]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                    {review ? (
                      <p className="small soft">
                        {formatRating(review.rating)}/5,{" "}
                        {sourceLabels[review.source]}
                        {review.date ? (
                          <>
                            {", "}
                            <time dateTime={review.date}>
                              {formatReviewDate(review.date)}
                            </time>
                          </>
                        ) : null}
                      </p>
                    ) : null}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </PageSection>
    </>
  );
}
