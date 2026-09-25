# Events Feature — Design & Decision Log

> **Status:** 🟡 In design (brainstorming). NOT yet approved for implementation.
> **Author:** Pengrui (Pengi) with Claude, pairing.
> **Date started:** 2026-06-01
> **Repo:** `web-2.0` (Next.js 16 + Payload 3 + MongoDB)
> **Trello:** Card #12 `[UI/API] Create Events Page` (In Progress, assigned Pengi)
>
> ### ⛔ REVIEW GATE
> This document exists so Pengi can study **how** the design decisions were made,
> not just the result. **We do not start implementation in the next session until
> Pengi confirms they have read this doc end-to-end.** Claude must ask
> "Have you reviewed the events design doc?" before any code is written.

---

## 0. How to read this doc (and how I make these decisions)

This is written to be a teaching artifact, so the reasoning is explicit. Two things
to internalize, because they're the actual transferable skill:

**(a) I attack the biggest forks first.** A "fork" is a decision that, once made,
deletes or creates large amounts of downstream work. I deliberately asked about the
**calendar integration** and **RSVP identity** *before* asking about field names or
button colors, because those two answers change the architecture by 5–10x. Cheap,
reversible decisions (what to name a field) can be made later or even during coding.
Expensive, hard-to-reverse decisions (do we need OAuth? do users need accounts?) get
decided first, on purpose, while changing our mind is still free.

> Industry name for this: **"deciding at the last responsible moment"** and
> **"reversible vs. irreversible decisions"** (Amazon calls these *two-way doors* vs.
> *one-way doors*). Spend your decision-energy on the one-way doors.

**(b) YAGNI — "You Aren't Gonna Need It."** For every feature the vision mentions, I
ask: *does v1 actually need this, or am I building for an imagined future?* Anything
not needed for the first usable version gets cut from v1 and parked in a "Later"
list. This is not laziness — unbuilt code has zero bugs and zero maintenance cost.
The art is leaving **cheap seams** so the future feature can slot in without a rewrite
(see Decision D3, the multi-org seam).

**(c) Copy the codebase's existing patterns.** The most "reputable" and efficient code
is code that looks like it was always there. Before designing anything I read your
`contactForms`, `projects`, and `access/*` files. The design below is deliberately a
re-mix of patterns you already ship, not a novel invention. Reviewers trust code that
matches house style; novelty is a cost you pay only when it buys something.

---

## 1. Context — what already exists in the repo (the patterns we copy)

Grounding the design in real files (so the implementation matches house style):

| Concern | Existing example in repo | What we reuse |
|---|---|---|
| Public form → email on submit | `src/payload/collections/contactForms.collection.tsx` | `access: { create: anyone, read: adminsOnly }` + `afterChange` create-hook that `render()`s a React-Email and calls `req.payload.sendEmail(...)`. **This is the RSVP flow, almost verbatim.** |
| Localized content collection w/ admin CRUD | `src/payload/collections/projects.collection.ts` | `access: { create/update/delete: adminsOnly, read: () => true }`, `localized: true` text/richText, `image` upload → `media`. **This is the Event collection.** |
| Access control helpers | `src/payload/access/{adminsOnly,anyone,isSelfOrAdmin}.ts` | Reuse as-is. `adminsOnly` checks `req.user.collection === 'admins'`. |
| Email transport | `payload.config.ts` → `resendAdapter(...)` | `req.payload.sendEmail({ from, to, subject, html })`. No new transport needed. |
| Email templates | `src/payload/emails/*.tsx` (React-Email) | New `EventRsvpConfirmationEmail.tsx` in the same folder, same component style. |
| Admin user collection | `admins` (this is the YAHPA admin Pengi will create) | Events `adminsOnly` access ties to this. |
| i18n | `localization: { locales: ['en','fr'] }`, routes under `src/app/(frontend)/[locale]/...` | Event content localized en/fr; pages at `/[locale]/events`. |
| Frontend page template | `src/app/(frontend)/[locale]/projects/` | Template for `/events` list + `/events/[slug]` detail. |
| Form stack | `react-hook-form` + `zod` + `@hookform/resolvers` (in `package.json`) | RSVP form validation, client + server (zod schema shared). |
| Date utils | `date-fns` (in `package.json`) | Formatting; ICS/Google date strings. |

**Not yet present (must add):** a calendar-file generator. Recommendation in D5.

---

## 2. Product vision (captured in Pengi's words)

> "I want to be able to publish events for everyone to see. They can RSVP for it and
> get sent an email with an iCal attachment or Google or whatever, and have a cal hold
> made. The admin account that will publish events will CRUD all events (YAHPA admin).
> Down the line, other organizations should have the ability to create/manage events
> with YAHPA admin account having sudo superuser privileges to also CRUD that event as
> a risk measure."

