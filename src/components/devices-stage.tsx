"use client";

import { useEffect, useRef, useState } from "react";

import { afterPreloader } from "@/lib/after-preloader";
import type { DeviceMedia, DevicesScene } from "@/lib/devices-scene";

type DevicesStageProps = {
  media: readonly DeviceMedia[];
  pauseLabel: string;
  resumeLabel: string;
};

// A pause holds until the site reloads, on this page and on the other one
// with the devices (WCAG 2.2.2).
let held = false;

// The sticky stage behind the project texts. Three.js and the videos only
// download once the preloader is over and the section is a screen away; until
// the first frame is drawn, the stage is empty, with its space already taken.
// With reduced motion, no JavaScript or no WebGL, CSS hides it and the
// section shows its screenshots instead (FDD aparelhos-3d, PRD D90).
export function DevicesStage({ media, pauseLabel, resumeLabel }: DevicesStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<DevicesScene | null>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(held);

  useEffect(() => {
    const stage = stageRef.current;
    const view = viewRef.current;
    const section = stage?.closest<HTMLElement>("[data-devices]");
    const firstCard = section?.querySelector<HTMLElement>("[data-devices-card]");
    if (!stage || !view || !section || !firstCard) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;

    const start = async () => {
      try {
        const { mountDevicesScene } = await import("@/lib/devices-scene");
        if (cancelled) return;
        sceneRef.current = mountDevicesScene({
          view,
          section,
          firstCard,
          media,
          paused: held,
          onReady: () => setReady(true),
        });
      } catch {
        // No WebGL, or the code failed to load: back to the screenshots.
        if (!cancelled) section.dataset.fallback = "";
      }
    };

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        void start();
      },
      { rootMargin: "100% 0px" },
    );
    const stopWaiting = afterPreloader(() => near.observe(section));

    return () => {
      cancelled = true;
      stopWaiting();
      near.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [media]);

  function toggle() {
    held = !held;
    setPaused(held);
    sceneRef.current?.setPaused(held);
  }

  return (
    <div ref={stageRef} className="devices-stage">
      <div
        ref={viewRef}
        className={`devices-view ${ready ? "is-ready" : ""}`}
      />
      {ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? resumeLabel : pauseLabel}
          className="devices-pause bg-bg border-line flex h-11 w-11 items-center justify-center border"
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
    </div>
  );
}
