# wunderland.sh

The source of [wunderland.sh](https://wunderland.sh), the website of [Wunderland](https://github.com/jddunn/wunderland), an open-source framework and CLI for autonomous AI agents. The site is a Next.js app exported as static files and served by GitHub Pages.

The documentation site, [docs.wunderland.sh](https://docs.wunderland.sh), is built from [wunderland-live-docs](https://github.com/jddunn/wunderland-live-docs).

## Develop

You need Node.js 20, the version the workflows use, and npm.

```bash
git clone https://github.com/jddunn/wunderland-sh.git
cd wunderland-sh
npm ci
npm run dev
```

`npm run dev` serves the site at `http://localhost:3012`.

## Build

```bash
CUSTOM_DOMAIN=true npm run build
```

The build writes the static site to `out/`. `CUSTOM_DOMAIN=true` builds it for the root of wunderland.sh. Without it, a production build puts every path under `/wunderland-sh`, the path GitHub Pages serves a repository from when it has no custom domain ([`next.config.ts`](https://github.com/jddunn/wunderland-sh/blob/master/next.config.ts)).

## What is where

| Path | Contents |
|---|---|
| `src/app/` | The pages: the landing page, the blog index and its posts, the not-found page, the sitemap, and the root layout with the site's metadata |
| `src/components/` | The landing page's sections, the catalog browser, the HEXACO radar chart, the theme toggle and the brand icons |
| `src/data/blog-posts.ts` | The blog posts: one entry per post, with its text as Markdown |
| `src/data/catalog-data.ts` | The skills, channels, providers and tools the catalog browser lists |
| `src/styles/globals.css` | Tailwind CSS 4 and the site's own styles |
| `public/` | Images, demo videos, `CNAME`, `robots.txt` and the web manifest |

## Deployment

Every push to `master` builds the site and publishes `out/` to GitHub Pages ([`deploy.yml`](https://github.com/jddunn/wunderland-sh/blob/master/.github/workflows/deploy.yml)).

## Contributing

See [CONTRIBUTING.md](https://github.com/jddunn/wunderland-sh/blob/master/CONTRIBUTING.md). Questions go to [Discord](https://wilds.ai/discord).

## License

[Apache-2.0](https://github.com/jddunn/wunderland-sh/blob/master/LICENSE)
