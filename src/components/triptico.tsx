import { useTranslations } from "next-intl";

import { TripticoPlayer } from "./triptico-player";

const panels = ["draftcs", "landing", "crewz"] as const;

// SPIKE. One window on the three sites, playing: it starts on the middle panel
// and opens to all three with the scroll. On a phone it pans across them.
export function Triptico() {
  const t = useTranslations("Projects");
  const home = useTranslations("Home");

  return (
    <section className="trip-runway">
      <div className="trip-stage intro-in">
        <TripticoPlayer
          pauseLabel={home("videoPause")}
          playLabel={home("videoPlay")}
        >
          <ul className="trip-captions">
            {panels.map((panel) => (
              <li key={panel} className="trip-caption font-display text-lg">
                {t(`${panel}.name`)}
              </li>
            ))}
          </ul>
          <div className="trip-mask trip-mask-left" />
          <div className="trip-mask trip-mask-right" />
        </TripticoPlayer>
        <div className="trip-veil" />
      </div>
    </section>
  );
}
