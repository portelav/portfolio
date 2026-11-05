"use client";

import {
  type ComponentProps,
  useState,
  useSyncExternalStore,
  ViewTransition,
} from "react";

import { ProjectVideo } from "./project-video";

type Screen = "phone" | "computer";

type ProjectMediaProps = {
  computer: ComponentProps<"img"> | null;
  phone: ComponentProps<"img">;
  alt: string;
  priority: boolean;
  computerVideo: string;
  phoneVideo: string;
  pauseLabel: string;
  playLabel: string;
  viewLabel: string;
  viewPhone: string;
  viewComputer: string;
  // Same name on the card and on the case cover: the media moves between pages.
  transitionName?: string;
};

const computerQuery = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const query = matchMedia(computerQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Print and video of one case. It starts on the version for the visitor's
// screen, chosen by the browser, so nothing shifts while the page loads. A case
// with no computer version offers no choice.
export function ProjectMedia({
  computer,
  phone,
  alt,
  priority,
  computerVideo,
  phoneVideo,
  pauseLabel,
  playLabel,
  viewLabel,
  viewPhone,
  viewComputer,
  transitionName,
}: ProjectMediaProps) {
  const [choice, setChoice] = useState<Screen | null>(null);
  const onComputer = useSyncExternalStore(
    subscribe,
    () => matchMedia(computerQuery).matches,
    () => false,
  );
  const shown = choice ?? (onComputer ? "computer" : "phone");
  const narrow = !computer || choice === "phone";

  const videoFor = (screen: Screen) =>
    screen === "computer" && computer ? computerVideo : phoneVideo;

  return (
    <div className="flex flex-col gap-2 self-start md:col-span-8 md:col-start-1 md:row-span-2 md:row-start-1">
      {computer && (
        <div
          role="group"
          aria-label={viewLabel}
          className="flex gap-6 md:order-last md:justify-center"
        >
          {(
            [
              ["phone", viewPhone],
              ["computer", viewComputer],
            ] as const
          ).map(([screen, label]) => (
            <button
              key={screen}
              type="button"
              aria-pressed={shown === screen}
              onClick={() => setChoice(screen)}
              className="inline-flex min-h-11 items-center font-mono underline-offset-4 transition-opacity duration-150 hover:opacity-70 aria-pressed:underline"
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <ViewTransition name={transitionName} share="morph" default="none">
        <div
          className={`border-line relative border ${narrow ? "md:mx-auto md:w-[42.105%]" : ""}`}
        >
          <picture key={`print-${choice}`}>
            {computer && !choice && (
              <source
                media={computerQuery}
                srcSet={computer.srcSet}
                sizes={computer.sizes}
                width={computer.width}
                height={computer.height}
              />
            )}
            <img
              {...(choice === "computer" && computer ? computer : phone)}
              alt={alt}
              fetchPriority={priority ? "high" : undefined}
              className="h-auto w-full"
            />
          </picture>
          <ProjectVideo
            key={`video-${choice}`}
            src={videoFor(choice ?? "computer")}
            phoneSrc={videoFor(choice ?? "phone")}
            pauseLabel={pauseLabel}
            playLabel={playLabel}
          />
        </div>
      </ViewTransition>
    </div>
  );
}
