# Kreatazz Main Site

Custom, static-first website for Kreatazz Innovation Technology Solutions.

Built with Vite + React and hand-crafted CSS for a premium, calm, business-ready brand presentation.

## Stack

- Vite
- React
- Custom CSS (no Bootstrap, no template libraries)

## Project Structure

```
src/
	components/
		Header.jsx
		Footer.jsx
		Hero.jsx
		SectionTitle.jsx
		ServiceCard.jsx
		CTASection.jsx
	pages/
		Home.jsx
	data/
		siteContent.js
	styles/
		base.css
		layout.css
		home.css
		responsive.css
	App.jsx
	main.jsx

public/
	images/

.github/
	workflows/
		deploy-preview.yml
```

## Content Management

All editable website copy is centralized in:

- `src/data/siteContent.js`

You can update headlines, sections, cards, and contact copy without touching component logic.

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Create static production build:

```bash
npm run build
```

Preview static build locally:

```bash
npm run preview
```

## Deployment to GoDaddy cPanel Preview

This repository includes GitHub Actions FTP deployment via:

- `SamKirkland/FTP-Deploy-Action`

Workflow file:

- `.github/workflows/deploy-preview.yml`

Important behavior:

- Deploy source is `dist/`
- FTP target is `server-dir: /`
- No dangerous clean slate is enabled

Set these repository secrets in GitHub:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_PORT` (optional, defaults to 21)

`FTP_SERVER_DIR` is not needed for this workflow because the preview deploy target is fixed to `/`.

Then trigger deploy by:

1. Pushing to `main`, or
2. Running the workflow manually from GitHub Actions (`workflow_dispatch`)

## Notes

- Static-only output for cPanel hosting
- No backend required
- No SSR required
- No React Router required for current one-page architecture
