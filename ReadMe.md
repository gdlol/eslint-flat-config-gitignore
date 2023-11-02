# eslint-flat-config-gitignore
ESLint flat config for ignoring files listed in .gitignore.

# Usage
```ts
import path from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import type { Linter } from "eslint";
import { gitignore } from "eslint-flat-config-gitignore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  await gitignore(__dirname),
  js.configs.recommended,
  // ...
] satisfies Linter.FlatConfig[];
```

[Example in this repo](.config/eslint/eslint.config.ts)
