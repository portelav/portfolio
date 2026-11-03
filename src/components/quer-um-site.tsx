import { useTranslations } from "next-intl";

import { whatsappUrl } from "@/lib/contact";

const steps = ["step1", "step2", "step3", "step4"] as const;

// SPIKE. The one block written only for who wants to hire a site.
export function QuerUmSite() {
  const t = useTranslations("Hire");

  return (
    <section
      id="site"
      className="page-frame reveal border-line grid scroll-mt-14 gap-10 border-t py-16 md:grid-cols-12 md:gap-10 md:py-24"
    >
      <div className="flex flex-col items-start gap-5 md:col-span-6">
        <h2 className="font-display text-display">{t("title")}</h2>
        <p className="max-w-lg text-lg">{t("lead")}</p>
        <a
          href={`${whatsappUrl}?text=${encodeURIComponent(t("whatsappMessage"))}`}
          className="bg-fg text-bg inline-flex min-h-11 items-center justify-center px-5 font-mono transition-opacity duration-150 hover:opacity-70"
        >
          {t("cta")}
        </a>
      </div>
      <div className="md:col-span-5 md:col-start-8">
        <h3 className="font-mono text-sm">{t("stepsTitle")}</h3>
        <ol className="mt-4">
          {steps.map((step, index) => (
            <li
              key={step}
              className="border-line flex gap-4 border-t py-4 last:border-b"
            >
              <span aria-hidden="true" className="font-mono text-sm leading-7">
                {index + 1}
              </span>
              <span>{t(step)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
