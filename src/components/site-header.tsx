import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { BrandName } from "./brand-name";
import { ContactIcons } from "./contact-icons";
import { HeaderShell } from "./header-shell";
import { LocaleSwitcher } from "./locale-switcher";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations("Header");

  return (
    <HeaderShell>
      <div className="page-frame flex h-14 items-center justify-between gap-4">
        <div data-header-name className="header-name">
          <Link
            href="/"
            aria-label={t("homeLabel")}
            className="brand-link flex min-h-11 items-center"
          >
            <BrandName className="h-auto w-24" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <SiteNav
            label={t("navLabel")}
            items={{
              projetos: t("navProjects"),
              sobre: t("navAbout"),
              contato: t("navContact"),
            }}
          />
          <ContactIcons className="mr-2 hidden md:flex" />
          <LocaleSwitcher />
          <ThemeToggle
            toLight={t("themeToLight")}
            toLightLabel={t("themeToLightLabel")}
            toDark={t("themeToDark")}
            toDarkLabel={t("themeToDarkLabel")}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
