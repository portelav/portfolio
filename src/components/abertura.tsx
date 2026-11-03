import { useTranslations } from "next-intl";

import { ReescritaName, ReescritaStart } from "./reescrita-name";

export function Abertura() {
  const t = useTranslations("Home");

  return (
    <section
      data-abertura
      className="page-frame flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center gap-10 py-12 md:gap-14"
    >
      <ReescritaStart />
      <h1 className="brand-link w-full">
        <ReescritaName label={t("name")} className="h-auto w-full" />
      </h1>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16">
        <p className="font-display text-lg md:text-xl max-w-3xl">{t("intro")}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
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
