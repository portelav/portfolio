import { brandGlyphs, cursor, nameViewBox } from "@/lib/reescrita-glyphs";

type BrandNameProps = {
  // Accessible name. Leave it out when a parent link already names the logo.
  label?: string;
  className?: string;
};

// Same vector as svg/nome-*.svg in the brand kit, with colors from the tokens.
export function BrandName({ label, className }: BrandNameProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={nameViewBox}
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <path
        fill="var(--fg)"
        fillRule="evenodd"
        d={brandGlyphs.join("")}
      />
      <rect
        className="brand-cursor"
        x={cursor.x}
        y={cursor.y}
        width={cursor.width}
        height={cursor.height}
        fill="var(--accent)"
      />
    </svg>
  );
}
