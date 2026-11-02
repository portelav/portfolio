import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

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
          <Link
            key={locale}
            href="/"
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-label={labels[locale].name}
            aria-current={isCurrent ? "true" : undefined}
            prefetch={false}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center font-mono text-sm ${
              isCurrent ? "underline underline-offset-4" : ""
            }`}
          >
            {labels[locale].short}
          </Link>
        );
      })}
    </nav>
  );
}
