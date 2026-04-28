# Math Flashcards

Static, hostable-anywhere flashcard app for math concepts.
Powers of 2 (1–10) and times tables (2–20, × 1–12) included out of the box —
add more concepts by editing `js/questions.js`.

- **Auth:** username + shared access code (default `math2026`).
- **Storage:** `localStorage` — progress is per-username, per-device.
- **Hosting:** GitHub Pages (any static host works).

## Architecture

```
Math Flashcards
├── Exponents of 2 (powers 1–10)
│   ├── Forward:  "2^n = ?"
│   └── Reverse:  "X is what exponent of 2?"
├── Times Tables (2–20)
│   ├── Forward:  "a × b = ?"
│   └── Reverse:  "X is what multiple of a?"
├── Mixed quiz   — random draw across all concepts
├── Single table — focused quiz on one base (× 7, × 13, etc.)
└── Review wrong — auto-built deck of questions you've missed
```

## Setup

### 1. (Optional) Change the access code

Default code is `math2026`. To rotate it:

```bash
echo -n 'NEW_CODE_HERE' | shasum -a 256
```

Paste the hash into `ACCESS_CODE_SHA256` in `js/config.js`.

### 2. Run locally

Any static server works. The simplest:

```bash
cd math-flashcards
python3 -m http.server 8000
# open http://localhost:8000
```

### 3. Deploy to GitHub Pages

```bash
# from inside the math-flashcards folder
git init
git add .
git commit -m "Initial commit: math flashcards"

# create a new repo on github.com (e.g. math-flashcards), then:
git branch -M main
git remote add origin git@github.com:YOUR_USER/math-flashcards.git
git push -u origin main
```

Then on GitHub:

1. Repo → **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder `/ (root)` → Save
4. After ~1 minute the site is live at `https://YOUR_USER.github.io/math-flashcards/`

Share the URL plus the access code with whoever you want to give access to.

## Adding more concepts later

Edit `js/questions.js`:

1. Push new question objects into the `qs` array.
   Each needs a stable `id`, a `topic`, a `subtopic`, a `group`, plus `q` and `a`.
2. Add a new entry to `window.QUIZ_MODES` so the home screen shows it.

That's it — push to GitHub and the site updates.

## Limitations (read this)

- **Soft auth.** The access code is hashed but lives in the page source.
  Anyone determined can bypass it. Fine for sharing with friends; not
  suitable for anything sensitive.
- **Per-device progress.** Each browser keeps its own stats, keyed by
  username. Switching devices, switching browsers, or clearing site data
  all reset progress. If you want cross-device sync later, the upgrade
  path is to put a Supabase (or similar) backend behind `js/quiz.js`.
- **No real isolation between users.** Anyone using the same browser
  can log in as any username — no password per user.
