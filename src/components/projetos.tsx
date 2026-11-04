import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import { getImageProps } from "next/image";

import {
  coauthorUrl,
  projectImageSize,
  projectPhoneImageSize,
  projects,
} from "@/lib/projects";

import { ProjectVideo } from "./project-video";

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
          const { props: computer } = getImageProps({
            ...shared,
            ...projectImageSize,
            src: project.image,
            sizes: "62vw",
          });
          const { props: phone } = getImageProps({
            ...shared,
            ...projectPhoneImageSize,
            src: project.phoneImage,
            sizes: "92vw",
          });

          return (
          <li
            key={project.id}
            className={`grid gap-6 md:grid-cols-12 md:gap-10 ${index === 0 ? "intro-in" : "reveal"}`}
            style={
              index === 0 ? ({ "--delay": "240ms" } as CSSProperties) : undefined
            }
          >
            <div className="border-line relative self-start border md:col-span-8">
              {/* Each screen gets the print made for it: a computer's is unreadable on a phone. */}
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={computer.srcSet}
                  sizes={computer.sizes}
                  width={computer.width}
                  height={computer.height}
                />
                <img
                  {...phone}
                  alt={shared.alt}
                  fetchPriority={index === 0 ? "high" : undefined}
                  className="h-auto w-full"
                />
              </picture>
              <ProjectVideo
                src={`/projetos/video/${project.id}.mp4`}
                phoneSrc={`/projetos/video/celular/${project.id}.mp4`}
                pauseLabel={t("videoPause")}
                playLabel={t("videoPlay")}
              />
            </div>
            <div className="flex flex-col gap-5 md:col-span-4">
              <div className="flex flex-col gap-1">
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
