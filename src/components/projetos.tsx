import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { coauthorUrl, projectImageSize, projects } from "@/lib/projects";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

export function Projetos() {
  const t = useTranslations("Projects");

  return (
    <section id="projetos" className="scroll-mt-14 pb-16 md:pb-24">
      <h2 className="page-frame font-display text-xl">{t("title")}</h2>
      <ul className="mt-12 flex flex-col gap-24 md:mt-16 md:gap-40">
        {projects.map((project) => (
          <li key={project.id}>
            <h3 className="page-frame reveal font-display text-huge tracking-tight">
              {t(`${project.id}.name`)}
            </h3>
            {/* The window opens as the visitor scrolls, on the computer. On a
                phone the crop shows the site's headline, big enough to read. */}
            <div className="project-runway mt-8 md:mt-10">
              <div className="flex justify-center overflow-hidden px-6 md:sticky md:top-0 md:h-svh md:items-center md:px-0">
                <div className="project-window border-line aspect-[4/5] w-full overflow-hidden border md:aspect-auto md:h-full">
                  <Image
                    {...projectImageSize}
                    src={project.image}
                    alt={t(`${project.id}.alt`)}
                    sizes="(min-width: 768px) 100vw, 200vw"
                    className="h-full w-full object-cover object-[var(--crop-x)_top] md:object-top"
                    style={{ "--crop-x": project.cropX } as CSSProperties}
                  />
                </div>
              </div>
            </div>
            <div className="page-frame reveal mt-8 flex flex-col gap-4 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-16">
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
