function LegacyPage({ page }) {
  if (!page) {
    return (
      <main className="section content-page">
        <div className="shell content-page-empty">
          <h1>Page not found</h1>
          <p>The requested legacy page is not available in this static build.</p>
          <a className="btn btn-secondary" href="/">
            Back Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="section content-page" id={`legacy-${page.slug}`}>
      <div className="shell content-page-narrow">
        <a className="content-link back-link" href="/">
          Back Home
        </a>
        <article className="legacy-page">
          <h1>{page.title}</h1>
          <p className="legacy-intro">{page.intro}</p>

          {page.sections.map((section) => (
            <section key={section.heading} className="legacy-section">
              <h2>{section.heading}</h2>
              {section.body
                ? section.body.map((line) => <p key={line}>{line}</p>)
                : null}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>
      </div>
    </main>
  )
}

export default LegacyPage