Distilled into capabilities:

1. **Publish** public events (YAHPA admin authors them).
2. **Discover** — anyone can browse/see events (`/events` + detail page).
3. **RSVP** — anyone can RSVP with name + email (no login).
4. **Calendar hold** — on RSVP, email the attendee a `.ics` attachment **and** an
   "Add to Google Calendar" link.
5. **Admin CRUD** — YAHPA admin has full create/read/update/delete on all events.
6. **(FUTURE) Multi-tenant** — other orgs author/manage their own events; YAHPA admin
   is a superuser who can also CRUD any org's events (a safety/moderation lever).
7. **admin ca view list of event info and assoc attendees and their rsvp status and can also edit that status directly.
---

## 3. Decision Log

Each entry: the fork, the options weighed, what we chose, **why**, the industry
practice it reflects, and what work it saved.

### D1 — Calendar hold: how the event reaches the attendee's calendar
- **Options:** (a) email a `.ics` attachment only; (b) write directly into the user's
  Google Calendar via OAuth + Google Calendar API; (c) **both**, where "Google" means
  an *"Add to Google Calendar" template link*, not API write-in.
- **Decision:** **(c)** — email contains BOTH a `.ics` attachment AND a Google Calendar
  "render" link. Crucially, **no OAuth, no Google API, no token storage.**
- **Why:** The killer insight is that "support Google" does **not** require Google's
  API. Google accepts a stateless URL
  (`https://calendar.google.com/calendar/render?action=TEMPLATE&...`) that pre-fills an
  event the user saves with one tap. So both deliverables are just **generated text in
  an email** — a file and a link. Option (b)'s OAuth flow (Google Cloud project, consent
  screen verification, access+refresh token vault, refresh logic, a whole security
  surface) would have been **weeks** of work and an ongoing liability, to serve only
  Google users. We get 100% calendar coverage for ~1 day of work.
- **Industry practice:** *Prefer stateless integrations over stateful ones.* Every
  token you store is a thing you must secure, rotate, and explain in a privacy policy.
  The `.ics` file is an open standard (**RFC 5545 / iCalendar**) understood by Apple
  Calendar, Outlook, Google (via import), Fastmail, etc. — maximum interop, zero lock-in.
- **Saved:** ~2–3 weeks + an entire OAuth security/compliance surface.

### D2 — RSVP identity: login required, or open email-only?
- **Options:** (a) **open** — anyone RSVPs with name + email, no account; (b) login
  required (registry members only); (c) open now, attach `userId` later.
- **Decision:** **(a) open, email-only.** Schema is shaped so a `userId` *could* be
  added later (that's option (c)'s seam) but we build (a).
- **Why:** The vision says "events for **everyone** to see." A login wall on a public
  community event is a turnout-killer and contradicts the goal. The downside — someone
  could RSVP with a fake/other email — is **low stakes** for free public events (no
  payment, no limited seats in v1). The cost/benefit of an auth wall is negative here.
- **Industry practice:** *Match friction to stakes.* You add identity friction when the
  thing being protected is valuable (payments, limited capacity, private data). A free
  public RSVP isn't that. Also **progressive enhancement**: ship the low-friction path,
  keep the door open to add accounts later without a migration.
- **Saved:** auth wiring on the public path; a smaller, simpler RSVP record.

### D3 — Multi-org future: build now, or leave a seam? *(RECOMMENDED — needs Pengi's ✅)*
- **Options:** (a) build full multi-tenant org management now; (b) build single-tenant
  (YAHPA only) but add a cheap forward-compatible **seam**; (c) ignore the future
  entirely and bolt it on later with a migration.
- **Recommendation:** **(b).** v1 is single-tenant (only YAHPA admins author events),
  BUT the `events` collection gets an optional `organizer` field now (a relationship,
  nullable, effectively "YAHPA" when empty). We do **not** build org signup, org roles,
  or org dashboards in v1.
- **Why:** Multi-tenant is a genuine one-way door at the **data layer** — retrofitting
  an ownership column onto a table full of rows, plus rewriting every access rule, is
  the expensive kind of change. But the *seam* (one nullable field + access rules
  written in terms of "owner OR superadmin" from day one) is nearly free to add now and
  saves a painful migration later. We design the **shape** for multi-tenant and build the
  **behavior** for single-tenant. The "YAHPA admin is superuser over all orgs' events"
  requirement is literally just the `adminsOnly` access rule we already have — superuser
  is the default and the per-org scoping is the thing we add later.
