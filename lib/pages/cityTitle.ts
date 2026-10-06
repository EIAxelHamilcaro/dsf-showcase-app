import { fillPlaceholders } from "./placeholders";

export const maxSeoTitleLength = 60;

export interface TitledCity {
  name: string;
  ownTitle?: string | null;
  departmentName: string;
  departmentCode: string;
}

export interface OverlongCityTitle {
  name: string;
  title: string;
  length: number;
}

export function listOverlongCityTitles(
  titlePattern: string,
  cities: TitledCity[],
): OverlongCityTitle[] {
  return cities
    .filter((city) => !city.ownTitle?.trim())
    .map((city) => {
      const title = fillPlaceholders(titlePattern, {
        ville: city.name,
        departement: city.departmentName,
        code: city.departmentCode,
      });

      return { name: city.name, title, length: title.length };
    })
    .filter(({ length }) => length > maxSeoTitleLength);
}
