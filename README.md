# 🍳 ChefMate — Smart Recipe & Step-by-Step Cooking Assistant

> **Cook effortlessly with what you have in your kitchen.**  
> Smart pantry matching, adaptive dietary filters, scalable portions, and a distraction-free kitchen cooking mode equipped with interactive countdown timers, hands-free voice read-aloud, and celebration fanfare!

---

## ✨ Features

### 🥫 1. "What's In My Fridge?" Pantry Matcher
- Enter or select ingredients you have in your kitchen (e.g., *Garlic, Eggs, Olive Oil, Chicken, Rice, Tomatoes*).
- Instant percentage match calculation (`100% Match`, `85% Match`, etc.).
- Live breakdown of matching ingredients you own vs. missing ingredients you need to buy.

### 🎯 2. Intelligent Recipe Discovery & Filtering
- **Mood & Craving Pills**: Quick-tap *Quick & Easy*, *Comfort Food*, *High Protein*, *Light & Fresh*, *Date Night*, *One-Pot Wonder*, and *Sweet Tooth*.
- **Meal Types**: Breakfast, Lunch, Dinner, Snack, Dessert.
- **Dietary Badges**: Multi-select filter for Vegetarian, Vegan, Gluten-Free, Keto, Low-Carb, High-Protein, and Quick (<30m).
- **World Cuisines**: Italian, Asian, Mexican, Indian, Mediterranean, American, Middle Eastern, French.
- **Sorting**: Sort by Best Match, Quickest Total Time, Top Rated, and Lowest Calorie.
- **Chef's Surprise**: Instant randomized recipe recommendation when you can't decide what to eat!

### 🔪 3. Interactive Step-by-Step Cooking Mode ("Cook Mode")
- **Kitchen-Optimized Fullscreen Display**: High-contrast, large typography designed for kitchen counters, tablets, and mobile devices.
- **Step-Specific Ingredients**: Highlights the exact ingredients and quantities needed for *this specific step* so you never have to scroll back.
- **Integrated Kitchen Timers**: Step countdown timers with Start/Pause/Reset, +1m/-1m adjustments, and an **audible chime alert synthesized via the Web Audio API** (works 100% offline, no external audio files required).
- **Hands-Free Voice Narration (Read Aloud)**: Uses the browser's Web Speech Synthesis API to read instructions aloud so you can cook with messy hands.
- **Progress Tracking**: Step indicators, completed step checkmarks, and keyboard navigation (Left/Right Arrow keys, Escape).
- **Celebration Fanfare**: Finish the last step and trigger a confetti shower (`canvas-confetti`) with culinary fanfare!

### ⚖️ 4. Kitchen Utilities
- **Servings Scaler**: Effortlessly adjust portions (1 to 10+ servings) with real-time automatic recalculation of all ingredient measurements.
- **Unit Converter**: 1-click toggle between US Customary (*cups, oz, tbsp*) and Metric (*g, ml*).
- **Interactive Ingredient Checklist**: Check off ingredients you already have; click **"Add Missing to Grocery"** to export remaining items.
- **Smart Grocery List**: Track your shopping list, check off items as you walk the supermarket aisles, add custom items, or copy the formatted list to your clipboard.
- **Favorites / Bookmarks**: Save recipes to your favorites library (persisted via `localStorage`).
- **Custom Recipe Creator**: Easily add your own family or custom recipes with steps and timers.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + Custom Glassmorphism accents
- **Icons**: Lucide React
- **Celebration FX**: canvas-confetti
- **Audio & Sound**: Web Audio API (Synthesized chime & celebratory fanfare)
- **Speech**: Web Speech Synthesis API (`window.speechSynthesis`)
- **Storage**: Browser LocalStorage for persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or pnpm or yarn

### Installation

1. Clone or extract the project:
```bash
git clone https://github.com/shauryamalhotra957-wq/chefmate-recipe-app.git
cd chefmate-recipe-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the local development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port displayed in terminal).

### Production Build

To compile a production-optimized build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Architecture

```
chefmate-recipe-app/
├── index.html                   # HTML entry point with Google Fonts
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration
├── src/
│   ├── types/
│   │   └── recipe.ts            # TypeScript interfaces & types
│   ├── data/
│   │   └── recipes.ts           # Curated library of 20+ rich recipes
│   ├── utils/
│   │   ├── recommender.ts       # Pantry matching & ranking algorithms
│   │   ├── audio.ts             # Web Audio API kitchen timer chime synthesizer
│   │   └── speech.ts            # Web Speech API text-to-speech reader
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation header, search & modal triggers
│   │   ├── FiltersBar.tsx       # Dietary, cuisine, mood & time filters
│   │   ├── RecipeCard.tsx       # Food cards with match badge & quick actions
│   │   ├── PantryMatcher.tsx    # Interactive fridge ingredient matcher
│   │   ├── RecipeDetailModal.tsx# Scaler, unit toggle, ingredient checklist
│   │   ├── StepByStepCookingMode.tsx # Fullscreen kitchen mode with timers & TTS
│   │   ├── GroceryListModal.tsx # Shopping list manager with clipboard copy
│   │   └── AddRecipeModal.tsx   # Custom recipe creator form
│   ├── App.tsx                  # Root state orchestration & persistence
│   ├── index.css                # Tailwind directives & styles
│   └── main.tsx                 # React DOM mount point
```

---

## 📄 License
MIT License. Crafted with ❤️ for passionate home chefs everywhere.
