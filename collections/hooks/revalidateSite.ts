import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

const revalidateSite = () => {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
};

export const revalidateSiteAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) {
    return doc;
  }

  revalidateSite();
  payload.logger.info("Revalidated the site after a content change");

  return doc;
};

export const revalidateSiteAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) {
    return doc;
  }

  revalidateSite();
  payload.logger.info("Revalidated the site after a page deletion");

  return doc;
};
