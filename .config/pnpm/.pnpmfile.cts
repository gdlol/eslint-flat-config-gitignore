import { readFileSync } from "node:fs";
import path from "node:path";

import type { PackageJson } from "type-fest";

const readPackage = (pkg: PackageJson): PackageJson => {
  if (pkg.name === "workspace") {
    const projectPkg = JSON.parse(
      readFileSync(path.resolve(__dirname, "project/package.json"), "utf-8"),
    ) as PackageJson;
    pkg.dependencies = projectPkg.dependencies;
    pkg.devDependencies = projectPkg.devDependencies;
  }
  return pkg;
};

module.exports = {
  hooks: {
    readPackage,
  },
};
