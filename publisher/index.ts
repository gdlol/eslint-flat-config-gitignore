import { readFile } from "node:fs/promises";
import path from "node:path";

import { $ } from "execa";
import semver from "semver";
import type { PackageJson } from "type-fest";

const dist = path.resolve(import.meta.dirname, "../dist");
const pkgJsonPath = path.resolve(dist, "package.json");
const pkgJson = JSON.parse(await readFile(pkgJsonPath, "utf-8")) as PackageJson;
const tag = pkgJson.version!;
const options: string[] = [];
if (semver.prerelease(tag)) {
  options.push("--tag", "preview");
}
await $({
  stdio: "inherit",
  verbose: "full",
  cwd: dist,
})`npm publish ${options}`;
