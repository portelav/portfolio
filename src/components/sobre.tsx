import { useTranslations } from "next-intl";
import Image from "next/image";

const repoUrl = "https://github.com/portelav/portfolio";

// One sentence beside a contained portrait.
export function Sobre() {
  const t = useTranslations("About");

  return (
    <section
      id="sobre"
      className="page-frame reveal border-line grid scroll-mt-14 gap-8 border-t py-16 md:grid-cols-12 md:items-center md:gap-10 md:py-24"
    >
      <div className="max-w-56 md:col-span-3 md:max-w-none">
        <Image
          src="/sobre/lucas.webp"
          alt={t("photoAlt")}
          width={1100}
          height={1100}
          sizes="(min-width: 768px) 22vw, 14rem"
          className="h-auto w-full rounded-full"
        />
      </div>
      <div className="flex flex-col gap-5 md:col-span-8 md:col-start-5">
        <h2 className="font-display text-xl">{t("title")}</h2>
        <p className="font-display text-xl md:text-display max-w-[32ch]">
          {t("text")}
        </p>
        <p className="max-w-xl">
          {t.rich("repo", {
            link: (chunks) => (
              <a href={repoUrl} className="underline underline-offset-4">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
