import CTASection from '../components/CTASection'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

function Home({ content, blogPosts }) {
    const handleBlogPostClick = (event, postSlug) => {
      event.preventDefault()
      window.history.pushState({}, '', `/blog/${postSlug}/`)
      window.dispatchEvent(new Event('locationchange'))
    }

    const handleInternalPageClick = (event, href) => {
      if (!href?.startsWith('/')) {
        return
      }

      event.preventDefault()
      window.history.pushState({}, '', href)
      window.dispatchEvent(new Event('locationchange'))
    }

  return (
    <main id="home">
      <Hero content={content.hero} />

      <section id="deployment-layer" className="section deployment-layer" aria-labelledby="deployment-layer-title">
        <div className="shell deployment-layout">
          <div>
            <SectionTitle
              kicker={content.deploymentLayer.kicker}
              title={content.deploymentLayer.title}
              intro={content.deploymentLayer.intro}
            />
            <div className="layer-list" aria-label="Deployment layer model">
              {content.deploymentLayer.layers.map((layer) => (
                <article key={layer.name} className="layer-item">
                  <h3>{layer.name}</h3>
                  <p>{layer.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <figure className="framework-visual deployment-visual">
            <img src={content.deploymentLayer.visual} alt="Frontier AI to Kreatazz to Enterprise Execution" />
          </figure>
        </div>
      </section>

      <section className="section belief" aria-labelledby="belief-title">
        <div className="shell statement-card">
          <div>
            <SectionTitle
              kicker={content.belief.kicker}
              title={content.belief.title}
              intro={content.belief.intro}
            />
          </div>
          <blockquote>{content.belief.quote}</blockquote>
        </div>
      </section>

      <section id="operating-model" className="section operating-model" aria-labelledby="operating-model-title">
        <div className="shell">
          <SectionTitle
            kicker={content.operatingModel.kicker}
            title={content.operatingModel.title}
            intro={content.operatingModel.intro}
          />

          <div className="model-grid">
            {content.operatingModel.steps.map((step, index) => (
              <article key={step.title} className="model-card">
                <span className="model-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.subtitle}</p>
                <ul>
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcomes" aria-labelledby="outcomes-title">
        <div className="shell">
          <SectionTitle
            kicker={content.outcomes.kicker}
            title={content.outcomes.title}
            intro={content.outcomes.intro}
          />
          <div className="outcome-grid">
            {content.outcomes.items.map((item) => (
              <article key={item.title} className="outcome-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="operational-intelligence" className="section maturity" aria-labelledby="maturity-title">
        <div className="shell">
          <SectionTitle
            kicker={content.maturity.kicker}
            title={content.maturity.title}
            intro={content.maturity.subtitle}
          />
          <p className="maturity-intro">{content.maturity.intro}</p>
          <div className="maturity-grid">
            {content.maturity.levels.map((level, index) => (
              <article key={level.title} className="maturity-card">
                <span className="model-number">0{index + 1}</span>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
                {index < content.maturity.levels.length - 1 ? <span className="maturity-arrow">↓</span> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stack" aria-labelledby="stack-title">
        <div className="shell">
          <SectionTitle
            kicker={content.intelligenceStack.kicker}
            title={content.intelligenceStack.title}
            intro={content.intelligenceStack.intro}
          />
          <div className="stack-chain" role="list" aria-label="Enterprise intelligence stack">
            {content.intelligenceStack.layers.map((layer, index) => (
              <div key={layer} className="stack-item" role="listitem">
                <strong>{layer}</strong>
                {index < content.intelligenceStack.layers.length - 1 ? <span aria-hidden="true">↓</span> : null}
              </div>
            ))}
          </div>
          <p className="stack-note">{content.intelligenceStack.spanLine}</p>
        </div>
      </section>

      <section id="industries" className="section solutions" aria-labelledby="industries-title">
        <div className="shell">
          <SectionTitle
            kicker={content.industries.kicker}
            title={content.industries.title}
            intro={content.industries.intro}
          />
          <div className="solutions-grid industry-grid">
            {content.industries.items.map((item) => (
              <article key={item.title} className="solution-card industry-card">
                <h3>
                  <a className="content-link" href={item.href} onClick={(event) => handleInternalPageClick(event, item.href)}>
                    {item.title}
                  </a>
                </h3>
                <p>{item.description}</p>
                <a className="content-link solution-read-more" href={item.href} onClick={(event) => handleInternalPageClick(event, item.href)}>
                  Learn more
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
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

      <section id="about" className="section why" aria-labelledby="why-title">
        <div className="shell why-layout">
          <SectionTitle
            kicker={content.whyKreatazz.kicker}
            title={content.whyKreatazz.title}
            intro={content.whyKreatazz.intro}
          />
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
                  <a className="content-link" href={`/blog/${post.slug}/`} onClick={(e) => handleBlogPostClick(e, post.slug)}>
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
