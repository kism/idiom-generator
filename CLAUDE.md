# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A static single-page site that generates nonsense idioms by mixing up the nouns from real ones. Built from
`kism/cloudflare-page-template`: Vite with the Cloudflare Vite plugin builds an assets-only Worker into `dist/`, served at
`idioms.autist.network`. Deployment happens by linking the repo in Cloudflare Workers. See `README_dev.md` for commands
and deploy details.

## Commands

- pnpm, not npm. `pnpm dev`, `pnpm lint` (`pnpm format` fixes), `pnpm typecheck`, `pnpm build`. There are no tests.
- `scripts/run-ci-local.sh` runs everything the workflows do.
- Each check has its own workflow in `.github/workflows`.

## Build gotchas

- `scripts/build.sh` passes the git remote URL (with credentials stripped) and the HEAD sha to Vite as `VITE_SOURCE`.
  - Vite fills that into the `<!-- %VITE_SOURCE% -->` comment in `index.html`.
  - `.env.development` is the fallback for `pnpm dev`, and it also picks the dev favicon.
  - Keep the credential stripping if you change the script.
- Fonts come from `@fontsource/*` imports in `main.ts`, and Vite bundles them.

## How generation works (`src/main.ts`)

- `sayings` maps each template to the nouns it originally used.
  - In a template, `_` is a singular noun slot and `_s` is a plural slot (pluralized with `pluralize`).
  - `_'s` stays possessive.
- Every slot draws randomly from the pooled nouns of *all* sayings, not just the template's own nouns. Adding a saying therefore also adds its nouns to every other template.
- `correctGrammar` then post-processes the sentence:
  - fixes a/an agreement
  - capitalizes the first word
  - applies the literal `findAndReplace` fixes (e.g. `a grass` → `grass`)
  - appends a period
