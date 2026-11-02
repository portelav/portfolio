// Runs before the first paint, so a saved light theme never flashes dark.
// The stored choice lives in localStorage, never in a cookie (DESIGN.md).
const script = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
