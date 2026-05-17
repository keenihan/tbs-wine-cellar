 TBS Wine Cellar — PWA

A full-featured personal wine cellar management app designed for Android (Samsung) phones.
Installable as a home screen app. Works offline. Data stored on your device.

---

## ⚠️ One-Time Setup — API Key (required for Auto-fetch & Barcode lookup)

The wine auto-fetch feature uses the Anthropic API with live web search to identify any
Australian wine — Henschke, Grosset, Penfolds, boutique producers, everything. You need
to add your API key to Netlify once, then it works forever.

### Step 1 — Get a free Anthropic API key
1. Go to **https://console.anthropic.com/settings/keys**
2. Sign up or log in
3. Click **Create Key** → copy the key (starts with `sk-ant-`)

### Step 2 — Add the key to Netlify
1. Go to your **Netlify dashboard** → click your site
2. Click **Site configuration** → **Environment variables**
3. Click **Add a variable**
4. Key: `ANTHROPIC_API_KEY`  |  Value: `sk-ant-xxxxxxxx` (your key)
5. Click **Save**

### Step 3 — Redeploy
1. In Netlify: click **Deploys** tab → **Trigger deploy** → **Deploy site**
2. Wait ~30 seconds — done!

After this, barcode scanning and Auto-fetch will work for any wine.

---

## Deploying to Netlify (if not already done)

1. Go to **netlify.com** → create a free account
2. Drag and drop the unzipped `tbs-wine-cellar` folder onto the Netlify dashboard
3. You'll get an HTTPS URL (e.g. `sparkling-wine-abc123.netlify.app`)
4. Follow the API key setup steps above
5. Open the URL in **Chrome** on your Samsung phone
6. Tap **⋮ → Add to Home screen → Install**

---

## Features

- ✅ Vintage year, wine name, producer/winery
- ✅ Wine type — red, white, rosé, sparkling, dessert, fortified
- ✅ Region, state and country
- ✅ Grape varieties with percentages
- ✅ Bottle count
- ✅ Drinking window with visual progress bar
- ✅ AI-powered auto-fetch with live web search (finds any AU wine)
- ✅ Expert rating (out of 100) from Halliday, Wine Advocate, etc.
- ✅ Vintage quality ranking notes
- ✅ Personal tasting notes and personal rating
- ✅ Real Review deep link
- ✅ Label photography (uses device camera)
- ✅ Barcode scanning → auto-identifies wine via web search
- ✅ Food matches
- ✅ Sort by vintage, winery A–Z, dominant grape, drink-by date, rating
- ✅ Filter by wine type
- ✅ Drink Soon tab — wines in window, opening soon, past window
- ✅ Insights tab — cellar value, type breakdown, country breakdown
- ✅ Export/Import JSON backup
- ✅ Share individual wine via Android share sheet
- ✅ Installable as home screen PWA (offline capable)

---

## Files in this Package

```
tbs-wine-cellar/
├── index.html                      ← The complete app
├── manifest.json                   ← PWA manifest
├── sw.js                           ← Service worker (offline)
├── netlify.toml                    ← Netlify configuration
├── netlify/functions/
│   └── wine-lookup.js              ← Serverless proxy (fixes CORS)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## Sharing with Another Android Phone

**Method 1 — Share the URL:** Send your Netlify URL to the other person. They open it
in Chrome and install it the same way. Both devices share the same lookup feature.

**Method 2 — Export/Import:** Share tab → Export as JSON → send file → Import on other device.

---

## Data Storage

All wine data is stored in your browser's **localStorage** — on your device only, never uploaded.
Use **Export** regularly as a backup. If you clear browser/site data, your cellar will be lost.

---

*TBS Wine Cellar — built for serious Australian wine collectors*
