# Google Analytics Tracking Reference Guide
**Kreatazz Website - Analytics Implementation**  
**Deployed**: August 31, 2026 | **GA ID**: G-1JTM83BSDR

---

## 📊 Analytics Overview

All user interactions on kreatazz.tech are tracked through Google Analytics 4 (GA4). This guide documents every event, parameter, and metric being tracked.

### Navigation
- Go to: [Google Analytics Dashboard](https://analytics.google.com)
- Property: Kreatazz Innovation
- Property ID: G-1JTM83BSDR

---

## 🎯 Event Categories & Events

### 1. **ENGAGEMENT Events**

#### Event: `cta_click`
Triggered when users click Call-To-Action buttons
```
Parameters:
  - event_category: "engagement"
  - event_label: Button text (e.g., "Schedule a Demo")
  - location: Where button appears (e.g., "hero", "cta-section", "footer")
  - destination: Target URL or "internal"

Locations tracked:
  - hero: Hero section primary/secondary CTAs
  - cta-section: Contact/inquiry sections
  - footer: Footer CTAs
  - service-card: Service card links
  
Example: User clicks "Build Operational Intelligence" button in hero section
```

#### Event: `external_link_click`
Triggered when users click external links (products, resources, etc.)
```
Parameters:
  - event_category: "engagement"
  - event_label: Link text
  - url: Destination URL
  - link_type: Category of link (e.g., "product", "social", "resource")

Link types:
  - product: External product links
  - social: Social media links
  - resource: Documentation/resource links

Example: User clicks "Keyora" product link in footer
```

#### Event: `form_submission`
Triggered when users submit contact/newsletter forms
```
Parameters:
  - event_category: "engagement"
  - event_label: Form type
  - email_domain: Email domain (privacy-safe, e.g., "gmail.com")

Form types:
  - contact_email: Direct contact form
  - contact_email_footer: Footer contact link
  - newsletter_signup: Newsletter subscription

Example: User signs up for newsletter from blog page
```

#### Event: `scroll`
Triggered when users scroll page (if implemented)
```
Parameters:
  - event_category: "engagement"
  - scroll_depth: Percentage of page scrolled (0-100)

Example: User scrolled 75% down blog post
```

#### Event: `engagement_time`
Triggered when users spend >10 seconds on a page
```
Parameters:
  - event_category: "engagement"
  - page: Page path (e.g., "/blog/", "/")
  - time_seconds: Seconds spent on page (rounded)

Minimum threshold: 10 seconds

Example: User spent 127 seconds on blog post
```

---

### 2. **BLOG Events**

#### Event: `blog_interaction`
Triggered on blog post engagement
```
Parameters:
  - event_category: "blog"
  - event_label: Post title
  - post_slug: URL slug
  - action: Type of interaction

Action types:
  - view: Post page loaded
  - click_from_list: Clicked from blog list
  - click_related: Clicked from related posts
  - back_to_list: Clicked back to blog list

Example: User viewed "AI Implementation in Healthcare" post
```

#### Event: `blog_search`
Triggered when users search blog
```
Parameters:
  - event_category: "blog"
  - event_label: Search query
  - results: Number of results found

Tracking: Every search query with result count

Example: User searched "AI" and found 4 posts
```

#### Event: `blog_filter`
Triggered when users filter by category
```
Parameters:
  - event_category: "blog"
  - event_label: Category name
  - results: Number of posts in category

Tracking: Category filter selections

Example: User selected "Cloud & DevOps" category (3 posts)
```

---

### 3. **SERVICES Events**

#### Event: `service_interaction`
Triggered when users click service cards
```
Parameters:
  - event_category: "services"
  - event_label: Service title
  - action: Type of action (e.g., "click", "view")

Services tracked:
  - Custom Application Development
  - Cloud Infrastructure & DevOps
  - AI Data Intelligence
  - Healthcare Solutions
  - Real Estate Technology
  - Product Engineering

Example: User clicked "Cloud Infrastructure" service card
```

---

### 4. **NEWSLETTER Events**

#### Event: `newsletter_signup`
Triggered when users subscribe to newsletter
```
Parameters:
  - event_category: "engagement"
  - source: Where signup occurred

Signup sources:
  - blog_post: Newsletter form on individual post page
  - blog_list: Newsletter form on blog list page
  - footer: Newsletter form in footer (future)
  - unknown: Signup source unidentified

Tracking: Every newsletter subscription with source

Example: User signed up for newsletter from blog post page
```

---

### 5. **NAVIGATION Events**

#### Event: `page_navigation`
Triggered when users navigate between pages
```
Parameters:
  - event_category: "navigation"
  - from_page: Source page path
  - to_page: Destination page path

Tracking: All internal page transitions

Example: User navigated from "/" to "/blog/"
```

---

### 6. **MEDIA Events** (Future Implementation)

#### Event: `video_engagement`
Triggered for video content engagement (when videos are added)
```
Parameters:
  - event_category: "media"
  - event_label: Video title
  - action: User action (play, pause, complete)
  - video_time: Current video timestamp in seconds

Action types:
  - play: User started video
  - pause: User paused video
  - complete: User completed video
  - seek: User jumped to different time
```

---

## 📊 Key Metrics to Monitor

### User Engagement
| Metric | What It Tells You | Where to Check |
|--------|------------------|-----------------|
| **CTA Click Rate** | How compelling are calls-to-action | Events > cta_click |
| **Blog Visits** | Blog traffic and interest | Events > blog_interaction (view) |
| **Newsletter Signups** | Lead generation effectiveness | Events > newsletter_signup |
| **Page Scroll Depth** | Content relevance and engagement | Events > scroll |
| **Time on Page** | Content quality and engagement | Events > engagement_time |

### Content Performance
| Metric | What It Tells You | How to Calculate |
|--------|------------------|------------------|
| **Most Viewed Posts** | Popular content | blog_interaction (view) - event_label |
| **Average Read Time** | Actual vs. estimated reading time | Compare event_label with readingTime |
| **Search Volume** | What users are looking for | blog_search - event_label frequency |
| **Category Performance** | Popular topics | blog_filter - results count |

### Conversion Metrics
| Metric | What It Tells You | Event to Track |
|--------|------------------|-----------------|
| **Newsletter Conversion Rate** | Newsletter signup % of visitors | newsletter_signup / page_view |
| **Contact Form Rate** | Inquiry generation | form_submission / page_view |
| **Service Interest** | Which services get interest | service_interaction / page_view |

---

## 🔍 How to Track in Google Analytics

### 1. View All Events
```
Admin → Events → All Events
Look for: blog_interaction, cta_click, newsletter_signup, etc.
```

### 2. Create Custom Reports
```
Reports → Create New Report
Example: Blog Search Queries
- Dimension: event_label (from blog_search)
- Metric: event_count
```

### 3. Build Dashboard
```
Create Dashboard with cards for:
- Total CTA Clicks (cta_click)
- Blog Views (blog_interaction with action=view)
- Newsletter Signups (newsletter_signup)
- Top Blog Posts (blog_interaction - event_label)
```

### 4. Set Up Alerts
```
Admin → Alerts
Example: Alert when newsletter signups > 5 per day
```

---

## 💡 Analysis Ideas

### Blog Performance
1. Which blog posts get most views?
2. What do users search for in blog?
3. Which categories are most popular?
4. What's average time on blog posts?
5. Do related posts drive traffic?

### User Journey
1. Do users read blog before contacting?
2. What's the path to newsletter signup?
3. Which CTAs get most clicks?
4. Do service cards drive contact inquiries?

### Content Strategy
1. Are longer posts (10 min) read less?
2. Which topics drive most engagement?
3. Do different categories convert differently?
4. Which external links get most clicks?

### Optimization Opportunities
1. Low-click CTAs: Consider redesign
2. High-search terms with no posts: Create content
3. Popular categories: Create more content
4. High bounce rate pages: Review content quality

---

## 🛠 Implementation Details

### Code Location
```
Analytics utility: src/utils/analytics.js
Blog utility: src/utils/blog.js

Imports in components:
- import { trackCTAClick } from '../utils/analytics'
- import { trackBlogInteraction } from '../utils/analytics'
- import { trackNewsletterSignup } from '../utils/analytics'
```

### Event Firing Examples

#### Track Blog Post View
```javascript
// In BlogPostPage.jsx
useEffect(() => {
  if (post) {
    trackBlogInteraction(post.title, post.slug, 'view')
  }
}, [post])
```

#### Track CTA Click
```javascript
// In Hero.jsx
const handlePrimaryCtaClick = () => {
  trackCTAClick(content.primaryCta.label, 'hero', content.primaryCta.href)
}
```

#### Track Newsletter Signup
```javascript
// In Newsletter.jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  trackNewsletterSignup(source)  // source: 'blog_post', 'blog_list', etc.
  // ... rest of submission
}
```

---

## 📋 Event Reference Table

| Event Name | Category | Label Examples | Parameters | Use Case |
|------------|----------|-----------------|-----------|----------|
| `cta_click` | engagement | "Schedule Demo", "Contact Us" | location, destination | CTA effectiveness |
| `blog_interaction` | blog | Post titles | post_slug, action | Content engagement |
| `blog_search` | blog | "AI", "cloud" | results count | Search behavior |
| `blog_filter` | blog | "Cloud & DevOps" | results count | Category interest |
| `service_interaction` | services | Service names | action type | Service interest |
| `newsletter_signup` | engagement | N/A | source | Lead generation |
| `external_link_click` | engagement | Link text | url, link_type | Link popularity |
| `form_submission` | engagement | "contact_email" | email_domain | Form conversion |
| `page_navigation` | navigation | N/A | from_page, to_page | User journey |
| `engagement_time` | engagement | N/A | page, time_seconds | Time on page |

---

## 🚀 Best Practices

1. **Check Analytics Weekly**: Monitor trends and patterns
2. **Create Custom Reports**: Build dashboards for key metrics
3. **Set Up Alerts**: Get notified of unusual activity
4. **Archive Old Data**: Keep analytics focused on recent trends
5. **Cross-Reference Events**: Combine multiple events to understand user journey
6. **A/B Test**: Test CTA button text and placement using event data
7. **Content Calendar**: Track blog performance to inform publishing schedule

---

## ⚠️ Privacy & Compliance

- Email domains are tracked (not full emails)
- No personally identifiable information (PII) is captured
- Complies with GDPR, CCPA data minimization requirements
- User privacy-first approach throughout

---

## 📞 Support & Questions

For questions about:
- **Event Tracking**: Check src/utils/analytics.js
- **Blog Features**: Check docs/BLOG_FEATURES.md
- **Google Analytics Setup**: See GA4 documentation

**Last Updated**: August 31, 2026  
**Next Review**: September 30, 2026
