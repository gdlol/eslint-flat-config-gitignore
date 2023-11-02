import path from "node:path";

import { projectRoot, workspace } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const tsConfigPath = path.resolve(projectRoot, ".config/eslint/tsconfig.json");

export const eslintSetup = () => $$`tsc --project ${tsConfigPath} --outDir ${workspace}`;

export const eslint = async () => {
  await eslintSetup();
  await $$`eslint ${projectRoot}`;
};

export const eslintFix = async () => {
  await eslintSetup();
  await $$`eslint --fix ${projectRoot}`;
};
