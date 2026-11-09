import type { Metadata } from "next";

import { QuerUmSite } from "@/components/quer-um-site";
import { PageTransition } from "@/components/page-transition";
import { pageMetadata } from "@/i18n/page-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/servicos">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services");
}

export default function ServicesPage() {
  return (
    <PageTransition>
      <main className="flex-1">
        <QuerUmSite />
      </main>
    </PageTransition>
  );
}
