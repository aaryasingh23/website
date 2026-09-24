# 🚗 AAMPL — Advanced Anmol Metcomp Pvt. Ltd.

> **Precision Engineering. Advanced Manufacturing. Built for the Future.**

A ground-up rebuild of the **AAMPL corporate website** — a premium, interactive digital experience for a **Tier-1 automotive manufacturing company** specializing in precision sheet-metal and machined components.

The website combines **modern industrial design, interactive 3D experiences, smooth animations, responsive layouts, and performance-focused architecture** to represent AAMPL's engineering capabilities and manufacturing excellence.

---

## ✨ Highlights

* 🏭 Premium automotive manufacturing website
* ⚡ High-performance Next.js architecture
* 🎨 Modern industrial design system
* 🧊 Interactive 3D product visualization
* 🌀 Smooth inertial scrolling with Lenis
* 🎬 Advanced animations and page transitions
* 📱 Fully responsive across desktop, tablet and mobile
* ♿ Accessibility-focused implementation
* 🔍 SEO-optimized pages and structured metadata
* 🚀 Static prerendering for fast page loads
* 📐 Real AAMPL factory and product photography
* 🧩 Modular, reusable component architecture

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| ⚛️ Framework  | Next.js 15 — App Router             |
| 🟦 Language   | TypeScript                          |
| 🎨 Styling    | Tailwind CSS v4                     |
| 🎬 Animation  | Motion / Framer Motion v12          |
| 🧊 3D         | React Three Fiber + Drei + Three.js |
| 🖱️ Scrolling | Lenis                               |
| 🔹 Icons      | Lucide React                        |
| ⚡ Bundler     | Turbopack                           |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aaryasingh23/website.git
cd website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 4. Create a production build

```bash
npm run build
```

### 5. Start the production server

```bash
npm start
```

---

## 🎨 Design System

The design system is centralized in:

```text
src/app/globals.css
```

Tailwind CSS v4 `@theme` tokens are used throughout the application.

### 🎯 Color System

* **`ink-*`** — Dark blue-black canvas
* **`brand-*`** — Brand blue for structure, trust and data
* **`signal-*`** — Signal red for energy, precision and active states
* **`steel-*`** — Machined greys for light sections

### 🔤 Typography

The website uses three primary typefaces:

* **Sora** — Display headings
* **Inter** — Body content
* **JetBrains Mono** — Technical specifications, measurements and data labels

The monospace typography gives the interface an **engineering / instrumentation feel**.

### 🧩 Custom Utilities

```text
container-x
section-y
text-gradient-steel
text-gradient-ink
text-gradient-brand
bg-blueprint
bg-blueprint-light
glass
eyebrow
mask-edges
```

---

## 🧱 Project Structure

```text
src/
│
├── app/
│   └── One directory per route
│       ├── Page metadata
│       ├── PageHero
│       └── Page body
│
├── components/
│   │
│   ├── layout/
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── PageHero
│   │   ├── SmoothScroll
│   │   ├── PageTransition
│   │   └── Logo
│   │
│   ├── sections/
│   │   ├── Hero
│   │   ├── Stats
│   │   ├── About
│   │   ├── Capabilities
│   │   ├── Localization
│   │   ├── PlantTour
│   │   └── Page Sections
│   │
│   ├── three/
│   │   ├── PrecisionPartScene
│   │   └── geometry.ts
│   │
│   └── ui/
│       ├── Reveal
│       ├── Stagger
│       ├── Button
│       ├── Counter
│       ├── TiltCard
│       ├── Marquee
│       ├── Parallax
│       ├── Lightbox
│       └── StepFlow
│
├── lib/
│   ├── content.ts
│   ├── nav.ts
│   └── utils.ts
│
└── public/
    └── images/
        └── AAMPL factory & product photography
```

---

## 📝 Content Management

All major business content is centralized in:

```text
src/lib/content.ts
```

This includes:

* Company information
* Products
* Capabilities
* Manufacturing information
* Page content
* Business data
* Contact information

### 💡 Updating Website Copy

Instead of modifying individual components, update:

```text
src/lib/content.ts
```

