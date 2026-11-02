// Compile-time check: both message files must have exactly the same keys.
// Removing a key from only one of them breaks `npm run typecheck` (ADR 0002).
import type en from "../../messages/en.json";
import type ptBR from "../../messages/pt-BR.json";

type Assignable<Target, Source extends Target> = Source;

export type MessageParity = [
  Assignable<typeof en, typeof ptBR>,
  Assignable<typeof ptBR, typeof en>,
];
