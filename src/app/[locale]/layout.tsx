import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeScript } from "@/components/theme-script";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { brandMetadata, brandViewport, siteUrl } from "@/lib/site";

import "../globals.css";

export const dynamicParams = false;
export const viewport = brandViewport;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const pathFor = (target: (typeof routing.locales)[number]) =>
    getPathname({ locale: target, href: "/" });

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    ...brandMetadata,
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((target) => [target, pathFor(target)]),
        ),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
    // The provisional site stays out of search results until launch.
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        {/* Client components get their texts as props, so no messages ship. */}
        <NextIntlClientProvider messages={null}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
