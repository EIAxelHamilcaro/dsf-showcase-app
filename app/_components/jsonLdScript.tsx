/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: structured data */
import type { JsonLdGraph } from "@/lib/seo/jsonLd";

interface JsonLdScriptProps {
  graph: JsonLdGraph;
}

export function JsonLdScript({ graph }: JsonLdScriptProps) {
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");

  return (
    <script
      dangerouslySetInnerHTML={{ __html: json }}
      type="application/ld+json"
    />
  );
}
