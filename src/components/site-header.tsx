import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { type PageKey, pages } from "@/lib/pages";

import { BrandName } from "./brand-name";
import { ContactIcons } from "./contact-icons";
import { HeaderShell } from "./header-shell";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { SiteNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const t = useTranslations("Header");
  const page = useTranslations("Pages");
  const items = Object.fromEntries(
    pages.map(({ key }) => [key, page(`${key}.name`)]),
  ) as Record<PageKey, string>;

  return (
    <HeaderShell>
      <div className="page-frame flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <MobileMenu label={page("label")} open={page("menu")} items={items} />
          <div data-header-name className="header-name">
            <Link
              href="/"
              aria-label={t("homeLabel")}
              className="brand-link flex min-h-11 items-center"
            >
              <BrandName className="h-auto w-24" />
            </Link>
          </div>
        </div>
        <div className="flex items-center md:gap-2">
          <SiteNav label={page("label")} items={items} />
          <ContactIcons className="md:mr-2" />
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
