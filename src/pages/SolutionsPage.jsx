import Breadcrumbs from '../components/Breadcrumbs'
import { navigateTo } from '../utils/navigation'

function SolutionsPage({ items, breadcrumbs }) {
  return (
    <main className="section content-page" id="solutions-page">
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />

        <div className="content-page-head">
          <p className="kicker">Solutions</p>
          <h1>Capabilities and Solution Tracks</h1>
          <p>
            Explore the core delivery capabilities behind Kreatazz engagements.
            Choose a solution area to see practical scope, workflows, and business outcomes.
          </p>
        </div>

        <div className="solution-landing-grid">
          {items.map((item) => (
            <article key={item.title} className="solution-landing-card">
              <figure className="solution-landing-visual" aria-hidden="true">
                <img src={item.image} alt="" loading="lazy" />
                <span className="media-overlay" />
              </figure>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <a
                className="btn btn-secondary"
                href={item.href}
                onClick={(event) => {
                  event.preventDefault()
                  navigateTo(item.href)
                }}
              >
                Open Solution Page
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default SolutionsPage
