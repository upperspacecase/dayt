# Dayt Knight — Build Plan

Roadmap of record. Pairs with `BRAND.md` (the rules). Read both before building.

## Phase 0 — done
Live site on Vercel + `daytknight.club` + SSL. Email capture wired to Resend ("Dayt Knight" segment); verified sending domain. Secrets in 1Password (Dev vault) + Vercel. Static landing with 3 NYC concepts + detail pages (marketplace UI is visual-only). Next 16 + Tailwind v4 + pnpm.

## The core architectural idea
The engine is a **content factory, not a per-visitor generator.** It runs in the background, produces *complete* concepts (connection science is the hidden kitchen), and fills a **concept library** in the database. The free daily-3, the Club's unlimited feed, and the reels are all different views of that one library. Fast, low API cost, reviewable before publish, and "unlimited + filter" becomes a database query.

## Stack (chosen)
| Piece | Choice | Notes |
|---|---|---|
| Database | Neon Postgres | concepts, users, creators, sales |
| Engine | Claude API (Opus quality / Sonnet batch) | structured output; prompt carries the science |
| Auth | Firebase Auth (CLI-configured) | not needed until Phase 2 |
| Payments | Stripe Checkout (Club) + Connect (marketplace, ~70/30) | Connect not needed until Phase 3 |
| Publishing | Tay approves the first concept batches before they go live | move to auto once quality is trusted |

## Phases (each ships something real)

### Phase 1 — The engine + the free daily-3 (the heart) — SHIPPED 2026-06-05
- Engine spec lives in `ENGINE.md` (the concept schema + the connection-science "kitchen" prompt). Reusable for the automated pipeline later.
- Starter library hand-curated up front (model-authored, Tay-approved) and committed as a typed data file — no DB or API key in the running app yet.
- Landing shows **3 fresh each day**, rotated deterministically by date from the library. Each concept opens to the complete date, free. Removed the old $9 unlock from engine concepts (they're free; money is the Club + marketplace).
- Added a "send this to someone you'd do it with" share action (the growth loop).
- **Deferred to scaling (Phase 1→2 boundary):** Neon + the automated Claude-API generation loop + cron. Introduce when the library needs to grow continuously / feed the Club's dynamic unlimited feed. Prereqs then: Neon project, Anthropic API key.

### Phase 1.5 — Reels pipeline (light)
- Engine → 3 reel scripts + shotlists + the "send this to someone you'd do it with" caption, in batches. Tay posts.
- Ships: a content queue. Validates: the traffic loop.

### Phase 2 — Accounts + the Club
- Auth (Clerk), then Stripe Checkout subscription = the Club.
- Gate the unlimited feed + filters (area / vibe / budget) behind it.
- Ships: paid membership. Validates: will people pay to get in?

### Phase 3 — Creators + marketplace (heaviest)
- Creator profiles; build-your-own concept; list as a one-off (instant digital unlock) with Stripe Connect split; buy flow.
- Ships: the two-sided marketplace. Validates: supply + real transactions.

### Phase 4 — Concierge + premium
- Higher-touch creator concierge (booking/contact, real scarcity since a human delivers), milestone handling.
- Ships: the premium tier.

### Cross-cutting (slot in as needed)
Email retention (daily/weekly send — half-wired), light analytics, the guarantee mechanics.

## The honest path
Phase 1 is the whole bet. If the engine's ideas are not genuinely magic, nothing downstream matters. Build the engine, make the free daily-3 great, point the reels at it, watch whether people return and share. Do not touch Connect (Phase 3) until the engine and the Club prove demand.
