# jorqensen.dev

Personal site and blog of Mathias Jørgensen. Built with [Nuxt](https://nuxt.com), [Nuxt UI](https://ui.nuxt.com) and [Nuxt Content](https://content.nuxt.com), and generated as a static site. It runs on [Bun](https://bun.sh).

## Development

```bash
bun install
bun run dev        # http://localhost:3000
```

## Build

```bash
bun run build      # static output in .output/public
bun run preview
```

## Content

- Home page copy: `app/data/content.ts`
- Posts: `content/posts/<year>/*.md`, served at `/writing/<year>/<slug>`
