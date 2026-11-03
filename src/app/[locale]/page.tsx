import { useTranslations } from "next-intl";

import { Contato } from "@/components/contato";
import { Preloader } from "@/components/preloader";
import { Projetos } from "@/components/projetos";
import { ReescritaName, ReescritaStyles } from "@/components/reescrita-name";
import { Sobre } from "@/components/sobre";
import { Tecnologias } from "@/components/tecnologias";
import { Triptico } from "@/components/triptico";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <>
      <ReescritaStyles />
      <Preloader>
        <ReescritaName label={t("name")} className="h-auto w-full" />
      </Preloader>
      <main>
        <Triptico />
        <Sobre />
        <Tecnologias />
        <Projetos />
        <Contato />
      </main>
    </>
  );
}
