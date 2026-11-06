// Links and images of the featured cases, in display order. Texts live in the
// message files, under Projects.<id>. A case with no computer image is an app
// with no computer layout: it shows its phone media on every screen.
export const projects = [
  {
    id: "landing",
    image: "/projetos/landing.webp",
    phoneImage: "/projetos/celular/landing.webp",
    siteUrl: "https://www.drathaianelessa.com.br",
    codeUrl: "https://github.com/portelav/landing-drathaiane",
  },
  {
    id: "draftcs",
    image: "/projetos/draftcs.webp",
    phoneImage: "/projetos/celular/draftcs.webp",
    siteUrl: "https://draftcs.com",
  },
  {
    id: "crewz",
    phoneImage: "/projetos/celular/crewz-app.webp",
    siteUrl: "https://crewz-ashy.vercel.app",
  },
] as const;

// Projects that have a full case page. Besides its texts, which live in the
// message files under CaseStudy.<id>, each case lists the decisions it tells, in
// order, the versions on its path, the link in what was learned, if any, and
// whether it has a next step.
export type CaseStudyData = {
  decisions: readonly string[];
  shots: readonly { key: string; phone: string; computer: string }[];
  referenceUrl?: string;
  hasNext?: boolean;
};

export const caseStudies = {
  landing: {
    decisions: ["phoneFirst", "sections", "motion", "whatsapp"],
    referenceUrl: "https://www.awwwards.com/sites/aventura-dental-arts",
    hasNext: true,
    shots: [
      {
        key: "may1",
        phone: "/projetos/caso/landing/celular-maio-1.webp",
        computer: "/projetos/caso/landing/computador-maio-1.webp",
      },
      {
        key: "may2",
        phone: "/projetos/caso/landing/celular-maio-2.webp",
        computer: "/projetos/caso/landing/computador-maio-2.webp",
      },
      {
        key: "october",
        phone: "/projetos/caso/landing/celular-outubro.webp",
        computer: "/projetos/caso/landing/computador-outubro.webp",
      },
      {
        key: "live",
        phone: "/projetos/caso/landing/celular-no-ar.webp",
        computer: "/projetos/caso/landing/computador-no-ar.webp",
      },
    ],
  },
  draftcs: {
    decisions: ["data", "curation", "speed", "card"],
    shots: [
      {
        key: "thirteen",
        phone: "/projetos/caso/draftcs/celular-13-0.webp",
        computer: "/projetos/caso/draftcs/computador-13-0.webp",
      },
      {
        key: "rebrand",
        phone: "/projetos/caso/draftcs/celular-rebrand.webp",
        computer: "/projetos/caso/draftcs/computador-rebrand.webp",
      },
      {
        key: "live",
        phone: "/projetos/caso/draftcs/celular-no-ar.webp",
        computer: "/projetos/caso/draftcs/computador-no-ar.webp",
      },
    ],
  },
} as const satisfies Record<string, CaseStudyData>;

export type CaseId = keyof typeof caseStudies;

export const caseIds = Object.keys(caseStudies) as CaseId[];

export function isCaseId(id: string): id is CaseId {
  return id in caseStudies;
}

export const caseComputerImageSize = { width: 1350, height: 900 };

export const projectImageSize = { width: 1425, height: 900 };
export const projectPhoneImageSize = { width: 780, height: 1170 };

export const coauthorUrl = "https://github.com/ViniciusLoureiro67/";
