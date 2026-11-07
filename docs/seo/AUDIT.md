# BrokrSuite — SEO Audit & Implementation Plan

Audit date: 7 Nov 2026 · Branch: `seo-optimization` · Repo: `NitrateNO3/broker-suite-taniya` @ `732b1ac`

## How this was verified

| Check | Method |
|---|---|
| Live site | `curl` against `https://www.brokrsuite.in/`, `https://brokrsuite.in/`, both `http://` variants, `/robots.txt`, `/sitemap.xml`, with default, Chrome and Googlebot user agents; `dig` for DNS |
| Code | Read every route, layout, metadata helper, config and section component |
| Rendered HTML | `next build` + `next start`, then crawled every internal link from `/` and parsed title, meta, canonical, robots, headings, images, JSON-LD, word count, inbound links |
| Performance | Lighthouse 12.2.1, mobile emulation, against the local production server (lab data, no CDN — indicative only) |
| Not available | Search Console, Google Keyword Planner, CrUX field data. **No search volumes, difficulty or rankings are stated anywhere in this report.** |

---

## Critical

### C1. The live site is offline — every URL returns 404
**Verified.** Every request to `brokrsuite.in` and `www.brokrsuite.in` (including `/robots.txt` and `/sitemap.xml`) returns HTTP 404 with `x-vercel-error: DEPLOYMENT_NOT_FOUND`. DNS points correctly at Vercel (`www` → `*.vercel-dns-017.com`, apex → `216.198.79.x`), so the domain is attached to a Vercel project that has no live deployment (deleted, project removed, or domain moved to an empty project).

Impact: Google cannot crawl or index anything; any existing rankings will drop out. Nothing else in this report matters until this is fixed.

Fix (in the Vercel dashboard, not the repo — needs your account):
1. Open the Vercel project connected to this repo → **Deployments** → confirm a successful Production deployment exists; redeploy `main` if not.
2. **Settings → Domains**: make sure both `brokrsuite.in` and `www.brokrsuite.in` are listed on *this* project.
3. Set one as primary and the other to **308 redirect** to it (see C2).

### C2. Canonical host doesn't match the official URL
**Verified in code.** `config/site.ts` sets `url: 'https://brokrsuite.in'`, so every canonical, `og:url`, `robots.txt` and sitemap URL uses the **apex**. Your brief gives the official URL as **`https://www.brokrsuite.in/`**. Whichever you pick, the code and the Vercel redirect must agree, or Google gets canonicals pointing at a URL that redirects away.

Fix: choose one host (decision needed — see questions), set `site.url` to it, make the other 308 to it in Vercel. Redirect behaviour can't be verified until C1 is fixed.

---

## High

### H1. Lockfile out of sync — `npm ci` fails
**Verified.** `package.json` requires `next ^15.1.7`; `package-lock.json` pins `15.1.6`. `npm ci` aborts with `EUSAGE`. Any CI or host configured with `npm ci` cannot build. (Whether this caused C1 is unknown — check the Vercel build logs.)
Fix: commit a regenerated lockfile (already regenerated locally on this branch; resolves to Next 15.5.29, build and typecheck pass).

### H2. Only one page can rank for any commercial term
**Verified.** Nine indexable pages; only `/` targets a category keyword. Inner titles are generic: `Features | BrokrSuite`, `Pricing | BrokrSuite`, `About | BrokrSuite`, `How It Works | BrokrSuite`. There are no pages for broker CRM, lead management, agency software, CRM app or sales management, and no blog.
Fix: Phase 3 titles/descriptions + Phase 4 landing pages (see keyword map).

### H3. Homepage FAQ (and its FAQPage schema) is written for property seekers, not CRM buyers
**Verified.** The four homepage FAQs are "How do I contact a property agent?", "Are my saved properties saved permanently?", "How do I list a new property as an agent?", "How can I delete my account?". These are in-app support questions. A broker evaluating a CRM gets nothing from them, and they dilute the page's topic.
Also: Google has shown FAQ rich results only for well-known government and health sites since Aug 2023, so FAQPage markup on a SaaS site won't produce a rich result either way.
Fix: move the app-support FAQs to `/help/` (where they fit), and give the homepage buyer-intent FAQs answered from real product facts. Keep FAQPage markup only where the questions are visibly on the page.

