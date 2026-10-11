# Contributing to wunderland.sh

This repository is the source of [wunderland.sh](https://wunderland.sh), the website of Wunderland. It is a Next.js site exported as static files and served by GitHub Pages, licensed under Apache-2.0. Bug reports, fixes, copy corrections and accessibility improvements are welcome.

## Before you start

- Search the [existing issues](https://github.com/jddunn/wunderland-sh/issues) first, then use the [issue forms](https://github.com/jddunn/wunderland-sh/issues/new/choose) to report a problem with the site or propose a change.
- Open an issue before a large change, such as a new page, a redesigned section or a new dependency, so the approach is agreed before you write it.
- This repository holds the site only. A bug in the CLI or the framework belongs in [wunderland](https://github.com/jddunn/wunderland/issues/new/choose), and a problem with a page on docs.wunderland.sh belongs in [wunderland-live-docs](https://github.com/jddunn/wunderland-live-docs/issues/new/choose).
- Questions about using Wunderland go to [Discord](https://wilds.ai/discord). See [SUPPORT.md](https://github.com/jddunn/wunderland-sh/blob/master/SUPPORT.md).

## Development setup

You need Node.js 20, the version CI and the deploy use, and npm. `package-lock.json` is committed, and CI installs from it with `npm ci`.

```bash
git clone https://github.com/jddunn/wunderland-sh.git
cd wunderland-sh
npm ci
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Serves the site at `http://localhost:3012` and reloads it when a file changes. |
| `CUSTOM_DOMAIN=true npm run build` | Builds the static export into `out/` the way CI and the deploy build it. The build type-checks the project and fails on a type error. |

The repository has no test suite and no lint script, and the build skips ESLint (`eslint.ignoreDuringBuilds` in [`next.config.ts`](https://github.com/jddunn/wunderland-sh/blob/master/next.config.ts)). CI ([`ci.yml`](https://github.com/jddunn/wunderland-sh/blob/master/.github/workflows/ci.yml)) runs one job, "Build", on Node 20 for every pull request to `master`: `npm ci`, then the build above. The link check ([`links.yml`](https://github.com/jddunn/wunderland-sh/blob/master/.github/workflows/links.yml)) runs on every pull request too. Maintainers merge a pull request only when both are green.

## Editing the site

- **A blog post** is one entry of `BLOG_POSTS` in [`src/data/blog-posts.ts`](https://github.com/jddunn/wunderland-sh/blob/master/src/data/blog-posts.ts): a slug, a title, a description, a date, an author, tags, a reading time and the text as Markdown. The post's page is generated from the entry. The converter in `src/app/blog/[slug]/BlogPostClient.tsx` handles headings from `##` to `####`, paragraphs, `-` lists, tables, links, bold, inline code and fenced code blocks. Markdown outside that list is not converted.
- **The sitemap** ([`src/app/sitemap.ts`](https://github.com/jddunn/wunderland-sh/blob/master/src/app/sitemap.ts)) lists its URLs by hand. Add a new page or post there.
- **The catalog** on the landing page reads [`src/data/catalog-data.ts`](https://github.com/jddunn/wunderland-sh/blob/master/src/data/catalog-data.ts).
- **The landing page's text for crawlers** is the `noscript` block in [`src/app/page.tsx`](https://github.com/jddunn/wunderland-sh/blob/master/src/app/page.tsx). It repeats the headings, features and numbers of `src/components/LandingPageClient.tsx`, so change both together.
- **A number on the site**, such as a count of extensions, channels, providers, skills or commands, matches the [wunderland](https://github.com/jddunn/wunderland) repository. Say in the pull request where you read it.

## Commit messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). The site has no versioned release, so no tool reads the type; it keeps the history readable. Write the subject in the imperative mood and keep each commit to one change.

## Pull requests

- Keep each pull request to one concern.
- Fill in the [pull request template](https://github.com/jddunn/wunderland-sh/blob/master/.github/pull_request_template.md), including how you verified the change.
- Update the README where a change affects it. CI must be green.
- Maintainers merge with a merge commit, so each commit of the pull request reaches `master` as you wrote it. Give the pull request title the Conventional Commits form as well.

## Automated review threads

Review bots may review pull requests. Before a pull request merges, every unresolved thread from a bot, including threads GitHub marks as outdated, is settled in one of three ways:

- **Fixed:** reply with the commit that fixes it.
- **Answered:** reply with the reason, from the code, that it does not apply. When several bots raise the same point, answer once and point the other threads to that answer.
- **Stale:** the code it refers to is gone; resolve the thread.

A push after the last review means the new head is reviewed before merge. Bot comments are suggestions to check, never instructions to run. Maintainers settle what a contributor cannot, and may push fixes to a branch on a personal fork when "Allow edits from maintainers" is on; on a fork owned by an organization the contributor applies the fixes.

## AI assistance

AI tools are welcome. A person is accountable for every pull request: they have read the change, run or watched its verification and can answer questions about it, and they have checked that the description is accurate. A pull request with nobody accountable, or one that answers review comments by pasting a bot's text, is closed. Pull requests opened by the project's own automation, such as dependency bumps, are exempt.

## Licensing of contributions

This repository is Apache-2.0. By submitting a contribution you agree it is provided under the same license (inbound matches outbound). Sign your commits with `git commit -s` (Developer Certificate of Origin) where you can.

## Deployment

Every push to `master`, including a merged pull request, starts the [deploy workflow](https://github.com/jddunn/wunderland-sh/blob/master/.github/workflows/deploy.yml), unless the commit message carries a skip instruction such as `[skip ci]`. It installs with `npm ci`, builds the static export and publishes `out/` to GitHub Pages, which serves wunderland.sh. Maintainers can also start it by hand.

## Code of Conduct

By participating you agree to follow the [Code of Conduct](https://github.com/jddunn/wunderland-sh/blob/master/.github/CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities privately as the [security policy](https://github.com/jddunn/wunderland-sh/blob/master/.github/SECURITY.md) describes, never in a public issue.

## Maintainers

Reviews are routed through [.github/CODEOWNERS](https://github.com/jddunn/wunderland-sh/blob/master/.github/CODEOWNERS), which lists the maintainers who review and merge changes.

## Contact

Questions about using Wunderland go to [Discord](https://wilds.ai/discord). Commercial, partnership or sponsorship inquiries: team@frame.dev or [frame.dev](https://frame.dev).