- **Industry practice:** *Design the seam, don't build the room.* a.k.a. "make the
  change easy, then make the easy change." Model the future in the schema; defer the
  feature.
- **Status:** ⚠️ **Confirm with Pengi.** If you'd rather have *zero* future-facing
  fields in v1 (pure YAGNI), we drop the `organizer` field and accept a small migration
  later. My recommendation is to keep the seam.

### D4 — Admin CRUD: hand-build screens, or use Payload's admin panel?
- **Decision:** Use **Payload's built-in admin panel** + `adminsOnly` access. We write
  **zero** custom CRUD UI for admins.
- **Why:** Payload generates a full create/read/update/delete admin UI from the
  collection config automatically (you already get this for `projects`, `registryMembers`,
  etc.). Hand-rolling admin CRUD would be re-implementing a solved problem and is exactly
  the kind of thing that makes a junior's PR look like wasted effort.
- **Industry practice:** *Don't rebuild what the framework gives you.* The reputable move
  is leveraging the platform's batteries, not reinventing them.

### D5 — Generating the `.ics` file: hand-roll the string, or use a library?
- **Options:** (a) hand-roll the iCalendar text; (b) use the **`ics`** npm package.
- **Recommendation:** **(b) the `ics` package.** Tiny, zero-runtime-deps, RFC 5545
  compliant, TypeScript-friendly.
- **Why:** iCalendar *looks* trivial but has sharp edges: line-folding at 75 octets,
  escaping commas/semicolons/newlines, correct `UID`/`DTSTAMP`, CRLF line endings. These
  are the kind of details that "work on my machine" then break in Outlook. A 2KB library
  that's gotten the RFC right is the efficient, reputable choice over re-deriving a spec.
- **Industry practice:** *Don't reimplement a standard format by hand* unless the
  dependency cost is real. Here it isn't.
- **Google link** needs no library — it's a URL we build with `URLSearchParams` and a
  `date-fns` UTC format (`yyyyMMdd'T'HHmmss'Z'`).

### D6 — Sending the RSVP email: where and how?
- **Decision:** A Payload **`afterChange` hook** on the `event-rsvps` collection, gated
  on `operation === 'create'` — copied directly from `contactForms.collection.tsx`. It
  renders `EventRsvpConfirmationEmail` (React-Email) and calls `req.payload.sendEmail`,
  passing the `.ics` as an **attachment** and the Google link inside the email body.
- **Why:** Co-locating the side-effect with the data event (an RSVP row was created) is
  the pattern already in the codebase, so reviewers recognize it instantly. Hooks keep the
  HTTP route handler thin.
- **Idempotency / double-RSVP:** add a `beforeValidate` (or `beforeChange`) hook that
  rejects a second RSVP for the same `(event, email)` pair with a friendly error, so a
  double-click or refresh doesn't spam two confirmation emails. *(Industry term:
  **idempotency** — the same request applied twice has the same effect as once.)*

### D7 — Explicit v1 scope cuts (YAGNI parking lot)
Cut from v1, parked for later (each is a deliberate decision, not an oversight):
- ❌ Capacity limits / waitlists (no limited seats in v1 → not needed).
- ❌ RSVP cancellation / self-service edit (low value v1; admin can delete an RSVP).
- ❌ Recurring events.
- ❌ Reminder emails ("event is tomorrow") — nice, but a cron/scheduling concern; later.
- ❌ Org self-service management (the D3 future).
- ❌ Paid/ticketed events.
- ✅ Kept in v1: publish, browse, RSVP, dual calendar hold, admin CRUD, en/fr content.

---

## 4. Proposed architecture & data model

Two new collections, one util, one email, two routes, one server action/route.

### 4.1 `events` collection — `src/payload/collections/events.collection.ts`
Mirrors `projects` (localized content + admin CRUD + public read).

```ts
// shape (illustrative, not final)
{
  slug: 'events',
  admin: { useAsTitle: 'title', defaultColumns: ['title','startsAt','location'] },
  access: { read: () => true, create: adminsOnly, update: adminsOnly, delete: adminsOnly },
  fields: [
    { name: 'title',       type: 'text',     required: true, localized: true },
    { name: 'slug',         type: 'text',     required: true, unique: true,    // for /events/[slug]
      admin: { description: 'URL-safe id, e.g. spring-mixer-2026' } },
    { name: 'description',  type: 'richText', required: true, localized: true },
    { name: 'startsAt',     type: 'date',     required: true },                 // store UTC
    { name: 'endsAt',       type: 'date',     required: true },
    { name: 'location',     type: 'group', fields: [
        { name: 'mode', type: 'select', options: ['in_person','virtual'], required: true },
        { name: 'address', type: 'text',  localized: true },   // when in_person
        { name: 'url',     type: 'text' },                     // when virtual
    ]},
    { name: 'image',        type: 'upload',  relationTo: 'media' },
    { name: 'published',    type: 'checkbox', defaultValue: false },            // draft vs live
    // D3 seam (nullable; empty => YAHPA). NOT exposed for self-service in v1.
    { name: 'organizer',    type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
}
```
Register in `payload.config.ts` `collections: [...]` (same as every other collection).

