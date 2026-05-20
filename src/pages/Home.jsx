import CTASection from '../components/CTASection'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

function Home({ content, blogPosts }) {
  return (
    <main id="home">
      <Hero content={content.hero} />

      <section id="about-us" className="section about" aria-labelledby="about-title">
        <div className="shell">
          <div className="about-layout">
            <SectionTitle
              kicker={content.about.kicker}
              title={content.about.title}
              intro={content.about.intro}
            />
            <figure className="about-visual" aria-hidden="true">
              <img src={content.about.image} alt="" loading="lazy" />
              <span className="media-overlay" />
            </figure>
          </div>
        </div>
      </section>

      <section id="services" className="section capabilities" aria-labelledby="services-title">
        <div className="shell">
          <SectionTitle
            kicker={content.services.kicker}
            title={content.services.title}
            intro={content.services.intro}
          />

          <div className="services-grid">
            {content.services.items.map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
                image={item.image}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="section solutions" aria-labelledby="solutions-title">
        <div className="shell">
          <SectionTitle
            kicker={content.solutions.kicker}
            title={content.solutions.title}
            intro={content.solutions.intro}
          />
          <div className="solutions-grid">
            {content.solutions.items.map((item) => (
              <article key={item.title} className="solution-card">
                <h3>
                  <a className="content-link" href={item.href || '/solutions/'}>
                    {item.title}
                  </a>
                </h3>
                <p>{item.description}</p>
                <a className="content-link solution-read-more" href={item.href || '/solutions/'}>
                  Learn more
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="section signature" aria-label="Products">
        <div className="shell">
          <SectionTitle
            kicker={content.products.kicker}
            title={content.products.title}
            intro={content.products.intro}
          />
          <div className="products-grid">
            {content.products.items.map((product) => (
              <article key={product.name} className="product-card">
                <figure className="product-visual" aria-hidden="true">
                  <img
                    className={product.visualMode === 'contain' ? 'fit-contain' : 'fit-cover'}
                    src={product.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className="media-overlay" />
                </figure>
                <div className="product-head">
                  <p className="signature-name">{product.name}</p>
                  <span className={`product-status ${product.status === 'Live' ? 'status-live' : ''}`}>
                    {product.status}
                  </span>
                </div>
                <p className="product-tagline">{product.tagline}</p>
                <p>{product.description}</p>
                {product.note ? <p className="signature-note">{product.note}</p> : null}
                {product.ctaHref ? (
                  <a className="btn btn-secondary product-cta" href={product.ctaHref} target="_blank" rel="noreferrer">
                    {product.ctaLabel}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-work" className="section process" aria-labelledby="process-title">
        <div className="shell">
          <SectionTitle
            kicker={content.howWeWork.kicker}
            title={content.howWeWork.title}
            intro={content.howWeWork.intro}
          />

          <ol className="process-list">
            {content.howWeWork.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="why-kreatazz" className="section why" aria-labelledby="why-title">
        <div className="shell">
          <SectionTitle title={content.whyKreatazz.title} />
          <ul className="why-list">
            {content.whyKreatazz.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="blog" className="section blog" aria-labelledby="blog-title">
        <div className="shell">
          <SectionTitle
            kicker={content.blog.kicker}
            title={content.blog.title}
            intro={content.blog.intro}
          />
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <figure className="blog-visual" aria-hidden="true">
                  <img src={post.featuredImage} alt="" loading="lazy" />
                  <span className="media-overlay" />
                </figure>
                <h3>
                  <a className="content-link" href={`/blog/${post.slug}/`}>
                    {post.title}
                  </a>
                </h3>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        id="contact-us"
        title={content.contact.title}
        text={content.contact.text}
        ctaLabel={content.contact.ctaLabel}
        secondaryCtaLabel={content.contact.secondaryCtaLabel}
        secondaryCtaHref={content.contact.secondaryCtaHref}
        email={content.email}
        phone={content.phone}
        location={content.location}
      />
    </main>
  )
}

export default Home
