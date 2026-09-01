import { useMemo, useState } from 'react'
import { navigateTo } from '../utils/navigation'

const paths = [
  {
    id: 'delivery-speed',
    label: 'Improve delivery speed',
    description: 'For teams blocked by release delays, handoff gaps, and execution drag.',
    destination: '/enterprise-workflow-modernization/',
    pageLabel: 'Workflow Modernization',
  },
  {
    id: 'decision-clarity',
    label: 'Improve decision clarity',
    description: 'For teams with fragmented data, unclear ownership, and reactive reporting.',
    destination: '/ai-ml-solutions/',
    pageLabel: 'AI & Data Platforms',
  },
  {
    id: 'industry-use-case',
    label: 'Explore industry use cases',
    description: 'For leaders choosing where to start by industry priorities.',
    destination: '/industries/',
    pageLabel: 'Industry Solutions',
  },
]

const timelines = [
  { id: 'now', label: 'Need impact in 30-60 days' },
  { id: 'quarter', label: 'Planning over next quarter' },
  { id: 'annual', label: 'Designing a yearly roadmap' },
]

function PathWizard() {
  const [selectedPath, setSelectedPath] = useState(paths[0].id)
  const [selectedTimeline, setSelectedTimeline] = useState(timelines[0].id)

  const recommendation = useMemo(() => {
    const chosenPath = paths.find((path) => path.id === selectedPath) || paths[0]
    const chosenTimeline = timelines.find((timeline) => timeline.id === selectedTimeline) || timelines[0]

    const timelineNoteById = {
      now: 'Start with one high-friction workflow and track quick operational wins.',
      quarter: 'Define scope by business impact and build delivery milestones with owners.',
      annual: 'Create a portfolio roadmap with platform, workflow, and adoption tracks.',
    }

    return {
      ...chosenPath,
      timelineLabel: chosenTimeline.label,
      note: timelineNoteById[chosenTimeline.id],
    }
  }, [selectedPath, selectedTimeline])

  return (
    <section className="section start-path" aria-labelledby="start-path-title">
      <div className="shell">
        <div className="start-path-head">
          <p className="kicker">Start Here</p>
          <h2 id="start-path-title">Find the right path in under 30 seconds</h2>
          <p>Pick your focus and timeline. We will guide you to the most relevant page.</p>
        </div>

        <div className="wizard-grid">
          <div className="wizard-step">
            <p className="wizard-step-label">Step 1</p>
            <h3>Choose your priority</h3>
            <div className="wizard-options">
              {paths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  className={`wizard-option ${selectedPath === path.id ? 'active' : ''}`}
                  onClick={() => setSelectedPath(path.id)}
                >
                  <strong>{path.label}</strong>
                  <span>{path.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="wizard-step">
            <p className="wizard-step-label">Step 2</p>
            <h3>Select your timeline</h3>
            <div className="wizard-options compact">
              {timelines.map((timeline) => (
                <button
                  key={timeline.id}
                  type="button"
                  className={`wizard-option ${selectedTimeline === timeline.id ? 'active' : ''}`}
                  onClick={() => setSelectedTimeline(timeline.id)}
                >
                  <strong>{timeline.label}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="wizard-result">
            <p className="wizard-step-label">Step 3</p>
            <h3>Recommended next page</h3>
            <p className="wizard-result-title">{recommendation.pageLabel}</p>
            <p className="wizard-result-meta">{recommendation.timelineLabel}</p>
            <p>{recommendation.note}</p>
            <a
              className="btn btn-primary"
              href={recommendation.destination}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(recommendation.destination)
              }}
            >
              Go to {recommendation.pageLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PathWizard
