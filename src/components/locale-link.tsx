"use client";

import type { ReactNode } from "react";

import { useParams } from "next/navigation";

import { Link, usePathname } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";
import { type PageHref, pages } from "@/lib/pages";

type LocaleLinkProps = {
  locale: (typeof routing.locales)[number];
  label: string;
  current: boolean;
  children: ReactNode;
};

const pageHrefs: readonly string[] = pages.map(({ href }) => href);

// Switches the language without leaving the page: a page stays on the same
// page, and a case on the same case. The 404 page leads to the home page.
// On phones, only the other language shows, to leave room for the contact icons.
export function LocaleLink({
  locale,
  label,
  current,
  children,
}: LocaleLinkProps) {
  const params = useParams<{ id?: string }>();
  const pathname = usePathname();
  const href = params.id
    ? { pathname: "/projetos/[id]" as const, params: { id: params.id } }
    : pageHrefs.includes(pathname)
      ? (pathname as PageHref)
      : "/";

  return (
    <Link
      href={href}
      locale={locale}
      lang={locale}
      hrefLang={locale}
      aria-label={label}
      aria-current={current ? "true" : undefined}
      prefetch={false}
      className={`min-h-11 min-w-11 items-center justify-center font-mono text-sm ${
        current
          ? "hidden underline underline-offset-4 md:inline-flex"
          : "inline-flex"
      }`}
    >
      {children}
    </Link>
  );
}
