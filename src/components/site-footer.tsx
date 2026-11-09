import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { pages } from "@/lib/pages";

const linkClassName =
  "inline-flex min-h-11 items-center underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

// The pages, the privacy note at the end of Contact and the rights line. On
// phones without JavaScript, these are the links to the pages (PRD, D32 and D78).
export function SiteFooter() {
  const t = useTranslations("Footer");
  const page = useTranslations("Pages");
  const privacy = useTranslations("Privacy");

  return (
    <footer className="page-frame flex flex-col gap-2 py-4 text-sm md:flex-row md:items-center md:justify-between md:gap-6">
      <ul className="flex flex-wrap gap-x-6">
        {pages.map(({ key, href }) => (
          <li key={key}>
            <Link href={href} className={linkClassName}>
              {page(`${key}.name`)}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={{ pathname: "/contato", hash: "privacidade" }}
            className={linkClassName}
          >
            {privacy("title")}
          </Link>
        </li>
      </ul>
      <p>{t("rights")}</p>
    </footer>
  );
}
