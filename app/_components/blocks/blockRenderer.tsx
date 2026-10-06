import type { Page } from "@/payload-types";
import { AidCards } from "./aidCards";
import { Faq } from "./faq";
import { FeatureCards } from "./featureCards";
import { LegalContent } from "./legalContent";
import { LinkCards } from "./linkCards";
import { PageCta } from "./pageCta";
import { PageHero } from "./pageHero";
import { ServiceCards } from "./serviceCards";
import { Steps } from "./steps";
import { Testimonial } from "./testimonial";
import { TextSection } from "./textSection";
import { ZoneList } from "./zoneList";

interface BlockRendererProps {
  blocks: Page["layout"];
  phone: string;
  updatedAt: string;
}

export function BlockRenderer({
  blocks,
  phone,
  updatedAt,
}: BlockRendererProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? index.toString();

        switch (block.blockType) {
          case "hero":
            return <PageHero block={block} key={key} phone={phone} />;
          case "featureCards":
            return <FeatureCards block={block} key={key} />;
          case "zoneList":
            return <ZoneList block={block} key={key} />;
          case "testimonial":
            return <Testimonial block={block} key={key} />;
          case "serviceCards":
            return <ServiceCards block={block} key={key} />;
          case "aidCards":
            return <AidCards block={block} key={key} />;
          case "steps":
            return <Steps block={block} key={key} />;
          case "linkCards":
            return <LinkCards block={block} key={key} />;
          case "textSection":
            return <TextSection block={block} key={key} />;
          case "faq":
            return <Faq block={block} key={key} />;
          case "legalContent":
            return (
              <LegalContent block={block} key={key} updatedAt={updatedAt} />
            );
          case "cta":
            return <PageCta block={block} key={key} phone={phone} />;
          default:
            return null;
        }
      })}
    </>
  );
}
