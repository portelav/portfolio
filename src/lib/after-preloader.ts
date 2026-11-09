// Runs once the preloader lets go, or at once on a page without it. Returns a
// function that stops waiting.
export function afterPreloader(run: () => void) {
  const root = document.documentElement;
  if (!root.dataset.reescrita) {
    run();
    return () => {};
  }

  const watcher = new MutationObserver(() => {
    if (root.dataset.reescrita) return;
    watcher.disconnect();
    run();
  });
  watcher.observe(root, { attributeFilter: ["data-reescrita"] });
  return () => watcher.disconnect();
}
