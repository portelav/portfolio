"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type TripticoPlayerProps = {
  pauseLabel: string;
  playLabel: string;
  children: ReactNode;
};

// SPIKE. Plays only while on screen, never by itself under reduced motion, and
// always offers a pause, since the loop moves for more than 5 s.
export function TripticoPlayer({
  pauseLabel,
  playLabel,
  children,
}: TripticoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heldRef = useRef(false);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    heldRef.current = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heldRef.current) {
          video.play().catch(() => {
            // The browser refused autoplay: the poster stays, the button works.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;

    heldRef.current = !video.paused;
    if (video.paused) void video.play();
    else video.pause();
  }

  return (
    <>
      <div className="trip-fade">
        <div className="trip-frame">
          <video
            ref={videoRef}
            className="trip-video"
            src="/triptico/triptico.mp4"
            poster="/triptico/poster.webp"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? playLabel : pauseLabel}
        className="bg-bg border-line absolute right-6 bottom-6 flex h-11 w-11 items-center justify-center border md:right-12"
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
    </>
  );
}
