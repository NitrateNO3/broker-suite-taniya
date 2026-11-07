# BrokrSuite: Blog & Content Strategy

Audience: real estate brokers, agents, independent property dealers and agencies, worldwide, in English.
Goal: rank for problem- and comparison-led searches, then hand readers to the matching product page.

## Architecture (built on `seo-optimization`)

| Piece | Where | Notes |
|---|---|---|
| Content | `config/blog.ts` | Typed `Post` objects; body is structured blocks (`h2`, `h3`, `p`, `ul`, `ol`) with `[label](/path)` links and `**bold**` |
| Index | `/blog/` (`app/blog/page.tsx`) | Newest first; breadcrumbs |
| Article | `/blog/[slug]/` (`app/blog/[slug]/page.tsx`) | Static at build time; `dynamicParams = false`, so unknown slugs return 404 |
| Schema | `BlogPosting` (author and publisher = BrokrSuite Organization) and `BreadcrumbList` | `lib/schema.ts` |
| Product handoff | Sticky sidebar card linking the post's `supports` landing page, plus Book a Demo | Every post must set `supports` |
| Sitemap | Added automatically, with `lastmod` = `post.updated` | |
| Navigation | Footer (Company → Blog) and the Help dropdown | |

**To add a post:** append an object to `posts` in `config/blog.ts`, then run `npm run build` and `python3 -I docs/seo/seo-check.py <url>`. No other file changes.

## Editorial rules
1. **No statistic without a cited, dated source.** None of the published posts contain statistics.
2. **No competitor claim without a dated source**, checked on the publish date. Comparison posts disclose that BrokrSuite publishes them.
3. **Product statements must come from the confirmed feature set:** inventory, leads, clients, follow-ups, team, analytics, plus what the genuine screenshots show (visits, tasks, sharing). Nothing on multi-tenancy, role-based access, watermarking, attendance, security guarantees, imports, AI or a web dashboard until verified.
4. **One primary query per post**, distinct from the landing pages (informational vs commercial intent). Link to the landing page in the body and through the sidebar.
5. Use global English examples, and avoid market-specific currency unless the post is about that market.
6. Update `updated` whenever content changes materially.

## Published on the branch (drafts until deployed)

| # | Post | Primary query | Supports |
|---|---|---|---|
| 1 | How to Manage Real Estate Leads Effectively | how to manage real estate leads | /real-estate-lead-management/ |
| 2 | Property Inventory Management for Real Estate: A Complete Guide | property inventory management guide / what is inventory in real estate | /property-inventory-management/ |
| 3 | Why Real Estate Agencies Need CRM Software | why real estate agencies need crm | /real-estate-agency-software/ |

Their `published` dates are set to 2026-11-07. **Change them to the actual deploy date when they go live.**

## Briefs: not written, because they need sourced research

### A. Best Real Estate CRM Software for Brokers (2026)
- **Replaces:** "Best CRM Software for Real Estate Brokers in India". The market is now global; a regional cut ("…in India", "…in Australia") can follow as separate posts if Search Console shows demand.
- **Queries (from Google autocomplete):** best real estate crm; best real estate crm for single agent; best real estate crm 2026; best real estate crm australia/canada/dubai.
- **Structure:** selection criteria → 6–8 products (BrokrSuite included, and labelled as ours) → a comparison table (platforms, inventory + leads in one place, team features, pricing model *as published by each vendor*) → how to choose.
- **Needs before writing:** each competitor's current features and pricing pages, captured with the access date, plus a decision on which competitors to include.

### B. Best Apps for Real Estate Agents and Property Dealers
- **Queries:** best real estate crm app; real estate agent software tools.
- **Structure:** categories (CRM, listings, e-signature, photography, calculators) → 1–2 apps per category with store links → where BrokrSuite fits.
- **Needs before writing:** current store listings for each app (verify on the publish date).

## Backlog (next 90 days, prioritized by intent fit)
1. Real estate lead follow-up: scripts and timing (supports lead management)
2. How to organize property listings without spreadsheets (supports inventory)
3. CRM vs spreadsheet for real estate brokers (supports broker CRM)
4. How to track real estate agent performance (supports sales management)
5. Onboarding a new agent: a checklist for agencies (supports agency software)
6. Real estate client requirements checklist (supports client management / broker CRM)
7. Glossary: real estate CRM terms (supports homepage)

Pick topics from Search Console query data once the site has 4–6 weeks of impressions. Until then, keep using the autocomplete evidence in `keyword-map.csv`.
