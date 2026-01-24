# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DealDroid** - A no-code chatbot website for quality sellers, built on the Astroship Pro template. This is a bilingual SaaS website (English/Thai) with full internationalization support.

- **Framework**: Astro 5.16.6 (static site generator with island architecture)
- **Styling**: TailwindCSS 3.4.1 with custom extensions
- **Languages**: TypeScript, Astro (`.astro`), MDX (`.mdx`)
- **Package Manager**: pnpm 10 (required - see `.mise.toml` for Node.js 24 requirement)
- **Deployment**: Vercel (configured via `@astrojs/vercel`)

## Development Commands

```bash
# Start development server (localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Spell checking (runs on pre-commit)
pnpm spellcheck
```

## Architecture

### Routing Structure
Astro uses file-based routing in `src/pages/`. Each `.astro` or `.md` file becomes a route:
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/th/*.astro` → `/th/*` (Thai language pages)

### Internationalization (i18n)
The site uses a custom i18n setup:
- **Default locale**: English (`en`) - no URL prefix
- **Secondary locale**: Thai (`th`) - `/th/` URL prefix
- **Configuration**: `astro.config.mjs` (built-in Astro i18n) + `src/i18n/ui.ts` (UI translations)

When working with translations:
- Add keys to `src/i18n/ui.ts` in the `ui` object for both `en` and `th`
- Use the `useTranslations` utility from `src/i18n/utils.ts` in components
- Language preference is stored in localStorage

### Layout System
All pages use `src/layouts/Layout.astro` which includes:
- SEO optimization (via `astro-seo` package)
- Language selection banner (first visit)
- Navigation bar
- Footer
- Embedded chat widget (DealDroid chat)

### Component Organization
- `src/components/ui/` - Base reusable components (Button, Badge, Link, etc.)
- `src/components/navbar/` - Navigation-related components
- `src/components/*.astro` - Feature-specific components (Accordion, CallToAction, etc.)

### Content Collections
Blog posts and team members use Astro Content Collections:
- `src/content/blog/` - Blog posts with frontmatter validation
- `src/content/team/` - Team member profiles
- Schemas defined in collection configuration files

### Styling Approach
- **Utility-first**: Use TailwindCSS classes directly
- **Typography**: `@tailwindcss/typography` plugin for prose content (blog posts, markdown)
- **Custom HR**: Medium-style horizontal rules with three dots (defined in `Layout.astro`)

### External Integrations
- **Images**: Unsplash via `source.unsplash.com` and `images.unsplash.com` (configured in `astro.config.mjs`)
- **Chat Widget**: DealDroid chat embedded via external script (`https://happyhead.dealdroid.net`)
- **Icons**: `astro-icon` with Iconify (collections: bx, fluent, mdi, ph, uil)

## Git Hooks (Lefthook)

Pre-commit hooks run automatically:
1. **Format**: Prettier formats staged `.js`, `.ts`, `.jsx`, `.tsx` files
2. **Spellcheck**: CSpell checks staged files for typos

Pre-push hooks:
- Security audit via `pnpm audit --audit-level critical` (currently disabled due to unpatchable axios vulnerabilities from langchain)

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro configuration (i18n, integrations, image domains) |
| `tailwind.config.cjs` | TailwindCSS configuration (fonts, animations, plugins) |
| `src/i18n/ui.ts` | UI translation strings for English and Thai |
| `src/i18n/utils.ts` | Translation utility functions |
| `src/config.ts` | App configuration (external URLs) |
| `src/layouts/Layout.astro` | Main layout wrapper for all pages |
| `lefthook.yml` | Git hooks configuration |

## TypeScript Path Aliases

```typescript
@components/ → src/components/
@layouts/ → src/layouts/
@assets/ → src/assets/
```
