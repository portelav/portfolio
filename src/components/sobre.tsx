import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

// The name stays readable before any scroll.
const LIT_FROM_START = 4;

// SPIKE. Words light up with the scroll, then the path turns like a wheel.
// Without scroll-driven animations, or with reduced motion, all of it just shows.
export function Sobre() {
  const t = useTranslations("Home");
  const words = t("intro").split(" ");
  const span = 80 / (words.length - LIT_FROM_START);

  const steps = [
    { label: t("pathBeforeLabel"), text: t("pathBefore") },
    { label: t("pathNowLabel"), text: t("pathNow") },
    { label: t("pathNextLabel"), text: t("pathNext") },
  ];

  return (
    <div id="sobre">
      <section className="words-runway">
        <div className="words-stage page-frame grid content-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16">
          <Image
            src="/sobre/lucas.webp"
            alt={t("photoAlt")}
            width={640}
            height={640}
            sizes="(min-width: 768px) 360px, 200px"
            preload
            className="h-auto w-44 rounded-full md:order-last md:w-90"
          />
          <h1 className="font-display text-display max-w-4xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span
                  className={index < LIT_FROM_START ? undefined : "word"}
                  style={
                    {
                      "--from": `${5 + (index - LIT_FROM_START) * span}%`,
                      "--to": `${5 + (index - LIT_FROM_START + 2) * span}%`,
                    } as CSSProperties
                  }
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </h1>
        </div>
      </section>
      <section className="wheel-runway">
        <div className="wheel-stage page-frame flex items-center">
          <div className="wheel-window w-full">
            <ol className="wheel-list">
              {steps.map((step, index) => (
                <li
                  key={step.label}
                  className={`wheel-item wheel-item-${index + 1}`}
                >
                  <span className="text-accent font-mono text-sm">
                    {step.label}
                  </span>
                  <span className="font-display text-display">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
