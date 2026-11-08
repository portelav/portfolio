import { useTranslations } from "next-intl";

import { Abertura } from "@/components/abertura";
import { HomeCta } from "@/components/home-cta";
import { HomeProjects } from "@/components/home-projects";
import { OldAnchors } from "@/components/old-anchors";
import { PageTransition } from "@/components/page-transition";
import { Preloader } from "@/components/preloader";
import { ReescritaName, ReescritaStyles } from "@/components/reescrita-name";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <>
      <ReescritaStyles />
      <OldAnchors />
      <Preloader>
        <ReescritaName label={t("name")} className="h-auto w-full" />
      </Preloader>
      <PageTransition>
        <main>
          <Abertura />
          <HomeProjects />
          <HomeCta />
        </main>
      </PageTransition>
    </>
  );
}
