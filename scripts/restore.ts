import path from "node:path";

import { projectRoot, workspace } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";
import { build } from "@/scripts/tasks/build.js";
import { eslintSetup } from "@/scripts/tasks/eslint.js";

await build();
await $$`tsc --project ${path.resolve(projectRoot, ".config/pnpm/tsconfig.json")} --outDir ${workspace}`;
await $$`pnpm install`;
await eslintSetup();
