import { useLocale, useTranslations } from "next-intl";

import { channelsFor } from "@/lib/contact";

// WhatsApp and Instagram glyphs from Simple Icons (CC0, the marks belong to
// their owners). The envelope is drawn here, with a stroke close to theirs.
// Each icon wears its brand color (PRD, D75). The brand green fades on the
// light background, so light mode uses WhatsApp's darker green. Email has no
// brand color and takes the accent.
const instagramGradient = "contact-instagram-gradient";

const icons = {
  whatsapp: (
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
    />
  ),
  email: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinejoin="round"
    >
      <rect x="1.5" y="4" width="21" height="16" rx="2.5" />
      <path d="m2.5 6 9.5 7.5L21.5 6" />
    </g>
  ),
  instagram: (
    <>
      <defs>
        <radialGradient id={instagramGradient} cx="0.3" cy="1.07" r="1.2">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <path
        fill={`url(#${instagramGradient})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </>
  ),
} as const;

type IconKey = keyof typeof icons;

const colors: Record<IconKey, string> = {
  whatsapp: "text-[#25d366] light:text-[#128c7e]",
  email: "text-accent",
  instagram: "",
};

const isIconKey = (key: string): key is IconKey => key in icons;

// WhatsApp, email and Instagram in the header, as icons, in the order of
// Contact for the page language. On phones, where the Menu button takes its
// place, Instagram leaves the header, and below 390 px only the first channel
// stays, so the rest still fits. All of them stay in Contact.
export function ContactIcons({ className = "" }: { className?: string }) {
  const t = useTranslations("Contact");
  const header = useTranslations("Header");
  const channels = channelsFor(useLocale()).filter((channel) =>
    isIconKey(channel.key),
  );

  return (
    <ul aria-label={header("contactLabel")} className={`flex ${className}`}>
      {channels.map((channel, index) => (
        <li
          key={channel.key}
          className={
            channel.key === "instagram"
              ? "max-md:hidden"
              : index > 0
                ? "max-[389px]:hidden"
                : undefined
          }
        >
          <a
            href={channel.href}
            aria-label={t(channel.key)}
            title={t(channel.key)}
            className={`contact-icon flex h-11 w-11 items-center justify-center ${colors[channel.key as IconKey]}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              {icons[channel.key as IconKey]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
