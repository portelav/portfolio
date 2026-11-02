import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="p-6 text-sm">
      <p>{t("rights")}</p>
    </footer>
  );
}
