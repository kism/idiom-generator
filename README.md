# Idiom Generator

[![Lint](https://github.com/kism/idiom-generator/actions/workflows/lint.yml/badge.svg)](https://github.com/kism/idiom-generator/actions/workflows/lint.yml)
[![Type Check](https://github.com/kism/idiom-generator/actions/workflows/check_types.yml/badge.svg)](https://github.com/kism/idiom-generator/actions/workflows/check_types.yml)
[![Build](https://github.com/kism/idiom-generator/actions/workflows/build.yml/badge.svg)](https://github.com/kism/idiom-generator/actions/workflows/build.yml)
[![site](https://img.shields.io/website?url=https%3A%2F%2Fidioms.autist.network)](https://idioms.autist.network/)

Generates random idioms by mixing up the nouns from real ones. A single-page TypeScript app on Cloudflare Workers: Vite
builds static assets and the Cloudflare Vite plugin turns them into an assets-only Worker.

## Prerequisites

- Node, the version in `.nvmrc`. With [nvm](https://github.com/nvm-sh/nvm): `nvm use`
- [pnpm](https://pnpm.io/installation): `npm i -g pnpm`. The version is pinned in `packageManager` in `package.json`

## Run

```bash
nvm use
pnpm install
pnpm dev
```

See [README_dev.md](README_dev.md) for building, previewing and deploying.

## Workflows

| Workflow | Runs |
| --- | --- |
| `lint.yml` | Biome |
| `check_types.yml` | `tsc` |
| `build.yml` | `pnpm build` |
