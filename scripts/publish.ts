import { readFile } from "node:fs/promises";
import fs from "node:fs/promises";
import path from "node:path";

import { $ } from "execa";
import git from "isomorphic-git";
import semver from "semver";
import type { PackageJson } from "type-fest";

import { projectRoot } from "@/scripts/project.js";
import { shellOptions } from "@/scripts/shell.js";
import { dist } from "@/scripts/tasks/build.js";

const isDefaultBranch = async () => {
  const currentBranch = await git.currentBranch({ fs, dir: projectRoot });
  return currentBranch === "main";
};

const pkgJsonPath = path.resolve(dist, "package.json");
const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf-8")) as PackageJson;
if (!pkgJson.version) {
  throw new Error("Version not found in package.json");
}
const tag = pkgJson.version;
const options: string[] = [];
if (semver.prerelease(tag)) {
  options.push("--tag", tag);
}
if (!(await isDefaultBranch())) {
  options.push("--dry-run");
}
await $({
  ...shellOptions,
  cwd: dist,
  extendEnv: false,
  env: {
    NPM_ID_TOKEN: process.env.NPM_ID_TOKEN,
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    ACTIONS_ID_TOKEN_REQUEST_URL: process.env.ACTIONS_ID_TOKEN_REQUEST_URL,
    ACTIONS_ID_TOKEN_REQUEST_TOKEN: process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
  },
})`npm publish ${options}`;
