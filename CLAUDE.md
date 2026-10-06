# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A static single-page site that generates nonsense idioms by mixing up the nouns from real ones. Vite bundles it into `dist/`, which is deployed as a Cloudflare Workers static-assets site (`wrangler.jsonc`, served at `idioms.autist.network`). Deployment happens by linking the repo in Cloudflare Workers.

## Commands

- `npm run dev`: Vite dev server.
- `npm run build`: runs `scripts/build.sh`, which type-checks with tsc (`noEmit`) and then runs `vite build` into `dist/`.
- `npm run lint`: `biome check`, which covers both linting and formatting. `npm run format` applies the fixes.
- CI runs `npm run lint` and then `npm run build`.
- There are no tests.

## Build gotchas

- `scripts/build.sh` passes the git remote URL (with credentials stripped) and the HEAD sha to Vite as `VITE_SOURCE`.
  - Vite fills that into the `<!-- %VITE_SOURCE% -->` comment in `index.html`.
  - In dev the placeholder is left as-is.
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
