import type { TextFieldSingleValidation } from "payload";
import { validateSlug } from "../lib/cms/validators";

export const validateSlugUnusedBy =
  (
    otherCollection: "pages" | "cities",
    refusal: string,
  ): TextFieldSingleValidation =>
  async (value, { event, req }) => {
    const format = validateSlug(value);

    if (format !== true) {
      return format;
    }

    if (event === "onChange" || req.context.allowSharedSlug) {
      return true;
    }

    const { totalDocs } = await req.payload.count({
      collection: otherCollection,
      where: { slug: { equals: value } },
      req,
    });

    return totalDocs === 0 ? true : refusal;
  };
