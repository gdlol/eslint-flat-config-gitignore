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
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import { gitignore } from "eslint-flat-config-gitignore";
import tsESLint from "typescript-eslint";

export default defineConfig(
  await gitignore(import.meta.dirname),
  eslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    extends: [...tsESLint.configs.recommendedTypeChecked, ...tsESLint.configs.stylisticTypeChecked],
    languageOptions: { parserOptions: { project: true, tsConfigRootDir: import.meta.dirname } },
    rules: {
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  prettier,
);
```

[Example in this repo](.config/eslint/eslint.config.ts)
