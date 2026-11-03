import type { CSSProperties } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

// The name stays readable before any scroll.
const LIT_FROM_START = 4;

// SPIKE. The portrait arrives large and steps aside as the words light up.
// Without scroll-driven animations, or with reduced motion, all of it just shows.
export function Sobre() {
  const t = useTranslations("Home");
  const words = t("intro").split(" ");
  const span = 80 / (words.length - LIT_FROM_START);


  return (
    <div id="sobre">
      <section className="words-runway">
        <div className="words-stage">
          <div className="portrait">
            <div className="portrait-arrive">
              <Image
                src="/sobre/lucas.webp"
                alt={t("photoAlt")}
                width={1100}
                height={1100}
                sizes="(min-width: 768px) 56vh, 80vw"
                preload
                className="portrait-image h-auto w-full"
              />
            </div>
          </div>
          <div className="page-frame words-text">
          <h1 className="intro-in font-display text-display md:max-w-[46vw]">
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
        </div>
      </section>
    </div>
  );
}
