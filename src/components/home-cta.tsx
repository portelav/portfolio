import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const action =
  "inline-flex min-h-11 items-center justify-center px-5 font-mono transition-opacity duration-150 hover:opacity-70";

// The end of the home page: one question and the two ways forward, to the
// services and to the contacts (PRD, D79).
export function HomeCta() {
  const t = useTranslations("HomeCta");

  return (
    <section className="page-frame reveal border-line flex flex-col gap-6 border-t py-16 md:flex-row md:items-end md:justify-between md:gap-12 md:py-24">
      <h2 className="font-display text-display max-w-[20ch] text-balance">
        {t("title")}
      </h2>
      <div className="flex flex-wrap gap-3 md:flex-none">
        <Link href="/servicos" className={`bg-fg text-bg ${action}`}>
          {t("services")}
        </Link>
        <Link href="/contato" className={`border-fg border ${action}`}>
          {t("contact")}
        </Link>
      </div>
    </section>
  );
}
