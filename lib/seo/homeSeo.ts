import type { Config1 } from "../../payload-types";
import { homeSeo } from "../site";

export interface HomeSeo {
  title: string;
  description: string;
}

const filled = (value: string | null | undefined): string | undefined =>
  value?.replace(/\s+/g, " ").trim() || undefined;

export function getHomeSeo(config: Pick<Config1, "seo">): HomeSeo {
  return {
    title: filled(config.seo?.title) ?? homeSeo.title,
    description: filled(config.seo?.description) ?? homeSeo.description,
  };
}
