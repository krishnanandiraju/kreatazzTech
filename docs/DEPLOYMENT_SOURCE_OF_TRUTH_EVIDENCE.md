# Deployment Source-of-Truth Evidence

- Timestamp: 2026-09-01T19:41:47.7287055+05:30
- Branch: main
- HEAD SHA: c506ed653d378e179a172408d9d0cfcbe79a9368
- origin/main SHA: c506ed653d378e179a172408d9d0cfcbe79a9368
- HEAD==origin/main: True
- Worktree: C:/Users/krish/Documents/workspaces/kreatazz-main-site  c506ed6 [main]

## CI/CD Mapping
- Build command: npm run build
- Output directory: dist/
- Production workflow dir rule: FTP_SERVER_DIR: ${{ secrets.FTP_PRODUCTION_SERVER_DIR || vars.FTP_PRODUCTION_SERVER_DIR }}
- Preview workflow dir rule: FTP_SERVER_DIR: ${{ secrets.FTP_PREVIEW_SERVER_DIR || vars.FTP_PREVIEW_SERVER_DIR }}

## Build Fingerprints
- dist/index.html sha256: 25D7F280C0CFA7562FBF581A6E3C95B4F557D15D3F419270BCC6C4C61DA4C979
- index-DRBCT4qB.js sha256: 474C8ACCF1131034D8898CC9682B943561A6F5E2F2FED3EFC669B05D8714623B
- index-D-K1cnGV.css sha256: EA5754EEB4DDC3E8C716C5B1792E6E73E22B8DC8367DB3461A51C0EB89A5FC7A

## Production Responses
- https://kreatazz.tech/ => status=403, server='cloudflare', cfMitigated='challenge', final=https://kreatazz.tech/, title='', hasRoot=False, hasAssets=False
- https://kreatazz.tech/about/ => status=403, server='cloudflare', cfMitigated='challenge', final=https://kreatazz.tech/about/, title='', hasRoot=False, hasAssets=False
- https://kreatazz.tech/services/ => status=403, server='cloudflare', cfMitigated='challenge', final=https://kreatazz.tech/services/, title='', hasRoot=False, hasAssets=False
- https://kreatazz.tech/manufacturing-intelligence/ => status=403, server='cloudflare', cfMitigated='challenge', final=https://kreatazz.tech/manufacturing-intelligence/, title='', hasRoot=False, hasAssets=False
- https://kreatazz.tech/this-route-should-not-exist => status=403, server='cloudflare', cfMitigated='challenge', final=https://kreatazz.tech/this-route-should-not-exist, title='', hasRoot=False, hasAssets=False

## Why Main Can Look Like Legacy Static Site

1. The repository source-of-truth is React/Vite and includes App.jsx routing and data-driven pages.
2. Live origin content cannot be validated when every route returns 403 before page HTML is served.
3. Prior CI/CD configuration allowed both preview and production workflows to deploy from main using the same directory variable with `/` fallback.
4. That setup could overwrite production or deploy into a non-canonical directory, producing mismatched observed behavior.

## Fix Applied In Repository

1. Production deploy now requires `FTP_PRODUCTION_SERVER_DIR` and rejects `/`.
2. Preview deploy now requires `FTP_PREVIEW_SERVER_DIR` and rejects `/`.
3. Preview workflow no longer auto-runs on main push.
4. Production workflow validates React artifact markers in `dist/index.html`.
5. Production workflow writes `/.well-known/kreatazz-deploy.json` provenance metadata.

## Remaining External Action

1. Set correct production and preview FTP directories in GitHub Actions secrets/variables.
2. Trigger production deployment and verify `/.well-known/kreatazz-deploy.json` SHA matches deployed commit.
