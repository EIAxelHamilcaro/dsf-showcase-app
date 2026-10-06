import type { Page } from "@/payload-types";
import { AidCards } from "./aidCards";
import { FeatureCards } from "./featureCards";
import { LinkCards } from "./linkCards";
import { PageCta } from "./pageCta";
import { PageHero } from "./pageHero";
import { ServiceCards } from "./serviceCards";
import { Steps } from "./steps";
import { Testimonial } from "./testimonial";
import { ZoneList } from "./zoneList";

interface BlockRendererProps {
  blocks: Page["layout"];
  phone: string;
}

export function BlockRenderer({ blocks, phone }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const key = block.id ?? block.blockType;

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
          case "cta":
            return <PageCta block={block} key={key} phone={phone} />;
          default:
            return null;
        }
      })}
    </>
  );
}
