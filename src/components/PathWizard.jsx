import { useMemo, useState } from 'react'
import { navigateTo } from '../utils/navigation'
import { trackSolutionNavigatorCTA, trackSolutionNavigatorSelection } from '../utils/analytics'

const outcomes = [
  { id: 'decisions', label: 'Make better decisions', description: 'Connect data, knowledge, and AI at the point of action.' },
  { id: 'workflows', label: 'Modernize workflows', description: 'Remove handoff gaps and make execution more reliable.' },
  { id: 'products', label: 'Build a digital product', description: 'Move an application or platform from idea to production.' },
  { id: 'workforce', label: 'Strengthen workforce execution', description: 'Improve skills visibility, planning, and people operations.' },
  { id: 'reliability', label: 'Improve cloud reliability', description: 'Modernize infrastructure, delivery, and observability.' },
  { id: 'experience', label: 'Transform customer experience', description: 'Create clearer, more personalized digital journeys.' },
]

const environments = [
  { id: 'enterprise', label: 'Enterprise functions' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'workforce', label: 'Workforce & HR' },
  { id: 'real-estate', label: 'Real estate' },
]

const stages = [
  { id: 'explore', label: 'Exploring' },
  { id: 'pilot', label: 'Pilot in 30–60 days' },
  { id: 'scale', label: 'Ready to scale' },
]

const outcomeCapabilities = {
  decisions: { label: 'AI & Data Platforms', href: '/ai-ml-solutions/' },
  workflows: { label: 'Workflow Modernization', href: '/enterprise-workflow-modernization/' },
  products: { label: 'Product Engineering', href: '/mobile-and-web-application-development/' },
  workforce: { label: 'Workforce Intelligence', href: '/workforce-intelligence/' },
  reliability: { label: 'Cloud, DevOps & Automation', href: '/cloud-migration/' },
  experience: { label: 'Product Engineering', href: '/mobile-and-web-application-development/' },
}

const environmentSolutions = {
  manufacturing: { label: 'Manufacturing Intelligence', href: '/manufacturing-intelligence/' },
  engineering: { label: 'Engineering Intelligence', href: '/engineering-intelligence/' },
  healthcare: { label: 'Healthcare & Care Operations', href: '/healthcare-care-operations/' },
  workforce: { label: 'Workforce Intelligence', href: '/workforce-intelligence/', product: 'PeopleOS HRMS' },
  'real-estate': { label: 'Real Estate Buyer Experience', href: '/real-estate-buyer-experience/' },
  enterprise: { label: 'Enterprise Function Intelligence', href: '/enterprise-function-intelligence/' },
}

const stageGuidance = {
  explore: 'Start with an operational-intelligence discovery and identify the highest-value opportunity.',
  pilot: 'Select one measurable use case, define a 30–60 day pilot, and establish adoption and outcome signals.',
  scale: 'Create a reusable architecture, governance model, and rollout plan across teams and workflows.',
}

function PathWizard() {
  const [selectedOutcome, setSelectedOutcome] = useState('decisions')
  const [selectedEnvironment, setSelectedEnvironment] = useState('enterprise')
  const [selectedStage, setSelectedStage] = useState('explore')

  const recommendation = useMemo(() => {
    const capability = outcomeCapabilities[selectedOutcome]
    const solution = environmentSolutions[selectedEnvironment]
    const primary = selectedEnvironment === 'enterprise' ? capability : solution
    const supporting = primary.href === capability.href ? environmentSolutions.enterprise : capability

    return {
      primary,
      supporting,
      product: solution.product,
      guidance: stageGuidance[selectedStage],
    }
  }, [selectedEnvironment, selectedOutcome, selectedStage])

  const navigate = (event, href) => {
    event.preventDefault()
    navigateTo(href)
  }

  const selectOutcome = (outcome) => {
    setSelectedOutcome(outcome)
    trackSolutionNavigatorSelection('outcome', outcome)
  }

  const selectEnvironment = (environment) => {
    setSelectedEnvironment(environment)
    trackSolutionNavigatorSelection('environment', environment)
  }

  const selectStage = (stage) => {
    setSelectedStage(stage)
    trackSolutionNavigatorSelection('stage', stage)
  }

  const followRecommendation = (event, action, href) => {
    trackSolutionNavigatorCTA({
      action,
      outcome: selectedOutcome,
      environment: selectedEnvironment,
      stage: selectedStage,
      solution: recommendation.primary.label,
      destination: href,
    })
    navigate(event, href)
  }

  return (
    <section className="section start-path" aria-labelledby="solution-navigator-title">
      <div className="shell">
        <div className="start-path-head">
          <p className="kicker">Kreatazz Solution Navigator</p>
          <h2 id="solution-navigator-title">Find the right solution path for your operating challenge</h2>
          <p>Choose the outcome you need and where it matters. We will connect you to the most relevant Kreatazz solution and capability.</p>
        </div>

        <div className="wizard-grid">
          <fieldset className="wizard-step">
            <legend>What do you want to improve?</legend>
            <div className="wizard-options">
              {outcomes.map((outcome) => (
                <button key={outcome.id} type="button" className={`wizard-option ${selectedOutcome === outcome.id ? 'active' : ''}`} onClick={() => selectOutcome(outcome.id)} aria-pressed={selectedOutcome === outcome.id}>
                  <strong>{outcome.label}</strong>
                  <span>{outcome.description}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="wizard-step">
            <legend>Where will it create value?</legend>
            <div className="wizard-options compact wizard-context-options">
              {environments.map((environment) => (
                <button key={environment.id} type="button" className={`wizard-option ${selectedEnvironment === environment.id ? 'active' : ''}`} onClick={() => selectEnvironment(environment.id)} aria-pressed={selectedEnvironment === environment.id}>
                  <strong>{environment.label}</strong>
                </button>
              ))}
            </div>
            <p className="wizard-prompt">Where are you in the journey?</p>
            <div className="wizard-stage-options" aria-label="Delivery stage">
              {stages.map((stage) => (
                <button key={stage.id} type="button" className={selectedStage === stage.id ? 'active' : ''} onClick={() => selectStage(stage.id)} aria-pressed={selectedStage === stage.id}>
                  {stage.label}
                </button>
              ))}
            </div>
          </fieldset>

          <aside className="wizard-result" aria-live="polite">
            <p className="wizard-result-eyebrow">Your Kreatazz solution path</p>
            <h3>{recommendation.primary.label}</h3>
            <p>{recommendation.guidance}</p>
            <div className="wizard-bundle">
              <span>Supporting capability</span>
              <a href={recommendation.supporting.href} onClick={(event) => followRecommendation(event, 'supporting_capability', recommendation.supporting.href)}>
                {recommendation.supporting.label}
              </a>
              {recommendation.product && (
                <>
                  <span>Relevant Kreatazz product</span>
                  <strong>{recommendation.product}</strong>
                </>
              )}
            </div>
            <a className="btn btn-primary" href={recommendation.primary.href} onClick={(event) => followRecommendation(event, 'explore_solution', recommendation.primary.href)}>
              Explore {recommendation.primary.label}
            </a>
            <a className="btn btn-secondary" href="/#contact-us" onClick={(event) => followRecommendation(event, 'discuss_use_case', '/#contact-us')}>
              Discuss your use case
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default PathWizard
