"use client";

import type { ReactNode } from "react";

import { useParams } from "next/navigation";

import { Link } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";

type LocaleLinkProps = {
  locale: (typeof routing.locales)[number];
  label: string;
  current: boolean;
  children: ReactNode;
};

// Switches the language without leaving the page: a case stays on the same case.
export function LocaleLink({
  locale,
  label,
  current,
  children,
}: LocaleLinkProps) {
  const params = useParams<{ id?: string }>();
  const href = params.id
    ? { pathname: "/projetos/[id]" as const, params: { id: params.id } }
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
      className={`inline-flex min-h-11 min-w-11 items-center justify-center font-mono text-sm ${
        current ? "underline underline-offset-4" : ""
      }`}
    >
      {children}
    </Link>
  );
}
