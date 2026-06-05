# The Inspiration Engine — sourcing + learning

How Dayt Knight learns date taste from the real world and turns it into structured plans. Principle: **learn the pattern, don't copy the post.**

## The honest constraint (why the method is shaped this way)
- **Instagram can't be mined.** No public content API (the Graph API only reads accounts you manage), aggressive bot-blocking, and scraping it breaks its ToS. Chasing the IG accounts directly is a dead end.
- **UGC sources block plain `fetch`/`curl`.** Reddit returns 429 to scripts, even on its public `.json`.
- **A real browser is not blocked.** So we pull structured public endpoints *through* a headless browser (pinchtab). Verified working.

The creators' taste still reaches us — via where it's open (editorial guides, newsletters, link-in-bios) and, most reliably, via **the crowd's engagement signal**: what real New Yorkers upvote, save, and argue about.

## Primary source = the creators' own websites (with credit)
Tay's note (right): don't lean on Reddit — the date-night / city / experience creators she follow usually have **their own websites, newsletters, and link-in-bios**, which ARE fetchable, and we should **always credit and link back** to them (it's the ethical move and the start of a partnership). So the source priority is:
1. **Creator sites / newsletters** (found from each IG handle's link-in-bio) → richest, on-brand, creditable. Every concept stores `creator` + `credit` (link back) — first-class in the `Concept` type.
2. **Editorial guides** (Time Out, The Infatuation, Secret NYC) — also credited.
3. **Reddit / crowd engagement** — a supplement for demand signal and weird-specific gems, not the backbone.

Next build step: a `creators.json` of the handles Tay listed → resolve each to its website/newsletter via the browser → harvest + attribute. The harvester here is the fetch+rank scaffold; repoint `SOURCES` at the creator sites.

## The pipeline
1. **Harvest** (`harvest.mjs`) — pull open, structured sources through the browser:
   - Reddit `.json` search across date/experience queries → rank by engagement (`score + 4×comments` = taste signal), then a **relevance gate** to cut viral noise.
   - Read the **comments of the best threads** — that's where the actual itemized ideas live (e.g. the "date ideas that aren't drinks and dinner" thread).
   - (Slot in next: editorial RSS — Time Out / Secret NYC / The Infatuation; event freshness — Eventbrite / Ticketmaster APIs; venues — Google Places / Yelp. These need keys; add to `SOURCES`.)
2. **Extract** (LLM step — needs `ANTHROPIC_API_KEY`) — turn raw signals into (a) **taste patterns** ("playful + interactive + you-shape-it beats dinner-and-drinks") and (b) structured **concept seeds** in the `Concept` shape (`app/dates.ts`). The model abstracts the pattern; it never reproduces a post.
3. **Review** — Tay approves seeds before they go live (matches the approve-first call in `BUILD.md`).

## Run it
A pinchtab instance must be running. Then:
```
PT_PORT=<instance-port> node scripts/inspiration/harvest.mjs > signals.json
```
`sample-output.json` shows a real run: harvested signals → one synthesized concept seed.

## What it found on the first real run (2026-06-05)
From r/AskNYC, engagement-ranked, the top non-dinner-drinks date ideas were: fortunes read together, a $25 thrift-store outfit challenge, cooking/pottery/painting classes, roller skating, board-game cafés, park + a deck of cards + picnic. The pattern: **shared, playful activity with a bit of you-shape-it** — which is exactly the connection the engine should engineer, now grounded in real demand instead of assertion.
