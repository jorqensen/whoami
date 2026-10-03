# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager and runtime are both Bun (`bun.lock`). The Nuxt scripts run as `bun --bun nuxt …`, so Nuxt itself runs on Bun, not Node. There is no test suite.

- `bun run dev` — dev server on http://localhost:3000
- `bun run build` — `nuxt generate` (static site; output in `.output/public`)
- `bun run preview` — preview the generated build
- `bun run lint` — ESLint (`@nuxt/eslint` with stylistic rules)
- `bun run typecheck` — `nuxt typecheck` (vue-tsc)

## Architecture

Personal portfolio/blog: Nuxt 4 + Nuxt UI v4 (Tailwind CSS 4) + Nuxt Content v3 + Nuxt Image + motion-v. It is statically generated (`nitro.prerender` with `crawlLinks`, seeded with `/` and `/writing`).

- `app/` — Nuxt 4 `srcDir`. Pages: `index.vue`, `uses.vue`, `writing/index.vue`, `writing/[year]/[slug].vue`. Single `layouts/default.vue`.
- Nuxt Content's build-time SQLite database uses Bun's built-in `bun:sqlite` (`content.experimental.sqliteConnector: 'bun'` in `nuxt.config.ts`), so `better-sqlite3` is intentionally not a dependency. This only works when Nuxt runs on Bun: running plain `nuxt …` under Node logs a warning and Content tries to fall back to `better-sqlite3`. Keep the `--bun` flag on the scripts.
- `app/data/content.ts` — the site's profile/about/skills copy lives here as plain TS objects (imported as `~/data/content`), not in Markdown. Edit this for text changes to the home page. `land-dots-flat.ts` is data for `HeroBackground.vue`.
- `content/posts/<year>/*.md` — posts (the "Writing" section), defined as the `posts` collection in `content.config.ts` (routed under the `/writing` prefix, hence `/writing/<year>/<slug>`). The frontmatter schema is validated with valibot: `date` (ISO string, required), `tags`, `draft` (default `false`), and `rawbody` (used by the post page to compute reading time). Draft posts still render at their URL, with a `[Draft]` title and `noindex`. Listing and surround queries filter them with `draft = false`.
- `app/app.config.ts` — Nuxt UI theming: all UI icons are remapped to the Phosphor set (`i-ph-*`), primary color is amber, and `pageSection` slots are customized globally.
- Nuxt UI LLM reference docs: https://ui.nuxt.com/llms.txt. Consult it, or the `nuxt-ui` skill, when using components.

## Conventions

- Code style is enforced by ESLint stylistic config in `nuxt.config.ts`: 4-space indent, single quotes, semicolons, 1tbs braces, trailing commas only in multiline. `.editorconfig` matches (LF, final newline).
- Icons are bundled client-side by scanning `app/**/*.{vue,ts,md,yml,yaml}` and `content/**/*.{md,yml,yaml}` for `i-*` names (`icon.clientBundle.scan`). Use literal icon names, since dynamically built names won't be bundled. Icon set available: `@iconify-json/ph` (Phosphor; duotone variants for decorative icons).
- Images are served as avif/webp at quality 80 via `@nuxt/image`.
- `.nuxt`, `.output`, `.data`, and `dist` are generated directories.
