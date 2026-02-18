import { readFile } from "node:fs/promises";
import fs from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";
import semver from "semver";
import type { PackageJson } from "type-fest";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";
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
await $$`npm publish ${dist} ${options}`;
