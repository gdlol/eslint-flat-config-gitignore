import { $ } from "execa";
import { workspace } from "scripts/project.js";

export const $$ = $({ stdio: "inherit", verbose: true, cwd: workspace });
