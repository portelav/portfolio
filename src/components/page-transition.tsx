import { type ReactNode, ViewTransition } from "react";

// Slides the page in the direction of the navigation: forward to a case, back
// to the projects. Any other change of page swaps without movement.
export function PageTransition({ children }: { children: ReactNode }) {
  const slide = {
    "nav-forward": "nav-forward",
    "nav-back": "nav-back",
    default: "none",
  };

  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}
