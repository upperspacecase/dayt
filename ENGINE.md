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

## How it runs
- **Now (Phase 1):** concepts are model-authored up front, curated by Tay, committed to `app/dates.ts`. The landing rotates 3/day deterministically.
- **Later (scaling):** a script runs this spec against the Claude API in batches, writes candidates to a database, Tay approves, the Club feed and reels read from it. See `BUILD.md`.
