# GitHub Copilot Instructions

This file provides guidance for GitHub Copilot when working with code in this repository.

## Project Context

**DealDroid** - A bilingual (English/Thai) SaaS website for a no-code chatbot product, built with Astro 5 and TailwindCSS.

## Technology Stack

- **Astro 5.16.6** - Static site generator with island architecture
- **TailwindCSS 3.4.1** - Utility-first CSS with custom extensions
- **TypeScript** - Type safety
- **MDX** - Enhanced markdown support
- **pnpm** - Package manager (required)

## Routing & i18n

- File-based routing in `src/pages/`
- English (`en`) is default - no URL prefix
- Thai (`th`) uses `/th/` prefix
- Add translations to `src/i18n/ui.ts` for both locales

## Component Guidelines

- Base UI components in `src/components/ui/` (Button, Badge, Link, etc.)
- Use Tailwind utility classes for styling
- Import components with `@components/` alias
- Follow Astro component patterns (frontmatter `---` fences for server-side code)

## Styling

- Use TailwindCSS classes directly
- Blog content uses `@tailwindcss/typography` plugin (prose classes)
- Custom HR style with three dots is defined globally in Layout

## Key Files

- `astro.config.mjs` - Site config, i18n, integrations
- `src/i18n/ui.ts` - Translation strings
- `src/layouts/Layout.astro` - Main layout with SEO, navbar, footer, chat widget

## Development

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm spellcheck  # Check spelling
```
