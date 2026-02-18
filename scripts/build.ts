import { build } from "@/scripts/tasks/build.js";
import { buildPublisher } from "@/scripts/tasks/buildPublisher.js";

await build();
await buildPublisher();
