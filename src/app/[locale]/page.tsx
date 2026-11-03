import { useTranslations } from "next-intl";

import { Abertura } from "@/components/abertura";
import { Contato } from "@/components/contato";
import { Preloader } from "@/components/preloader";
import { Projetos } from "@/components/projetos";
import { QuerUmSite } from "@/components/quer-um-site";
import { ReescritaName, ReescritaStyles } from "@/components/reescrita-name";
import { Sobre } from "@/components/sobre";
import { Tecnologias } from "@/components/tecnologias";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <>
      <ReescritaStyles />
      <Preloader>
        <ReescritaName label={t("name")} className="h-auto w-full" />
      </Preloader>
      <main>
        <Abertura />
        <Projetos />
        <Sobre />
        <Tecnologias />
        <QuerUmSite />
        <Contato />
      </main>
    </>
  );
}
