import type { Metadata } from "next";

import { Sobre } from "@/components/sobre";
import { Tecnologias } from "@/components/tecnologias";
import { PageTransition } from "@/components/page-transition";
import { pageMetadata } from "@/i18n/page-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/sobre">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="flex-1">
        <Sobre />
        <Tecnologias />
      </main>
    </PageTransition>
  );
}
