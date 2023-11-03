# eslint-flat-config-gitignore

[![npm](https://img.shields.io/npm/v/eslint-flat-config-gitignore)](https://www.npmjs.com/package/eslint-flat-config-gitignore)
[![AppVeyor Build](https://img.shields.io/appveyor/build/gdlol/eslint-flat-config-gitignore)](https://ci.appveyor.com/project/gdlol/eslint-flat-config-gitignore)
[![Codecov](https://img.shields.io/codecov/c/github/gdlol/eslint-flat-config-gitignore)](https://app.codecov.io/gh/gdlol/eslint-flat-config-gitignore)
[![NPM](https://img.shields.io/npm/l/eslint-flat-config-gitignore)](LICENSE)

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
