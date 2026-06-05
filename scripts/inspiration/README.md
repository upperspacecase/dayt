# The Dayt Knight engine

Source → generate → review → publish. The loop that fills the library.

```
sources.mjs   the people we learn from (NYC date editors + creators), each with a credit
harvest.mjs   reads each source's page text through a real browser (pinchtab) -> harvest.json
generate.mjs  Claude writes original, complete concepts from that inspiration -> Mongo drafts
/admin        you approve the good ones; approved drafts go live in the Club, credited
```

## The method

We learn from people who do NYC dating well and we **credit them**. The engine reads their
writing for the *pattern* of a good night — then writes its own complete concepts. It never
copies a spot or a sentence. Every published concept links back to the source that inspired it.

Instagram has no usable public API and isn't scraped. To learn from a creator, add their
**website or newsletter** to `sources.mjs` with their site as the credit.

We do not use Reddit.

## Run it

```bash
# 1. start a browser instance, note its port
pinchtab instance start
pinchtab instances

# 2. harvest (real page text -> harvest.json)
PT_PORT=<port> node scripts/inspiration/harvest.mjs

# 3. generate drafts into Mongo (keys injected from 1Password)
op run --env-file=scripts/inspiration/.env.tpl -- node scripts/inspiration/generate.mjs

# 4. review + publish at /admin (needs the editor key)
```

`.env.tpl` (op references, not secrets):

```
ANTHROPIC_API_KEY=op://Dev/Anthropic API - dayt-knight/credential
MONGODB_URI=op://Dev/MongoDB - dayt-knight/credential
```

Drafts land at `status: "draft"` and never appear publicly until approved.
