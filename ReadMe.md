# eslint-flat-config-gitignore

[NPM Badge]: https://img.shields.io/npm/v/eslint-flat-config-gitignore
[NPM URL]: https://www.npmjs.com/package/eslint-flat-config-gitignore
[AppVeyor Badge]: https://img.shields.io/appveyor/build/gdlol/eslint-flat-config-gitignore/main
[AppVeyor URL]: https://ci.appveyor.com/project/gdlol/eslint-flat-config-gitignore/branch/main
[Codecov Badge]: https://img.shields.io/codecov/c/github/gdlol/eslint-flat-config-gitignore/main
[Codecov URL]: https://app.codecov.io/gh/gdlol/eslint-flat-config-gitignore/tree/main
[License Badge]: https://img.shields.io/github/license/gdlol/eslint-flat-config-gitignore

[![NPM Badge][NPM Badge]][NPM URL]
[![AppVeyor Badge][AppVeyor Badge]][AppVeyor URL]
[![Codecov Badge][Codecov Badge]][Codecov URL]
[![License Badge][License Badge]](LICENSE)

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
