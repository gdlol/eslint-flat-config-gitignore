import fs from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const commitHash = await git.resolveRef({ fs, dir: projectRoot, ref: "HEAD" });

const coverageFilePath = path.resolve(projectRoot, "coverage/clover.xml");

const repoProvider = process.env.REPO_PROVIDER ?? "local";
const projectSlug = process.env.PROJECT_SLUG ?? "local/local";
const codecovToken = process.env.CODECOV_TOKEN;
if (!codecovToken) {
  throw new Error("CODECOV_TOKEN is not set");
}

await $$({ env: { CODECOV_TOKEN: codecovToken } })`codecovcli --verbose upload-process \
  --git-service ${repoProvider} \
  --commit-sha ${commitHash} \
  --slug ${projectSlug} \
  --disable-search --fail-on-error \
  --file ${coverageFilePath}`;
