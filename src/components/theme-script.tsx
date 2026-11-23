import {
  applyPalette,
  paletteStorageKey,
  paletteTests,
} from "@/lib/palette-test";
import { themeColors } from "@/lib/theme";

// Runs before the first paint, so a saved light theme never flashes dark.
// The stored choice lives in localStorage, never in a cookie (DESIGN.md).
// The meta tag may not exist yet here, so its color is set again once parsed.
const script = `(function(){var d=document.documentElement,c=${JSON.stringify(themeColors)};d.dataset.js="1";try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){d.dataset.theme=t;var f=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=c[t]};f();document.addEventListener("DOMContentLoaded",f)}}catch(e){}try{if(/^\\/(en)?\\/?$/.test(location.pathname)&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!location.hash){history.scrollRestoration="manual";d.dataset.reescrita="1";setTimeout(function(){delete d.dataset.reescrita},7000)}}catch(e){}})()`;

// Throwaway, with the palette chooser: a palette under test, from the link
// (?paleta=lima&logo=amber) or from the last choice, wins over the theme.
const paletteScript = `(function(){try{var q=new URLSearchParams(location.search),k=${JSON.stringify(paletteStorageKey)},v=q.has("paleta")?q.get("paleta")+"|"+(q.get("logo")||""):localStorage.getItem(k);if(q.has("paleta"))localStorage.setItem(k,v);if(!v)return;var a=v.split("|"),apply=${applyPalette.toString()},run=function(){apply(document.documentElement,${JSON.stringify(paletteTests)},a[0],a[1])};run();document.addEventListener("DOMContentLoaded",run)}catch(e){}})()`;

export function ThemeScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
    </>
  );
}
