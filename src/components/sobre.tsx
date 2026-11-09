import { useTranslations } from "next-intl";
import Image from "next/image";

const repoUrl = "https://github.com/portelav/portfolio";

const methodSteps = ["methodStep1", "methodStep2", "methodStep3"] as const;

// One sentence beside a contained portrait, then the working method, set apart
// so it reads as how every project is made (PRD, D76 and D77).
export function Sobre() {
  const t = useTranslations("About");

  return (
    <section
      id="sobre"
      className="page-frame reveal grid scroll-mt-14 gap-8 py-16 md:grid-cols-12 md:items-center md:gap-10 md:py-24"
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
        <h1 className="font-display text-xl">{t("title")}</h1>
        <p className="font-display md:text-display max-w-[32ch] text-xl">
          {t("text")}
        </p>
      </div>
      <div className="border-line mt-4 grid gap-8 border-t pt-10 md:col-span-12 md:mt-6 md:grid-cols-12 md:gap-10 md:pt-14">
        <h2 className="font-display text-display max-w-[14ch] md:col-span-4">
          {t.rich("methodTitle", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
            // Keeps "AI-Driven" whole, so the line never breaks at the hyphen.
            keep: (chunks) => (
              <span className="whitespace-nowrap">{chunks}</span>
            ),
          })}
        </h2>
        <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
          <ol>
            {methodSteps.map((step, index) => (
              <li
                key={step}
                className="border-line flex gap-4 border-t py-4 last:border-b"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-sm leading-7"
                >
                  {index + 1}
                </span>
                <span>{t(step)}</span>
              </li>
            ))}
          </ol>
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
      </div>
    </section>
  );
}
