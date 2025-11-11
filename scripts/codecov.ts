import fs from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const commitHash = await git.resolveRef({ fs, dir: projectRoot, ref: "HEAD" });

const coverageFilePath = path.resolve(projectRoot, "coverage/clover.xml");

const ciProvider = process.env.CI_PROVIDER ?? "local";

await $$`codecovcli --verbose --auto-load-params-from ${ciProvider} upload-process \
  --commit-sha ${commitHash} \
  --disable-search --fail-on-error \
  --file ${coverageFilePath}`;
