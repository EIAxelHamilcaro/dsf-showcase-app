/** biome-ignore-all lint/suspicious/noArrayIndexKey: ok */
import React from "react";
import type { Config1 } from "@/payload-types";

interface Props {
  content?: Config1["main_title"];
}

export function RichTextBoldOnly({ content }: Props) {
  if (!content || !content.root || !Array.isArray(content.root.children)) {
    return null;
  }

  const nodes = content.root.children;

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
      {nodes.map((node, idx) => {
        if (!node.children || !Array.isArray(node.children)) {
          // cas rare : pas de children => juste texte ou vide
          const text = ((node.text as string) ?? "").replace(/\u00A0/g, " ");
          return <React.Fragment key={idx}>{text}</React.Fragment>;
        }

        return (
          <React.Fragment key={idx}>
            {node.children.map((child: any, cIdx: number) => {
              const childText = (child.text ?? "").replace(/\u00A0/g, " ");
              if (child.format === 1) {
                return (
                  <span className="text-primary" key={`${idx}-${cIdx}`}>
                    {childText}
                  </span>
                );
              }
              return (
                <React.Fragment key={`${idx}-${cIdx}`}>
                  {childText}
                </React.Fragment>
              );
            })}
            {/* ajoute un espace après chaque node sauf le dernier */}
            {idx < nodes.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </h1>
  );
}
