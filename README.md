# FeltIt site

Three static pages: a landing page, a support page, and the privacy policy.
No build step, no dependencies — plain HTML with inline CSS, light and dark.

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

## Maintenance

Update the "Last updated" date at the top of `privacy.html` whenever its
substance changes, and note material changes in the app's release notes.
