import path from "node:path";

import { projectRoot } from "@/scripts/project.js";
import { $$ } from "@/scripts/shell.js";

const coverageFilePath = path.resolve(projectRoot, "coverage/clover.xml");

const ciProvider = process.env.CI_PROVIDER ?? "local";

await $$`codecovcli --verbose --auto-load-params-from ${ciProvider} upload-process \
  --disable-search --fail-on-error \
  --file ${coverageFilePath}`;
