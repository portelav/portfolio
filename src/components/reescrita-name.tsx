import type { CSSProperties } from "react";

import {
  brandGlyphs,
  cursor,
  nameViewBox,
  serifGlyphs,
} from "@/lib/reescrita-glyphs";
import {
  brandHiddenFor,
  cursorKeyframes,
  sequenceDuration,
  serifVisibleFor,
} from "@/lib/reescrita-timeline";

type ReescritaNameProps = {
  label: string;
  className?: string;
};

const styles = `${cursorKeyframes()}@media (prefers-reduced-motion:no-preference){html[data-reescrita] .reescrita-cursor{animation:reescrita-cursor ${sequenceDuration}ms step-end}}`;

function timed(ms: number) {
  return { "--reescrita-time": `${ms}ms` } as CSSProperties;
}

// React moves the style to the head.
export function ReescritaStyles() {
  return (
    <style href="reescrita" precedence="default">
      {styles}
    </style>
  );
}

export function ReescritaName({ label, className }: ReescritaNameProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={nameViewBox}
      role="img"
      aria-label={label}
      className={className}
    >
      <g fill="var(--fg)" fillRule="evenodd">
        {serifGlyphs.map((d, index) => (
          <path
            key={d}
            className="reescrita-serif"
            style={timed(serifVisibleFor[index])}
            d={d}
          />
        ))}
        {brandGlyphs.map((d, index) => (
          <path
            key={d}
            className="reescrita-brand"
            style={timed(brandHiddenFor[index])}
            d={d}
          />
        ))}
      </g>
      <rect
        className="brand-cursor reescrita-cursor"
        x={cursor.x}
        y={cursor.y}
        width={cursor.width}
        height={cursor.height}
        fill="var(--accent)"
      />
    </svg>
  );
}