### H4. Unverified claims on the About page and hero
**Verified present.** About: "bank-grade data security", "Enterprise Real Estate Brokerage & CRM Platform", "high-speed verified listings". Hero: "Role-based access control", "Isolated multi-tenant workspaces", "Watermarked property media". The code comments say these come from the app's own About screen, but your rules forbid security guarantees and unverifiable capability claims.
Fix: you confirm which are real (see questions). "Bank-grade" should be removed or replaced with the specific measures actually in place.

### H5. Homepage LCP is unmeasurable; inner-page LCP is borderline
**Verified (lab).** Lighthouse mobile returns `NO_LCP` for `/` — the hero `<h1>` and hero image both start at `opacity: 0` (`animate-fade-up … both`), and Chrome doesn't count elements painted at zero opacity as LCP candidates. Real-user LCP can be reported late or against a smaller element. `/features/` LCP = 2.7 s (threshold for "good" is 2.5 s). CLS is 0 and TBT 20 ms on both.
Fix: change the above-the-fold fade-up to transform-only (no opacity), keep it for below-the-fold. No visual redesign.

---

## Medium

| # | Issue (verified) | Fix |
|---|---|---|
| M1 | Structured data: one `SoftwareApplication` block (variable is misnamed `organizationSchema`) on every page, including privacy and delete-account. No `Organization` (QuenchMark as parent, logo, contactPoint), no `BreadcrumbList`. `SoftwareApplication` has no `offers`, so it isn't eligible for Google's software rich result — and must not get a fabricated `aggregateRating`. | Add `Organization` + `WebSite` sitewide; `SoftwareApplication` on home/product pages with real store URLs (`offers` only once pricing is public); `BreadcrumbList` on inner pages. |
| M2 | Thin pages: `/help/` 162 words, `/free-trial/` 165, `/about/` 216. `/help/` links to the homepage FAQ instead of holding it. | Move app FAQs onto `/help/`; expand `/about/` with real company facts. `/free-trial/` is a form page — fine thin. |
| M3 | Home meta description doesn't mention India, brokers or agencies; inner descriptions are generic. | Rewrite per keyword map. |
| M4 | No analytics, no conversion tracking. `data-analytics` attributes exist but nothing listens. Demo/trial enquiries can't be attributed to organic search. | GA4 (or privacy-friendly alternative) behind a consent banner (DPDP Act 2023), `generate_lead` event on successful form submit; Search Console. |
| M5 | `sitemap.xml` sets `lastmod` to build time for every URL on every deploy. Google ignores lastmod it finds unreliable. | Per-page real dates in a route list. |
| M6 | `images.unoptimized: true` — no responsive `srcset`; Lighthouse flags ~24 KiB savings. Screenshots are already WebP, 17–89 KB. | Low payoff; enable Next image optimisation on Vercel or ship 2 sizes. |

## Low

| # | Issue (verified) |
|---|---|
| L1 | 404 page returns a correct 404 status with `noindex`, but its `<title>` is the homepage title and it also carries a second `index, follow` robots tag. Google applies the most restrictive, so it works — clean-up only. |
| L2 | Footer column labels ("Product", "Company"…) are `<h2>` on every page, adding noise to each page's outline. |
| L3 | Colour contrast: `text-ink-500` on the dark Download section fails WCAG AA (Lighthouse accessibility 96). |
| L4 | Store badges: `aria-label` doesn't contain the visible text ("Download on the App Store"). |
| L5 | `keywords` meta and robots `Host:` directive are ignored by Google — harmless. |

## Verified as already correct (no work needed)

- All pages are statically pre-rendered; full content is in the HTML — no JS-rendering dependency for Google.
- Exactly one `<h1>` on every page; logical H2/H3 below it.
- Self-referencing canonical on every page; Open Graph + Twitter card on every page (1200×630 `og.png`).
- No broken internal links; no orphan pages (every page has 8 inbound internal links).
- Trailing-slash policy consistent: `/features` → single 308 → `/features/`.
- Every product screenshot has descriptive alt text; decorative images use `alt=""`.
- Below-fold images lazy-load; hero image has `priority`.
- No private/app routes exist on this site to leak; `/api/free-trial/` is POST-only.
- Lighthouse SEO 100, Best Practices 100, CLS 0, TBT 20 ms.
- Google Search Console DNS verification TXT record already exists on `brokrsuite.in`.

