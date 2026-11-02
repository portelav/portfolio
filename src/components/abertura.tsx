import { useTranslations } from "next-intl";

import { ReescritaName } from "./reescrita-name";

const callClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4";

export function Abertura() {
  const t = useTranslations("Home");

  return (
    <section
      data-abertura
      className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-start justify-center gap-8 px-6 py-12"
    >
      <h1 className="brand-link w-full">
        <ReescritaName
          label={t("name")}
          className="h-auto w-full max-w-2xl"
        />
      </h1>
      <p className="max-w-xl text-lg">{t("intro")}</p>
      <div className="flex flex-wrap gap-x-8">
        <a href="#projetos" className={callClassName}>
          {t("seeProjects")}
        </a>
        <a href="#contato" className={callClassName}>
          {t("getInTouch")}
        </a>
      </div>
    </section>
  );
}
