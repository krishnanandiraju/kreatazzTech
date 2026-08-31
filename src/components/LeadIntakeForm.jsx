import { useState } from 'react'
import { trackFormSubmission, trackCTAClick } from '../utils/analytics'

const intentOptions = [
  'AI & Data Platform',
  'Workflow Modernization',
  'Cloud & DevOps',
  'Industry Solution',
  'Talent Support',
]

function LeadIntakeForm({ email }) {
  const [name, setName] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [intent, setIntent] = useState(intentOptions[0])
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const lines = [
      `Name: ${name || 'Not provided'}`,
      `Work Email: ${workEmail || 'Not provided'}`,
      `Primary Intent: ${intent}`,
      `Message: ${message || 'No additional details'}`,
    ]

    const subject = encodeURIComponent('Strategy Conversation Request - Kreatazz Website')
    const body = encodeURIComponent(lines.join('\n'))

    trackFormSubmission('strategy_intake', workEmail)
    trackCTAClick('Submit Strategy Request', 'lead_intake_form', `mailto:${email}`)

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="section lead-intake" aria-labelledby="lead-intake-title">
      <div className="shell lead-intake-wrap">
        <div className="lead-intake-copy">
          <p className="kicker">Quick Start</p>
          <h2 id="lead-intake-title">Tell us what you need, we will map a practical next step</h2>
          <p>
            Share a few details in under a minute. This opens your email client with a structured
            request so your team can start the conversation quickly.
          </p>
        </div>

        <form className="lead-intake-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </label>

          <label>
            Work email
            <input
              type="email"
              value={workEmail}
              onChange={(event) => setWorkEmail(event.target.value)}
              placeholder="name@company.com"
              required
            />
          </label>

          <label>
            Primary focus
            <select value={intent} onChange={(event) => setIntent(event.target.value)}>
              {intentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            Short context
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What is the core challenge and expected timeline?"
              rows={4}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Send Strategy Request
          </button>
        </form>
      </div>
    </section>
  )
}

export default LeadIntakeForm
