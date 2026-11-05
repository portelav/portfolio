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
    phoneImage: "/projetos/celular/crewz.webp",
    siteUrl: "https://crewz-ashy.vercel.app",
  },
] as const;

export const projectImageSize = { width: 1425, height: 900 };
export const projectPhoneImageSize = { width: 780, height: 1170 };

export const coauthorUrl = "https://github.com/ViniciusLoureiro67/";
