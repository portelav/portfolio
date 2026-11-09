import type { Metadata } from "next";

import { Projetos } from "@/components/projetos";
import { PageTransition } from "@/components/page-transition";
import { pageMetadata } from "@/i18n/page-metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projetos">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects");
}

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="flex-1">
        <Projetos />
      </main>
    </PageTransition>
  );
}
