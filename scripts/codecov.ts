import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { $ } from "execa";
import gitUrlParse from "git-url-parse";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

import { projectRoot } from "@/scripts/project.js";
import { shellOptions } from "@/scripts/shell.js";

export const getRemoteInfo = async () => {
  const url = (await git.listRemotes({ fs, dir: projectRoot })).at(0)?.url;
  if (!url) {
    throw new Error("Git remote not found");
  }
  const { owner, name: repo } = gitUrlParse(url);
  return { owner, repo };
};

const { owner, repo } = await getRemoteInfo();

const tempPath = path.resolve(tmpdir(), randomUUID());
await mkdir(tempPath, { recursive: true });
try {
  await git.clone({
    fs,
    http,
    dir: tempPath,
    url: "https://github.com/codecov/codecov-action",
    singleBranch: true,
    depth: 1,
    ref: "v3",
  });
  await $({
    ...shellOptions,
    cwd: projectRoot,
    env: {
      GITHUB_REF: "refs/heads/dummy",
      GITHUB_REPOSITORY: `${owner}/${repo}`,
    },
  })`node ${path.resolve(tempPath, "dist/index.js")}`;
} finally {
  await rm(tempPath, { recursive: true, force: true });
}
