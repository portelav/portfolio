import type { ReactNode } from "react";

import { useTranslations } from "next-intl";
import Image, { getImageProps } from "next/image";

import { Link } from "@/i18n/navigation";
import {
  caseComputerImageSize,
  caseStudies,
  projectImageSize,
  projectPhoneImageSize,
  projects,
  type CaseId,
} from "@/lib/projects";

import { ProjectMedia } from "./project-media";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

const labelClassName = "font-mono text-sm";

// One block of the case: the heading on the left on computers, the text on the right.
function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-line grid gap-4 border-t py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <h2 className="font-display text-xl md:col-span-4">{title}</h2>
      <div className="flex max-w-2xl flex-col gap-5 md:col-span-8">
        {children}
      </div>
    </section>
  );
}

// The full story of one project, from the request to what was learned. The top
// repeats the project card, so the case reads as that card opened.
export function CaseStudy({ id }: { id: CaseId }) {
  const t = useTranslations("CaseStudy");
  const projectsText = useTranslations("Projects");
  const project = projects.find((item) => item.id === id);
  const study = caseStudies[id];
  if (!project) return null;

  const alt = projectsText(`${id}.alt`);
  const computer =
    "image" in project
      ? getImageProps({
          alt,
          ...projectImageSize,
          src: project.image,
          sizes: "(min-width: 768px) 62vw, 92vw",
          loading: "eager",
        }).props
      : null;
  const { props: phone } = getImageProps({
    alt,
    ...projectPhoneImageSize,
    src: project.phoneImage,
    sizes: "(min-width: 768px) 27vw, 92vw",
    loading: "eager",
  });

  const back = (
    <Link
      href={{ pathname: "/", hash: "projetos" }}
      transitionTypes={["nav-back"]}
      className={linkClassName}
    >
      ← {t("back")}
    </Link>
  );

  const decisions = [
    ["phoneFirstTitle", "phoneFirst"],
    ["sectionsTitle", "sections"],
    ["motionTitle", "motion"],
    ["whatsappTitle", "whatsapp"],
  ] as const;

  return (
    <article className="page-frame pt-6 pb-16 md:pb-24">
      {back}
      <header className="grid gap-6 py-10 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10 md:gap-y-5 md:py-14">
        <div className="flex flex-col gap-2 md:col-span-4 md:col-start-9 md:row-start-1">
          <p className={labelClassName}>{t("kicker")}</p>
          <h1 className="font-display text-display">{t(`${id}.title`)}</h1>
        </div>
        <ProjectMedia
          computer={computer}
          phone={phone}
          alt={alt}
          priority
          computerVideo={`/projetos/video/${project.id}.mp4`}
          phoneVideo={study.phoneVideo}
          pauseLabel={projectsText("videoPause")}
          playLabel={projectsText("videoPlay")}
          viewLabel={projectsText("viewLabel", {
            name: projectsText(`${id}.name`),
          })}
          viewPhone={projectsText("viewPhone")}
          viewComputer={projectsText("viewComputer")}
          transitionName={`case-media-${id}`}
        />
        <div className="flex flex-col gap-5 md:col-span-4 md:col-start-9 md:row-start-2">
          <p className="text-lg">{t(`${id}.lead`)}</p>
          <div className="flex flex-wrap gap-x-6">
            <a href={project.siteUrl} className={linkClassName}>
              {projectsText("visitSite")}
            </a>
            {"codeUrl" in project && (
              <a href={project.codeUrl} className={linkClassName}>
                {projectsText("seeCode")}
              </a>
            )}
          </div>
        </div>
      </header>

      <Part title={t("request")}>
        <p>{t(`${id}.request`)}</p>
      </Part>
      <Part title={t("audience")}>
        <p>{t(`${id}.audience`)}</p>
      </Part>
      <Part title={t("rules")}>
        <p>{t(`${id}.rules`)}</p>
      </Part>
      <Part title={t("decisions")}>
        <dl className="flex flex-col gap-6">
          {decisions.map(([title, text]) => (
            <div key={title} className="flex flex-col gap-1">
              <dt className={labelClassName}>{t(`${id}.${title}`)}</dt>
              <dd>{t(`${id}.${text}`)}</dd>
            </div>
          ))}
        </dl>
      </Part>
      <Part title={t("method")}>
        <p>{t(`${id}.method`)}</p>
      </Part>

      <section className="border-line flex flex-col gap-8 border-t py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-12 md:gap-10">
          <h2 className="font-display text-xl md:col-span-4">{t("path")}</h2>
          <p className="max-w-2xl md:col-span-8">{t(`${id}.path`)}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className={labelClassName}>{t("phone")}</h3>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {study.shots.map((shot) => (
              <li key={shot.key}>
                <figure className="flex flex-col gap-2">
                  <Image
                    src={shot.phone}
                    alt={t(`${id}.${shot.key}PhoneAlt`)}
                    {...projectPhoneImageSize}
                    sizes="(min-width: 768px) 22vw, 45vw"
                    className="border-line h-auto w-full border"
                  />
                  <figcaption className={labelClassName}>
                    {t(`${id}.${shot.key}`)}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className={labelClassName}>{t("computer")}</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {study.shots.map((shot) => (
              <li key={shot.key}>
                <figure className="flex flex-col gap-2">
                  <Image
                    src={shot.computer}
                    alt={t(`${id}.${shot.key}ComputerAlt`)}
                    {...caseComputerImageSize}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="border-line h-auto w-full border"
                  />
                  <figcaption className={labelClassName}>
                    {t(`${id}.${shot.key}`)}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Part title={t("result")}>
        <p>{t(`${id}.result`)}</p>
      </Part>
      <Part title={t("next")}>
        <p>{t(`${id}.next`)}</p>
      </Part>
      <Part title={t("learned")}>
        <p>
          {t.rich(`${id}.learned`, {
            link: (chunks) => (
              <a
                href={study.referenceUrl}
                className="underline underline-offset-4"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </Part>

      <div className="border-line border-t pt-6">{back}</div>
    </article>
  );
}
