/**
 * Analytics utility for tracking user interactions with Google Analytics
 * All events are sent to Google Analytics (G-1JTM83BSDR)
 */

/**
 * Track CTA button clicks
 * @param {string} buttonLabel - The text label of the button
 * @param {string} location - Where on the page the button is located (e.g., "hero", "footer", "service-card")
 * @param {string} href - The destination URL (optional)
 */
export const trackCTAClick = (buttonLabel, location, href) => {
  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: buttonLabel,
      location: location,
      destination: href || 'internal',
    })
  }
}

/**
 * Track service card interactions
 * @param {string} serviceTitle - The title of the service
 * @param {string} actionType - Type of interaction (e.g., "view", "click")
 */
export const trackServiceInteraction = (serviceTitle, actionType = 'click') => {
  if (window.gtag) {
    window.gtag('event', 'service_interaction', {
      event_category: 'services',
      event_label: serviceTitle,
      action: actionType,
    })
  }
}

/**
 * Track blog post engagement
 * @param {string} postTitle - The title of the blog post
 * @param {string} postSlug - The URL slug of the post
 * @param {string} actionType - Type of interaction (e.g., "view", "click", "scroll")
 */
export const trackBlogInteraction = (postTitle, postSlug, actionType = 'click') => {
  if (window.gtag) {
    window.gtag('event', 'blog_interaction', {
      event_category: 'blog',
      event_label: postTitle,
      post_slug: postSlug,
      action: actionType,
    })
  }
}

/**
 * Track external link clicks
 * @param {string} linkText - The text of the link
 * @param {string} url - The destination URL
 * @param {string} linkType - Type of link (e.g., "product", "social", "resource")
 */
export const trackExternalLinkClick = (linkText, url, linkType = 'external') => {
  if (window.gtag) {
    window.gtag('event', 'external_link_click', {
      event_category: 'engagement',
      event_label: linkText,
      url: url,
      link_type: linkType,
    })
  }
}

/**
 * Track form submissions (email contact, newsletter, etc.)
 * @param {string} formType - Type of form (e.g., "contact_email", "newsletter_signup")
 * @param {string} email - The email address (optional, can be hashed for privacy)
 */
export const trackFormSubmission = (formType, email = null) => {
  if (window.gtag) {
    window.gtag('event', 'form_submission', {
      event_category: 'engagement',
      event_label: formType,
      email_domain: email ? email.split('@')[1] : 'unknown',
    })
  }
}

/**
 * Track page scroll depth
 * @param {number} scrollPercentage - The percentage of page scrolled (0-100)
 */
export const trackScrollDepth = (scrollPercentage) => {
  if (window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      scroll_depth: Math.round(scrollPercentage),
    })
  }
}

/**
 * Track navigation between pages
 * @param {string} fromPage - The page the user came from
 * @param {string} toPage - The page the user is going to
 */
export const trackNavigation = (fromPage, toPage) => {
  if (window.gtag) {
    window.gtag('event', 'page_navigation', {
      event_category: 'navigation',
      from_page: fromPage,
      to_page: toPage,
    })
  }
}

/**
 * Track blog search queries
 * @param {string} searchQuery - The search query entered
 * @param {number} resultCount - Number of results found
 */
export const trackBlogSearch = (searchQuery, resultCount) => {
  if (window.gtag) {
    window.gtag('event', 'blog_search', {
      event_category: 'blog',
      event_label: searchQuery,
      results: resultCount,
    })
  }
}

/**
 * Track blog category/filter selection
 * @param {string} category - The category selected
 * @param {number} resultCount - Number of posts in selected category
 */
export const trackBlogFilter = (category, resultCount) => {
  if (window.gtag) {
    window.gtag('event', 'blog_filter', {
      event_category: 'blog',
      event_label: category,
      results: resultCount,
    })
  }
}

/**
 * Track newsletter signup
 * @param {string} source - Where the signup occurred (e.g., "blog_post", "blog_list", "footer")
 */
export const trackNewsletterSignup = (source = 'unknown') => {
  if (window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'engagement',
      source: source,
    })
  }
}

/**
 * Track video engagement (if applicable in future)
 * @param {string} videoTitle - Title of video
 * @param {string} action - Action (play, pause, complete, etc.)
 * @param {number} currentTime - Current video time in seconds
 */
export const trackVideoEngagement = (videoTitle, action, currentTime = 0) => {
  if (window.gtag) {
    window.gtag('event', 'video_engagement', {
      event_category: 'media',
      event_label: videoTitle,
      action: action,
      video_time: currentTime,
    })
  }
}

/**
 * Track time on page for engagement analysis
 * @param {string} pagePath - The page path
 * @param {number} timeSpent - Time spent on page in seconds
 */
export const trackTimeOnPage = (pagePath, timeSpent) => {
  if (window.gtag && timeSpent > 10) { // Only track if spent more than 10 seconds
    window.gtag('event', 'engagement_time', {
      event_category: 'engagement',
      page: pagePath,
      time_seconds: Math.round(timeSpent),
    })
  }
}