### 4.2 `event-rsvps` collection — `src/payload/collections/eventRsvps.collection.tsx`
Mirrors `contactForms` (public create, admin read, email-on-create hook).

```ts
{
  slug: 'event-rsvps',
  access: { create: anyone, read: adminsOnly, update: () => false, delete: adminsOnly },
  hooks: {
    beforeValidate: [rejectDuplicateRsvp],   // D6 idempotency
    afterChange:   [sendRsvpConfirmation],    // D6 email + .ics + google link
  },
  fields: [
    { name: 'event', type: 'relationship', relationTo: 'events', required: true },
    { name: 'name',  type: 'text',  required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'status', type: 'select', options: ['going','cancelled'], defaultValue: 'going' },
    // future seam: { name: 'user', type: 'relationship', relationTo: 'users' }
  ],
}
```

### 4.3 Calendar util — `src/lib/calendar.ts`
- `buildIcs(event): string` → uses the `ics` package; returns RFC 5545 text.
- `buildGoogleCalendarUrl(event): string` → `URLSearchParams` + `date-fns` UTC format.
- Pure functions, no I/O → trivially unit-testable (see Sprint 1 Definition of Done).

### 4.4 Email — `src/payload/emails/EventRsvpConfirmationEmail.tsx`
React-Email component (same style as `ContactFormReceivedEmail.tsx`): greeting, event
summary, the **Add to Google Calendar** button (the render URL), and a note that the
`.ics` is attached. The `.ics` rides as a `sendEmail` **attachment**, not inline.

### 4.5 Frontend — `src/app/(frontend)/[locale]/events/`
- `page.tsx` — list of published, upcoming events (copy `projects/` page).
- `[slug]/page.tsx` — event detail + the RSVP form.
- RSVP form = `react-hook-form` + `zod` (client validation) → POST to a route handler /
  server action that creates the `event-rsvps` doc via Payload's local API (which fires
  the hook → email). zod schema **shared** between client and the server boundary.

---

## 5. Data flow — RSVP sequence

```
Visitor on /[locale]/events/[slug]
        │  fills RSVP form (name, email)  ── zod validates client-side
        ▼
POST (route handler / server action)
        │  zod validates server-side (never trust the client)
        ▼
payload.create({ collection: 'event-rsvps', data })
        │
        ├─ beforeValidate hook: already RSVP'd with this email? → reject (idempotent)
        │
        └─ afterChange (operation === 'create'):
                 ├─ buildIcs(event)               → event.ics (RFC 5545)
                 ├─ buildGoogleCalendarUrl(event) → https://calendar.google.com/render?...
                 ├─ render(<EventRsvpConfirmationEmail .../>)  → html
                 └─ payload.sendEmail({ to: email, html, attachments: [event.ics] })
        ▼
Attendee inbox: confirmation + 📎 event.ics + 🔗 Add to Google Calendar
```

---

## 6. Risks & edge cases (and how we handle them)

| Risk | Handling |
|---|---|
| **Double RSVP** (double-click/refresh) | `beforeValidate` rejects duplicate `(event,email)`; UI shows "you're already RSVP'd". |
| **Timezones** | Store `startsAt`/`endsAt` as **UTC** in Mongo. Emit ICS/Google in UTC (`...Z`). Display in the user's locale on the page. (Per-event display timezone = a later refinement; note it.) |
| **ICS interop bugs** | Delegated to the `ics` library (D5) — don't hand-roll the format. |
| **Email deliverability** | Already on Resend; same domain (`website@yahpa.org`) as existing mail. No new infra. |
| **Spam RSVPs / bots** | Low stakes in v1; if abused, add a honeypot field or rate-limit later (parked). |
| **Unpublished events leaking** | `read` returns events but the `/events` query filters `published == true`; consider an access rule that hides drafts from non-admins (refine in Sprint 2). |
| **Superuser future** | `adminsOnly` is already a superuser rule; multi-org scoping is additive (D3). |

---

## 7. Agile delivery plan (sprints, MoSCoW, Definition of Done)

