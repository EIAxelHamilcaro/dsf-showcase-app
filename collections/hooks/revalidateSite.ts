import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  PayloadRequest,
} from "payload";

interface ContentChange<TDoc> {
  doc: TDoc;
  req: PayloadRequest;
}

const revalidateSite = <TDoc>({
  doc,
  req: { context, payload },
}: ContentChange<TDoc>): TDoc => {
  if (context.disableRevalidate) {
    return doc;
  }

  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  payload.logger.info("Revalidated the site after a content change");

  return doc;
};

export const revalidateSiteAfterChange: CollectionAfterChangeHook =
  revalidateSite;

export const revalidateSiteAfterDelete: CollectionAfterDeleteHook =
  revalidateSite;
