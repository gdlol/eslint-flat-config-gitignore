import { $$ } from "@/scripts/shell.js";
import { build } from "@/scripts/tasks/build.js";

const codecovVersion = "11.2.5";

await build();

await $$`uv tool install --reinstall codecov-cli@${codecovVersion}`;
