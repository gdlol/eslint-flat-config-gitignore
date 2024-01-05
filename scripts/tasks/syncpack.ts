import path from "node:path";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const configPath = path.resolve(projectRoot, ".config/syncpack/config.json");

export const syncpackLint = () => $$`syncpack list-mismatches --config ${configPath}`;

export const syncpackFix = () => $$`syncpack fix-mismatches --config ${configPath}`;
