#!/usr/bin/env node
/**
 * Runs lint and typecheck at the end of a turn when code changed.
 * Exit code 2 sends the failure back, so it gets fixed before the turn ends.
 */
import { execSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
if (input.stop_hook_active) process.exit(0);

const CODE =
  /(^|\s)("?)(src\/|messages\/|next\.config\.ts|eslint\.config\.mjs|tsconfig\.json|package\.json)/;
const changed = execSync("git status --porcelain", { encoding: "utf8" })
  .split("\n")
  .some((line) => CODE.test(line.slice(3)));
if (!changed) process.exit(0);

for (const script of ["lint", "typecheck"]) {
  const result = spawnSync(`npm run --silent ${script}`, {
    encoding: "utf8",
    shell: true,
  });
  if (result.status !== 0) {
    process.stderr.write(
      `npm run ${script} failed:\n${result.stdout}${result.stderr}`,
    );
    process.exit(2);
  }
}
