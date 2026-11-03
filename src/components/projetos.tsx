import { useTranslations } from "next-intl";
import Image from "next/image";

import { coauthorUrl, projectImageSize, projects } from "@/lib/projects";

import { ProjectTrack } from "./project-track";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

// SPIKE. A horizontal strip like the cases of the landing: the current project
// sits lit in the middle and its neighbours stay dimmed.
export function Projetos() {
  const t = useTranslations("Projects");

  return (
    <section id="projetos" className="scroll-mt-14 py-24 md:py-32">
      <h2 className="page-frame font-display text-display">{t("title")}</h2>
      <div className="mt-12">
        <ProjectTrack
          previousLabel={t("previous")}
          nextLabel={t("next")}
        >
          {projects.map((project) => (
            <li key={project.id} className="project-slide">
              <div className="project-slide-image border-line border">
                <Image
                  {...projectImageSize}
                  src={project.image}
                  alt={t(`${project.id}.alt`)}
                  sizes="(min-width: 768px) 60vw, 90vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="project-slide-text mt-5 flex flex-col gap-2">
                <h3 className="font-display text-lg">
                  {t(`${project.id}.name`)}
                </h3>
                <p>
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
                <div className="flex flex-wrap gap-x-6">
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
        </ProjectTrack>
      </div>
    </section>
  );
}
