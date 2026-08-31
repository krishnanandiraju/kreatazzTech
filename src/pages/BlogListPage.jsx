import { trackBlogInteraction } from '../utils/analytics'

function BlogListPage({ posts }) {
  const handleBlogPostClick = (postTitle, postSlug) => {
    trackBlogInteraction(postTitle, postSlug, 'click_from_list')
  }

  return (
    <main className="section content-page" id="blog-list">
      <div className="shell">
        <div className="content-page-head">
          <p className="kicker">Blog</p>
          <h1>Insights from Kreatazz</h1>
          <p>Published posts migrated from the previous site and preserved under the original slug paths.</p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <figure className="blog-visual" aria-hidden="true">
                <img src={post.featuredImage} alt="" loading="lazy" />
                <span className="media-overlay" />
              </figure>
              <p className="blog-date">{post.date}</p>
              <h3>
                <a className="content-link" href={`/blog/${post.slug}/`} onClick={() => handleBlogPostClick(post.title, post.slug)}>
                  {post.title}
                </a>
              </h3>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default BlogListPage
