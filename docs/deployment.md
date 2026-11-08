# Deployment runbook

This document covers taking the site from a local checkout to a production
deployment, plus the checks that prove the forms, SEO endpoints and error
handling are working after a release. For the project overview and the database
schema, start with [README.md](../README.md).

The site is a standard Next.js 16 application. It has no build-time dependency
on Supabase, Resend or any other service: with no environment variables set it
still builds and runs, and the forms return an honest "not connected" error
instead of pretending a submission succeeded.

---

## 1. Prerequisites

| Requirement | Version | Notes |
| --- | --- | --- |
| Node.js | 20.9 or newer | `next@16` requires `>=20.9.0`. Node 22 LTS is recommended. |
| npm | 10 or newer | The project uses `package-lock.json`. |
| Supabase project | — | Optional. Required only for storing form submissions. |
| Resend account | — | Optional. Required only for email notifications. |

Windows commands are shown with `npm.cmd`; on macOS and Linux use `npm`.

---

## 2. Supabase setup

1. Create a Supabase project and note the **project URL**, the **anon key** and
   the **service role key** (Project settings → API).
2. Open the SQL editor and run the schema from the
   [README's Supabase setup section](../README.md#supabase-setup). It creates
   `quote_requests` and `contact_messages` with row-level security enabled and
   no public policies.
3. Add the values to the deployment environment:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
   ```

The API routes write through `SUPABASE_SERVICE_ROLE_KEY`, which bypasses row
level security and must never be exposed to the browser or prefixed with
`NEXT_PUBLIC_`. The anon key alone is not sufficient unless you add an `INSERT`
policy for the `anon` role on both tables; the service-role key is the
recommended setup because writes happen only on the server.

> If both keys are absent the API routes return `503` and the UI shows the real
> error message. That is the intended behaviour, not a bug.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` for local development. The full table,
including which variables are required, lives in the
[README](../README.md#environment-variables). The two rules that matter most:

- `NEXT_PUBLIC_SITE_URL` must be the canonical production origin with **no
  trailing slash** (`https://example.co.uk`). It is used for canonical links,
  Open Graph URLs, `sitemap.xml` and `robots.txt`.
- `RESEND_FROM_EMAIL` (read by `src/lib/leads.ts`) is optional and not listed in
  `.env.example`; it defaults to `quotes@primehouseremovals.co.uk` and must be an
  address on a domain verified in Resend, otherwise notification emails are
  rejected by the provider.

Set every variable in both the **Production** and **Preview** environments of
your host. Preview deployments should use a preview `NEXT_PUBLIC_SITE_URL` (or
be marked no-index) so staging URLs never appear in canonical tags.

---

## 4. Build and run locally

```bash
npm.cmd run typecheck   # tsc --noEmit
npm.cmd run lint        # eslint .
npm.cmd run build       # next build
npm.cmd run start       # serve the production build
```

`npm.cmd run dev` starts the development server. Do not run `next build` and
`next dev` at the same time — they share the `.next` directory.

`npm.cmd run shots` (or `node qa/qa.mjs` directly) runs the Playwright QA
harness in `qa/` against a running server. It writes screenshots and a report to
`qa/output/`; see the script header for the expected port and arguments.

---

## 5. Deploying to Vercel

1. Push the repository to your Git provider and import it in Vercel.
2. Framework preset: **Next.js**. Build command `npm run build`, output
   directory `.next`, install command `npm install`.
3. Add the environment variables from section 3 to Production (and Preview).
4. Deploy. The first deployment can run without Supabase; add the keys and
   redeploy once the database is ready.

Any Node.js host works as well: run `npm run build`, then `npm run start` with
the environment variables present. The app uses no Vercel-only features.

### Custom domain

1. Add the domain in the host's dashboard and point DNS at it.
2. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` origin.
3. Redeploy so `sitemap.xml`, `robots.txt`, canonical tags and the generated
   Open Graph image pick up the new host.

---

## 6. Optional email notifications

Submissions are always stored in Supabase (when configured). Email is a second,
optional notification channel handled in `src/lib/leads.ts`:

```
RESEND_API_KEY=<key>
QUOTE_NOTIFICATION_EMAIL=<where notifications should arrive>
RESEND_FROM_EMAIL=<verified sender on your Resend domain>
```

If either `RESEND_API_KEY` or `QUOTE_NOTIFICATION_EMAIL` is missing, no email is
sent and the submission is only stored. A failed email never fails the
submission: the record is already saved and the error is logged server-side.

---

## 7. Post-deployment verification

Run through this list after the first production deploy and after any change to
routing, metadata or the forms.

### SEO and metadata

- [ ] `https://<domain>/sitemap.xml` returns XML containing the home page, the
      services index, all seven service pages, quote, about and contact.
- [ ] `https://<domain>/robots.txt` returns `Allow: /`, `Disallow: /api/` and a
      `Sitemap:` line pointing at the production host.
- [ ] `https://<domain>/opengraph-image` returns a `1200x630` PNG (content type
      `image/png`) and the card renders the wordmark and tagline.
- [ ] `https://<domain>/manifest.webmanifest` returns the manifest with
      `theme_color: #0d1a2b`.
- [ ] A social share debugger (for example the Open Graph preview in your
      provider of choice) resolves the title, description and image.

### Pages and error states

- [ ] Every route in the header and footer returns `200`.
- [ ] An unknown URL (for example `/this-page-does-not-exist`) returns a
      designed 404 with the links back to home, services, quote and contact.
- [ ] The 404 page does not render the site's main navigation twice or overflow
      horizontally at 375px.

### Forms

- [ ] Submit a real quote request with Supabase configured: the confirmation
      panel shows the returned reference (`PHR-Q-…`) and a row appears in
      `quote_requests` with `status = 'new'`.
- [ ] Submit a contact message: the confirmation panel shows a `PHR-C-…`
      reference and a row appears in `contact_messages`.
- [ ] Temporarily remove the Supabase keys: the form shows the honest
      "not connected" error and no confirmation panel appears.
- [ ] Submit more than five times in a minute from one IP: the API returns
      `429` and the UI reports it.

### Operations

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is present only in server-side environment
      settings, never in client bundles.
- [ ] Database backups are enabled on the Supabase project.
- [ ] A data-retention routine exists for `quote_requests` and
      `contact_messages`: personal data should be deleted once an enquiry has
      been handled and is no longer needed.

---

## 8. Operational notes

- **Rate limiting is per instance and in memory.** `src/lib/rate-limit.ts`
  resets when the process restarts and does not coordinate across multiple
  instances. It is sufficient for a single-instance deployment; if you scale
  horizontally, replace it with a shared store (for example Redis or Upstash)
  behind the same `rateLimit`/`clientKey` interface.
- **No analytics, tag managers or third-party trackers are installed.** If you
  add them, update the privacy copy and consider a consent mechanism.
- **The site has no CMS.** Content lives in `src/content/*` and
  `src/config/site.ts`; changes ship through a commit and a deploy.
- **Rollback** is a redeploy of the previous build. Database schema changes are
  applied manually in the Supabase SQL editor, so keep the SQL you run under
  version control (see the README schema).
- **Monitoring:** the API routes log storage and email failures to the server
  console. Configure your host's log drain if you need alerts.
