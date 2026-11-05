"use client";

import { useEffect, useRef, useState } from "react";

type ProjectVideoProps = {
  src: string;
  phoneSrc: string;
  pauseLabel: string;
  playLabel: string;
};

// A pause on one project holds them all, so moving down the page keeps it.
let held = false;

// Runs once the preloader lets go, or at once on a load without it.
function afterPreloader(run: () => void) {
  const root = document.documentElement;
  if (!root.dataset.reescrita) {
    run();
    return () => {};
  }

  const watcher = new MutationObserver(() => {
    if (root.dataset.reescrita) return;
    watcher.disconnect();
    run();
  });
  watcher.observe(root, { attributeFilter: ["data-reescrita"] });
  return () => watcher.disconnect();
}

// Sits over the screenshot and only shows once it plays, so a missing
// file or reduced motion simply leaves the screenshot. Plays only while most
// of it is on screen. Downloads nothing until the preloader is over and it is
// close to the screen, so it never competes with the page's own code.
export function ProjectVideo({
  src,
  phoneSrc,
  pauseLabel,
  playLabel,
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) held = true;

    const onCanPlay = () => setReady(true);
    const onPlay = () => setPaused(false);
    // "play" also fires with no file to show, so only real frames cover the print.
    const onPlaying = () => setStarted(true);
    const onPause = () => setPaused(true);
    video.addEventListener("canplay", onCanPlay);
    // The file may have loaded before hydration, and that event is already gone.
    if (video.readyState >= 3) onCanPlay();
    video.addEventListener("play", onPlay);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        loader.disconnect();
        video.preload = "metadata";
        // Without play(), only load() makes every browser fetch it, and the
        // button needs that. Calling it during play() would abort the play.
        if (video.paused) video.load();
      },
      { rootMargin: "100% 0px" },
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !held) {
          video.play().catch(() => {
            // Autoplay refused: the screenshot stays and the button works.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );

    const stopWaiting = afterPreloader(() => {
      loader.observe(video);
      observer.observe(video);
    });

    return () => {
      stopWaiting();
      loader.disconnect();
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;

    held = !video.paused;
    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <>
      <video
        ref={videoRef}
        className={`project-video ${started ? "is-started" : ""}`}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source media="(min-width: 768px)" src={src} type="video/mp4" />
        <source src={phoneSrc} type="video/mp4" />
      </video>
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? playLabel : pauseLabel}
          className="bg-bg border-line absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center border"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
          >
            {paused ? (
              <path d="M4 2l10 6-10 6z" />
            ) : (
              <path d="M3 2h4v12H3zM9 2h4v12H9z" />
            )}
          </svg>
        </button>
      )}
    </>
  );
}
