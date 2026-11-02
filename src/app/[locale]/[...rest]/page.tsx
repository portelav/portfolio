import { notFound } from "next/navigation";

// Sends every unknown path to the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
