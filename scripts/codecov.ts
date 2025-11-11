import fs from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const commitHash = await git.resolveRef({ fs, dir: projectRoot, ref: "HEAD" });

const coverageFilePath = path.resolve(projectRoot, "coverage/clover.xml");

const repoProvider = process.env.REPO_PROVIDER ?? "local";
const projectSlug = process.env.PROJECT_SLUG ?? "local/local";

await $$`codecovcli --verbose upload-process \
  --git-service ${repoProvider} \
  --slug ${projectSlug} \
  --commit-sha ${commitHash} \
  --disable-search --fail-on-error \
  --file ${coverageFilePath}`;
