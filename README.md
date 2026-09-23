# FeltIt site

Three static pages: a landing page, a support page, and the privacy policy.
No build step, no dependencies — plain HTML with inline CSS, light and dark.

The support page and privacy policy are also translated into the app's eight
other languages, one folder each (`de/`, `fr/`, `es/`, `it/`, `pt-BR/`, `ja/`,
`ko/`, `zh-Hans/`). **English is the legally binding version**; every translated
page says so and links back to it.

These pages exist to satisfy two App Store requirements:

- **Guideline 5.1.1(i)** — a privacy policy link reachable inside the app.
- **Guideline 1.5** — a Support URL in App Store Connect, which must be a web
  page (a `mailto:` address is not accepted in that field).

## Publishing to GitHub Pages

The app repository is named `FeltIt`, and GitHub repository names collide
case-insensitively, so the site needs its own repository — `feltit-site` below.

```bash
# From this directory
cd site
git init
git add .
git commit -m "FeltIt site: landing, support, privacy policy"
git branch -M main
git remote add origin https://github.com/emadrahman/feltit-site.git
git push -u origin main
```

Create `emadrahman/feltit-site` on GitHub first, as a **public** repository —
GitHub Pages on a private repository requires a paid plan.

Then: repository **Settings › Pages › Build and deployment**, source
**Deploy from a branch**, branch `main`, folder `/ (root)`. The first deploy
takes a minute or two.

## Resulting URLs

| Page | URL |
|---|---|
| Landing | `https://emadrahman.github.io/feltit-site/` |
| Support | `https://emadrahman.github.io/feltit-site/support.html` |
| Privacy policy | `https://emadrahman.github.io/feltit-site/privacy.html` |

## Where each URL goes

- **Privacy policy** → `AboutLinks.privacyPolicy` in `FeltIt/Views/AboutView.swift`,
  and the App Store Connect *Privacy Policy URL* field. The in-app row and the
  paywall's Privacy link both stay hidden until that constant is non-nil.
- **Support** → App Store Connect *Support URL*.
- **Landing** → App Store Connect *Marketing URL* (optional).

Changing where the privacy policy is hosted later requires a new app build,
since the URL is compiled into `AboutLinks`. If a custom domain is likely,
point it at this repository before shipping and use the domain URL instead.

## Languages

A globe menu on every page switches language. `lang.js` does two things:

- On the **English** pages only (marked `data-autolang`), a first-time visitor is
  forwarded to their browser's language. The app compiles in the English URL,
  so this is what makes a German user land on `de/privacy.html` without a new build.
- A language picked from the menu is saved in `localStorage` and always beats the
  browser language — including picking English, which stops the forward.

Translated pages never redirect, so a direct link to one always shows it.
Traditional Chinese browsers stay on English rather than being sent to Simplified.
Without JavaScript every page still works; only the automatic forward is lost.

In-app labels quoted in the pages (Settings › Siri & Search, Include Notes,
Restore Purchases, Contact Support…) use the app's own translations from
`FeltIt/Localizable.xcstrings`, so they match what the user sees on screen.

## Maintenance

Update the "Last updated" date at the top of `privacy.html` whenever its
substance changes, and note material changes in the app's release notes.

**A change to the English support page or policy is a change to nine files.**
Make the same edit in every language folder and update each "Last updated"
date together, so a stale translation is visible by its date. The globe menu and
`hreflang` links are repeated in every page; adding a language means adding a
folder, a menu entry and an `hreflang` line on all eighteen pages, and the code
to `SUPPORTED` in `lang.js`.
