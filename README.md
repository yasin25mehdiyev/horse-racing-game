Horse Racing Game
A modern, interactive horse racing simulation game built with Vue 3 and TypeScript.
Tech Stack

Frontend: Vue 3 (Composition API)
State Management: Vuex
Language: TypeScript
Routing: Vue Router
Design Methodology: Atomic Design
Testing: Playwright (E2E)
Libraries: GSAP (animations), Lucide (icons), Tailwind CSS

Getting Started
Prerequisites

Node.js (v16.x or later)

Quick Start
bashCopy# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

Project Structure
The project follows the Atomic Design methodology:

├── node_modules/     # Dependencies
├── public/           # Static public assets
├── src/              # Source code
│   ├── components/   # UI components
│   │   ├── templates/# Page templates
│   │   └── ui/       # UI components (Atomic Design)
│   │       ├── atoms/    # Basic UI elements
│   │       ├── molecules/# Combinations of atoms
│   │       └── organisms/# Complex UI sections
│   ├── lib/          # Library code
│   ├── router/       # Vue Router configuration
│   ├── store/        # Vuex store modules
│   ├── styles/       # Global styles
│   ├── types/        # TypeScript types
│   ├── views/        # Page views
│   └── main.ts       # Application entry point
├── .gitignore        # Git ignore file
├── .prettierrc       # Prettier configuration
├── components.json   # Components configuration
├── index.html        # HTML entry point
├── package.json      # Package configuration
├── package-lock.json # Package lock file
├── postcss.config.js # PostCSS configuration
├── README.md         # This file
├── tailwind.config.js# Tailwind CSS configuration
├── tsconfig.app.json # TypeScript app configuration
├── tsconfig.json     # TypeScript configuration
├── tsconfig.node.json# TypeScript Node configuration
├── vite.config.ts    # Vite configuration
└── vuex.d.ts         # Vuex TypeScript declarations
