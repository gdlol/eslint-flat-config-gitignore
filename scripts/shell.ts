import { $ } from "execa";

import { workspaces } from "@/scripts/project.js";

export const $$ = $({ stdio: "inherit", verbose: true, cwd: workspaces });
