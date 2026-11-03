import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="page-frame py-8 text-sm">
      <p>{t("rights")}</p>
    </footer>
  );
}
