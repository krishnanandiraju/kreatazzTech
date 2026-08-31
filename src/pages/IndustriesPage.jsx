import Breadcrumbs from '../components/Breadcrumbs'
import { navigateTo } from '../utils/navigation'

function IndustriesPage({ items, breadcrumbs }) {
  return (
    <main className="section content-page" id="industries-page">
      <div className="shell">
        <Breadcrumbs items={breadcrumbs} />

        <div className="content-page-head">
          <p className="kicker">Industries</p>
          <h1>Industry Solutions</h1>
          <p>
            Explore how Kreatazz applies operational intelligence across different sectors.
            Start with your industry, then go deeper into capabilities and execution models.
          </p>
        </div>

        <div className="industry-landing-grid">
          {items.map((item) => (
            <article key={item.title} className="industry-landing-card">
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
                Open Industry Page
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default IndustriesPage
