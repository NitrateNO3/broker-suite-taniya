# BrokerSuite — Website

Marketing site and official web presence for the BrokerSuite real estate CRM,
built against the BrokrSuite Website PRD.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · static export.
No UI framework, no icon library, no animation library.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site -> ./out
npm run typecheck
```

The build produces a fully static site in `out/` — deploy it to Vercel,
Netlify, Cloudflare Pages, S3, or any static host.

---

## Before you go live

These are the items that are deliberately switched **off** because the PRD
forbids shipping unverified content. Each is a one-line change.

| What | Where | Currently |
|---|---|---|
| Production domain | `config/site.ts` → `site.url` | `https://brokersuite.com` — drives canonical URLs, OG tags and `sitemap.xml` |
| App Store / Play links | `config/site.ts` → `stores` | `null` → badges render a non-clickable "Coming soon" chip |
| Pricing | `config/site.ts` → `pricing` | `enabled: false` → plans show "Pricing on request" instead of numbers |
| Statistics | `config/site.ts` → `stats` | `enabled: false` → the section does not render at all |
| Testimonials | `config/site.ts` → `testimonials` | `enabled: false`, empty array → the section does not render at all |
| Phone / address | `config/site.ts` → `contact` | empty strings → those rows are omitted from the footer and contact page |
| Social links | `config/site.ts` → `social` | empty strings → the Social column is omitted |
| Contact form | `.env.local` → `NEXT_PUBLIC_CONTACT_ENDPOINT` | unset → form shows a visible "not connected" notice, submit disabled |
| App screenshots | `components/mockups/AppScreen.tsx` | illustrative UI renderings — replace with real exported screenshots |
| Legal copy | `app/{privacy,terms,cookies,refund}` | drafted to match how this site actually behaves; **have a qualified adviser review before publishing** |

Nothing in the shipped site claims a certification, a customer count, a review
or a store listing that does not exist.

### Contact form

Set the endpoint and the form goes live — validation, loading, success and
error states are already built:

```bash
echo 'NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx' > .env.local
```

It POSTs JSON: `{ name, company, phone, email, teamSize, message, source }`.
Spam protection is a hidden honeypot field plus a minimum time-on-form check.

### Analytics

Per PRD §29 no tracking is installed — do not add it before the consent
implementation is ready. The conversion elements are already tagged with
`data-analytics` attributes so a provider can bind to them without edits:
`get-started-click`, `demo-request`, `app-store-click`, `google-play-click`.

---

## Structure

```
app/
  layout.tsx            root metadata, OG defaults, JSON-LD, skip link
  page.tsx              homepage — all sections
  features/ pricing/ contact/ about/
  privacy/ terms/ cookies/ refund/
  sitemap.ts robots.ts  generated at build time
  not-found.tsx
components/
  ui/                   Button · Container/Section/SectionHeading · Reveal
  sections/             Hero · ValueProps · Problem · FeatureShowcase ·
                        Solutions · HowItWorks · AppShowcase · Stats ·
                        Testimonials · Pricing · FAQ · CTA
  mockups/              PhoneFrame · AppScreen (six app screens)
  Navbar · Footer · Logo · Icon · StoreButtons · ContactForm ·
  PageHeader · LegalPage
config/
  site.ts               all editable content and feature flags
  nav.ts                navigation
lib/seo.ts              per-page metadata builder
```

### Design system

Derived from the logo, defined once in `tailwind.config.ts`:

- `brand.600 #4F46E5` — the logo tile; primary actions
- `brand.400 #818CF8` — the "Suite" wordmark; accents on dark
- `ink.950 #0F1117` — the logo's dark ground; dark sections and headings
- `ink.500` muted text · `ink.200` borders · `success` / `warning` / `error`
- Radii `xl` (buttons) and `card` / `card-lg` (surfaces); one shadow scale
- Inter, with fluid `display-*` sizes so mobile gets its own type scale

The logo is reproduced as vector in `components/Logo.tsx` (and `public/icon.svg`).
Only the wordmark's first half changes colour between the light and dark
lockups — the mark itself is never recoloured or distorted.

---

## Notes on PRD interpretation

- **"BrokrSuite" vs "BrokerSuite"** — the PRD text and the supplied logo
  disagree. The site uses **BrokerSuite**, matching the logo.
- **Nav has 7 items, PRD lists 6 pages** — Solutions, How It Works and FAQ are
  described as homepage *sections*, so they are anchor links rather than three
  thin pages. Features, Pricing and Contact are real pages.
- **Careers / Help Center** are listed in the PRD footer with no content spec;
  they are omitted rather than shipped as empty pages, since the PRD also
  requires no broken links. `/about` is included.
- **"Get Started"** has no signup product to point at, so it routes to
  `/contact` (Request a Demo) — the PRD's stated conversion goal.
- **Homepage shows 3 of 6 features** with a link to the full set, to keep the
  page from turning into the features page.
