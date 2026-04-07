# CLAUDE.md — Tots & Friends Childcare Centre Website

## Project Overview
Marketing website for **Tots & Friends Childcare Centre** — a Singapore-based early childhood education centre. Built as a React/Vite SPA with React Router for multi-page navigation.

## Stack
- **React 18** + **Vite 5** — JSX only, no TypeScript
- **Tailwind CSS 3** — utility-first styling with custom design tokens
- **Framer Motion** — all animations (scroll-triggered, page entry, hover)
- **Matter.js** — physics simulation (footer bouncing balls)
- **Lenis** — smooth inertial scroll (initialised in `App.jsx`)
- **@splinetool/react-spline** — 3D interactive hero background
- **React Router v6** — client-side routing (`BrowserRouter` in `main.jsx`)

## Commands
```bash
npm run dev      # Start dev server (opens browser automatically)
npm run build    # Production build
npm run preview  # Preview production build
```

## Project Structure
```
src/
├── App.jsx                        # Root router — Home + Timeline routes, Lenis setup
├── main.jsx                       # Entry point — BrowserRouter wraps App
├── index.css                      # Global styles, nav hover CSS, custom cursor CSS
├── pages/
│   └── Timeline.jsx               # /timeline — company history page
└── components/
    ├── Nav.jsx                    # Floating pill navbar — logo appears on scroll past hero
    ├── Hero.jsx                   # Spline 3D background + "Tots n Friends" heading
    ├── Services.jsx               # Programs/services section (#services)
    ├── Stats.jsx                  # Stats section
    ├── About.jsx                  # About section (#about)
    ├── Testimonials.jsx
    ├── CTA.jsx
    ├── Footer.jsx                 # Physics balls (Matter.js) + frosted glass content
    ├── MobileNav.jsx              # Mobile bottom navigation bar
    ├── InteractiveRobotSpline.jsx # Lazy-loaded Spline wrapper (Suspense)
    └── Cursor.jsx                 # Custom cursor
public/
└── logo.png                       # Tots & Friends rainbow logo (used in Nav + Hero)
```

## Routing
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` (inline in App.jsx) | Full landing page |
| `/timeline` | `Timeline.jsx` | Company history |

Nav links use `/#about`, `/#projects`, `/#contact` so they work cross-page.
"Our Story" uses React Router `<Link to="/timeline">`.

## Design Tokens (tailwind.config.js)
```
background:    #fcf9f8
primary:       #3437f1  (blue)
secondary:     #fd7a4b  (orange)
tertiary:      #006639  (green)
on-surface:    #1c1b1b
on-surface-variant: #454556
surface-container-low: #f6f3f2
```

**Brand accent colours** (used in balls, timeline, tags):
- `#2B4BDB` — blue
- `#E84444` — red
- `#2D8C50` — green
- `#F5A623` — amber

**Hero background:** `#F0EAE0`
**Navbar background:** `#f1e5d5`
**Navbar text / active hover bg:** `#2d2a24`

## Fonts
- `font-nunito` — Hero headings (Google Fonts, Nunito Black 900)
- `font-profont` — Badge/tag labels (ProFontWindows via cdnfonts.com)
- `font-headline` — Section headings (Epilogue)
- `font-body` / `font-label` — Body text (Plus Jakarta Sans)

Loaded in `index.html` via `<link>` tags.

## Key Components — Notes

### Nav.jsx
- Floating pill design, fixed top
- Logo (`/logo.png`) hidden until user scrolls past `#hero` — uses `IntersectionObserver`
- Logo animates in with spin + scale via Framer Motion
- Links: `About → /#about`, `Projects → /#projects`, `Contact → /#contact`, `Our Story → /timeline`
- Hover: pill turns `#2d2a24` bg with white text (CSS: `.nav-pill-link:hover`)
- **No shadow** on navbar

### Hero.jsx
- Spline scene: `https://prod.spline.design/dqHZCVcKBoFNaVcM/scene.splinecode`
- Watermark cropped via `height: calc(100% + 60px)` + `overflow: hidden`
- Text layer has `pointer-events: none` so Spline receives all mouse events
- `marginLeft: '60px'` controls text horizontal position

### Footer.jsx
- Physics container starts `ABOVE = 320px` above footer top
- `BALL_COUNT = 23` balls with per-ball random radius variation (±8px from base)
- Balls spawn staggered (180ms apart) only when footer enters viewport
- Simulation resets when footer leaves viewport (IntersectionObserver)
- Click a ball → small upward kick; larger balls jump less high than smaller ones
- Random auto-jump every 1800ms
- Gravity: `2.2`, density: `0.006`
- Glass content box: `pointer-events-none` on wrapper, `pointer-events-auto` on glass panel only
- Glass panel turns solid white on hover

### Timeline.jsx (`/timeline`)
- Scroll-driven progress line using `useScroll` + `useTransform` (scaleY)
- Progress line has multi-colour gradient: blue → red → green → amber
- Alternating left/right cards on desktop, single column mobile
- Each entry animates in with `useInView` (slide from side + fade)
- `w-1` (4px) thick centre line

### InteractiveRobotSpline.jsx
- Lazy-loads `@splinetool/react-spline` via `React.lazy` + `Suspense`
- Accepts `scene`, `className`, `style` props

## Lenis Smooth Scroll
Initialised once in `App.jsx` `useEffect`. Duration `1.4`, exponential easing.
Destroyed on unmount. Works across all pages since `App` wraps all routes.

## Gotchas
- **Framer Motion + CSS transforms**: Never set `transform` on a `motion.*` element directly — Framer Motion owns the transform pipeline. Wrap in a plain `<div>` for CSS-only transforms (e.g. rotation).
- **CSS specificity on hover**: Inline `style={{ color }}` beats CSS hover rules. Use pure CSS classes + `!important` for hover colour overrides.
- **Spline local files**: `.spline` editor files do not work at runtime — always use the hosted `.splinecode` URL from Spline's share panel.
- **Matter.js ball indices**: Bodies are pushed to the array via staggered `setTimeout`. `bodiesRef.current[i]` aligns with `ballEls.current[i]` only because both are in insertion order.
- **Footer pointer events**: Physics container has `pointer-events: none`; individual balls have `pointer-events: auto`. Content wrapper has `pointer-events: none`; glass panel has `pointer-events: auto`. This allows clicking balls outside the glass box while keeping glass hover working.
