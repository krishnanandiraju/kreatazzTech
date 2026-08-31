# Visual Studio / VS Code Implementation Prompt

Use this prompt with GitHub Copilot, Cursor, or a developer working inside the extracted repository.

---

You are working inside the Kreatazz main website repository. This is a Vite + React static website. The goal is to merge the existing website with the approved new positioning, where the new Operational Intelligence narrative always wins if there is any duplication or conflict.

## Business direction

Kreatazz should no longer be positioned as a generic AI implementation, IT services, or digital transformation company. The approved category is:

**Operational Intelligence Company**

The approved core promise is:

**Operationalize AI. Create Business Advantage.**

The approved category visual is:

**Frontier AI → Kreatazz → Enterprise Execution**

This visual and narrative should be the centerpiece of the homepage through the section:

**The Kreatazz Deployment Layer**

## Editorial rules

1. New Operational Intelligence content has priority over old content.
2. Old website content survives only when it is not duplicate and can be reframed as a supporting capability.
3. Replace language such as "AI services", "AI implementation", "AI consulting", and "digital transformation" with stronger language such as:
   - Operational Intelligence
   - Intelligent Enterprise
   - Execution Capability
   - Organizational Learning
   - Intelligence Infrastructure
   - Workflow Intelligence
4. Avoid making Kreatazz sound like a generic staffing firm or generic software agency.
5. Preserve real existing products and content where useful: Keyora, PeopleOS HRMS, existing blogs, healthcare, real estate, cloud, product engineering, staffing support.
6. Keep the tone premium, enterprise-grade, practical, and execution-focused.
7. Do not overuse robots, humanoid AI, or gimmicky futuristic imagery. AI should be invisible; business outcomes should be visible.

## Files to review first

- `src/data/siteContent.js` — primary editable homepage content
- `src/pages/Home.jsx` — homepage section structure
- `src/data/legacyPages.js` — supporting pages and preserved old content
- `src/styles/home.css` — section-specific styling
- `src/styles/responsive.css` — breakpoint styling
- `public/operational-intelligence/` — proprietary SVG framework visuals

## Requested checks

Run:

```bash
npm install
npm run build
npm run preview
```

Then verify:

1. Homepage hero clearly says: "Operationalize AI. Create Business Advantage."
2. "The Kreatazz Deployment Layer" appears prominently above capabilities/services.
3. The homepage visual clearly communicates: "Frontier AI → Kreatazz → Enterprise Execution".
4. Old content such as cloud, product engineering, healthcare, real estate, staffing, blogs, Keyora, and PeopleOS survives as secondary content.
5. Navigation anchors work on desktop and mobile.
6. The build emits static files in `dist/` and is deployable to cPanel/GitHub Actions as before.
7. No broken image paths exist.
8. Mobile layout remains clean.

## Final acceptance criteria

The website should make a buyer understand in under 10 seconds:

Kreatazz helps enterprises convert AI capability into operational execution capability by acting as the deployment layer between frontier AI and real business operations.
