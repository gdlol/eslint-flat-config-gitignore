import dedent from "dedent";
import { ESLint } from "eslint";
import { gitignore } from "eslint-flat-config-gitignore";
import { vol } from "memfs";
import { afterEach, expect, test, vi } from "vitest";

const fs = await vi.hoisted(async () => (await import("memfs")).fs);
vi.mock("node:fs", () => ({ ...fs, default: fs }));
vi.mock("node:fs/promises", () => ({ ...fs.promises, default: fs.promises }));

const gitignoreFile = dedent`
  .*
  _*
  !.devcontainer/
  !**/.devcontainer/**
  !.config/
  !**/.config/**

  node_modules/

  dist/
  coverage/
  artifacts/
  !.github/
  `;

afterEach(() => vol.reset());

test("default", async () => {
  const eslint = new ESLint({
    cwd: "/path/to/project",
    overrideConfig: [],
    overrideConfigFile: true,
  });
  expect(await eslint.isPathIgnored("/some/path/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/node_modules/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.env")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.git/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/dist/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.git/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/lib/.file.js")).toBe(false);
});

test("gitignore", async () => {
  vol.fromJSON({ "/path/to/project/.gitignore": gitignoreFile }, "/path/to/project");

  const eslint = new ESLint({
    cwd: "/path/to/project",
    overrideConfig: [await gitignore("/path/to/project")],
    overrideConfigFile: true,
  });
  expect(await eslint.isPathIgnored("/some/path/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/node_modules/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.env")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.eslintrc.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.git/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/dist/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.git/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/package/lib/.file.js")).toBe(true);
});

test("gitignore2", async () => {
  vol.fromJSON({ "/path/to/project/.gitignore2": gitignoreFile }, "/path/to/project");

  const eslint = new ESLint({
    cwd: "/path/to/project",
    overrideConfig: [await gitignore("/path/to/project", ".gitignore2")],
    overrideConfigFile: true,
  });
  expect(await eslint.isPathIgnored("/some/path/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/file.txt")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/node_modules/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.env")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.eslintrc.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.git/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/dist/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/file.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.config/eslint/.eslintrc.js")).toBe(false);
  expect(await eslint.isPathIgnored("/path/to/project/package/.git/file.js")).toBe(true);
  expect(await eslint.isPathIgnored("/path/to/project/package/lib/.file.js")).toBe(true);
});

test("unreachable", async () => {
  vol.fromJSON({ "/path/to/project/.gitignore": gitignoreFile }, "/path/to/project");

  const { ignores } = await gitignore("/path/to/project");
  const ignoreFunction = ignores[0] as unknown as (filePath: string) => boolean;
  expect(ignoreFunction("/path/to/project")).toBe(false);
});