---

## Product-truth constraints found during the audit

These shape what the new pages can honestly say:

1. **Screenshots:** only six real screens exist — splash, onboarding, login, explore (property search), property detail, agent dashboard. There are **no screenshots of lead management, client records, follow-ups, team management or analytics**. Landing pages for those topics need real exports from the app, or they ship text-only.
2. **The app serves property seekers as well as agents** (onboarding: "Find the Perfect Property That Fits Your Lifestyle"; Recommended/Nearby listings; WhatsApp inquiry to agent). Marketing copy should say so plainly rather than imply a back-office-only CRM.
3. **"Property management software" is a mismatch.** That query is generally used for landlord/rental tools (rent collection, tenants, maintenance). BrokrSuite manages *listing inventory for brokers*. Targeting it would attract the wrong visitors. Recommendation: build `/property-inventory-management/` instead (or keep the requested URL but title it around inventory). **Your call.**
4. **WhatsApp:** the product opens a WhatsApp chat with prefilled property details. Copy should describe it as that, not as a "WhatsApp integration/automation".
5. Pricing is not public, so no page may state prices, and `offers` can't go in schema yet.

---

## Implementation plan (on `seo-optimization`, nothing merged or deployed)

**Step 0 — you, in Vercel (unblocks everything):** fix C1, choose host for C2.

**Step 1 — technical fixes** (small, low risk)
- `site.url` → chosen host; commit regenerated lockfile.
- Schema: `Organization` + `WebSite` sitewide, `SoftwareApplication` scoped to product pages with store links, `BreadcrumbList` helper for inner pages.
- 404 title + single robots tag; footer labels from `<h2>` to non-heading text.
- Sitemap with real per-route `lastmod`, includes new pages automatically from a shared route list.
- Above-fold hero animation → transform-only (fixes NO_LCP). Contrast + store-badge label fixes.

**Step 2 — on-page rewrite of existing pages** (copy/metadata only, no layout change)
- New titles/descriptions per keyword map; homepage H1 gains the category term while keeping the brand line.
- Homepage FAQs → buyer intent; app FAQs → `/help/`.
- About: remove/replace unverified claims you don't confirm; add QuenchMark details.
- Contextual links from Home/Features to new landing pages.

**Step 3 — landing pages** (reuse existing `PageHeader`, `Section`, `FeatureShowcase`, `CTA`, `PhoneFrame` — no new design)
`/real-estate-broker-crm/`, `/real-estate-lead-management/`, `/real-estate-agency-software/`, `/real-estate-crm-app/`, `/real-estate-sales-management/`, and `/property-inventory-management/` (or `/property-management-software/` if you prefer). Each: unique H1/intro, capabilities drawn only from `config/site.ts` + confirmed facts, real screenshots where they exist, 4–6 FAQs, breadcrumbs, demo/trial CTA. Content in a typed config file so pages stay consistent.

**Step 4 — blog system**
`/blog/` index + `/blog/[slug]/` from local MDX or TS content, `Article` + `BreadcrumbList` schema, author/date, related-product links, auto-added to sitemap. Five drafts as requested. Article 1 ("Best CRM software for real estate brokers in India") compares named competitors — every competitor fact needs a cited source checked on the publish date, and BrokrSuite's own entry must disclose that we make it.

**Step 5 — conversion & measurement**
Consent banner + analytics with `generate_lead` on successful trial submit; store-click events (attributes already in place); sticky mobile CTA on landing pages.

**Step 6 — verify:** `npm run build`, `npm run typecheck`, `npm run lint`, re-crawl, Lighthouse on every template, schema validated with Google's Rich Results Test (needs the deployed preview URL).

**Step 7 — Phase 9 report:** modified-files list, Search Console steps, 30/90-day roadmap.

Note: the repo has **no test suite** (`package.json` has build, lint and typecheck only). "Run tests" will mean those three plus the crawl script.
