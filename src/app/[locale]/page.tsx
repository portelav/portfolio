import { useTranslations } from "next-intl";

import { BrandName } from "@/components/brand-name";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main
      data-abertura
      className="flex flex-1 flex-col items-start justify-center gap-6 p-6"
    >
      <h1>
        <BrandName label={t("name")} className="h-auto w-60" />
      </h1>
      <p>{t("status")}</p>
    </main>
  );
}
