// The only file with Lucas's own contact data (PRD, D9 and D24).
export const whatsappUrl = "https://wa.me/5582996176726";

export const emailUrl = "mailto:lucasportelav@gmail.com";

export const channels = [
  {
    key: "whatsapp",
    value: "+55 82 99617-6726",
    href: whatsappUrl,
  },
  {
    key: "email",
    value: "lucasportelav@gmail.com",
    href: emailUrl,
  },
  {
    key: "instagram",
    value: "@lucasportelav",
    href: "https://www.instagram.com/lucasportelav",
  },
  {
    key: "linkedin",
    value: "lucasportelav",
    href: "https://www.linkedin.com/in/lucasportelav",
  },
  {
    key: "github",
    value: "portelav",
    href: "https://github.com/portelav",
  },
] as const;

// Outside Brazil, email comes before WhatsApp (PRD, D73).
export function emailFirst(locale: string) {
  return locale === "en";
}

export function channelsFor(locale: string) {
  if (!emailFirst(locale)) return channels;
  const [whatsapp, email, ...rest] = channels;
  return [email, whatsapp, ...rest];
}
