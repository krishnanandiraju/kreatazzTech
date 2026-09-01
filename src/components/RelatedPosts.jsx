import { trackBlogInteraction } from '../utils/analytics'
import { formatBlogDate } from '../utils/blog'
import { navigateTo } from '../utils/navigation'

function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) {
    return null
  }

  const handleRelatedPostClick = (event, postTitle, postSlug) => {
    event.preventDefault()
    trackBlogInteraction(postTitle, postSlug, 'click_related')
    navigateTo(`/blog/${postSlug}/`)
  }

  return (
    <section className="related-posts" aria-labelledby="related-posts-title">
      <div className="shell">
        <h2 id="related-posts-title">Related Articles</h2>
        <div className="related-posts-grid">
          {posts.map((post) => (
            <article key={post.slug} className="related-post-card">
              <a 
                href={`/blog/${post.slug}/`}
                className="related-post-link"
                 onClick={(e) => handleRelatedPostClick(e, post.title, post.slug)}
              >
                <figure className="related-post-visual" aria-hidden="true">
                  <img src={post.featuredImage} alt="" loading="lazy" />
                  <span className="media-overlay" />
                </figure>
                <div className="related-post-content">
                  <span className="related-post-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <div className="related-post-meta">
                    <time dateTime={post.date}>
                      {formatBlogDate(post.date)}
                    </time>
                    <span className="reading-time">{post.readingTime} min read</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedPosts
