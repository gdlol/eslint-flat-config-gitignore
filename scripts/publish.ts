import path from "node:path";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

await $$`npm publish ${path.resolve(projectRoot, "eslint-flat-config-gitignore/dist")}`;
