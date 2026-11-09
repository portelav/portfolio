import type { ReactNode } from "react";

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

import { DevicesStage } from "./devices-stage";

type DevicesProps = {
  // Short on the home page, full on the Projects page.
  variant: "short" | "full";
};

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

const labelClassName = "font-mono text-sm";

// The three projects beside a notebook and a phone that follow the scroll
// (FDD aparelhos-3d). The text and links are plain HTML over the scene; the
// scene itself is decoration. Each project also carries its screenshot, which
// is all that shows with reduced motion, no JavaScript or no WebGL.
export function Devices({ variant }: DevicesProps) {
  const t = useTranslations("Projects");
  const short = useTranslations("HomeProjects");
  const devices = useTranslations("Devices");
  const full = variant === "full";
  const Title = full ? "h1" : "h2";
  const Name = full ? "h2" : "h3";

  const media = projects.map((project) => ({
    computer: "image" in project ? `/projetos/video/${project.id}.mp4` : null,
    phone: `/projetos/video/celular/${project.id}.mp4`,
  }));

  const coauthor = (chunks: ReactNode) => (
    <a href={coauthorUrl} className="underline underline-offset-4">
      {chunks}
    </a>
  );

  return (
    <section data-devices className="devices">
      <DevicesStage
        media={media}
        pauseLabel={devices("motionPause")}
        resumeLabel={devices("motionResume")}
      />
      <ol className="devices-steps">
        <li className="devices-step devices-title page-frame">
          <Title className="font-display text-display">
            {full ? t("title") : short("title")}
          </Title>
        </li>
        {projects.map((project, index) => {
          const { id } = project;
          const name = t(`${id}.name`);
          const shared = { alt: t(`${id}.alt`), loading: "lazy" as const };
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
          const hasCase = id in caseStudies;

          return (
            <li key={id} className="devices-step page-frame">
              <div
                className={`devices-print border-line border ${computer ? "" : "is-phone"}`}
              >
                <picture>
                  {computer && (
                    <source
                      media="(min-width: 768px)"
                      srcSet={computer.srcSet}
                      sizes={computer.sizes}
                      width={computer.width}
                      height={computer.height}
                    />
                  )}
                  <img {...phone} alt={shared.alt} className="h-auto w-full" />
                </picture>
              </div>
              <div
                data-devices-card={index === 0 ? "" : undefined}
                className="devices-card flex flex-col items-start gap-3"
              >
                {!computer && (
                  <p className={labelClassName}>{devices("phoneOnly")}</p>
                )}
                <div className="flex flex-col gap-1">
                  <Name className="font-display text-xl">{name}</Name>
                  <p className={labelClassName}>
                    {t.rich(`${id}.kind`, { coauthor })}
                  </p>
                </div>
                {full ? (
                  <>
                    <p>{t(`${id}.what`)}</p>
                    <dl className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <dt className={labelClassName}>{t("partLabel")}</dt>
                        <dd>{t(`${id}.part`)}</dd>
                      </div>
                      {id === "landing" && (
                        <div className="flex flex-col gap-1">
                          <dt className={labelClassName}>
                            {t("decisionLabel")}
                          </dt>
                          <dd>{t("landing.decision")}</dd>
                        </div>
                      )}
                    </dl>
                    {id === "landing" && (
                      <p className={labelClassName}>{t("landing.detail")}</p>
                    )}
                    <div className="flex flex-wrap gap-x-6">
                      <a
                        href={project.siteUrl}
                        aria-label={t(`${id}.siteLabel`)}
                        className={linkClassName}
                      >
                        {t("visitSite")}
                      </a>
                      {hasCase && (
                        <Link
                          href={{ pathname: "/projetos/[id]", params: { id } }}
                          transitionTypes={["nav-forward"]}
                          aria-label={short("caseLabel", { name })}
                          className={linkClassName}
                        >
                          {t("seeCase")}
                        </Link>
                      )}
                      {id === "landing" && (
                        <a
                          href={project.codeUrl}
                          aria-label={t("landing.codeLabel")}
                          className={linkClassName}
                        >
                          {t("seeCode")}
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p>{short(id)}</p>
                    {hasCase && (
                      <Link
                        href={{ pathname: "/projetos/[id]", params: { id } }}
                        transitionTypes={["nav-forward"]}
                        aria-label={short("caseLabel", { name })}
                        className={linkClassName}
                      >
                        {short("seeCase")}
                      </Link>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
