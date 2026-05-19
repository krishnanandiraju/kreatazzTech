import CTASection from '../components/CTASection'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'

function Home({ content }) {
  return (
    <main>
      <Hero content={content.hero} />

      <section id="capabilities" className="section capabilities" aria-labelledby="capabilities-title">
        <div className="shell">
          <SectionTitle
            kicker={content.capabilities.kicker}
            title={content.capabilities.title}
            intro={content.capabilities.intro}
          />

          <div className="services-grid">
            {content.capabilities.items.map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="signature-work" className="section signature" aria-labelledby="signature-title">
        <div className="shell">
          <SectionTitle
            kicker={content.signatureWork.kicker}
            title={content.signatureWork.title}
          />
          <article className="signature-card">
            <p className="signature-name">{content.signatureWork.projectName}</p>
            <p>{content.signatureWork.description}</p>
          </article>
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

      <CTASection
        id="contact"
        title={content.contact.title}
        text={content.contact.text}
        ctaLabel={content.contact.ctaLabel}
        email={content.email}
      />
    </main>
  )
}

export default Home
