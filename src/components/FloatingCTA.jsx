import { trackCTAClick } from '../utils/analytics'
import { navigateTo } from '../utils/navigation'

function FloatingCTA() {
  return (
    <div className="floating-cta" role="complementary" aria-label="Quick contact">
      <a
        href="/#contact-us"
        className="btn btn-primary"
        onClick={(event) => {
          event.preventDefault()
          trackCTAClick('Book Strategy Call', 'floating_cta', '/#contact-us')
          navigateTo('/#contact-us')
        }}
      >
        Book Strategy Call
      </a>
    </div>
  )
}

export default FloatingCTA