We slice **vertically** — each sprint ships a thin end-to-end usable increment, not a
horizontal layer. "Build the whole DB, then the whole API, then the whole UI" (horizontal)
is how juniors stall for weeks with nothing demoable. Vertical slices are demoable every
sprint. *(Industry terms below are worth learning by name.)*

**MoSCoW prioritization** (Must / Should / Could / Won't-this-time):
- **Must:** publish event (admin), public list + detail, RSVP, confirmation email w/ ICS
  + Google link.
- **Should:** en/fr localization, draft vs published, duplicate-RSVP guard.
- **Could:** admin sees RSVP list/count, image on event card.
- **Won't (v1):** capacity, waitlist, reminders, org self-service, cancellation UI.

### Sprint 1 — "Walking skeleton": one event, one RSVP, one email
*Goal: prove the whole pipe end-to-end with the thinnest possible slice.*
- `events` collection (minimal fields) registered → admin can create one event.
- `event-rsvps` collection with `afterChange` email hook (plain confirmation, no calendar yet).
- `src/lib/calendar.ts` with `buildIcs` + `buildGoogleCalendarUrl` + **unit tests**.
- **Demo:** create an event in admin; RSVP via a minimal form; receive an email.
- **Definition of Done:** lint passes; `buildIcs`/`buildGoogleCalendarUrl` unit-tested;
  a real RSVP yields a real email in a test inbox; PR reviewed; merged behind nothing
  scary (it's all additive/new files).

### Sprint 2 — Calendar hold + public pages polish
- Wire ICS attachment + Google button into `EventRsvpConfirmationEmail`.
- `/events` list (published, upcoming) and `/events/[slug]` detail copied from `projects`.
- Duplicate-RSVP `beforeValidate` guard.
- **Demo:** browse events publicly, RSVP, get the dual calendar hold.
- **DoD:** ICS validates (imports cleanly into Apple + Google + Outlook); pages render
  en/fr; draft events hidden from public list.

### Sprint 3 — i18n, admin niceties, hardening
- Full en/fr localized content + UI strings (next-intl `messages/`).
- Admin: RSVP count per event (Payload join/virtual field or a simple column).
- Edge cases from §6; honeypot if needed.
- **DoD:** acceptance criteria (below) all green; doc updated.

### Backlog / Later (the D3 future, explicitly deferred)
- Org accounts + roles, per-org event ownership, org dashboards, YAHPA superuser scoping
  UI, reminder emails (cron), capacity/waitlist, ticketing.

**Acceptance criteria (v1 "done"):**
1. A YAHPA admin can create, edit, publish, and delete an event in the Payload admin.
2. Any visitor can see published upcoming events at `/events` and open a detail page.
3. A visitor can RSVP with name + email without logging in.
4. On RSVP they receive an email containing a working `.ics` attachment **and** a
   working "Add to Google Calendar" link, both with the correct date/time/title/location.
5. Event content displays in both `en` and `fr`.
6. A duplicate RSVP (same email, same event) does not create a second record or email.

---

## 8. Open questions to confirm before coding
1. **D3 seam** — keep the nullable `organizer` field in v1 (recommended), or pure YAGNI
   with no future fields? *(default: keep the seam)*
2. **Event fields** — is `{title, slug, description, startsAt, endsAt, location(mode/
   address/url), image, published}` the right v1 set? Anything YAHPA-specific to add
   (e.g., registration link, host name, tags/categories)?
3. **Testing** — the repo has no test runner configured yet. Do we add **Vitest** for the
   `calendar.ts` unit tests (recommended — cheap, and it makes your PRs look rigorous), or
   skip automated tests for v1?
4. **RSVP endpoint** — Next.js **server action** vs a **route handler** for the RSVP
   submit? (Both fine; server action is more idiomatic in App Router. Lean: server action.)

---

## 9. Glossary (terms used above, worth knowing by name)
- **One-way / two-way door** — irreversible vs. reversible decision; spend effort on the
  irreversible ones.
- **YAGNI** — "You Aren't Gonna Need It"; don't build for imagined futures.
- **Vertical slice** — a thin feature cutting through DB→API→UI, demoable each sprint.
- **MoSCoW** — Must/Should/Could/Won't prioritization.
- **Idempotency** — same operation applied twice == applied once.
- **Seam** — a deliberately placed, low-cost extension point for a future change.
- **Definition of Done (DoD)** — the checklist a story must pass to count as complete.
- **Progressive enhancement** — ship the simple path; layer richer behavior on top later.
- **RFC 5545 / iCalendar** — the open standard for `.ics` calendar files.
- **Stateless integration** — one that stores no per-user tokens/credentials.
```
