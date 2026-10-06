import { assembleCityPage, type CityPageInput } from "../../lib/pages/cityLayout";
import type { Page } from "../../payload-types";

export const composeCityPage = (input: CityPageInput): Page | undefined =>
  assembleCityPage(input, input.city.extraSections ?? []);
