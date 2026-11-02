import {
  brandCursorPositions,
  cursor,
  serifCursorPositions,
} from "./reescrita-glyphs";

// Times in ms, from docs/fdd/abertura.md. Fixed intervals keep the typing
// uneven, as in the approved prototype, and the same on server and client.
const serifHold = 500;
const cursorHold = 200;
const erasePerLetter = 40;
const pauseBeforeTyping = 130;
const typingIntervals = [168, 201, 152, 224, 179, 146, 213, 187];

const eraseStart = serifHold + cursorHold;
const typingStart =
  eraseStart + erasePerLetter * typingIntervals.length + pauseBeforeTyping;

const typedAt = typingIntervals.reduce<number[]>(
  (times, interval, index) => [
    ...times,
    index === 0 ? typingStart : times[index - 1] + typingIntervals[index - 1],
  ],
  [],
);

export const sequenceDuration =
  typingStart + typingIntervals.reduce((total, interval) => total + interval);

// How long each Caslon letter stays, and how long each final letter stays hidden.
export const serifVisibleFor = typingIntervals.map(
  (_, index) =>
    eraseStart + (typingIntervals.length - 1 - index) * erasePerLetter,
);
export const brandHiddenFor = typedAt;

// One cycle of the blink times this count ends just before 5 s (WCAG 2.2.2).
const blinkDuration = 1060 * 4.7;

// The page is marked for the sequence and the blink that follows it.
export const markedFor = sequenceDuration + blinkDuration;

function step(time: number, opacity: number, x: number) {
  const percent = ((time / sequenceDuration) * 100).toFixed(3);
  const offset = (x - cursor.x).toFixed(2);
  return `${percent}%{opacity:${opacity};transform:translateX(${offset}px)}`;
}

// The cursor's path: hidden, after the Caslon word, erasing, then typing.
export function cursorKeyframes() {
  const last = serifCursorPositions.length - 1;
  const steps = [
    step(0, 0, serifCursorPositions[last]),
    step(serifHold, 1, serifCursorPositions[last]),
    ...typingIntervals.map((_, index) =>
      step(
        eraseStart + index * erasePerLetter,
        1,
        serifCursorPositions[last - 1 - index],
      ),
    ),
    ...typedAt.map((time, index) =>
      step(time, 1, brandCursorPositions[index + 1]),
    ),
    step(sequenceDuration, 1, cursor.x),
  ];

  return `@keyframes reescrita-cursor{${steps.join("")}}`;
}
