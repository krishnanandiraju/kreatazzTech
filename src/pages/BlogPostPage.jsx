import { useEffect } from 'react'
import { trackBlogInteraction } from '../utils/analytics'
import { formatBlogDate } from '../utils/blog'
import RelatedPosts from '../components/RelatedPosts'
import Newsletter from '../components/Newsletter'
import { getRelatedPosts } from '../data/blogPosts'

function BlogPostPage({ post }) {
  useEffect(() => {
    if (post) {
      trackBlogInteraction(post.title, post.slug, 'view')
    }
  }, [post])

  const handleBackClick = (event) => {
    event.preventDefault()
    trackBlogInteraction('back_to_list', 'blog_list', 'click')
    window.history.pushState({}, '', '/blog/')
    window.dispatchEvent(new Event('locationchange'))
  }

  const handleTagClick = (event, tag) => {
    event.preventDefault()
    const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
    trackBlogInteraction(`Filter: ${tag}`, tagSlug, 'tag_click')
    window.history.pushState({}, '', `/blog/?tag=${encodeURIComponent(tagSlug)}`)
    window.dispatchEvent(new Event('locationchange'))
  }

  if (!post) {
    return (
      <main className="section content-page">
        <div className="shell content-page-empty">
          <h1>Post not found</h1>
          <p>The requested article is not available in this static build.</p>
          <a className="btn btn-secondary" href="/blog/" onClick={handleBackClick}>
            Back to Blog
          </a>
        </div>
      </main>
    )
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  return (
    <main className="section content-page" id="blog-post">
      <div className="shell content-page-narrow">
        <a className="content-link back-link" href="/blog/" onClick={handleBackClick}>
          ← Back to Blog
        </a>
        <article className="blog-post">
          <div className="blog-post-header">
            <span className="blog-category" aria-label={`Category: ${post.category}`}>
              {post.category}
            </span>
            <p className="blog-date">
              <time dateTime={post.date}>
                {formatBlogDate(post.date)}
              </time>
              {post.readingTime && (
                <>
                  <span className="reading-time-separator">•</span>
                  <span className="reading-time">{post.readingTime} min read</span>
                </>
              )}
            </p>
            {post.author && (
              <p className="blog-author">By {post.author}</p>
            )}
          </div>

          <h1>{post.title}</h1>

          <figure className="post-hero" aria-hidden="true">
            <img src={post.featuredImage} alt="" loading="lazy" />
            <span className="media-overlay" />
          </figure>

          {post.content.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}

          {post.tags && post.tags.length > 0 && (
            <div className="blog-tags">
              <span className="tags-label">Tags:</span>
              {post.tags.map((tag) => (
                <a key={tag} href={`/blog/?tag=${tag}`} className="blog-tag" onClick={(e) => handleTagClick(e, tag)}>
                  #{tag.replace('-', ' ')}
                </a>
              ))}
            </div>
          )}
        </article>
      </div>

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
      
      <Newsletter />
    </main>
  )
}

export default BlogPostPage
