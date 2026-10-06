import { PageSection } from "@/app/_components/pageSection";
import { validateReviewRating } from "@/lib/cms/validators";
import type { TestimonialBlock } from "@/payload-types";

interface TestimonialProps {
  block: TestimonialBlock;
}

export function Testimonial({ block }: TestimonialProps) {
  const rating =
    block.rating && validateReviewRating(block.rating) === true
      ? block.rating
      : undefined;

  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <figure className="max-w-4xl space-y-5 border-l-4 border-primary pl-6 md:pl-10">
        {rating ? (
          <div
            aria-label={`Note : ${rating} sur 5`}
            className="flex gap-1 text-2xl text-star"
            role="img"
          >
            {Array.from({ length: rating }, (_, index) => (
              <span key={index.toString()}>★</span>
            ))}
          </div>
        ) : null}
        <blockquote className="text-2xl md:text-3xl font-semibold leading-snug">
          <p>{`"${block.quote}"`}</p>
        </blockquote>
        <figcaption className="text-lg font-bold">{block.author}</figcaption>
      </figure>
    </PageSection>
  );
}
