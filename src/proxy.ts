import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Every path except Next.js and Vercel internals and files with an extension.
  matcher: "/((?!_next|_vercel|.*\..*).*)",
};
