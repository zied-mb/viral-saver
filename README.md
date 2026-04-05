<div align="center">

<br />

<img src="public/logo.png" alt="ViralSaver Logo" width="72" height="72" />

# ViralSaver

### _Download Any Viral Content. Instantly. For Free._

**The fastest, cleanest, and most versatile social media downloader on the web.**  
No watermarks. No accounts. No limits. Just paste, click, and save.

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-viralsaver.netlify.app-7c3aed?style=for-the-badge&labelColor=0d0d1a)](https://viralsaver.netlify.app/)
[![Built with Vite](https://img.shields.io/badge/Built_with-Vite_5-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00c7b7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

<br />

</div>

---

## 🛠️ Tech Stack

<table>
<thead>
  <tr>
    <th>Layer</th>
    <th>Technology</th>
    <th>Purpose</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><strong>Framework</strong></td>
    <td>⚡ React 18 + Vite 5 (SWC)</td>
    <td>Lightning-fast SPA with HMR and optimized production builds</td>
  </tr>
  <tr>
    <td><strong>Language</strong></td>
    <td>🔷 TypeScript 5</td>
    <td>Strict typing across the entire codebase</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>🌊 Tailwind CSS 3 + tailwindcss-animate</td>
    <td>Utility-first styling with CSS custom properties design tokens</td>
  </tr>
  <tr>
    <td><strong>Animation</strong></td>
    <td>🎬 Framer Motion 12</td>
    <td>Scroll-linked animations, AnimatePresence, layout transitions</td>
  </tr>
  <tr>
    <td><strong>Routing</strong></td>
    <td>🗺️ React Router DOM 6</td>
    <td>Client-side routing with lazy-loaded pages and scroll restoration</td>
  </tr>
  <tr>
    <td><strong>Data Fetching</strong></td>
    <td>🔄 TanStack Query 5 + Axios</td>
    <td>Asynchronous API state management and HTTP requests</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>🔥 Firebase Realtime Database</td>
    <td>Live download counter, active user tracker, and community reviews</td>
  </tr>
  <tr>
    <td><strong>External API</strong></td>
    <td>📡 RapidAPI — Auto-Download All-in-One</td>
    <td>Universal social media media extraction engine</td>
  </tr>
  <tr>
    <td><strong>Email</strong></td>
    <td>✉️ EmailJS</td>
    <td>Serverless contact form with dual email template delivery</td>
  </tr>
  <tr>
    <td><strong>UI Primitives</strong></td>
    <td>🧩 Radix UI + shadcn/ui</td>
    <td>Accessible, unstyled headless components</td>
  </tr>
  <tr>
    <td><strong>Icons</strong></td>
    <td>✨ Lucide React + React Icons</td>
    <td>Comprehensive icon library for UI and platform branding</td>
  </tr>
  <tr>
    <td><strong>Notifications</strong></td>
    <td>🔔 Sonner + react-hot-toast</td>
    <td>Glassmorphism-styled toast notification system</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>🚀 Netlify + @netlify/plugin-sitemap</td>
    <td>CI/CD pipeline with automatic sitemap generation and SPA redirects</td>
  </tr>
  <tr>
    <td><strong>SEO</strong></td>
    <td>🔍 Schema.org JSON-LD + Open Graph + Twitter Card</td>
    <td>Full structured data, OG metadata, and Google Site Verification</td>
  </tr>
</tbody>
</table>

---

## 🏛️ Architecture Overview

```
viral-saver/
├── public/                    # Static assets (logo, favicon, OG image, sitemap)
│   └── robots.txt
├── src/
│   ├── components/            # Shared UI components
│   │   ├── AdsBanner.tsx      # Dynamic lazy-loaded ad slots (IntersectionObserver)
│   │   ├── Counter.tsx        # Viewport-aware animated number counter (rAF)
│   │   ├── DownloaderBox.tsx  # Core download interface & state machine
│   │   ├── PlatformIcons.tsx  # Framer-animated platform selection indicator
│   │   ├── ResultCard.tsx     # Media preview + force-download handler
│   │   ├── SupportWidget.tsx  # Floating developer contact widget
│   │   └── ui/                # shadcn/ui component library (Radix-based)
│   ├── config/
│   │   └── ads.ts             # Centralized ad slot ID configuration
│   ├── hooks/
│   │   ├── use-mobile.tsx     # Responsive breakpoint hook
│   │   └── use-toast.ts       # Toast state management hook
│   ├── lib/
│   │   └── utils.ts           # clsx + tailwind-merge utility
│   ├── pages/
│   │   ├── Home.tsx           # Main page (~800 lines): Hero, Downloader, FAQ, Reviews
│   │   ├── Contact.tsx        # EmailJS-powered contact form
│   │   ├── PrivacyPolicy.tsx  # GDPR/legal policy page
│   │   ├── TermsOfService.tsx # Terms and conditions
│   │   ├── DMCA.tsx           # DMCA copyright takedown policy
│   │   └── NotFound.tsx       # 404 fallback page
│   ├── services/
│   │   └── api.ts             # RapidAPI wrapper, platform detector, URL validator
│   ├── types/
│   │   └── index.ts           # Shared TypeScript interfaces
│   ├── firebase-config.ts     # Firebase Realtime DB initialization
│   ├── App.tsx                # Root: QueryClient, Router, lazy Suspense boundaries
│   └── index.css              # Global CSS tokens, glassmorphism & glow utilities
├── tailwind.config.ts         # HSL design tokens, custom animations
├── netlify.toml               # Build config, SPA redirect rule, sitemap plugin
└── vite.config.ts             # Vite + SWC build configuration
```

**Application Pattern:** Single-page application with lazy-loaded route splitting. All pages load on demand via `React.lazy` + `Suspense`, keeping the initial JS bundle minimal. Global providers (QueryClient, TooltipProvider) wrap the router at the root level.

---

## ✨ Key Features

### 🎯 Smart Media Downloader
- **Auto-trigger**: Detects a valid pasted URL and automatically initiates the download fetch after a short debounce — zero extra clicks required.
- **Multi-format extraction**: Parses API responses to separately surface **HD Video (MP4)**, **Audio track**, and **Image (JPG/PNG)** download options from a single link.
- **Force-download engine**: Uses `fetch` → `Blob` → `createObjectURL` to trigger a true browser file download instead of opening a new tab.
- **Private account detection**: Gracefully intercepts API error payloads and surfaces a dedicated "Private Profile" error state.

### 📡 Platform Support
Download from **6 major social platforms** with automatic detection:

| Platform | Supported Content |
|---|---|
| 🟣 **Instagram** | Reels · Photos · Stories |
| ⚫ **TikTok** | Videos · HD Content |
| 🔵 **Facebook** | Videos · Reels |
| 🔴 **YouTube** | Videos · Shorts |
| 🐦 **Twitter / X** | Videos · GIFs |
| 🔴 **Pinterest** | Pins · Boards · Ideas |

### 📊 Live Firebase Analytics
- **Real-time download counter**: Every successful download increments `downloadsServed` in Firebase Realtime DB via `increment()`.
- **Active user tracking**: Detects Firebase connection events and increments `activeUsers` once per session (guarded by `sessionStorage`).
- **Animated stats display**: Live values feed into a viewport-aware `Counter` component that uses `requestAnimationFrame` with an `easeOutQuad` curve for a premium number-roll effect.

### ⭐ Community Reviews System
- Users submit star ratings + text reviews directly to Firebase (`push()` to the `reviews` node).
- Reviews are fetched in real-time via `onValue()` and rendered in an animated grid with `AnimatePresence`.
- Modal with form validation (star rating required, name required, textarea required) with inline loading and error states.

### ✉️ EmailJS Contact System
- Serverless contact form — no backend required.
- Sends **two emails simultaneously**: one to the developer (admin notification) and one to the user (confirmation receipt) using two separate EmailJS templates.

### 🎯 Intelligent Ad Monetization
- Six distinct ad slot types: `top`, `middle`, `footer`, `sidebar-sm`, `result-inline`, `notification`.
- Ads load **lazily** via `IntersectionObserver` (threshold: 0.2) — ads only load when entering the viewport, protecting performance metrics.
- The notification ad is injected into `document.body` with a 10-second delay to avoid interfering with page load.

---

## 🎨 UI/UX Highlights

### Visual Design System
- **Deep Dark Palette**: Background color `#06060f` (near-black with a subtle blue undertone), creating an immersive void-like canvas.
- **Gradient Identity**: A signature `violet-400 → pink-400 → cyan-400` tricolor gradient is used consistently for the logo, CTAs, and accent elements.
- **Glassmorphism**: Custom `.glass` utility (`backdrop-blur(20px)` + `rgba(255,255,255,0.05)` background) applied to cards, the navbar, and the downloader box.
- **Glow Effects**: Custom `.glow-purple` and `.glow-pink` box-shadow utilities. Feature cards emit dynamic colored glows matching their gradient on hover, applied via inline `onMouseEnter`/`onMouseLeave`.
- **Animated Background**: Two large, blurred radial gradient orbs (violet & pink) float continuously with independent Framer Motion keyframe animations (`duration: 20s` / `26s`), with a subtle dot-grid overlay at `0.025` opacity.
- **Scroll-Linked Parallax**: The hero section uses Framer Motion's `useScroll` + `useTransform` to fade and translate the background layer as the user scrolls.

### Motion & Interaction
- **Page entry animations**: All sections use `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` triggers.
- **Staggered reveals**: Feature cards and platform icons animate with `delay: i * 0.08` for a cinematic cascade effect.
- **Micro-interactions**: Buttons scale on `whileHover` / `whileTap`. Feature card icons rotate 6° on hover. Platform icons pulse when their platform is detected.
- **Accordion FAQ**: Framer Motion animates height from `0` to `auto` with opacity transitions for smooth expand/collapse.
- **Custom scrollbar**: Minimal 6px scrollbar with `rgba(255,255,255,0.1)` thumb, matching the dark aesthetic.

### Typography
- **Font**: **Inter** (loaded from Google Fonts) — weights 400, 500, 600, 700, 800.
- Headlines use `font-black` (900 weight) with `italic` and `tracking-tighter` for a bold editorial feel.
- Section labels use `uppercase tracking-widest` in accent colors for visual hierarchy.

---

## 🚀 Installation & Local Setup

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A [RapidAPI](https://rapidapi.com/dashboard) account with access to the **Auto-Download All-in-One** API

### 1. Clone the repository
```bash
git clone https://github.com/zied-mb/viral-saver.git
cd viral-saver
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```
Then fill in your values (see [Environment Variables](#-environment-variables) below).

### 4. Run the development server
```bash
npm run dev
```
The app will be available at **http://localhost:5173**

### 5. Build for production
```bash
npm run build
```
Output is placed in the `dist/` directory.

### 6. Preview the production build
```bash
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file at the project root with the following keys:

```env
# ── RapidAPI ──────────────────────────────────────────
# Your RapidAPI key for the "Auto-Download All-in-One" API
VITE_RAPIDAPI_KEY=your_rapidapi_key_here

# ── Ad Network Slot IDs ───────────────────────────────
# Leave empty to show the default sponsor banner instead
VITE_ADS_TOP_BANNER=your_top_banner_zone_id

# These slots use script injection via IntersectionObserver
VITE_ADS_MIDDLE_BANNER=your_middle_banner_zone_id
VITE_ADS_SIDEBAR_1=your_sidebar_ad_1_zone_id
VITE_ADS_SIDEBAR_2=your_sidebar_ad_2_zone_id
VITE_ADS_FOOTER_BANNER=your_footer_banner_zone_id
VITE_ADS_NOTIFICATION=your_notification_ad_zone_id
```

> **Note:** All `VITE_` prefixed variables are exposed to the client-side bundle at build time by Vite. Do **not** store any sensitive secrets in these variables. Firebase configuration is hardcoded in `src/firebase-config.ts` — for production hardening, migrate these to environment variables as well.

---

## 📄 Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home.tsx` | Main landing page with downloader, stats, features, reviews & FAQ |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Data privacy and cookie policy |
| `/terms-of-service` | `TermsOfService.tsx` | Terms and conditions of use |
| `/contact` | `Contact.tsx` | EmailJS-powered contact form |
| `/dmca` | `DMCA.tsx` | DMCA copyright takedown request page |
| `/*` | `NotFound.tsx` | 404 fallback |

---

## ☁️ Deployment

The project is deployed on **Netlify** with the following configuration (`netlify.toml`):

- **Build command**: `npm run build`
- **Publish directory**: `dist/`
- **SPA Redirect**: All routes (`/*`) redirect to `/index.html` with HTTP `200`, enabling client-side routing.
- **Sitemap**: Auto-generated post-build via `@netlify/plugin-sitemap` targeting `https://viralsaver.netlify.app`.

---

## 🌐 SEO & Discoverability

- **Title & Meta tags** — Page-specific title, description, and keywords optimized for social media downloader search terms.
- **Open Graph** — Full `og:title`, `og:description`, `og:image`, `og:url` for rich social sharing previews.
- **Twitter Card** — `summary_large_image` card type for expanded Twitter/X previews.
- **Schema.org JSON-LD** — Structured data of type `SoftwareApplication` with `AggregateRating` and `Offer` for potential Google rich results.
- **Google Site Verification** — Verification meta tag present in `index.html`.
- **robots.txt** — Configured to allow all crawlers.
- **sitemap.xml** — Auto-generated and served from `/sitemap.xml`.
- **Canonical URL** — `<link rel="canonical">` pointing to the production URL.

---

## 👨‍💻 Author

<div align="center">

**Zied Meddeb**  
_Full-Stack Developer · Made with ❤️ in Tunisia_

[![Portfolio](https://img.shields.io/badge/Portfolio-zied--meddeb-ff69b4?style=flat-square&logo=netlify)](https://zied-meddeb-portfolio.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-zied--mb-181717?style=flat-square&logo=github)](https://github.com/zied-mb)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Zied_Meddeb-0077b5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/zied-meddeb-7087a2266/)

</div>

---

<div align="center">

© 2025 ViralSaver. For personal use only. Respect creators' rights and platform terms of service.

</div>