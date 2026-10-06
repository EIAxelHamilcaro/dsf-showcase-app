import { ExternalLink } from "lucide-react";

export function NewTabHint() {
  return (
    <>
      <ExternalLink aria-hidden="true" className="icon-mark" data-size="sm" />
      <span className="sr-only"> (nouvel onglet)</span>
    </>
  );
}
