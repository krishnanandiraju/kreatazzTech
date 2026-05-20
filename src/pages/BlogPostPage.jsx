function BlogPostPage({ post }) {
  if (!post) {
    return (
      <main className="section content-page">
        <div className="shell content-page-empty">
          <h1>Post not found</h1>
          <p>The requested article is not available in this static build.</p>
          <a className="btn btn-secondary" href="/blog/">
            Back to Blog
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="section content-page" id="blog-post">
      <div className="shell content-page-narrow">
        <a className="content-link back-link" href="/blog/">
          Back to Blog
        </a>
        <article className="blog-post">
          <p className="blog-date">{post.date}</p>
          <h1>{post.title}</h1>
          <figure className="post-hero" aria-hidden="true">
            <img src={post.featuredImage} alt="" loading="lazy" />
            <span className="media-overlay" />
          </figure>
          {post.content.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}
        </article>
      </div>
    </main>
  )
}

export default BlogPostPage
