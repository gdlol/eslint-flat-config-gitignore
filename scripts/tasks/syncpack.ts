import path from "node:path";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const configPath = path.resolve(projectRoot, ".config/syncpack/config.json");

export const syncpackLint = () => $$`syncpack lint --config ${configPath}`;

export const syncpackFix = () => $$`syncpack fix --config ${configPath}`;
