import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Linter } from "eslint";
import ignore from "ignore";

const createIgnoreFunction = async (dirname: string, fileName: string) => {
  const ignoreFile = await readFile(path.resolve(dirname, fileName), "utf-8");
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
 * @param fileName The gitignore file name.
 * @returns The eslint flat config.
 */
export const gitignore = async (dirname: string, fileName = ".gitignore") => {
  return {
    ignores: [await createIgnoreFunction(dirname, fileName)],
  } satisfies Linter.FlatConfig;
};
