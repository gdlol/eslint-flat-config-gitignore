FROM ghcr.io/astral-sh/uv:0.9.8 AS uv

FROM mcr.microsoft.com/devcontainers/javascript-node:24-bookworm

RUN npm install --global pnpm@latest-10

COPY --from=uv /uv /uvx /usr/local/bin/

RUN uv python install --default --preview-features python-install-default 3.14
