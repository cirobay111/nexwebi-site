# NexWebi

Modern web agency website — premium, multilingual, fully responsive. Built with React + Vite.

## Features

- **Apple-inspired design** — minimal layout, glassmorphism navbar, smooth scroll-reveal animations.
- **Full i18n (EN / FR / AR)** — every visible string is translatable. Arabic flips the layout to RTL automatically.
- **Section structure optimized for conversion** — Hero → Social proof → Services → Portfolio → Why Us → Process → Testimonials → Pricing → Insights → FAQ → CTA → Contact → Footer.
- **Mobile-first responsive** — clean hamburger menu on mobile only, stacked grids, tightened paddings.
- **Live preview-ready** — Vite HMR, Vercel-ready config.

## Tech stack

- React 19 + Vite
- Tailwind CSS (utilities) + inline styles for design tokens
- Vercel Analytics

## Project structure

```
src/
  components/        # Navbar, Footer pieces, Modals, ImpactBar, particles
  context/
    LanguageContext.jsx   # All translations (EN/FR/AR) + RTL switching
  sections/          # Hero, Services, Portfolio, WhyUs, Process,
                     # Testimonials, Pricing, Blog, FAQ, CTA, Contact, Footer
  index.css          # Global styles + responsive breakpoints
  App.jsx            # Section composition
  main.jsx           # Root + LanguageProvider
public/
  portfolio/         # Project screenshots
```

## Setup

```bash
# install
npm install

# dev server (http://localhost:5173)
npm run dev

# production build
npm run build

# preview the build locally
npm run preview
```

## Adding a translation

All strings live in `src/context/LanguageContext.jsx` under the `translations` object — one entry per language (`en`, `fr`, `ar`). Each section reads its slice via `const { t } = useLanguage()`. To add a string:

1. Add the key under the relevant section in **all three** language objects.
2. Read it in the component with `t.<section>.<key>`.

## Adding a new language

1. Add the new locale code to the `SUPPORTED` array in `LanguageContext.jsx`.
2. Add a corresponding object under `translations` mirroring the EN structure.
3. The cycling toggle in the navbar picks it up automatically.

## Deployment

The repo ships with `vercel.json` for one-click Vercel deploys. Push to `main` and Vercel rebuilds.

## License

Proprietary — © NexWebi.
