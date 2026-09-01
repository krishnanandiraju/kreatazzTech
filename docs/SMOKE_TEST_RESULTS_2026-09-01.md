# Smoke Test Results

- Timestamp: 2026-09-01T19:41:19.6336255+05:30
- Direct navigation target routes: /, /about/, /services/, /manufacturing-intelligence/, invalid

## Production direct-navigation
- /: status=403, final=https://kreatazz.tech/, title='', challengeDetected=False
- /about/: status=403, final=https://kreatazz.tech/about/, title='', challengeDetected=False
- /services/: status=403, final=https://kreatazz.tech/services/, title='', challengeDetected=False
- /manufacturing-intelligence/: status=403, final=https://kreatazz.tech/manufacturing-intelligence/, title='', challengeDetected=False
- /this-route-should-not-exist: status=403, final=https://kreatazz.tech/this-route-should-not-exist, title='', challengeDetected=False

## Local build direct-navigation (vite preview)
- /: status=200, title='Kreatazz | Operational Intelligence Company', hasRoot=True, hasViteAssets=True
- /about/: status=200, title='Kreatazz | Operational Intelligence Company', hasRoot=True, hasViteAssets=True
- /services/: status=200, title='Kreatazz | Operational Intelligence Company', hasRoot=True, hasViteAssets=True
- /manufacturing-intelligence/: status=200, title='Kreatazz | Operational Intelligence Company', hasRoot=True, hasViteAssets=True
- /this-route-should-not-exist: status=200, title='Kreatazz | Operational Intelligence Company', hasRoot=True, hasViteAssets=True

## Local build browser-navigation (Playwright)
- home-loaded: path=/, title='Kreatazz | Operational Intelligence Company', h1='We Help Teams Turn AI Into Everyday Execution'
- clicked-about: path=/about/, title='About Kreatazz | Kreatazz', h1='About Kreatazz'
- clicked-services: path=/services/, title='Capabilities | Kreatazz', h1='Capabilities'
- back-home: path=/, title='Kreatazz | Operational Intelligence Company', h1='We Help Teams Turn AI Into Everyday Execution'
- clicked-manufacturing-intelligence: path=/manufacturing-intelligence/, title='Manufacturing Intelligence | Kreatazz', h1='Manufacturing Intelligence'
- invalid-direct: path=/this-route-should-not-exist, title='Kreatazz | Operational Intelligence Company', h1='Page not found'

## Production browser-navigation
- Unable to run interactive browser navigation to page content because production responded with 403 challenge page on all tested routes.
