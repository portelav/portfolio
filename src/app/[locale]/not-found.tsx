import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 p-6">
      <h1 className="font-display text-display">{t("title")}</h1>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center underline underline-offset-4"
      >
        {t("home")}
      </Link>
    </main>
  );
}
