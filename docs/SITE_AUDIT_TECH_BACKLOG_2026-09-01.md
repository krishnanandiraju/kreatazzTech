# Site Audit Tech Backlog

Date: 2026-09-01
Scope: Route failures from homepage navigation, deep-link stability, crawlability, and production reliability.

## Source-of-Truth Incident Status

Implemented in current main branch:

1. Production workflow now requires explicit `FTP_PRODUCTION_SERVER_DIR` and rejects `/`.
2. Preview workflow no longer auto-deploys from pushes to main.
3. Preview and production now use separate deployment target variables.
4. Production workflow now validates `dist/index.html` as a React shell before deploy.
5. Production workflow now publishes deploy provenance at `/.well-known/kreatazz-deploy.json`.

Remaining operational task:

1. Configure repository/environment variables to the actual GoDaddy document root and run a production deploy.

## Executive Findings

1. Code-level route coverage is mostly present for homepage links.
2. User-visible failures are likely happening at runtime infrastructure or edge layer.
3. Current route model is SPA fallback-driven, so server rewrite behavior is a hard dependency.
4. Main trust gap is not one bug but lack of production verification guardrails.

## Evidence Snapshot

- Router supports home, blog list, blog post, industries hub, solutions hub, and legacy routes in src/App.jsx.
- Legacy slugs include manufacturing-intelligence in src/data/legacyPages.js.
- Homepage and nav links include /manufacturing-intelligence/ and other internal routes in src/data/siteContent.js.
- Rewrite rules for SPA fallback are enabled in .htaccess and public/.htaccess.
- Shared browser context still showed challenge/interruption behavior at runtime during prior checks.

## Prioritized Backlog

## P0 - Production Access and Routing Reliability

1. Validate served document root and deployed rewrite file path
- Problem: If .htaccess is not in the actual served root, all deep links fail despite correct app code.
- Scope: Deployment workflow, GoDaddy document root, FTP_SERVER_DIR value, post-deploy verification.
- Acceptance:
  - /, /blog/, /industries/, /solutions/, /manufacturing-intelligence/ open directly in a fresh browser session.
  - No 403 on direct deep-link refresh.

2. Add post-deploy smoke test for critical routes
- Problem: No automated check catches route breakage immediately after deployment.
- Scope: GitHub Action step to request critical paths and fail deployment on bad status or bad body signature.
- Acceptance:
  - CI fails when a critical URL returns non-200 or forbidden page content.
  - CI artifact includes route check report.

3. Cloudflare challenge and cache policy tuning for public pages
- Problem: Bot challenge or stale edge cache can mask deployments and mimic broken routing.
- Scope: Cloudflare WAF rules, cache purge policy, bypass for static content and key pages.
- Acceptance:
  - Public pages load without interstitial challenge in normal browser traffic.
  - Purge step after deployment updates new routes immediately.

## P1 - Navigation Correctness and UX Integrity

4. Add URL sanitizer for malformed route endings
- Problem: Paths like /manufacturing-intelligence/-- can map to unknown pages and look broken.
- Scope: Normalize pathname by trimming trailing symbols and collapsing duplicate separators.
- Acceptance:
  - Known pages still resolve when user appends accidental punctuation.
  - Unknown paths still show a clear not-found state.

5. Add explicit 404 route page with recovery links
- Problem: Current legacy fallback can confuse users when slug is invalid.
- Scope: Dedicated not-found page with links to Home, Solutions, Industries, Blog.
- Acceptance:
  - Invalid route always shows a branded 404 experience.
  - Recovery links work on first click and are tracked.

6. Add route-level navigation test matrix
- Problem: No repeatable checklist ensuring every header, footer, card, and CTA path works.
- Scope: Manual plus automated link map verification.
- Acceptance:
  - Test matrix includes source page, click target, expected URL, expected view.
  - All matrix rows pass on desktop and mobile.

## P1 - SEO and Discoverability Hardening

7. Replace static sitemap with generated sitemap in build step
- Problem: Manually maintained sitemap can drift when slugs change.
- Scope: Generate sitemap from blogPosts and legacyPages data during build.
- Acceptance:
  - Sitemap always contains current routes and all blog slugs.
  - No stale or missing entries after content updates.

8. Add Organization and WebSite structured data
- Problem: Only breadcrumb schema is present; brand-level rich snippets are incomplete.
- Scope: JSON-LD for Organization and WebSite on all pages.
- Acceptance:
  - Structured data validator passes for Organization, WebSite, and BreadcrumbList.

9. Add Article schema for blog post pages
- Problem: Blog pages miss article-specific rich-result metadata.
- Scope: Dynamic BlogPosting or Article JSON-LD from blog post data.
- Acceptance:
  - Blog post pages validate with required schema fields.

## P2 - Conversion and Measurement Reliability

10. Add non-mailto fallback for lead intake
- Problem: Mailto depends on local email client and can silently fail.
- Scope: Add API endpoint or form service fallback and success state.
- Acceptance:
  - Lead form submits without local mail client.
  - Success and failure events are tracked.

11. Add analytics QA assertions for navigation events
- Problem: Event calls exist but there is no post-release assertion that they fire per route.
- Scope: Analytics checklist for page_navigation, cta_click, blog events.
- Acceptance:
  - Each critical CTA and route transition has one expected event.
  - No duplicate events per click.

## Suggested Execution Order

1. P0.1 document root validation and rewrite placement
2. P0.2 post-deploy smoke test automation
3. P0.3 cloudflare tuning and purge policy
4. P1.4 URL sanitizer and malformed route handling
5. P1.5 explicit 404 page
6. P1.7 generated sitemap
7. P1.8 and P1.9 structured data expansion
8. P2.10 and P2.11 conversion and analytics hardening

## Handoff Notes for Other Agents

- Start with runtime verification before changing React code.
- Treat infrastructure routing as likely root cause for all-link failure reports.
- Keep URL slugs stable to avoid SEO regression.
- Preserve existing route files and navigation utilities unless replacing with tested alternative.
