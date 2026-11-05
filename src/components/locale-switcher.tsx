import { useLocale, useTranslations } from "next-intl";

import { routing } from "@/i18n/routing";

import { LocaleLink } from "./locale-link";

export function LocaleSwitcher() {
  const t = useTranslations("Language");
  const currentLocale = useLocale();

  const labels = {
    "pt-BR": { short: t("ptShort"), name: t("ptName") },
    en: { short: t("enShort"), name: t("enName") },
  };

  return (
    <nav aria-label={t("label")} className="flex items-center">
      {routing.locales.map((locale) => {
        const isCurrent = locale === currentLocale;

        return (
          <LocaleLink
            key={locale}
            locale={locale}
            label={labels[locale].name}
            current={isCurrent}
          >
            {labels[locale].short}
          </LocaleLink>
        );
      })}
    </nav>
  );
}
