import { useTranslations } from "next-intl";
import Image from "next/image";

import { coauthorUrl, projectImageSize, projects } from "@/lib/projects";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4";

export function Projetos() {
  const t = useTranslations("Projects");

  return (
    <section id="projetos" className="scroll-mt-14 px-6 py-16">
      <h2 className="font-display text-display mb-12">{t("title")}</h2>
      <ul className="flex flex-col gap-16">
        {projects.map((project) => (
          <li
            key={project.id}
            className="grid items-center gap-6 md:grid-cols-[3fr_2fr] md:gap-12"
          >
            <Image
              {...projectImageSize}
              src={project.image}
              alt={t(`${project.id}.alt`)}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="border-line h-auto w-full border"
            />
            <div className="flex flex-col items-start gap-4">
              <p className="text-lg">
                {t.rich(`${project.id}.text`, {
                  name: (chunks) => (
                    <strong className="font-medium">{chunks}</strong>
                  ),
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
