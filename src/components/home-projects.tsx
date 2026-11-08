import { type CSSProperties, ViewTransition } from "react";

import { useTranslations } from "next-intl";
import { getImageProps } from "next/image";

import { Link } from "@/i18n/navigation";
import {
  coauthorUrl,
  projectImageSize,
  projectPhoneImageSize,
  projects,
} from "@/lib/projects";

const linkClassName =
  "inline-flex min-h-11 items-center font-mono underline underline-offset-4 transition-opacity duration-150 hover:opacity-70";

// The three projects in short, on the home page: the print for the visitor's
// screen, the name, the kind, one line and the way into the case. The full
// cards live on the Projects page. The 3D devices replace this block later
// (PRD, D79 and D82).
export function HomeProjects() {
  const t = useTranslations("HomeProjects");
  const project = useTranslations("Projects");

  return (
    <section className="page-frame pb-16 md:pb-24">
      <h2
        className="intro-in font-display text-xl"
        style={{ "--delay": "200ms" } as CSSProperties}
      >
        {t("title")}
      </h2>
      <ul className="mt-5 flex flex-col gap-12 md:gap-20">
        {projects.map(({ id, ...media }, index) => {
          const name = project(`${id}.name`);
          const shared = {
            alt: project(`${id}.alt`),
            loading: index === 0 ? ("eager" as const) : undefined,
          };
          const computer =
            "image" in media
              ? getImageProps({
                  ...shared,
                  ...projectImageSize,
                  src: media.image,
                  sizes: "(min-width: 768px) 62vw, 92vw",
                }).props
              : null;
          const { props: phone } = getImageProps({
            ...shared,
            ...projectPhoneImageSize,
            src: media.phoneImage,
            sizes: "(min-width: 768px) 27vw, 92vw",
          });

          return (
            <li
              key={id}
              className={`grid gap-5 md:grid-cols-12 md:items-start md:gap-x-10 ${index === 0 ? "intro-in" : "reveal"}`}
              style={
                index === 0
                  ? ({ "--delay": "240ms" } as CSSProperties)
                  : undefined
              }
            >
              {/* Same name as the case cover: the print moves into the case. */}
              <div className="md:col-span-8">
                <ViewTransition
                  name={`case-media-${id}`}
                  share="morph"
                  default="none"
                >
                  <div
                    className={`border-line border ${computer ? "" : "md:mx-auto md:w-[42.105%]"}`}
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
                      <img
                        {...phone}
                        alt={shared.alt}
                        fetchPriority={index === 0 ? "high" : undefined}
                        className="h-auto w-full"
                      />
                    </picture>
                  </div>
                </ViewTransition>
              </div>
              <div className="flex flex-col items-start gap-3 md:col-span-4">
                <h3 className="font-display text-xl">{name}</h3>
                <p className="font-mono text-sm">
                  {project.rich(`${id}.kind`, {
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
                <p>{t(id)}</p>
                <Link
                  href={{ pathname: "/projetos/[id]", params: { id } }}
                  transitionTypes={["nav-forward"]}
                  aria-label={t("caseLabel", { name })}
                  className={linkClassName}
                >
                  {t("seeCase")}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="reveal mt-12 md:mt-16">
        <Link href="/projetos" className={linkClassName}>
          {t("all")}
        </Link>
      </div>
    </section>
  );
}
