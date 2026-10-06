import { getPayload } from "payload";
import { cache } from "react";
import payloadConfig from "@/payload.config";
import type { Config1 } from "@/payload-types";

export const getSiteConfig = cache(async (): Promise<Config1> => {
  const payload = await getPayload({ config: payloadConfig });

  return payload.findByID({ collection: "config", id: 1, depth: 1 });
});
