import { PageSection } from "@/app/_components/pageSection";
import { Card, CardContent } from "@/components/ui/card";
import type { TestimonialBlock } from "@/payload-types";

const starCount = 5;

interface TestimonialProps {
  block: TestimonialBlock;
}

export function Testimonial({ block }: TestimonialProps) {
  return (
    <PageSection tone={block.background === "muted" ? "muted" : "default"}>
      <div className="max-w-3xl mx-auto">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div aria-hidden="true" className="flex gap-1 mb-4">
              {Array.from({ length: starCount }, (_, index) => (
                <span
                  className="text-yellow-500 text-xl"
                  key={index.toString()}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="text-lg mb-4 italic">{`"${block.quote}"`}</p>
            <p className="font-semibold">{block.author}</p>
          </CardContent>
        </Card>
      </div>
    </PageSection>
  );
}
