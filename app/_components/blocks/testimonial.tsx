import { PageSection, toneOf } from "@/app/_components/pageSection";
import { validateReviewRating } from "@/lib/cms/validators";
import type { TestimonialBlock } from "@/payload-types";

export interface TestimonialProps {
  block: TestimonialBlock;
}

export function Testimonial({ block }: TestimonialProps) {
  const rating =
    block.rating && validateReviewRating(block.rating) === true
      ? block.rating
      : undefined;

  return (
    <PageSection tone={toneOf(block.background)}>
      <figure className="rule-start grid max-w-4xl gap-stack">
        {rating ? (
          <p className="rating">
            <span aria-hidden="true">{"★".repeat(rating)}</span>
            <span className="sr-only">{`Note : ${rating} sur 5`}</span>
          </p>
        ) : null}
        <blockquote className="quote" data-size="lg">
          <p>« {block.quote} »</p>
        </blockquote>
        <figcaption>
          <strong>{block.author}</strong>
        </figcaption>
      </figure>
    </PageSection>
  );
}
