import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import { getImageProps } from "next/image";

import { Link } from "@/i18n/navigation";

import {
  caseStudies,
  coauthorUrl,
  projectImageSize,
  projectPhoneImageSize,
  projects,
} from "@/lib/projects";

import { ProjectMedia } from "./project-media";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

const labelClassName = "font-mono text-sm";

// Cases stacked, each with its screen beside what it is and whose part
// was what. The first one sits on the first screen, so it arrives with the opening.
export function Projetos() {
  const t = useTranslations("Projects");

  return (
    <section id="projetos" className="page-frame scroll-mt-14 pb-16 md:pb-24">
      <h2
        className="intro-in font-display text-xl"
        style={{ "--delay": "200ms" } as CSSProperties}
      >
        {t("title")}
      </h2>
      <ul className="mt-5 flex flex-col gap-16 md:gap-24">
        {projects.map((project, index) => {
          const shared = {
            alt: t(`${project.id}.alt`),
            loading: index === 0 ? ("eager" as const) : undefined,
          };
          const computer =
            "image" in project
              ? getImageProps({
                  ...shared,
                  ...projectImageSize,
                  src: project.image,
                  sizes: "(min-width: 768px) 62vw, 92vw",
                }).props
              : null;
          const { props: phone } = getImageProps({
            ...shared,
            ...projectPhoneImageSize,
            src: project.phoneImage,
            sizes: "(min-width: 768px) 27vw, 92vw",
          });

          return (
          <li
            key={project.id}
            className={`grid gap-6 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-5 ${index === 0 ? "intro-in" : "reveal"}`}
            style={
              index === 0 ? ({ "--delay": "240ms" } as CSSProperties) : undefined
            }
          >
            <div className="flex flex-col gap-1 md:col-span-4 md:col-start-9 md:row-start-1">
              <h3 className="font-display text-xl">
                {t(`${project.id}.name`)}
              </h3>
              <p className={labelClassName}>
                {t.rich(`${project.id}.kind`, {
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
            </div>
            <ProjectMedia
              computer={computer}
              phone={phone}
              alt={shared.alt}
              priority={index === 0}
              computerVideo={`/projetos/video/${project.id}.mp4`}
              phoneVideo={`/projetos/video/celular/${project.id}.mp4`}
              pauseLabel={t("videoPause")}
              playLabel={t("videoPlay")}
              viewLabel={t("viewLabel", { name: t(`${project.id}.name`) })}
              viewPhone={t("viewPhone")}
              viewComputer={t("viewComputer")}
            />
            <div className="flex flex-col gap-5 md:col-span-4 md:col-start-9 md:row-start-2">
              <p>{t(`${project.id}.what`)}</p>
              <dl className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <dt className={labelClassName}>{t("partLabel")}</dt>
                  <dd>{t(`${project.id}.part`)}</dd>
                </div>
                {project.id === "landing" && (
                  <div className="flex flex-col gap-1">
                    <dt className={labelClassName}>{t("decisionLabel")}</dt>
                    <dd>{t("landing.decision")}</dd>
                  </div>
                )}
              </dl>
              {project.id === "landing" && (
                <p className={labelClassName}>{t("landing.detail")}</p>
              )}
              <div className="flex flex-wrap gap-x-6">
                <a
                  href={project.siteUrl}
                  aria-label={t(`${project.id}.siteLabel`)}
                  className={linkClassName}
                >
                  {t("visitSite")}
                </a>
                {project.id in caseStudies && (
                  <Link
                    href={{
                      pathname: "/projetos/[id]",
                      params: { id: project.id },
                    }}
                    aria-label={t("landing.caseLabel")}
                    className={linkClassName}
                  >
                    {t("seeCase")}
                  </Link>
                )}
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
          );
        })}
      </ul>
    </section>
  );
}
