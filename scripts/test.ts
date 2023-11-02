import { projectRoot } from "scripts/project.js";
import { $$ } from "scripts/shell.js";

await $$`vitest --root ${projectRoot} --coverage`;
