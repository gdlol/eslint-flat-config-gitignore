import { cp } from "node:fs/promises";
import path from "node:path";

import { projectRoot } from "@/scripts/project.js";
import { dist } from "@/scripts/tasks/build.js";
import { buildPublisher, publisherPath } from "@/scripts/tasks/buildPublisher.js";

await buildPublisher();
const artifactsPath = path.resolve(projectRoot, "artifacts");
await cp(dist, path.resolve(artifactsPath, "dist"), { recursive: true });
await cp(publisherPath, path.resolve(artifactsPath, "publisher"), { recursive: true });
