import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { pages, type PageKey } from "@/lib/pages";

import { getPathname } from "./navigation";
import { routing } from "./routing";

// Title, description and language links of an inner page. The texts live in the
// message files, under Pages.<key>; the address comes from the routing.
export async function pageMetadata(
  locale: string,
  key: PageKey,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Pages" });
  const href = pages.find((page) => page.key === key)!.href;
  const pathFor = (target: (typeof routing.locales)[number]) =>
    getPathname({ locale: target, href });

  return {
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(
          routing.locales.map((target) => [target, pathFor(target)]),
        ),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
  };
}
