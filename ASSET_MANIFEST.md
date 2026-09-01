# Kreatazz curated assets from WordPress upload

Use these in the Vite app under `public/brand/`, `public/legacy/`, or equivalent.

## Full horizontal logo
- Curated file: `brand/logo-full-horizontal.jpeg`
- Original: `uploads/2025/02/Kreatazz_Logo.jpeg`
- Dimensions: 171x53
- Note: Best direct logo from WP uploads; small but useful for reference/header if needed

## Logo mark
- Curated file: `brand/logo-mark-gold-black.png`
- Original: `uploads/2025/02/cropped-favicon.png`
- Dimensions: 512x512
- Note: Gold mark on black background; matches existing WP header style

## Favicon
- Curated file: `brand/favicon-32.png`
- Original: `uploads/2025/02/cropped-favicon-32x32.png`
- Dimensions: 32x32
- Note: Existing WordPress favicon

## Favicon
- Curated file: `brand/favicon-192.png`
- Original: `uploads/2025/02/cropped-favicon-192x192.png`
- Dimensions: 192x192
- Note: App icon / browser icon

## Large logo
- Curated file: `brand/logo-large-blue-bg.png`
- Original: `uploads/2025/10/Kreatazz-logo_v3-720x405.png`
- Dimensions: 720x405
- Note: Large full logo on blue background; use only if needed

## Logo mark transparent
- Curated file: `brand/logo-mark-gold-transparent.png`
- Original: `uploads/2025/02/cropped-favicon.png`
- Dimensions: 512x512
- Note: Use this in Header.jsx on dark/navy header; transparent background

## Hero image
- Curated file: `hero/hero-boardroom-ai.jpg`
- Original: `uploads/2025/02/about-home.jpg`
- Dimensions: 514x365
- Note: This is the image seen in the screenshot: business team + digital overlay

## Hero background
- Curated file: `hero/hero-abstract-background.jpg`
- Original: `uploads/2025/10/Homepage_background.jpg`
- Dimensions: 1024x1024
- Note: Square dark/tech background; can be used as section backdrop

## Office/team image
- Curated file: `hero/office-team-large.jpg`
- Original: `uploads/2025/10/34325.jpg`
- Dimensions: 1500x1000
- Note: Large office/team image; useful for About/Why Kreatazz

## Wide banner
- Curated file: `hero/banner-ai-hand.jpg`
- Original: `uploads/2025/01/banner-bg-01.jpg`
- Dimensions: 1920x800
- Note: Wide 1920x800 AI/tech banner

## Wide banner
- Curated file: `hero/banner-abstract-blue.jpg`
- Original: `uploads/2025/01/banner-bg-02.jpg`
- Dimensions: 1920x800
- Note: Wide abstract banner

## Wide banner
- Curated file: `hero/banner-blue-landscape.jpg`
- Original: `uploads/2025/01/banner-bg-03.jpg`
- Dimensions: 1920x800
- Note: Wide blue landscape style banner

## AI & Data Platforms
- Curated file: `services/service-ai-data.png`
- Original: `uploads/2025/02/AIML_consulting.png`
- Dimensions: 1024x847
- Note: AI/ML lightbulb/cloud visual

## AI implementation
- Curated file: `services/service-ai-implementation.jpg`
- Original: `uploads/2025/02/AIML_Implementations.jpg`
- Dimensions: 1024x1024
- Note: Human + robot AI/ML visual

## Product Engineering
- Curated file: `services/service-product-engineering.jpg`
- Original: `uploads/2025/02/AM-2.jpg`
- Dimensions: 512x287
- Note: Code/keyboard visual from existing services cards

## Model development
- Curated file: `services/service-model-development.jpg`
- Original: `uploads/2025/02/Model_Development.jpg`
- Dimensions: 1024x966
- Note: AI model/person visual

## Healthcare Data Solutions
- Curated file: `services/service-healthcare-digital.png`
- Original: `uploads/2023/11/deardocblogimg-02.png`
- Dimensions: 470x330
- Note: Healthcare tablet/doctor visual

## Healthcare Data Solutions
- Curated file: `services/service-healthcare-lab.png`
- Original: `uploads/2023/11/deardocblogimg-03.png`
- Dimensions: 470x330
- Note: Medical/lab visual

## Workflow & Operations Platforms
- Curated file: `services/service-workflow-operations.jpg`
- Original: `uploads/2025/02/AM-3.jpg`
- Dimensions: 512x287
- Note: Checklist/workflow visual

## Workflow / business operations
- Curated file: `services/service-consulting-team.jpg`
- Original: `uploads/2025/02/ss2.jpg`
- Dimensions: 512x287
- Note: Business meeting visual

## Cloud, DevOps & Automation
- Curated file: `services/service-cloud-devops.jpg`
- Original: `uploads/2025/02/cloud-services.jpg`
- Dimensions: 470x264
- Note: Cloud upload icon visual

## Cloud / digital platform
- Curated file: `services/service-cloud-digital.jpg`
- Original: `uploads/2025/02/cm4.jpg`
- Dimensions: 512x287
- Note: Dark cloud tech visual

## Product Engineering / app development
- Curated file: `services/service-product-mobile.jpg`
- Original: `uploads/2025/02/mobile-app-dev.jpg`
- Dimensions: 470x264
- Note: Mobile app development visual

## Real-estate Personalization Systems
- Curated file: `services/service-realestate-placeholder-team.jpg`
- Original: `uploads/2025/10/34325-1024x683.jpg`
- Dimensions: 1024x683
- Note: No real-estate-specific asset found; use this temporarily or replace later with actual Kreatazz Spaces screenshot

## Blog card
- Curated file: `blog/blog-ai-business.jpg`
- Original: `uploads/2025/02/al-mal-solution.jpg`
- Dimensions: 470x264
- Note: AI/business visual

## Blog card
- Curated file: `blog/blog-product-mobile.jpg`
- Original: `uploads/2025/02/mobile-app.jpg`
- Dimensions: 470x264
- Note: Mobile/product visual

## Blog card
- Curated file: `blog/blog-cloud-strategy.jpg`
- Original: `uploads/2025/02/cloud-strategy.jpg`
- Dimensions: 1024x1024
- Note: Cloud strategy visual

## Blog card
- Curated file: `blog/blog-analytics.jpg`
- Original: `uploads/2025/01/home-about-us.jpg`
- Dimensions: 735x521
- Note: Analytics/dashboard visual


## Recommended mapping in `siteContent.js`

```js
brand: {
  logoMark: "/brand/logo-mark-gold-transparent.png",
  logoFull: "/brand/logo-full-horizontal.jpeg",
  favicon: "/brand/favicon-32.png"
},
hero: {
  image: "/hero/hero-boardroom-ai.jpg"
},
services: [
  { key: "ai-data", image: "/services/service-ai-data.png" },
  { key: "product-engineering", image: "/services/service-product-engineering.jpg" },
  { key: "healthcare-data", image: "/services/service-healthcare-digital.png" },
  { key: "workflow-ops", image: "/services/service-workflow-operations.jpg" },
  { key: "cloud-devops", image: "/services/service-cloud-devops.jpg" },
  { key: "real-estate", image: "/services/service-realestate-placeholder-team.jpg" }
]
```

## Font recommendation
Use Plus Jakarta Sans for the new site if you want a modern premium feel. The WP/Elementor export also has Roboto and Roboto Slab. If font loading becomes a time risk, use:

```css
font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Important
No PHP/theme runtime files are needed. Only static images/fonts/CSS references were curated.
