# Deploying the Mechlovin PCB site

The site is fully built locally. These are the remaining steps that need **your**
accounts (GitHub, Cloudflare). Do them in order.

## 1. Put the code on GitHub (public repo)

In a terminal, from inside the `mechlovin-pcb` folder:

```
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR-USERNAME/mechlovin-pcb.git
git push -u origin main
```

Create the empty **public** repo named `mechlovin-pcb` on github.com first.

## 2. Tell the CMS which repo to use

Edit `public/admin/config.yml`, line 7:

```
repo: YOUR-GITHUB-USERNAME/mechlovin-pcb
```

Commit and push that change.

## 3. Deploy on Cloudflare Pages

1. dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git.
2. Pick the `mechlovin-pcb` repo.
3. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
4. Save and Deploy. You get a `https://mechlovin-pcb.pages.dev` URL.

## 4. Turn on the /admin login (Decap + GitHub OAuth)

Follow https://decapcms.org/docs/github-backend/ — you'll create a GitHub
OAuth app and a small auth helper (Cloudflare Worker or the hosted option).
Then visit `your-site.pages.dev/admin` and log in with GitHub.

## 5. Custom domain

Cloudflare Pages → your project → Custom domains → add `pcb.mechlovin.studio`,
then add the CNAME record it shows you at your domain registrar.

## Editing content day-to-day

Go to `/admin`, log in, pick **PCBs / Keyboards / Build guides**, edit the form,
click **Publish**. ~30s later the change is live — the detail page, the PCB
listing, and the compatibility tool all update from the same content files.

## Notes on the seeded content

- **Adelais** is fully filled in as the reference example.
- The other 23 PCBs have their real catalog facts (layout, features, connector,
  revision) plus a starter changelog. Their **Downloads, Compatibility notes,
  and Vendors are intentionally empty** — they show an "add via the CMS" note
  until you fill them in. No fake firmware files or prices were invented.
- Product photos: upload via the CMS `heroImage` field. Until then, a tasteful
  hatched placeholder shows the board name.
- Layout diagrams: export from keyboard-layout-editor.com (Download SVG) and
  upload via the `layoutSvg` field.

## Regenerating starter content

`scripts/gen-content.mjs` is the one-time generator that created the PCB and
keyboard files from the prototype data. You don't need it again — edit content
through the CMS from now on. It's kept only for reference.
