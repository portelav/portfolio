import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/case-study";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { caseIds, isCaseId } from "@/lib/projects";

// Only the cases that exist are built; any other id is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projetos/[id]">): Promise<Metadata> {
  const { locale, id } = await params;
  if (!hasLocale(routing.locales, locale) || !isCaseId(id)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "CaseStudy" });
  const pathFor = (target: (typeof routing.locales)[number]) =>
    getPathname({
      locale: target,
      href: { pathname: "/projetos/[id]", params: { id } },
    });

  return {
    title: t(`${id}.metaTitle`),
    description: t(`${id}.metaDescription`),
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

export default async function CasePage({
  params,
}: PageProps<"/[locale]/projetos/[id]">) {
  const { id } = await params;
  if (!isCaseId(id)) {
    notFound();
  }

  return (
    <main className="flex-1">
      <CaseStudy id={id} />
    </main>
  );
}
