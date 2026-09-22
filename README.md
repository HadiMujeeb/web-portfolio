# Hadi Mujeeb — Portfolio (Angular + Tailwind CSS)

A pixel-faithful Angular rebuild of the original static HTML portfolio.

**Stack:** Angular 20 (standalone components, signals, new control flow) · Tailwind CSS 3 · Font Awesome 6 · Inter (self-hosted via Fontsource)

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build -> dist/hadi-portfolio/browser
```

Requires Node 20.19+ / 22.12+.

## Where things live

| What you want to change            | File                                   |
| ---------------------------------- | -------------------------------------- |
| Name, bio, skills, jobs, projects  | `src/app/data/portfolio.data.ts`       |
| Skill icons (add / swap)           | `src/app/data/skill-icons.ts` + `icon` key in `portfolio.data.ts` |
| Starfield background               | `src/app/components/starfield/starfield.ts` |
| Colours, fonts, animations         | `tailwind.config.js`                   |
| Glass card styles, hover effects   | `src/styles.css`                       |
| Markup for a section               | `src/app/components/<section>/*.html`  |

## Structure

```
src/app/
├── app.ts / app.html            # composes the page
├── data/portfolio.data.ts       # all content, typed
└── components/
    ├── navbar/                  # floating pill nav + mobile menu (signal)
    ├── hero/                    # intro, stats, animated portrait
    ├── about/  skills/  experience/  projects/
    ├── resume/  contact/  footer/
    └── section-heading/         # shared eyebrow + title + subtitle
```

## Hover interactions

All effects are white, low-opacity and use one easing curve (`--ease-out` in `styles.css`). They only run on devices that can hover and are switched off for `prefers-reduced-motion`.

| Effect            | Where                                   | How                                              |
| ----------------- | --------------------------------------- | ------------------------------------------------ |
| Cursor spotlight  | Cards, secondary buttons                | `appSpotlight` directive + `.spotlight` CSS      |
| Sliding pill      | Desktop nav links                       | `Navbar.movePill()`                              |
| Lift + sheen      | White buttons                           | `.fx-primary`                                    |
| Chip highlight    | Skill chips                             | `.chip-fx`                                       |
| Underline + arrow | "View" project links                    | `.link-fx`                                       |
| Disc + ring       | Logo, footer social icons               | Tailwind `group-hover` utilities                 |

## Skill icons

Brand glyphs come from [Simple Icons](https://simpleicons.org) (CC0), stored as SVG paths in `skill-icons.ts` and drawn with `currentColor`, so they follow the monochrome theme. To add one, paste its 24×24 path under a new key and reference that key from `portfolio.data.ts`.

## Starfield background

A fixed, full-page canvas sits behind every section (`app-starfield` in `app.html`, `-z-10` so it never
intercepts clicks — hovers and clicks pass straight through it to whatever's on top). Two stacked
canvases give it real depth cheaply: a CSS-blurred back layer holds the small, dim, mostly-still stars,
and a crisp front layer holds the brighter ones, which get the cursor's soft glow and react most.

- **Depth:** each star is assigned a layer (far / mid / near) with its own size and opacity range; the far
  layer is rendered on the blurred canvas and barely reacts to the cursor, the near layer is crisp and
  reacts most — that difference is what reads as depth.
- **Cursor reaction:** stars are pushed by how much the pointer has *recently* moved, not just how close it
  is — that value decays every frame and is only topped up by new pointer movement. So a star eases away
  while the mouse is moving near it, and drifts smoothly back to rest within about a second of the cursor
  stopping, even if it's still resting right on top of the star. Distant stars stay almost still throughout.
- **Easing:** a small damped spring (see `SPRING` / `DAMPING` in `starfield.ts`) drives every displacement,
  so motion never snaps in either direction.
- **Touch:** no hover on touch devices, so instead of cursor reaction it gets a very slow, low-amplitude
  autonomous drift (see `driftX` / `driftY` in the render loop), scaled down further and with fewer stars.
- **Accessibility:** fully respects `prefers-reduced-motion` — a single static frame is drawn and there's
  no animation loop or pointer reactivity at all.
- **Performance:** the render loop runs outside Angular's zone (no change-detection cost), pauses entirely
  when the tab is hidden, caps device-pixel-ratio at 2, and scales star count to viewport area (roughly
  70–260 stars, fewer on touch devices).

Notes
- The contact form uses native browser validation and shows the same success alert as the original. Wire `Contact.onSubmit()` to your backend / email service to make it real.
- The résumé button shows an alert; point `Resume.downloadResume()` at a real PDF (e.g. drop it in `public/` and link to it).
- Project images and the portrait load from Unsplash, as in the original. Replace the URLs in `portfolio.data.ts` with your own.
