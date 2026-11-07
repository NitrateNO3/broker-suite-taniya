# BrokrSuite SEO: Phase 2–4 Implementation Report

Branch: `seo-optimization` (based on `main` @ `790bb59`) · Date: 7 Nov 2026 · **Not deployed to production.**

Related: [AUDIT.md](AUDIT.md) (Phase 1 audit), [DOMAIN-INCIDENT.md](DOMAIN-INCIDENT.md), [keyword-map.csv](keyword-map.csv), [CONTENT-STRATEGY.md](CONTENT-STRATEGY.md).

---

## 1. Canonical domain and production: verified

| Check | Result |
|---|---|
| Production deployment | `broker-suite-taniya` → `main` @ `790bb59` (PR #1 merged), state READY |
| `https://www.brokrsuite.in/` | 200; canonical, `og:url`, sitemap and robots all use `https://www.brokrsuite.in` |
| `https://brokrsuite.in/*` | 308 → `https://www.brokrsuite.in/*` (path kept) |
| `http://brokrsuite.in/` | 308 → https apex → 308 → www. Two hops; Vercel always upgrades to HTTPS on the same host first |
| All public pages, robots, sitemap | 200; unknown URLs return 404 (`docs/seo/verify-domain.sh` passes) |
| DNS | Unchanged |

**Still open (needs you, in the Vercel dashboard):** the duplicate project `broker-suite-taniya-fbvw` still builds every push, including a production build of `main`. To stop it without deleting anything, open **broker-suite-taniya-fbvw → Settings → Git** and do one of:
- **Ignored Build Step → "Don't build anything"** (recommended: keeps the project and its Git link); or
- **Disconnect** the repository.

I couldn't do this myself: the Vercel connector in this session can read the project but is refused write access (HTTP 403).

## 2. Product verification

| Question | Finding | Source |
|---|---|---|
| Web dashboard? | **None found.** The repo is a marketing site only; `app`, `dashboard`, `admin`, `crm`, `portal`, `web`, `my`, `login`, `console`, `agent` and `broker` `.brokrsuite.in` don't resolve; both store listings describe mobile apps | DNS, repo, store listings |
| Platforms | iOS (App Store id6807412019, v6, 3 Nov 2026) and Android (`com.brokrsuite.app`), both free to download | Apple lookup API, Google Play |
| Six core modules | Confirmed by you; consistent with the Google Play description | Play listing |
| Visible in genuine screenshots | Listing edit and delete, status, price per sq ft, amenities, **Schedule Visit**, **share**, search, category filters, dashboard with **Total Leads, Revenue, Today's Tasks, Recent Leads, Property Summary**; Google and Apple sign-in | `public/app/*.webp` |
| Claimed by the App Store listing but **not verified in the app** | Watermarked media, attendance, role-based access (Admin/Manager/Agent), "enterprise-grade security", screenshot prevention, "thousands of verified listings" | App Store description |

The website no longer makes any of the unverified claims. **Your App Store listing still does.** Make sure those statements are accurate, because the website will be judged against them.

## 3. Keyword mapping (summary; full table in `keyword-map.csv`)

| Primary keyword | Page |
|---|---|
| Real estate CRM software | `/` |
| CRM for real estate brokers (+ agents, realtors, property dealer software) | `/real-estate-broker-crm/` |
| Real estate lead management software | `/real-estate-lead-management/` |
| Property inventory management software (+ real estate inventory management) | `/property-inventory-management/` |
| Real estate agency software (+ brokerage software) | `/real-estate-agency-software/` |
| Real estate sales management software | `/real-estate-sales-management/` |
| Real estate CRM app | `/real-estate-crm-app/` |

**Evidence:** Google autocomplete (real queries; no volumes). Volume and difficulty are marked **PENDING**. No numbers were invented; pull them from Keyword Planner or Search Console. Deliberately **not** targeted: "property management software" (landlord intent) and "lead generation software" (BrokrSuite doesn't generate leads).

## 4. What changed

### Technical SEO
- **Schema** (`lib/schema.ts`, `components/JsonLd.tsx`):
  - `Organization` (with QuenchMark as `parentOrganization`) and `WebSite` on every page.
  - `SoftwareApplication` only on `/` and `/real-estate-crm-app/`, with both store URLs. It has no `offers` (pricing isn't public) and no ratings.
  - `BreadcrumbList` on inner pages; `FAQPage` only where those questions are visible; `BlogPosting` on articles.
  - The old sitewide block was a `SoftwareApplication` mislabelled as "organization".
- **Robots meta:** removed the root `index, follow`, so the 404 now emits a single `noindex`. The 404 title is now "Page not found".
- **`robots.txt`:** `Disallow: /api/`; dropped the Yandex-only `Host:` line.
- **Sitemap:** one route list covering static pages, the 6 landing pages and the blog posts, with real per-page `lastmod` dates instead of the build timestamp.
- **Redirect:** `/free-trial/` → `/book-a-demo/` (308) in `next.config.mjs`.
- **Images:** Next image optimisation enabled (AVIF/WebP, resized per device; the hero screenshot drops from 63 KB to about 15 KB), and corrected `sizes` on the hero.
- **LCP:** the hero heading, intro and product shot now animate with transform only (new `rise` keyframe). The homepage previously returned `NO_LCP`.
- **Semantics:** footer column labels changed from `<h2>` to `<p>`; breadcrumb `<nav>`; `<figure>`/`<figcaption>` for screenshots.
- **Accessibility:** contrast fixes on dark sections; store badges use their visible text as the accessible name.
- **Mobile bug fixed (it predates this work):** the "Move your real estate business to one platform" button couldn't wrap, which made every homepage view 424 px wide on phones (sideways scroll and a clipped menu).
- **Lockfile:** regenerated so `npm ci` works again (Next 15.1.6 → 15.5.29, which `package.json` already allowed).

### On-page and claims
- **CTA:** "Book Your Free Trial" → **"Book a Demo"** everywhere (navbar, hero, CTA band, pricing, form), defined once as `demoCta` in `config/site.ts`.
- **Homepage:**
  - Title "Real Estate CRM Software for Brokers & Agencies | BrokrSuite".
  - H1 "Real estate CRM software for brokers and agencies." The old brand line moves into the intro.
  - The hero ticks were "multi-tenant / WhatsApp / watermarked / RBAC"; they're now verified items (iPhone and Android apps; inventory; leads, clients and follow-ups; team activity and analytics).
  - Buyer FAQs replace the app-support FAQs.
  - Value-prop and solution cards link to the landing pages.
- **Help:** the app-support FAQs moved here and render on the page (previously a button linked away to the homepage).
- **About:** removed "Enterprise", "bank-grade data security", multi-tenant, watermarking and attendance; replaced with the six modules, platforms and audience links. The stale "Version v1.0.0 (Build 1)" row became "Platforms: iPhone and Android".
- **Pricing:** the "Most popular" badge became "Recommended", since there's no usage data to back a popularity claim.
- **How it works:** "Import or add…" became "Add your properties, leads and client details".
- **Demo page:** "Help importing…" became "Help setting up your properties, leads and team".
- **Retitled with keyword-aware titles and descriptions plus breadcrumbs:** Features, Pricing, How It Works, About, Help, Book a Demo.
- **Global market:** `og:locale` en_IN → en_US; site description no longer India-specific.

### New pages
Landing pages, from `config/landing.ts` and the `components/LandingPage.tsx` template, built only from existing components:
- `/real-estate-broker-crm/`, `/real-estate-lead-management/`, `/property-inventory-management/`
- `/real-estate-agency-software/`, `/real-estate-sales-management/`, `/real-estate-crm-app/`

Each has a unique H1, intro, overview (with a genuine screenshot), benefits, the real feature lists, a workflow, 4 FAQs, related links and a demo CTA. Each runs to 720–865 words.

Blog:
- `/blog/` index.
- Three guides, 900–1,155 words each (see CONTENT-STRATEGY.md).

### Navigation and internal links
- A **Solutions** dropdown (same pattern as the existing Help dropdown) and a **Solutions** footer column.
- Blog links in the footer and the Help dropdown.
- Feature blocks on `/features/` link to their landing page.
- Landing pages cross-link to related pages, and articles link to the product page they support.
- Desktop dropdown links render only while open, so every dropdown page is also linked from the footer and is crawlable.

## 5. Files

**Modified (33):**
- `README.md`, `next.config.mjs`, `tailwind.config.ts`, `package-lock.json`
- `app/`: `layout.tsx`, `page.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `globals.css`, `about/page.tsx`, `features/page.tsx`, `help/page.tsx`, `how-it-works/page.tsx`, `pricing/page.tsx`
- `app/free-trial/page.tsx`: moved to `app/book-a-demo/page.tsx`
- `components/`: `Footer.tsx`, `FreeTrialForm.tsx` (visible copy and email subjects only), `Navbar.tsx`, `PageHeader.tsx`, `StoreButtons.tsx`, `mockups/PhoneShowcase.tsx`
- `components/sections/`: `AppShowcase.tsx`, `CTA.tsx`, `FAQ.tsx`, `FeatureShowcase.tsx`, `Hero.tsx`, `Pricing.tsx`, `Problem.tsx`, `Solutions.tsx`, `ValueProps.tsx`
- `config/nav.ts`, `config/site.ts`, `lib/seo.ts`

**Created:**
- Code: `components/JsonLd.tsx`, `components/LandingPage.tsx`, `components/Prose.tsx`, `config/landing.ts`, `config/blog.ts`, `lib/schema.ts`
- Routes: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and 6 × `app/<landing-slug>/page.tsx`
- `docs/seo/`: `AUDIT.md`, `DOMAIN-INCIDENT.md`, `REPORT.md`, `CONTENT-STRATEGY.md`, `keyword-map.csv`, `verify-domain.sh`, `seo-check.py`

**Untouched (per the rules):** `app/api/free-trial/route.ts` (its internal email subject still says "Free trial request"), authentication, the database, business logic, the privacy and delete-account legal copy, DNS and Vercel settings.

## 6. Checks run

| Check | Result |
|---|---|
| `tsc --noEmit` | Pass |
| `next build` | Pass. 24 static pages; shared JS unchanged at 103 kB |
| `next lint` | **Not configured.** The repo has no ESLint config; `next build` runs type checks only |
| Tests | **None exist** in the repo |
| `docs/seo/seo-check.py` (19 pages) | **No problems.** One H1 per page; www self-canonicals; titles 24–60 characters; descriptions 107–167; no duplicate titles or descriptions; valid JSON-LD; no orphans; sitemap = crawl; none of the excluded claims appear in visible text (outside legal pages) |
| Mobile width, 375 px, all 19 pages | No horizontal overflow (was 424 px on `/` before the fix) |
| Lighthouse mobile (lab, local server) | `/`: Performance 96–98, Accessibility 100, Best Practices 100, SEO 100, LCP 2.4–2.7 s, CLS 0 (before: Performance n/a because of NO_LCP, Accessibility 96) · `/real-estate-broker-crm/`: 98 / 100 / 100 / 100 · `/real-estate-crm-app/`: 98 / 100 / 100 / 100 · blog post: 99 / 100 / 100 / 100 |
| Visual check | Homepage, landing, blog and footer at desktop and 375 px; the existing design is kept |

Not verifiable until the branch is deployed: Google's Rich Results Test against a public URL (the preview is behind Vercel login), and field Core Web Vitals (CrUX).

## 7. Screenshots I need from you
All six existing screenshots are genuine, but none show these modules, and the dashboard shows a test account ("Hello Test!", all zeros). Please export from the real app, using a **demo account with realistic, non-personal sample data**, ideally with neutral global locations and currency:

1. **Lead list:** leads with status and source visible
2. **Lead detail:** contact info, status, source, assigned agent, follow-up date, notes and history
3. **Client detail:** requirements, budget, preferred locations, property preferences
4. **Follow-ups:** upcoming and completed follow-ups / reminders
5. **Team management:** team members list and assigning a lead or property
6. **Analytics / dashboard:** with non-zero sample figures (replaces the current "Test" dashboard)
7. *(Optional)* **Add property** form

Format: portrait PNG or WebP, 562 × 1281 (or the same aspect ratio), no personal data.

## 8. Remaining issues
- **Duplicate Vercel project** still building (see §1).
- **Re-created Vercel project has no env vars.** The form still delivers through the browser-side Web3Forms key; the server-side and FormSubmit fallbacks are inactive.
- **No analytics or conversion tracking.** The buttons carry `data-analytics` attributes (`demo-request`, `app-store-click`, `google-play-click`), but nothing reads them. Add GA4 or a privacy-friendly alternative behind a consent banner, and fire `generate_lead` on a successful demo submit.
- **Keyword volumes and difficulty are PENDING** until Keyword Planner or Search Console data is available.
- **Two comparison articles** are briefed only, because they need sourced competitor research.
- **Free trial:** removed from copy until you confirm the offer.
- **App Store listing claims** to check yourself (see §2).
- **The API route's email subject** still says "Free trial request" (that code is off-limits).
- **Blog `published` dates** are set to 7 Nov 2026; change them to the deploy date.

## 9. Search Console
A `google-site-verification` TXT record already exists on `brokrsuite.in`, so a **Domain property** is likely set up already.
1. Go to search.google.com/search-console and open the `brokrsuite.in` Domain property. If it doesn't exist: Add property → Domain → `brokrsuite.in`. Verification should pass on the existing TXT record; if Google shows a different value, add it at Hostinger *with your approval*.
2. **Sitemaps** → submit `https://www.brokrsuite.in/sitemap.xml`.
3. **URL Inspection** → request indexing for `/` and the 6 landing pages after deploy.
4. After about 2 weeks, check **Pages** (indexing errors), **Enhancements** (breadcrumbs) and **Performance** (queries → update `keyword-map.csv`).
5. Optional: Bing Webmaster Tools → import from Search Console.

## 10. Roadmap

**First 30 days after deploy**
- Submit the sitemap and request indexing (above). Fix anything Search Console reports.
- Stop the duplicate Vercel builds. Re-add the form env vars if wanted.
- Replace the dashboard screenshot and add lead, client, follow-up and team screens to the landing pages.
- Add analytics behind consent and track `generate_lead`, store clicks and demo-page views.
- Get Keyword Planner volumes for the 7 primary keywords and their secondaries; fill in `keyword-map.csv`.
- Publish the comparison article (brief A) once its research is sourced.
- Create LinkedIn and other profiles, add them to `config/site.ts → social`, and add `sameAs` to the Organization schema.

**Days 31–90**
- Two posts a month from the backlog in CONTENT-STRATEGY.md, chosen from Search Console queries.
- Expand landing pages that rank on page 2 with more depth: real screenshots, a short walkthrough video, a comparison section.
- Earn links: app directories and SaaS listings (G2, Capterra, Product Hunt), real estate associations and broker communities, a QuenchMark site link. Only genuine listings.
- Once real customer feedback exists: enable testimonials (`config/site.ts → testimonials`) with attributed quotes. Never fabricated.
- When pricing is final: publish it, add `offers` to the `SoftwareApplication` schema, and re-evaluate the free-trial CTA.
- Consider regional pages (e.g. UAE, Australia) only if Search Console shows impressions from those markets.

## 11. Approval needed
1. Review the **preview deployment** of `seo-optimization` (link in the hand-off message).
2. Approve opening a PR `seo-optimization → main`. Merging it is the production deploy.
3. Handle the duplicate Vercel project (§1) in the dashboard.
