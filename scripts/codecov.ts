import fs from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const commitHash = await git.resolveRef({ fs, dir: projectRoot, ref: "HEAD" });

const coverageFilePath = path.resolve(projectRoot, "coverage/clover.xml");

const codecovToken = process.env.CODECOV_TOKEN;
if (!codecovToken) {
  throw new Error("CODECOV_TOKEN is not set");
}

await $$({ env: { CODECOV_TOKEN: codecovToken } })`codecovcli --verbose upload-process \
  --commit-sha ${commitHash} \
  --disable-search --fail-on-error \
  --file ${coverageFilePath}`;
