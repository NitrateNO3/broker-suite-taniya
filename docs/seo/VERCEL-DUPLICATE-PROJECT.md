# Disconnecting Git from `broker-suite-taniya-fbvw`

Goal: stop the duplicate project from building on every push, **without touching `broker-suite-taniya` or `www.brokrsuite.in`**. Nothing is deleted.

## Know which project is which before you click

| | **Keep — production** | **Disconnect — duplicate** |
|---|---|---|
| Name | `broker-suite-taniya` | `broker-suite-taniya-fbvw` |
| Project ID | `prj_yhDQ6QELNgGI8ry4gq0Hgi4RfLXc` | `prj_XRstIjYeaHrLNkBBuv5v6wb1eKqa` |
| Dashboard URL | `vercel.com/hiringquenchmark-1423s-projects/broker-suite-taniya` | `vercel.com/hiringquenchmark-1423s-projects/broker-suite-taniya-fbvw` |
| Domains tab shows | `www.brokrsuite.in`, `brokrsuite.in`, `broker-suite-taniya.vercel.app` | **only** `broker-suite-taniya-fbvw.vercel.app` |

**If the Domains tab shows `brokrsuite.in` in any form, you are in the wrong project. Stop.**

## Steps (about 2 minutes)

1. Sign in at vercel.com as **hiring.quenchmark@gmail.com**. The scope switcher at top left should read **hiringquenchmark-1423's projects**.
2. Open **`broker-suite-taniya-fbvw`**. Check that the browser address ends in `/broker-suite-taniya-fbvw`.
3. Open the **Domains** tab. Confirm the only entry is `broker-suite-taniya-fbvw.vercel.app`.
4. Go to **Settings → Git**.
5. Under **Connected Git Repository** (`NitrateNO3/broker-suite-taniya`), click **Disconnect**, then confirm.
   - *Softer alternative:* stay on the same page and, under **Ignored Build Step → Behavior**, choose **Don't build anything**, then **Save**. This keeps the Git link but no build ever runs. Choose either option; you don't need both.
6. *(Optional)* To stop its `.vercel.app` copy of the site from serving: **Settings → General → Pause Project**. This is reversible and deletes nothing.

## Do NOT
- Click Disconnect, or change anything at all, in **`broker-suite-taniya`**.
- Uninstall or reconfigure the **Vercel app on GitHub** (github.com → Settings → Applications → Vercel). It serves both projects, and removing it would stop production deploys.
- Delete either project, or remove any domain.

## Verify afterwards
1. **`broker-suite-taniya` → Settings → Git** still shows `NitrateNO3/broker-suite-taniya`, Production Branch `main`.
2. **`broker-suite-taniya` → Domains** still shows all three domains with **Valid Configuration**.
3. Run `bash docs/seo/verify-domain.sh`. It should report 24/24 PASS.
4. On the next push or merge, **Deployments** shows a new build only in `broker-suite-taniya`, and none in `-fbvw`.

## Undo
In `broker-suite-taniya-fbvw` → **Settings → Git → Connect Git Repository** → select `NitrateNO3/broker-suite-taniya`. If you used Ignored Build Step instead, set Behavior back to **Automatic**. Pause can be reversed with **Resume Project**.

## Why this is safe
Verified on 7 Nov 2026 (see `POST-DEPLOY-VERIFICATION.md`):
- The two projects share no domains.
- Production builds come from `broker-suite-taniya`'s own Git connection.
- The duplicate's env vars (`web3_forms`, `NEXT_PUBLIC_CONTACT_ENDPOINT`) aren't used by the code.
