import { themeColors } from "@/lib/theme";

// Runs before the first paint, so a saved light theme never flashes dark.
// The stored choice lives in localStorage, never in a cookie (DESIGN.md).
// The meta tag may not exist yet here, so its color is set again once parsed.
const script = `(function(){var d=document.documentElement,c=${JSON.stringify(themeColors)};d.dataset.js="1";try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){d.dataset.theme=t;var f=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=c[t]};f();document.addEventListener("DOMContentLoaded",f)}}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
