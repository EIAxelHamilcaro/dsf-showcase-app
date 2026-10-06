import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="max-w-3xl mx-auto">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            {rating ? (
              <div
                aria-label={`Note : ${rating} sur 5`}
                className="flex gap-1 mb-4"
                role="img"
              >
                {Array.from({ length: rating }, (_, index) => (
                  <span
                    className="text-yellow-500 text-xl"
                    key={index.toString()}
                  >
                    ★
                  </span>
                ))}
              </div>
            ) : null}
            <p className="text-lg mb-4 italic">{`"${block.quote}"`}</p>
            <p className="font-semibold">{block.author}</p>
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
}
