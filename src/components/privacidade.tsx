import { useTranslations } from "next-intl";

// What the site measures and who processes it (PRD, Regras de fora).
export function Privacidade() {
  const t = useTranslations("Privacy");

  return (
    <section
      id="privacidade"
      className="page-frame border-line scroll-mt-14 border-t py-10"
    >
      <h2 className="font-mono text-sm">{t("title")}</h2>
      <p className="mt-2 max-w-2xl">{t("text")}</p>
    </section>
  );
}
