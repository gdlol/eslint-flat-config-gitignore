import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import prettier from "eslint-config-prettier";
import { gitignore } from "eslint-flat-config-gitignore";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tsESLint from "typescript-eslint";

export default tsESLint.config(
  await gitignore(import.meta.dirname),
  {
    linterOptions: { reportUnusedDisableDirectives: true },
  },
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
  {
    files: ["**/*.test.{ts,tsx,cts,mts}"],
    extends: [vitest.configs.recommended],
  },
  {
    files: ["**/*.{ts,tsx,cts,mts}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "unicorn/prefer-node-protocol": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts}"],
    plugins: { unicorn: eslintPluginUnicorn },
    rules: { "unicorn/prefer-module": "error" },
  },
  prettier,
);
