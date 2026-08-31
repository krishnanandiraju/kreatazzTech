/**
 * Blog utility functions for reading time calculation, SEO, and metadata
 */

/**
 * Calculate reading time based on word count
 * Assumes average reading speed of 200 words per minute
 * @param {string | string[]} content - Single string or array of paragraphs
 * @returns {number} Estimated reading time in minutes
 */
export const calculateReadingTime = (content) => {
  const text = Array.isArray(content) ? content.join(' ') : content
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)
  return Math.max(1, readingTime) // Minimum 1 minute
}

/**
 * Generate excerpt from content
 * @param {string | string[]} content - Single string or array of paragraphs
 * @param {number} characterLimit - Maximum characters in excerpt
 * @returns {string} Trimmed excerpt with ellipsis
 */
export const generateExcerpt = (content, characterLimit = 160) => {
  const text = Array.isArray(content) ? content[0] : content
  if (text.length <= characterLimit) return text
  return text.substring(0, characterLimit).trim() + '...'
}

/**
 * Format blog post date for display
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date (e.g., "February 5, 2025")
 */
export const formatBlogDate = (dateString) => {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Generate canonical URL for blog post
 * @param {string} slug - Blog post slug
 * @returns {string} Full canonical URL
 */
export const getBlogPostUrl = (slug) => {
  const baseUrl = window.location.origin
  return `${baseUrl}/blog/${slug}/`
}

/**
 * Generate SEO metadata for blog post
 * @param {object} post - Blog post object with title, excerpt, featuredImage, slug
 * @returns {object} Metadata object for SEO
 */
export const getBlogPostMetadata = (post) => {
  return {
    title: `${post.title} | Kreatazz Blog`,
    description: post.excerpt,
    image: post.featuredImage,
    url: getBlogPostUrl(post.slug),
    author: post.author,
    date: post.date,
    category: post.category,
  }
}

/**
 * Filter posts by category
 * @param {array} posts - Array of blog posts
 * @param {string} category - Category to filter by
 * @returns {array} Filtered posts
 */
export const filterPostsByCategory = (posts, category) => {
  return posts.filter(post => post.category === category)
}

/**
 * Filter posts by tag
 * @param {array} posts - Array of blog posts
 * @param {string} tag - Tag to filter by
 * @returns {array} Filtered posts
 */
export const filterPostsByTag = (posts, tag) => {
  return posts.filter(post => post.tags && post.tags.includes(tag))
}

/**
 * Sort posts by date (newest first)
 * @param {array} posts - Array of blog posts
 * @returns {array} Sorted posts
 */
export const sortPostsByDate = (posts) => {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * Get featured posts (for homepage, etc.)
 * @param {array} posts - Array of blog posts
 * @param {number} limit - Number of featured posts to return
 * @returns {array} Featured posts sorted by date
 */
export const getFeaturedPosts = (posts, limit = 3) => {
  return sortPostsByDate(posts).slice(0, limit)
}
