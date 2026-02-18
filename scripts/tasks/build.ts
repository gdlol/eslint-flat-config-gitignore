import fs from "node:fs/promises";
import { copyFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";
import * as prettier from "prettier";
import semver from "semver";
import type { PackageJson } from "type-fest";

import prettierOptions from "@/.config/prettier/.prettierrc.json" with { type: "json" };
import pkg from "@/eslint-flat-config-gitignore/package.json" with { type: "json" };
import project from "@/package.json" with { type: "json" };
import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

export const dist = path.resolve(projectRoot, pkg.name, "dist");

const clean = () => rm(dist, { recursive: true, force: true });

const compile = () => $$`tsc --project ${path.resolve(projectRoot, pkg.name, "tsconfig.json")} --outDir ${dist}`;

const getRemoteUrl = async () => {
  const remote = (await git.listRemotes({ fs, dir: projectRoot })).at(0)?.url;
  if (!remote) {
    throw new Error("No git remote found");
  }
  if (!remote.endsWith(".git")) {
    return remote + ".git";
  } else {
    return remote;
  }
};

const writePackageJson = async () => {
  const tags = await git.listTags({ fs, dir: projectRoot });
  const url = await getRemoteUrl();
  const pkgJson: PackageJson = Object.assign({}, pkg as PackageJson, {
    version: semver.rsort(tags).at(0),
    repository: url && { type: "git", url: "git+" + url },
    license: project.license,
    exports: {
      types: "./index.d.ts",
      import: "./index.js",
    },
  });
  const filepath = path.resolve(dist, "package.json");
  const packageJson = await prettier.format(JSON.stringify(pkgJson), { ...prettierOptions, filepath });
  await writeFile(filepath, packageJson);
};

const copyFiles = async (...files: string[]) => {
  for (const file of files) {
    await copyFile(path.resolve(projectRoot, file), path.resolve(dist, file));
  }
};

export const build = async () => {
  await clean();
  await compile();
  await writePackageJson();
  await copyFiles("ReadMe.md", "LICENSE");
};
