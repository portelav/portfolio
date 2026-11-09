import type { Metadata } from "next";

import { Contato } from "@/components/contato";
import { Privacidade } from "@/components/privacidade";
import { PageTransition } from "@/components/page-transition";
import { pageMetadata } from "@/i18n/page-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contato">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="flex-1">
        <Contato />
        <Privacidade />
      </main>
    </PageTransition>
  );
}
