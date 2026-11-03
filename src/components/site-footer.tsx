import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const privacy = useTranslations("Privacy");

  return (
    <footer className="page-frame flex flex-wrap items-center justify-between gap-x-6 py-4 text-sm">
      <p>{t("rights")}</p>
      {/* The 404 page shares this footer, so the link names the home page. */}
      <Link
        href="/#privacidade"
        className="inline-flex min-h-11 items-center underline underline-offset-4 transition-opacity duration-150 hover:opacity-70"
      >
        {privacy("title")}
      </Link>
    </footer>
  );
}
