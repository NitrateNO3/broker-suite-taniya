# Post-deployment verification: 7 Nov 2026

Production: `broker-suite-taniya` (`prj_yhDQ6QELNgGI8ry4gq0Hgi4RfLXc`) → `main` @ `d25fd41` (PR #2), deployment `dpl_ApMfD4iT2fD6Np8xBEoGWhcdeGyh`, READY.
All checks are read-only. No DNS, project, env-var or deployment changes were made.

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | `docs/seo/verify-domain.sh` | **PASS** (24/24) | Apex and http → www (308), 19 URLs return 200, `/free-trial/` → `/book-a-demo/` (308), unknown URL → 404, www canonical, sitemap and robots. The first run failed one check only because the script still expected `/free-trial/` to return 200; the script was updated for the intended redirect and now also covers the landing pages and blog |
| 2 | `docs/seo/seo-check.py https://www.brokrsuite.in` | **PASS** | 19 pages crawled = 19 in sitemap; no problems: titles, descriptions, one H1, self-canonical, valid JSON-LD, no orphans, no excluded claims |
| 3 | Six landing pages | **PASS** | Each returns 200 with a unique H1; canonical and `og:url` are self-referencing on www; the 4 visible FAQs match the FAQPage schema; breadcrumb Home → page; genuine screenshot served (200) |
| 4 | `sitemap.xml` / `robots.txt` | **PASS** | 19 www URLs, all 200, real lastmod dates (2026-08-31, 2026-11-07), no `/free-trial/`; robots: `Allow: /`, `Disallow: /api/`, sitemap on www |
| 5 | Canonicals and structured data | **PASS** | Organization ×19, WebSite ×19, BreadcrumbList ×15, FAQPage ×8, SoftwareApplication ×2, BlogPosting ×3. All required fields present, no apex URLs, no ratings or offers; store install URLs and logo resolve (200) |
| 6 | Google access to content | **PASS** (simulated) | Googlebot smartphone and desktop user agents: 200, no `X-Robots-Tag`, no robots meta, no bot challenge; key copy and FAQ answers are in the server HTML (no JavaScript needed); `/_next/static` assets 200 and not blocked. **Confirm with Search Console → URL Inspection → Test live URL**, which fetches from Google's own servers |
| 7 | Duplicate project `broker-suite-taniya-fbvw` | **SAFE TO DISCONNECT** | Details below |

## Duplicate project findings
- **Domains:** only `broker-suite-taniya-fbvw.vercel.app` (plus generated aliases). No custom domains. `www.brokrsuite.in` and `brokrsuite.in` belong only to `broker-suite-taniya`.
- **Builds:** a separate Git connection to the same repo, so every push builds twice. On the Hobby plan (one build at a time) this delayed the production project's preview build today.
- **Env vars:**
  - `web3_forms`: not read by any code (the code reads `WEB3FORMS_ACCESS_KEY` / `NEXT_PUBLIC_WEB3FORMS_KEY`).
  - `NEXT_PUBLIC_CONTACT_ENDPOINT`: read into `contactEndpoint`, which no component uses.

  Nothing is lost by disconnecting.
- **Public duplicate:** its `.vercel.app` URL serves the full site with HTTP 200, but every page's canonical points to `https://www.brokrsuite.in/…`, so search engines consolidate it. The production project's own `broker-suite-taniya.vercel.app` behaves the same way.

**Recommended (dashboard, needs your approval):**
1. In `broker-suite-taniya-fbvw` → **Settings → Git → Ignored Build Step → "Don't build anything"**, or **Disconnect**. Production is unaffected.
2. Optional: **pause** the `-fbvw` project so its `.vercel.app` copy stops serving. This is reversible and doesn't delete it.

Disconnecting Git does **not** take down its existing deployment.
