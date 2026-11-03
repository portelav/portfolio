import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { coauthorUrl, projectImageSize, projects } from "@/lib/projects";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

export function Projetos() {
  const t = useTranslations("Projects");

  return (
    <section id="projetos" className="page-frame scroll-mt-14 py-16 md:py-24">
      <h2 className="font-display text-xl">{t("title")}</h2>
      <ul className="mt-16 flex flex-col gap-28 md:mt-24 md:gap-44">
        {projects.map((project, index) => (
          <li key={project.id} className="flex flex-col gap-8 md:gap-10">
            <h3
              className={`reveal font-display text-huge tracking-tight ${
                index % 2 === 1 ? "md:text-right" : ""
              }`}
            >
              {t(`${project.id}.name`)}
            </h3>
            {/* On a phone the crop shows the headline of the site, big enough
                to read, instead of a tiny full page. */}
            <div className="reveal border-line aspect-[4/5] overflow-hidden border md:aspect-[2/1]">
              <Image
                {...projectImageSize}
                src={project.image}
                alt={t(`${project.id}.alt`)}
                sizes="(min-width: 768px) 100vw, 200vw"
                className="h-full w-full object-cover object-[var(--crop-x)_top] md:object-top"
                style={{ "--crop-x": project.cropX } as CSSProperties}
              />
            </div>
            <div
              className={`flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex max-w-2xl flex-col gap-3">
                <p className="text-lg">
                  {t.rich(`${project.id}.text`, {
                    coauthor: (chunks) => (
                      <a
                        href={coauthorUrl}
                        className="underline underline-offset-4"
                      >
                        {chunks}
                      </a>
                    ),
                  })}
                </p>
                {project.id === "landing" && (
                  <p className="font-mono text-sm">{t("landing.detail")}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-x-8">
                <a
                  href={project.siteUrl}
                  aria-label={t(`${project.id}.siteLabel`)}
                  className={linkClassName}
                >
                  {t("visitSite")}
                </a>
                {project.id === "landing" && (
                  <a
                    href={project.codeUrl}
                    aria-label={t("landing.codeLabel")}
                    className={linkClassName}
                  >
                    {t("seeCode")}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
