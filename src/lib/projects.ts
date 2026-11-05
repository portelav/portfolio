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

// Projects that have a full case page, with its screens from first to live.
export const caseStudies = {
  landing: {
    phoneVideo: "/projetos/video/celular/landing.mp4",
    referenceUrl: "https://www.awwwards.com/sites/aventura-dental-arts",
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
} as const;

export type CaseId = keyof typeof caseStudies;

export const caseIds = Object.keys(caseStudies) as CaseId[];

export function isCaseId(id: string): id is CaseId {
  return id in caseStudies;
}

export const caseComputerImageSize = { width: 1350, height: 900 };

export const projectImageSize = { width: 1425, height: 900 };
export const projectPhoneImageSize = { width: 780, height: 1170 };

export const coauthorUrl = "https://github.com/ViniciusLoureiro67/";
