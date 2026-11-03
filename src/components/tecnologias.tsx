import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";

import { languages, tools } from "@/lib/stack";

// SPIKE. Logos in their own colors, with a light lift on hover.
export function Tecnologias() {
  const t = useTranslations("Stack");

  const groups = [
    { title: t("languages"), items: languages },
    { title: t("tools"), items: tools },
  ];

  return (
    <section className="page-frame grid gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-32">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="reveal font-display text-xl">{group.title}</h2>
          <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4">
            {group.items.map((item, index) => (
              <li
                key={item.name}
                className="stack-item flex flex-col items-start gap-3"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="tech-logo flex h-10 w-10 items-center justify-center">
                  {item.path ? (
                    <svg
                      viewBox={item.viewBox}
                      aria-hidden="true"
                      className="h-full w-full"
                      fill={item.color ?? "currentColor"}
                    >
                      <path d={item.path} />
                    </svg>
                  ) : null}
                </span>
                <span className="font-mono text-sm">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
