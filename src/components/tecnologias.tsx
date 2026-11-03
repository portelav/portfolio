import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";

import { languages, tools } from "@/lib/stack";

// SPIKE. Plain names as real data, arriving in sequence.
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
          <h2 className="font-display text-xl">{group.title}</h2>
          <ul className="mt-6 flex flex-col gap-2">
            {group.items.map((item, index) => (
              <li
                key={item}
                className="stack-item font-mono"
                style={{ "--i": index } as CSSProperties}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
