import { useState } from 'react'
import { trackNewsletterSignup } from '../utils/analytics'

function Newsletter({ source = 'unknown' }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) return

    setIsLoading(true)
    
    // Track newsletter signup with source
    trackNewsletterSignup(source)

    // Simulate submission (in production, this would call an API)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitted(true)
      setEmail('')
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Newsletter signup error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="newsletter-signup" aria-labelledby="newsletter-title">
      <div className="shell newsletter-container">
        <div className="newsletter-content">
          <h2 id="newsletter-title">Stay Updated</h2>
          <p>Get insights on operational intelligence, AI implementation, and enterprise technology delivered to your inbox.</p>
        </div>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading || submitted}
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || submitted || !email}
              aria-busy={isLoading}
            >
              {isLoading ? 'Subscribing...' : submitted ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
          
          {submitted && (
            <div className="success-message" role="status">
              ✓ Thank you for subscribing! Check your email for confirmation.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default Newsletter
