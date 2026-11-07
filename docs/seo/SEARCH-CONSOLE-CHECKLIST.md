# Google Search Console: BrokrSuite setup checklist

Site: `https://www.brokrsuite.in/` (canonical) · DNS at Hostinger · Sitemap: `https://www.brokrsuite.in/sitemap.xml` (19 URLs)

Already in place: a `google-site-verification` TXT record on `brokrsuite.in`, so a Domain property has probably been verified before.

## Day 0: Property and access

- [ ] **1. Open the property.** Go to search.google.com/search-console and look for the **Domain property `brokrsuite.in`**. It covers `www` and the apex, on both http and https.
  - If it isn't there: **Add property → Domain → `brokrsuite.in`**. If Google accepts the existing TXT record, it verifies immediately.
  - If Google asks for a **different** TXT value, that's a DNS change at Hostinger. Add it only with approval, and **add a new record without removing existing ones** (Zoho mail and SPF depend on them).
- [ ] **2. Optional: URL-prefix property `https://www.brokrsuite.in/`.** Useful for per-host reports; it verifies automatically under the Domain property.
- [ ] **3. Users.** Settings → Users and permissions → add teammates (Full, or Restricted for read-only).

## Day 0: Sitemap

- [ ] **4. Submit the sitemap.** Indexing → **Sitemaps** → enter `sitemap.xml` (the full URL is `https://www.brokrsuite.in/sitemap.xml`) → **Submit**.
  - Expected: Status **Success** and **19 discovered pages** within minutes to a few hours.
  - If it says "Couldn't fetch", open the URL in a browser (it should return XML) and resubmit later. A first fetch can lag.
- [ ] **5. Check robots.txt.** Settings → **robots.txt** report → `https://www.brokrsuite.in/robots.txt` should show "Fetched", with no errors. It allows everything except `/api/`.

## Day 0: Index the key pages

For each URL below: paste it into the **URL Inspection** bar at the top, then:
1. click **Test live URL**;
2. confirm **"URL is available to Google"**, *Page fetch: Successful*, *Indexing allowed: Yes*, and **User-declared canonical = the same www URL**;
3. click **View tested page → Screenshot** and check the page renders with its content;
4. click **Request indexing**.

Google rate-limits indexing requests per property per day. If you hit the limit, finish the rest the next day.

Priority order:

- [ ] `https://www.brokrsuite.in/`
- [ ] `https://www.brokrsuite.in/real-estate-broker-crm/`
- [ ] `https://www.brokrsuite.in/real-estate-lead-management/`
- [ ] `https://www.brokrsuite.in/property-inventory-management/`
- [ ] `https://www.brokrsuite.in/real-estate-agency-software/`
- [ ] `https://www.brokrsuite.in/real-estate-sales-management/`
- [ ] `https://www.brokrsuite.in/real-estate-crm-app/`
- [ ] `https://www.brokrsuite.in/features/`
- [ ] `https://www.brokrsuite.in/blog/`

Day 1, as quota allows:
- [ ] `https://www.brokrsuite.in/blog/how-to-manage-real-estate-leads/`
- [ ] `https://www.brokrsuite.in/blog/property-inventory-management-guide/`
- [ ] `https://www.brokrsuite.in/blog/why-real-estate-agencies-need-crm/`
- [ ] `https://www.brokrsuite.in/pricing/`
- [ ] `https://www.brokrsuite.in/book-a-demo/`

No action needed for `/how-it-works/`, `/about/`, `/help/`, `/privacy/` or `/delete-account/`; the sitemap covers them. Don't request indexing for `/free-trial/`. It permanently redirects to `/book-a-demo/`, and Google will follow that on its own.

## Day 0: Structured data spot-check

- [ ] **6. Rich Results Test** (search.google.com/test/rich-results): test `/real-estate-broker-crm/` and one blog post.
  - Expected: **Breadcrumbs** valid on both. **FAQ** is detected on the landing page; it's valid markup but won't show as a rich result, because Google limits FAQ results to government and health sites. **Article** markup is detected on the blog post.
- [ ] **7. Schema Markup Validator** (validator.schema.org): run the homepage. It should show Organization, WebSite, SoftwareApplication and FAQPage with no errors.

## Day 3–7: Coverage

- [ ] **8. Indexing → Pages.** Watch the **Indexed** count rise towards 19. Look into:
  - **"Duplicate, Google chose different canonical"**: should not apply to www pages. It may list `*.vercel.app` copies, which is expected and harmless.
  - **"Crawled – currently not indexed"** / **"Discovered – currently not indexed"**: common for new pages. Request indexing again after about 2 weeks if it persists.
  - **"Page with redirect"**: `/free-trial/` and the apex/http URLs. Expected.
  - **"Not found (404)"**: should be empty. Report anything listed.
- [ ] **9. Enhancements → Breadcrumbs.** Expect about 15 valid items once crawled.
- [ ] **10. Experience → Core Web Vitals.** Shows "Not enough data" until real Chrome traffic builds up; that's normal for a new site.

## Week 2 onwards: Performance

- [ ] **11. Performance → Search results**, weekly. Filter **Page** by each landing page and note impressions, clicks, average position and the top queries.
- [ ] **12. Update `docs/seo/keyword-map.csv`** with the queries each page actually receives, and add volumes from Keyword Planner.
- [ ] **13. Spot problems:** a landing page ranking for another page's primary keyword means cannibalisation, so adjust copy and internal links. Queries with high impressions but low click-through mean the title or description needs work.
- [ ] **14. Pick blog topics** from real queries (see `CONTENT-STRATEGY.md`, backlog section).

## Housekeeping

- [ ] **15. Link Google Analytics** (Settings → Associations) once GA4 is installed behind consent.
- [ ] **16. Bing Webmaster Tools** (bing.com/webmasters): **Import from Google Search Console**. This brings over the site and sitemap in one step.
- [ ] **17. Email alerts:** turn them on so you get notified of indexing or security issues.

## When something changes on the site
- **New page or blog post:** it's in the sitemap automatically on deploy. Request indexing for it in URL Inspection.
- **Changed page:** bump its `updated` date (`config/landing.ts`, `config/blog.ts` or `app/sitemap.ts`) so the sitemap `lastmod` is accurate.
- **Removed or renamed URL:** add a permanent redirect in `next.config.mjs`. Don't leave it to 404.
