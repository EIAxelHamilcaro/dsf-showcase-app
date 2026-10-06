import type { TextFieldSingleValidation } from "payload";
import { text } from "payload/shared";
import {
  listOverlongCityTitles,
  maxSeoTitleLength,
  type TitledCity,
} from "../lib/pages/cityTitle";
import type { City, Page } from "../payload-types";

const idOf = (value: number | Page | null | undefined) =>
  typeof value === "object" ? value?.id : value;

const titledCity = (
  city: Pick<City, "name" | "seo">,
  department: Page | null | undefined,
): TitledCity => ({
  name: city.name,
  ownTitle: city.seo?.title,
  departmentName: department?.areaName ?? "",
  departmentCode: department?.departmentCode ?? "",
});

export const validateCityTitle: TextFieldSingleValidation = async (
  value,
  options,
) => {
  const format = text(value, options);

  if (format !== true) {
    return format;
  }

  const { event, req } = options;
  const city: Partial<City> = options.data;
  const departmentId = idOf(city.department);

  if (event === "onChange" || !(city.name && departmentId)) {
    return true;
  }

  const [template, department] = await Promise.all([
    req.payload.findGlobal({ slug: "cityTemplate", depth: 0, req }),
    req.payload.findByID({
      collection: "pages",
      id: departmentId,
      depth: 0,
      disableErrors: true,
      req,
    }),
  ]);
  const [overlong] = listOverlongCityTitles(template.seo?.title ?? "", [
    titledCity({ name: city.name, seo: { title: value } }, department),
  ]);

  return overlong
    ? `Avec le nom « ${overlong.name} », le titre du modèle fait ${overlong.length} caractères, ${maxSeoTitleLength} au maximum (« ${overlong.title} »). Saisissez ici un titre plus court pour cette ville`
    : true;
};

export const validateTemplateTitle: TextFieldSingleValidation = async (
  value,
  options,
) => {
  const format = text(value, options);

  if (format !== true) {
    return format;
  }

  const { event, req } = options;

  if (event === "onChange" || !value) {
    return true;
  }

  const { docs } = await req.payload.find({
    collection: "cities",
    limit: 0,
    pagination: false,
    depth: 1,
    req,
  });
  const overlong = listOverlongCityTitles(
    value,
    docs.map((city) =>
      titledCity(
        city,
        typeof city.department === "object" ? city.department : undefined,
      ),
    ),
  );

  return overlong.length > 0
    ? `Ce titre dépasse ${maxSeoTitleLength} caractères pour ${overlong.map(({ name, length }) => `${name} (${length})`).join(", ")}. Raccourcissez-le, ou saisissez d'abord un titre propre à ces villes dans leur fiche`
    : true;
};
