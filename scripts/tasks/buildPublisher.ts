import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { $ } from "execa";
import type { PackageJson } from "type-fest";

import pkg from "@/publisher/package.json" with { type: "json" };
import { projectRoot, workspaces } from "@/scripts/project.js";

const pkgJson = pkg as PackageJson;
const name = pkgJson.name!;
const publisherProjectPath = path.resolve(projectRoot, name);
export const publisherPath = path.resolve(workspaces, `artifacts/${name}`);

export const buildPublisher = async () => {
  const tempPath = `/tmp/${name}`;
  await mkdir(tempPath, { recursive: true });
  await rm(publisherPath, { recursive: true, force: true });
  await mkdir(publisherPath, { recursive: true });

  const $$ = $({
    stdio: "inherit",
    verbose: "full",
    cwd: tempPath,
    env: {
      ...process.env,
      NODE_ENV: "production",
      npm_config_inject_workspace_packages: "true",
      npm_config_shared_workspace_lockfile: "false",
    },
  });
  await $$`tsc --project ${path.resolve(publisherProjectPath, "tsconfig.json")} --outDir .`;
  await writeFile(path.resolve(tempPath, "package.json"), JSON.stringify(pkgJson, null, 2));
  await writeFile(path.resolve(tempPath, "pnpm-workspace.yaml"), "");
  await $$`pnpm install`;
  await $$`pnpm deploy --filter=${name} --prod ${publisherPath}`;
  await $$`pnpm install --global ${publisherPath}`;
  await $$`rm --recursive ${tempPath}`;
};
