import fs from "node:fs";
import { rm, writeFile } from "node:fs/promises";
import path from "node:path";

import git from "isomorphic-git";
import * as prettier from "prettier";
import { projectRoot } from "scripts/project.js";
import { $$ } from "scripts/shell.js";
import semverRsort from "semver/functions/rsort.js";
import type { PackageJson } from "type-fest";

import prettierOptions from "../../.config/prettier/.prettierrc.json";
import pkg from "../../eslint-flat-config-gitignore/package.json";
import { license } from "../../package.json";

const clean = () => rm(path.resolve(projectRoot, pkg.name, "dist"), { recursive: true, force: true });

const compile = () => $$`tsc --project ${path.resolve(projectRoot, pkg.name, "tsconfig.json")}`;

const writePackageJson = async () => {
  const tags = await git.listTags({ fs, dir: projectRoot });
  const url = (await git.listRemotes({ fs, dir: projectRoot })).at(0)?.url;
  const pkgJson: PackageJson = Object.assign({}, pkg as PackageJson, {
    version: semverRsort(tags)[0],
    repository: url ?? { type: "git", url },
    license,
    exports: {
      types: "./index.d.ts",
      import: "./index.js",
    },
  });
  const filepath = path.resolve(projectRoot, pkg.name, "dist/package.json");
  const packageJson = await prettier.format(JSON.stringify(pkgJson), { ...prettierOptions, filepath });
  await writeFile(filepath, packageJson);
};

export const build = async () => {
  await clean();
  await compile();
  await writePackageJson();
};
