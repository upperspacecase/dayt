# The Engine

The engine is what makes Dayt Knight Dayt Knight. It produces **complete date concepts** — not a one-line idea, the whole night and how it comes together — for the free daily-3, the Club's unlimited feed, and the reels.

Read `BRAND.md` first. The science is the **kitchen, not the menu**: it shapes every concept, but the user never sees a formula. They get a great night.

## The concept schema
Every concept is a complete, ready-to-live thing:

| Field | What it is |
|---|---|
| `title` | a name with desire in it |
| `desc` (hook) | one line that makes you want to be there |
| `location` | the neighborhood / landmark |
| `costEst` | an honest estimate or range (e.g. "~$30") |
| `duration` | rough length |
| `energy` | Low-key / Active / Hands-on |
| `stage` | New / Together a while / Either |
| `tags` | 2–3 vibe words |
| `arc` | the play-by-play, 3–4 beats |
| `moment` | the one beat that makes the night — the engineered peak / the connecting move |
| `bring` | what to bring |
| `backup` | the plan if it rains or it's closed |
| `image` | optional photo; cards fall back to an editorial gradient |

## The kitchen (how the science shapes a concept, invisibly)
Lean on these as guidance, not a checklist. A good concept usually leans on one or two, not all of them:
- **Novelty / shared firsts** — doing something new together expands the relationship. Mundane is the enemy.
- **A little arousal** — awe, a view, mild adrenaline, real laughter. The feeling gets attributed to the person you're with.
- **One real moment of disclosure** — a question or a beat that invites a little vulnerability, met with attention. This lives in `moment`, phrased naturally ("ask them what they'd do with a year that couldn't fail"), never labeled.
- **A designed peak and a clean ending** — people remember the best beat and the last beat, not the average. Build both.
- **Kill the admin** — the concept removes the planning: where, when, what to bring, the backup. That's the promise.

## Generation rules
- Be specific and sensory. "Roosevelt Island tram at 7:40" beats "a scenic ride".
- Follow `BRAND.md`: premium tone, no emojis, no banned filler words, never the word "cheap".
- **Honesty (Rule #1):** reference real public places (landmarks, parks, neighborhoods) and real experiences. Do not invent named venues with fabricated addresses, hours, or prices presented as fact. Frame logistics as suggestions and costs as estimates. The human curator verifies specifics before publishing.
- Range across stages, energy, budget, and the city — not all dinner-and-drinks.

## Where it learns from (Tay's research, 2026-06-05)
Principle: **learn creator taste patterns, don't copy their posts.** Study how good curators *package* experiences (what they pair, the rhythm, what gets saved/shared), abstract the pattern, and pour it into the plan slots (place / flow / mood / moment / backup).

Source types worth mining: date-night accounts (proven packaging), city bucket-list accounts (seasonal, high-save), food creators (the anchors: dinner/dessert/drinks/markets/late-night), experience/workshop creators (pottery, painting, pasta, dance, photo walks), romance/social creators (how people *talk* about dating). And the real edge: **people with access** — promoters, hosts, gallery people, DJs, restaurant PRs, photographers, private-club people, newsletter writers — they know what's good before it's obvious.

NYC accounts to start with (verify before relying): @nyc_date_nights (~180K), @nycdatenite (~107K), @datinglistnyc (~79K), @datethiscity (~69K), @nyc.date.spots (~51K), @my_nycbucketlist + NYC bucket-list accounts, @NYCPlugged / @newyorkbucketlist / @newyorkcity.explore (event freshness), Meet Cutes NYC (emotional language, not logistics), UpDating (dating culture/humor), ClassBento / workshop marketplaces (repeatable activity formats). "Forbidden Places" = unverified lead.

Note on EXO: the building-an-exo skill is for redesigning a whole firm around AI — heavier than this needs. The one idea that fits: the creators + their access are **community/crowd as a leveraged asset you don't own**, and the engine is the **algorithm** that turns their abundance into the structured product. Keep that as the lens; don't run the full playbook unless Tay asks.

## How it runs
- **Now (Phase 1):** concepts are model-authored up front, curated by Tay, committed to `app/dates.ts`. The landing rotates 3/day deterministically.
- **Later (scaling):** a script runs this spec against the Claude API in batches, writes candidates to a database, Tay approves, the Club feed and reels read from it. See `BUILD.md`.
