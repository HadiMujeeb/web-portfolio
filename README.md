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

Notes
- The contact form uses native browser validation and shows the same success alert as the original. Wire `Contact.onSubmit()` to your backend / email service to make it real.
- The résumé button shows an alert; point `Resume.downloadResume()` at a real PDF (e.g. drop it in `public/` and link to it).
- Project images and the portrait load from Unsplash, as in the original. Replace the URLs in `portfolio.data.ts` with your own.
