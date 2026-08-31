import { useEffect, useMemo, useState } from 'react'
import { trackBlogInteraction, trackBlogSearch, trackBlogFilter } from '../utils/analytics'
import { formatBlogDate } from '../utils/blog'
import Newsletter from '../components/Newsletter'
import { blogCategories } from '../data/blogPosts'
import { navigateTo } from '../utils/navigation'

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function BlogListPage({ posts }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedTagSlug, setSelectedTagSlug] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const syncStateFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      const tag = params.get('tag')
      setSelectedTagSlug(tag ? tag.toLowerCase() : null)
    }

    syncStateFromUrl()
    window.addEventListener('popstate', syncStateFromUrl)
    window.addEventListener('locationchange', syncStateFromUrl)

    return () => {
      window.removeEventListener('popstate', syncStateFromUrl)
      window.removeEventListener('locationchange', syncStateFromUrl)
    }
  }, [])

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory
      const matchesTag =
        !selectedTagSlug ||
        (post.tags && post.tags.some((tag) => slugify(tag) === selectedTagSlug))
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      return matchesCategory && matchesTag && matchesSearch
    })
  }, [posts, searchQuery, selectedCategory, selectedTagSlug])

  const handleBlogPostClick = (event, postTitle, postSlug) => {
    event.preventDefault()
    trackBlogInteraction(postTitle, postSlug, 'click_from_list')
    navigateTo(`/blog/${postSlug}/`)
  }

  const handleCategoryFilter = (category) => {
    const newCategory = selectedCategory === category ? null : category
    setSelectedCategory(newCategory)
    setSelectedTagSlug(null)
    navigateTo('/blog/')
    
    // Track filter
    if (newCategory) {
      const categoryPosts = posts.filter(p => p.category === newCategory)
      trackBlogFilter(category, categoryPosts.length)
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Track search
    if (query) {
      const searchResults = posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
      )
      trackBlogSearch(query, searchResults.length)
    }
  }

  return (
    <main className="section content-page" id="blog-list">
      <div className="shell">
        <div className="content-page-head">
          <p className="kicker">Blog</p>
          <h1>Insights from Kreatazz</h1>
          <p>Operational intelligence, AI implementation, cloud architecture, and enterprise technology insights.</p>
        </div>

        <div className="blog-controls">
          <div className="blog-search">
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search blog posts"
            />
          </div>

          {blogCategories.length > 0 && (
            <div className="blog-filters">
              <span className="filter-label">Filter by:</span>
              <div className="category-buttons">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter(category)}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedTagSlug ? (
          <div className="blog-active-tag">
            <p>Filtering by tag: #{selectedTagSlug.replace(/-/g, ' ')}</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSelectedTagSlug(null)
                navigateTo('/blog/')
              }}
            >
              Clear Tag
            </button>
          </div>
        ) : null}

        {filteredPosts.length === 0 ? (
          <div className="blog-empty">
            <p>No articles found matching your search or filter.</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedTagSlug(null)
                navigateTo('/blog/')
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <a
                  href={`/blog/${post.slug}/`}
                  className="blog-card-link"
                  onClick={(event) => handleBlogPostClick(event, post.title, post.slug)}
                >
                  <figure className="blog-visual" aria-hidden="true">
                    <img src={post.featuredImage} alt="" loading="lazy" />
                    <span className="media-overlay" />
                  </figure>

                  <div className="blog-card-content">
                    <span className="blog-category-badge">{post.category}</span>
                    <p className="blog-date">
                      <time dateTime={post.date}>
                        {formatBlogDate(post.date)}
                      </time>
                      {post.readingTime && (
                        <>
                          <span className="separator">•</span>
                          <span className="reading-time">{post.readingTime} min read</span>
                        </>
                      )}
                    </p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags-preview">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="tag-chip">{tag}</span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="tag-chip more">+{post.tags.length - 2}</span>
                        )}
                      </div>
                    )}

                    {post.author && (
                      <p className="blog-author-preview">By {post.author}</p>
                    )}
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}

        <p className="blog-count">
          Showing {filteredPosts.length} of {posts.length} articles
        </p>
      </div>

      <Newsletter />
    </main>
  )
}

export default BlogListPage
