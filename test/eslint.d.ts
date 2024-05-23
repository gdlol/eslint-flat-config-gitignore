import type { Linter } from "eslint";

declare module "eslint/use-at-your-own-risk" {
  export interface FlatESLintOptions {
    cwd?: string;
    overrideConfig?: Linter.FlatConfig[] | Linter.FlatConfig;
    overrideConfigFile?: boolean | string;
  }

  export class FlatESLint {
    constructor(options?: FlatESLintOptions);
    isPathIgnored(filePath: string): Promise<boolean>;
  }
}
