import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Linter } from "eslint";
import ignore from "ignore";

const createIgnoreFunction = async (dirname: string, filename: string) => {
  const ignoreFile = await readFile(path.resolve(dirname, filename), "utf-8");
  const ig = ignore.default().add(ignoreFile);
  return (filePath: string): boolean => {
    let relativePath = path.relative(dirname, filePath).replace(/\\/g, "/");
    filePath = filePath.replace(/\\/g, "/");
    if (relativePath === "") {
      return false;
    } else if (filePath.endsWith("/") && !relativePath.endsWith("/")) {
      relativePath += "/";
    }
    return ig.ignores(relativePath);
  };
};

/**
 * Creates an eslint flat config from a gitignore file.
 * @param dirname The directory name.
 * @param filename The gitignore file name.
 * @returns The eslint flat config.
 */
export const gitignore = async (dirname: string, filename = ".gitignore") => {
  return {
    ignores: [await createIgnoreFunction(dirname, filename)],
  } satisfies Linter.FlatConfig;
};
