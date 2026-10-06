import { getAllPages } from "@/lib/pages/getPage";
import { getSiteConfig } from "@/lib/pages/getSiteConfig";
import { buildLlmsTxt } from "@/lib/seo/llmsTxt";

export const dynamic = "force-static";
export const revalidate = 43200;

export async function GET() {
  const [pages, config] = await Promise.all([getAllPages(), getSiteConfig()]);

  return new Response(buildLlmsTxt({ pages, config }), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
