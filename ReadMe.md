# eslint-flat-config-gitignore

[NPM Badge]: https://img.shields.io/npm/v/eslint-flat-config-gitignore
[NPM URL]: https://www.npmjs.com/package/eslint-flat-config-gitignore
[CI Badge]: https://img.shields.io/github/actions/workflow/status/gdlol/eslint-flat-config-gitignore/.github%2Fworkflows%2Fmain.yml
[CI URL]: https://github.com/gdlol/eslint-flat-config-gitignore/actions/workflows/main.yml
[Codecov Badge]: https://img.shields.io/codecov/c/github/gdlol/eslint-flat-config-gitignore
[Codecov URL]: https://app.codecov.io/gh/gdlol/eslint-flat-config-gitignore
[License Badge]: https://img.shields.io/github/license/gdlol/eslint-flat-config-gitignore

[![NPM Badge][NPM Badge]][NPM URL]
[![CI Badge][CI Badge]][CI URL]
[![Codecov Badge][Codecov Badge]][Codecov URL]
[![License Badge][License Badge]](LICENSE)

High fidelity ESLint flat config for ignoring files listed in .gitignore.

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