Components consume the centralized content, keeping the application easier to maintain.

---

## 🧊 Interactive 3D Hero

The hero section features procedurally generated **AAMPL-inspired automotive components** using React Three Fiber and Three.js.

### 🔩 3D Components

The geometry system creates three part archetypes:

1. **Stamped Structural Bracket**
2. **EV Busbar Assembly**
3. **Deep-Drawn ECU Housing**

These are generated using:

```text
THREE.Shape
ExtrudeGeometry
LatheGeometry
```

No external model files or CDN assets are required.

### 💡 Virtual Studio Lighting

The scene uses Drei's `<Environment>` and `<Lightformer>` elements to create a virtual studio environment.

The lighting setup includes:

* White key light
* Softbox streaks
* Red rim lighting
* Blue rim lighting
* Metallic specular highlights

---

## ⚡ 3D Performance Optimization

The 3D experience is designed with performance as a priority.

### 🚀 Optimizations

* Canvas mounts using `requestIdleCallback`
* 3D rendering is removed from the active loop when outside the viewport
* Mobile devices use a lightweight rendering mode
* Shadows are disabled on constrained devices
* Device pixel ratio is capped
* Smaller screens use a dedicated 3D section
* `prefers-reduced-motion` disables unnecessary animation

### 📱 Responsive 3D

```text
Desktop
→ Full interactive 3D experience

Tablet / Mobile
→ Lightweight 3D mode

Small screens
→ Dedicated 3D visual section
```

---

## 🎞️ Motion & Interactions

The website uses Motion / Framer Motion for:

* Page transitions
* Scroll reveals
* Staggered animations
* Counters
* Hover interactions
* Product interactions
* Parallax effects
* UI transitions

Lenis provides smooth inertial scrolling throughout the experience.

---

## ♿ Accessibility

Accessibility has been considered throughout the application.

### Included

* 🔗 Skip navigation link
* 🎯 Visible keyboard focus states
* ⌨️ Keyboard-accessible interactions
* 📖 `aria-expanded` for disclosures
* 🖼️ Keyboard-accessible lightbox
* ⬅️ Previous / next image navigation
* ✕ Escape-to-close support
* 🧘 Reduced-motion support

Interactive components such as:

```text
Reveal
Counter
TiltCard
PageTransition
```

respect the user's `prefers-reduced-motion` setting.

---

## 🔍 SEO

The application includes route-level SEO configuration and structured metadata.

### Included

* Per-route metadata
* Organization JSON-LD
* FAQPage JSON-LD
* Sitemap
* Robots metadata
* Canonical URLs
* `metadataBase`

The canonical website origin is configured through:

```text
src/lib/content.ts
```

using:

```text
company.domain
```

---

## 📸 Real AAMPL Assets

The project includes approximately **145 real AAMPL factory and product photographs**.

Located at:

```text
public/images/
```

These assets are used throughout the website to provide an authentic representation of AAMPL's manufacturing environment and products.

---

## 📈 Performance Philosophy

The website is built around a simple principle:

> **Rich visual experience without compromising performance.**

Key decisions include:

* Static prerendering wherever possible
* Lazy-loaded 3D experiences
* No unnecessary 3D assets
* Responsive rendering strategies
* Centralized content management
* Reusable UI components
* Reduced-motion support
* Lightweight shared bundles

---

## 🏗️ Architecture Philosophy

The application follows a modular architecture where:

```text
Routes
   ↓
Page Shell
   ↓
Reusable Sections
   ↓
UI Components
   ↓
Centralized Content
```

This makes the website easier to:

* Maintain
* Extend
* Optimize
* Reuse
* Scale

---

## 🌐 Live Website

🔗 **AAMPL Website:**
https://aampl.in

---

## 👨‍💻 Development

Built with modern web technologies and a focus on:

**Performance · Accessibility · Motion · 3D · SEO · Responsive Design**

---

## 📄 License

This project is developed for **Advanced Anmol Metcomp Pvt. Ltd. (AAMPL)**.

All company content, photography, branding, trademarks and proprietary assets belong to their respective owners.
