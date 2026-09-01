# Kreatazz Main Website

Vite + React static website for Kreatazz Innovation Technology Solutions.

This version merges the existing website with the approved new positioning:

> **Operationalize AI. Create Business Advantage.**

Kreatazz is now positioned as an **Operational Intelligence Company** and the homepage is organized around the signature model:

> **Frontier AI → Kreatazz → Enterprise Execution**

## Stack

- Vite
- React
- Custom CSS
- Static output for cPanel / GitHub Actions deployment

## Important files

```text
src/data/siteContent.js                 Homepage content and navigation
src/pages/Home.jsx                      Homepage structure
src/data/legacyPages.js                 Supporting pages and preserved legacy content
src/data/blogPosts.js                   Existing blog posts
src/styles/base.css                     Base theme
src/styles/layout.css                   Header/footer/layout
src/styles/home.css                     Homepage sections
src/styles/responsive.css               Breakpoints
public/operational-intelligence/*.svg   New proprietary framework visuals
docs/VISUAL_STUDIO_IMPLEMENTATION_PROMPT.md
```

## Local development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Content editing

Most homepage content is in:

```text
src/data/siteContent.js
```

Supporting page content is in:

```text
src/data/legacyPages.js
```

## Deployment

The existing GitHub Actions workflows are preserved:

```text
.github/workflows/deploy-preview.yml
.github/workflows/deploy-production.yml
```

Deployment source-of-truth variables:

- `FTP_PRODUCTION_SERVER_DIR`: required production document root (example: `/public_html/`)
- `FTP_PREVIEW_SERVER_DIR`: required preview deployment folder (must be different from production)

The production workflow now fails fast if the production directory is unset or `/`.
The preview workflow is manual (`workflow_dispatch`) to avoid accidental overwrite of production targets.

The build output remains:

```text
dist/
```

## Editorial direction

The new narrative has priority over legacy duplicate content. Preserve old content only when it supports the new category narrative.

Preferred language:

- Operational Intelligence
- Intelligent Enterprise
- Execution Capability
- Workflow Intelligence
- Intelligence Infrastructure
- Human-Centered AI

Avoid leading with:

- Generic AI consulting
- Generic AI implementation
- Digital transformation buzzwords
- Robot/humanoid AI imagery
