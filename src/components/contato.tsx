import { useTranslations } from "next-intl";

import { channels } from "@/lib/contact";

// SPIKE. The title stays held while the channels pass beside it, as on the landing.
export function Contato() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contato"
      className="page-frame grid scroll-mt-14 gap-10 py-24 md:grid-cols-[5fr_7fr] md:gap-16 md:py-32"
    >
      <div className="reveal md:sticky md:top-24 md:self-start">
        <h2 className="font-display text-display">{t("title")}</h2>
        <p className="mt-4 max-w-sm text-lg">{t("lead")}</p>
      </div>
      <ul className="border-line border-b">
        {channels.map((channel) => (
          <li key={channel.key} className="reveal border-line border-t">
            <a
              href={channel.href}
              className="contact-row flex items-center justify-between gap-6 py-8 md:py-12"
            >
              <span className="flex min-w-0 flex-col gap-2">
                <span className="font-mono text-sm">{t(channel.key)}</span>
                <span className="font-display text-xl break-words">
                  {channel.value ?? t("pending")}
                </span>
              </span>
              <span aria-hidden="true" className="contact-arrow text-xl">
                &rarr;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
