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
  markedFor,
  sequenceDuration,
  serifVisibleFor,
} from "@/lib/reescrita-timeline";

type ReescritaNameProps = {
  label: string;
  className?: string;
};

// Runs before the name is painted, only once per session. CSS drives the
// sequence from there, so it never waits for the page's JavaScript. Without
// this mark the page simply shows the final frame.
const script = `(function(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches||sessionStorage.getItem("reescrita"))return;sessionStorage.setItem("reescrita","1");var d=document.documentElement;d.dataset.reescrita="1";setTimeout(function(){delete d.dataset.reescrita},${markedFor})}catch(e){}})()`;

const styles = `${cursorKeyframes()}@media (prefers-reduced-motion:no-preference){html[data-reescrita] .reescrita-cursor{animation:reescrita-cursor ${sequenceDuration}ms step-end,brand-cursor-blink 1.06s steps(1) 4.7 ${sequenceDuration}ms}}`;

function timed(ms: number) {
  return { "--reescrita-time": `${ms}ms` } as CSSProperties;
}

// Goes right before the name. React moves the style to the head.
export function ReescritaStart() {
  return (
    <>
      <style href="reescrita" precedence="default">
        {styles}
      </style>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}

export function ReescritaName({ label, className }: ReescritaNameProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={nameViewBox}
      role="img"
      aria-label={label}
      className={`overflow-visible ${className ?? ""}`}
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
