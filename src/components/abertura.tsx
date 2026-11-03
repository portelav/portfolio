import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";

const action =
  "inline-flex min-h-11 items-center justify-center px-5 font-mono transition-opacity duration-150 hover:opacity-70";

// SPIKE. Says who this is, what he does and what he is after. The first project
// starts right below, so the work is already on the first screen.
export function Abertura() {
  const t = useTranslations("Home");

  return (
    <section className="page-frame pt-8 pb-10 md:pt-12 md:pb-12">
      <h1 className="intro-in font-display text-huge max-w-[20ch] text-balance md:max-w-[26ch]">
        {t.rich("headline", {
          accent: (chunks) => <span className="text-accent">{chunks}</span>,
        })}
      </h1>
      <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between md:gap-12">
        <p
          className="intro-in max-w-xl text-lg"
          style={{ "--delay": "80ms" } as CSSProperties}
        >
          {t("lead")}
        </p>
        <div
          className="intro-in flex flex-wrap gap-3 md:flex-none"
          style={{ "--delay": "160ms" } as CSSProperties}
        >
          <a href="#site" className={`bg-fg text-bg ${action}`}>
            {t("wantSite")}
          </a>
          <a href="#contato" className={`border-line border ${action}`}>
            {t("internship")}
          </a>
        </div>
      </div>
    </section>
  );
}
