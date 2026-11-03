import { useTranslations } from "next-intl";

import { ReescritaName, ReescritaStart } from "./reescrita-name";

export function Abertura() {
  const t = useTranslations("Home");

  return (
    <section
      data-abertura
      className="page-frame grid min-h-[78svh] content-center gap-10 py-12 md:grid-cols-[7fr_5fr] md:items-end md:gap-16"
    >
      <div>
        <ReescritaStart />
        <h1 className="brand-link w-full">
          <ReescritaName label={t("name")} className="h-auto w-full" />
        </h1>
      </div>
      <div className="flex flex-col items-start gap-8">
        <div className="overflow-hidden">
          <p className="rise font-display text-lg md:text-xl">{t("intro")}</p>
        </div>
        <div className="arrive flex flex-wrap items-center gap-x-8 gap-y-2">
          <a
            href="#projetos"
            className="bg-fg text-bg inline-flex min-h-12 items-center px-6 font-mono transition-[opacity,transform] duration-150 hover:opacity-85 active:scale-[0.98]"
          >
            {t("seeProjects")}
          </a>
          <a
            href="#contato"
            className="inline-flex min-h-12 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
          >
            {t("getInTouch")}
          </a>
        </div>
      </div>
    </section>
  );
}
