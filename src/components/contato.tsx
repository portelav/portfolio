import { useTranslations } from "next-intl";

// SPIKE. Links are placeholders until Lucas sends the final ones, except GitHub.
const channels = [
  { key: "email", href: "#contato" },
  { key: "linkedin", href: "#contato" },
  { key: "github", href: "https://github.com/portelav" },
  { key: "whatsapp", href: "#contato" },
] as const;

export function Contato() {
  const t = useTranslations("Contact");

  return (
    <section
      id="contato"
      className="page-frame grid scroll-mt-14 gap-12 py-24 md:grid-cols-[5fr_7fr] md:gap-16 md:py-32"
    >
      <h2 className="font-display text-display md:sticky md:top-24 md:self-start">
        {t("title")}
      </h2>
      <ul className="flex flex-col gap-12 md:gap-32 md:py-16">
        {channels.map((channel) => (
          <li key={channel.key} className="reveal">
            <a
              href={channel.href}
              className="font-display text-xl inline-flex min-h-11 items-center underline underline-offset-8 transition-opacity duration-150 hover:opacity-70"
            >
              {t(channel.key)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
