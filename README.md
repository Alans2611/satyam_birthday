# A Little Universe — Made Just for Satyam ❤️

> *"Somewhere in this universe, there's a little world that belongs only to you and me."*

A personal, dreamy, interactive birthday website created with love by **Alankrit** for **Satyam**'s birthday on **November 11**.

---

## ✨ Experience Overview

The website is crafted as a sequence of **7 cinematic, interconnected experiences**:

1. **🌌 Screen 1 — The Welcome Universe**
   - Full-screen midnight-purple galaxy with twinkling stars, shooting stars, and floating lavender nebula clouds.
   - Glowing crescent moon with soft aura.
   - Romantic introductory heading and subtitle.
   - Interactive starburst transition upon clicking *"Enter Your Universe ✨"*.
   - Non-intrusive floating music control.

2. **🪐 Screen 2 — The Birthday Planet**
   - Celestial planet with shimmering pink rings and orbiting stars.
   - Live intelligent birthday countdown for November 11:
     - **Before Nov 11**: Real-time countdown clock (days, hours, minutes, seconds).
     - **On Nov 11**: Celebratory message *"It's your day, Satyam! ♡"*.
     - **After Nov 11**: Warm message *"Your special day may have passed, but celebrating you never ends"* and next celebration timer.
   - Never displays negative values and works smoothly for future years.

3. **🔮 Screen 3 — Our Memory Galaxy**
   - Interactive galaxy featuring 6 glowing celestial memory nodes.
   - Hover previews with gentle floating animations.
   - Clicking a planet opens an elegant digital scrapbook Polaroid modal complete with photo, title, date, personal caption, and memory story.
   - Resilient design: displays custom styled galaxy illustrations if photos are not yet uploaded.

4. **⭐ Screen 4 — Eleven Reasons I Love Satyam**
   - Exactly 11 interactive glowing stars representing November 11 and 11 heartfelt reasons Alankrit loves Satyam.
   - Clicking each star triggers a glow flare and reveals a romantic message card.
   - Discovery counter tracks progress (`X / 11 discovered`).
   - Upon completing all 11 stars, all stars pulsate simultaneously with a golden-pink glow and reveal: *"You are my favorite part of this entire universe. ♡"*.

5. **💌 Screen 5 — A Letter From Alankrit**
   - Floating romantic envelope sealed with a glowing heart-shaped wax seal.
   - Clicking the envelope opens it with a smooth transition.
   - Typewriter animation types out Alankrit's heartfelt birthday letter.
   - Skip option allows reading the entire letter immediately.

6. **🎂 Screen 6 — The Virtual Birthday Cake**
   - Interactive tiered birthday cake with soft pink frosting, glowing candles, and candle flickers.
   - Clicking *"Blow the Candles"* extinguishes the flames with a delicate smoke puff, darkens the universe, triggers a starburst, releases pink and lavender confetti, floats glowing hearts, and reveals the birthday wish.

7. **🌙 Screen 7 — The Final Surprise**
   - Emotional climax featuring a glowing crescent moon, drifting nebula, and floating hearts.
   - Deep love message and signature from Alankrit.
   - Interactive *"Forever & Always ♡"* button that reveals:
     *"Come back whenever you miss me. This little universe will always be yours."*
   - Interactive replay button (*"↺ Revisit Our Universe"*) allowing Satyam to experience the journey anytime.

---

## 🎨 Color Palette & Typography

- **Midnight Purple:** `#100B25` (Deep space base)
- **Deep Galaxy:** `#1B1038` (Atmospheric depth)
- **Lavender:** `#BCA7FF` (Gentle nebulas and accents)
- **Romantic Pink:** `#FFB6D9` (Moons, stars, and highlights)
- **Rose Pink:** `#FF75B5` (Primary buttons, glowing seals)
- **Soft White:** `#FFF7FF` (Crisp readable typography)
- **Typography:** *Playfair Display* (Serif headings), *Inter* (Clean sans-serif), and *Dancing Script* (Romantic handwritten notes).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Motion & Transitions:** Framer Motion
- **Icons:** Lucide React
- **Background Engine:** Hardware-accelerated HTML5 Canvas with shooting stars
- **Deployment Target:** Vercel

---

## 🚀 Quick Start (Local Setup)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.18 or higher recommended)
- `npm` or `pnpm`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 💖 Personalization Guide

All personal text, memories, letter content, and settings are centralized in **one file**:

👉 `app/config/birthday.ts`

You do **not** need to touch any React components to personalize the website.

### 1. Personal Details
In `app/config/birthday.ts`:
```typescript
her: {
  name: "Satyam",
  nickname: "My Love",
},
me: {
  name: "Alankrit",
},
birthday: {
  day: 11,
  month: 11,
  year: 2002,
}
```

### 2. Adding Photographs
1. Save your photos as standard JPG or PNG images.
2. Place them into:
   ```
   public/images/memories/
     memory-1.jpg
     memory-2.jpg
     memory-3.jpg
     memory-4.jpg
     memory-5.jpg
     memory-6.jpg
   ```
3. Update the captions, titles, dates, and story descriptions in `app/config/birthday.ts` under the `memories` array.
*Note: If no photo is added, a starry aesthetic placeholder is displayed automatically—no broken image icons!*

### 3. Editing the Eleven Reasons
In `app/config/birthday.ts`, edit the `reasons` array:
```typescript
reasons: [
  "I love the way you make me smile.",
  "I love your beautiful heart.",
  // ... edit any of the 11 reasons
]
```

### 4. Editing the Love Letter
In `app/config/birthday.ts`, customize the `letter.text` property:
```typescript
letter: {
  heading: "A Letter From Me to You",
  subtitle: "Some things are too special to fit into a simple birthday wish.",
  text: `My Dearest Satyam,
  
  [Write your personal message here...]
  
  Forever yours,
  Alankrit ♡`,
}
```

### 5. Adding Background Music
1. Choose an MP3 file (e.g. an instrumental or romantic song).
2. Save it as `romantic.mp3`.
3. Drop it into:
   ```
   public/audio/romantic.mp3
   ```
*If no music file is present, the player hides itself gracefully without throwing any errors or crashing.*

---

## 🌐 Deploying to Vercel

Deploying this website to Vercel takes less than 2 minutes and is completely free:

### Option A: Via GitHub (Recommended)
1. Initialize a Git repository if not already done:
   ```bash
   git add .
   git commit -m "A Little Universe for Satyam"
   ```
2. Push the repository to your GitHub account (make it private if you want to keep the surprise safe until her birthday).
3. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
4. Import your GitHub repository.
5. Leave all build settings as default (Framework Preset: **Next.js**).
6. Click **Deploy**.
7. Share the custom live URL with Satyam on November 11!

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the interactive prompts to deploy directly from your terminal.

---

## 📱 Mobile Responsiveness & Accessibility

- **Mobile First:** Designed with touch targets, fluid typography (`clamp()`), and zero horizontal overflow.
- **Reduced Motion:** Respects `prefers-reduced-motion` settings.
- **Asset Integrity:** Graceful fallbacks for audio and missing images.

---

Made with ❤️ by **Alankrit** for **Satyam**.
