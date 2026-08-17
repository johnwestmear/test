# Christmas party RSVP — setup

This site now has a live golf spot counter, which needs a small serverless
function to run. That means deploying via Git or the Netlify CLI, rather
than the plain drag-and-drop you'd use for a static-only site — both are
quick, one-time setups.

## Option A: deploy via GitHub (recommended, easiest to update later)
1. Create a new repo on GitHub and push this folder to it (drag the files
   into GitHub's web uploader works fine if you don't use git day-to-day)
2. In Netlify: **Add new site > Import an existing project**, connect to
   that repo
3. Leave the build settings as-is (no build command needed, publish
   directory is `.`) — Netlify installs `@netlify/blobs` automatically
4. Every time you push a change to GitHub, the site redeploys itself

## Option B: deploy via Netlify CLI
1. Install the CLI once: `npm install -g netlify-cli`
2. From this folder, run `netlify deploy --prod`
3. Follow the prompts to log in and create/select a site

## Turn on email notifications
Netlify Forms collects every RSVP automatically (Site > Forms in your
dashboard), but won't email you unless you turn that on:
1. **Site configuration > Forms > Form notifications**
2. Add an **Email notification** pointing to `admin@tarrantbuilding.com.au`

## The live golf counter
- The golf card shows "X of 15 spots left" in real time, pulled from a
  small Netlify function (`netlify/functions/golf-spots.js`) backed by
  Netlify Blobs (a free built-in key-value store, no extra account needed)
- Every time a company RSVPs with golfers ticked, the count updates for
  everyone viewing the page
- Once it hits 15, the chip switches to "Golf is full — beach session
  still open" and confirmed RSVPs after that get a note that we'll
  confirm their golfers directly
- If you ever need to reset the count (say, for testing before launch),
  message me and I'll add a quick reset option — it's a one-line addition

## Things to check before sending it out
- **RSVP deadline** — currently Friday, 20 November 2026. Search
  `20 November 2026` in `index.html` to change it.
- **Venue links** — velocitygolf.com.au and aanukabeachhouse.com.au.
