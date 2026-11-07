# brokrsuite.in 404: investigation and fix

## Resolution (7 Nov 2026)
The project `broker-suite-taniya` was re-created in the dashboard (new ID `prj_yhDQ6QELNgGI8ry4gq0Hgi4RfLXc`) and deployed from `main` @ `732b1ac`: deployment `dpl_Hs2We6zZbf1z8MkvBb8ahhnHGLZg`, READY, production. The domains are attached: `www.brokrsuite.in` serves production and `brokrsuite.in` returns a 308 to www. `verify-domain.sh` passes every check except the canonical host. All 9 pages, `robots.txt` and `sitemap.xml` return 200; unknown URLs return 404.

Open items:
- ~~Canonicals still use the apex~~ — fixed: PR #1 (`d0203bc`) merged as `790bb59` and deployed; canonicals, sitemap and robots now use www.
- **The re-created project has no env vars.** The trial form still delivers through the browser-side Web3Forms key in `config/site.ts`. `WEB3FORMS_ACCESS_KEY`, `RESEND_API_KEY`, `TRIAL_WEBHOOK` and `NEXT_PUBLIC_FORMSUBMIT_ID` are unset, so the server and FormSubmit fallbacks are inactive. Re-add them if they were in use before.
- The `http://brokrsuite.in` redirect takes two hops (http→https on the apex, then apex→www). This is Vercel's fixed behaviour and harmless.
- `broker-suite-taniya-fbvw` is still Git-connected, so every push still builds twice.

The investigation notes below describe the state before the fix.

Investigated 7 Nov 2026 using the Vercel API (read-only, as user `hiringquenchmark-1423`), GitHub deployment records, HTTP probes, DNS and TLS. **No DNS, Vercel, env-var or deployment changes were made.**

> Correction to the first draft: both Vercel projects are in the **same** account (`team_4R3mkCzS5ExwCpVptJkNXhwg`, Hobby plan). The `-fbvw` deployment URL just omits the scope suffix. They are not in two different accounts.

## Exact cause
Project **`broker-suite-taniya`** (`prj_SkWEpPdj3zFB8UIEz017yCZf5HuV`) is set up correctly but has **no aliases at all**:

| Check | Result |
|---|---|
| Domains on the project | `www.brokrsuite.in` (production, verified) · `brokrsuite.in` → **308 redirect to `www.brokrsuite.in`** (verified) · `broker-suite-taniya.vercel.app` |
| Aliases on the project | **0**. No hostname, not even its own `.vercel.app`, points at a deployment |
| Project `live` flag | `false` |
| Last project change | **7 Nov 2026 ~06:48 UTC** (today) |
| Deployments remaining | 2, both `READY`, production: `c574a12` (dpl_4RPnqdkne2cwUYqR9TgjvysmA6JH) and `b411a38` (dpl_8K6rhQCPfsy9FedaMVeyaS3uwuX8) |
| Deployment missing | `732b1ac` (= `main` HEAD), built successfully on 20 Sep. GitHub's record points to `broker-suite-taniya-4nwxhpd7j-…vercel.app`, which now returns `DEPLOYMENT_NOT_FOUND` |

The production aliases (`www.brokrsuite.in`, `brokrsuite.in`, `broker-suite-taniya.vercel.app`) were attached to the `732b1ac` deployment. That deployment has been **removed**, and Vercel removed its aliases with it. Older READY deployments are not promoted automatically, so every request to the domains finds no deployment and returns `404 DEPLOYMENT_NOT_FOUND`.

The project was modified about a minute before the first 404 was observed (06:49 UTC). Check **Vercel → Team → Activity** for who or what removed the deployment: a manual delete, or a deployment-retention policy.

## Other confirmed facts
- **GitHub connection:** the repo `NitrateNO3/broker-suite-taniya` (`main`) is connected to **two** projects in this account: `broker-suite-taniya` (owns the domains) and `broker-suite-taniya-fbvw`, a duplicate with no custom domains. Every push builds twice. `-fbvw` is live at `broker-suite-taniya-fbvw.vercel.app` from `732b1ac`, and all 9 public pages, `robots.txt`, `sitemap.xml` and the 404 work there.
- **Build logs:** every production build of both projects since 20 Sep shows state `READY` (success). There are no failed builds. A third, old project `broker-suiteweb` failed twice on 25 Aug and no longer exists.
- **DNS (Hostinger, unchanged):** Vercel reports `misconfigured: false` and no conflicts for both hosts. `www` CNAME → `cc0bf5510cf1f38d.vercel-dns-017.com`; apex A → `216.198.79.1`. Certificates for both hosts were issued on 27 and 29 Oct. **DNS is not the cause.** Vercel's API also returns `ipStatus: "required-change"`, recommending `76.76.21.21`. That isn't blocking (traffic and certificates work), so leave DNS alone for now and only revisit it if the dashboard flags the domain.
- The zone was edited today (SOA serial `2026110702`). The apex went from three A records to one. Confirm who changed it.
- **Plan:** the account is on **Hobby**, which Vercel limits to non-commercial use. A commercial product site should move to Pro.

## Safest fix (needs your approval: it is a deploy)
Vercel's **Promote** assigns the project's production domains to a chosen deployment. It doesn't rebuild or delete anything, and it can be reverted.

**Option A, recommended: deploy current `main` into `broker-suite-taniya`.**
1. Go to Vercel → `broker-suite-taniya` → **Deployments → Create Deployment**, choose branch `main`, then **Create**. This builds `732b1ac`.
2. When it's **Ready**, it becomes Production automatically and receives `www.brokrsuite.in`, `brokrsuite.in` (308 → www) and the `.vercel.app` alias.

**Option B, fastest (about 1 minute, no build): promote `c574a12`.**
Go to Deployments → `dpl_4RPnqdkne2cwUYqR9TgjvysmA6JH` → **⋯ → Promote to Production**. Caveat: this is one commit behind `main`. It lacks `732b1ac` "Try Web3Forms from the browser before FormSubmit", so free-trial form delivery may be worse. Use it only as a stopgap, then do Option A.

**Then ship the canonical change.** Branch `seo-optimization` sets `site.url` to `https://www.brokrsuite.in`; the build is verified. Until it reaches `main`, canonical tags point at the apex, which redirects to www. Ship it as a small PR to `main`, containing only `config/site.ts`, without the lockfile upgrade, to keep the deploy low-risk.

**Afterwards:**
- In `broker-suite-taniya-fbvw` → **Settings → Git → Disconnect** to stop the duplicate builds. Nothing is deleted.
- Check the deployment-retention settings (**Settings → Security → Deployment Retention**) so the production deployment can't be removed again.

## Verify
Run `bash docs/seo/verify-domain.sh` (read-only). It checks:
- `https://brokrsuite.in/`, `http://brokrsuite.in/` and `http://www.brokrsuite.in/` each 301/308 straight to `https://www.brokrsuite.in/`, including the path;
- all 9 pages plus `robots.txt` and `sitemap.xml` return 200 on www;
- an unknown URL returns 404;
- canonical, sitemap and robots URLs use www (the last check passes only after the canonical PR is deployed).
