# CRAVEX® Monorepo

> **Control the Craving** — A calm, evidence-based approach to craving management through real-time biometric monitoring.

## 📋 Overview

CRAVEX® is a comprehensive platform consisting of:
- **Frontend**: Next.js website with backend API capabilities
- **Mobile**: React Native (Expo) app with Three.js animations
- **Shared Packages**: Common schemas and database layer

## 🏗️ Architecture

```
cravex/
├── frontend/          # Next.js website + API routes
├── mobile/            # Expo React Native app
├── packages/
│   ├── shared/        # Shared Zod schemas
│   └── db/            # Drizzle ORM + Neon Postgres
├── turbo.json         # Turborepo configuration
└── pnpm-workspace.yaml
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Email**: React Email + Resend
- **Validation**: Zod

### Mobile
- **Framework**: Expo (React Native)
- **Navigation**: React Navigation
- **3D Graphics**: Three.js + expo-three + expo-gl
- **Validation**: Zod

### Backend & Database
- **ORM**: Drizzle ORM
- **Database**: Neon Postgres (serverless)
- **API**: Next.js Route Handlers

### Monorepo Tools
- **Package Manager**: pnpm (with workspaces)
- **Build System**: Turborepo
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- pnpm 9+
- Expo Go app (for mobile development)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cravex

# Install all dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Resend API (for contact form emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_FROM_EMAIL=noreply@yourdomain.com
CONTACT_TO_EMAIL=admin@yourdomain.com,team@yourdomain.com

# Neon Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

### Development

```bash
# Run all apps in development mode
pnpm dev

# Run only frontend
cd frontend && pnpm dev

# Run only mobile
cd mobile && pnpm dev

# Run database studio
cd packages/db && pnpm studio
```

### Database Setup

```bash
# Generate migrations
cd packages/db
pnpm generate

# Push schema to database
pnpm push

# Open Drizzle Studio
pnpm studio
```

## 📱 Mobile Development

### Running on Device/Simulator

```bash
cd mobile

# Start Expo dev server
pnpm start

# Run on Android
pnpm android

# Run on iOS (macOS only)
pnpm ios

# Run on web
pnpm web
```

### Three.js Animations

The mobile app includes custom Three.js animations for:
- **Device Connection**: Animated spheres showing pairing status
- **Signal Stability**: Pulsing rings indicating signal strength
- **Calibration**: (To be implemented)

All animations respect reduced motion preferences and include fallbacks.

## 🌐 Frontend Features

### Website Sections
- **Hero**: 3D particle background with CTA
- **Problem**: Explanation of craving challenges
- **How It Works**: 3-phase approach visualization
- **Tech Deep Dive**: Interactive phase selector with 3D
- **Conditions**: Supported use cases
- **Science**: Evidence-based approach
- **Device & App**: Product showcase
- **Privacy & Safety**: Security features
- **FAQ**: Common questions
- **About**: Team and mission
- **Contact**: Form with email notifications

### Special Features
- **Guided Walkthrough**: Interactive tour of the website
- **Accessibility**: Motion toggle, keyboard navigation, ARIA labels
- **SEO**: JSON-LD structured data, meta tags
- **Legal**: Privacy Policy and Terms of Service pages

## 📦 Packages

### `@cravex/shared`
Shared Zod schemas for API contracts between frontend and mobile.

```typescript
import { contactFormSchema } from '@cravex/shared';
```

### `@cravex/db`
Database schema and client using Drizzle ORM.

```typescript
import { db, users, waitlist } from '@cravex/db';
```

## 🏗️ Building for Production

```bash
# Build all packages
pnpm build

# Build frontend only
cd frontend && pnpm build

# Start production server
cd frontend && pnpm start
```

## 📝 Scripts

### Root Level
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages

### Frontend
- `pnpm dev` - Start Next.js dev server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Mobile
- `pnpm start` - Start Expo dev server
- `pnpm android` - Run on Android
- `pnpm ios` - Run on iOS
- `pnpm web` - Run on web

### Database
- `pnpm generate` - Generate migrations
- `pnpm migrate` - Run migrations
- `pnpm push` - Push schema to database
- `pnpm studio` - Open Drizzle Studio

## 🎨 Design Philosophy

CRAVEX® follows a **calm design** approach:
- **No urgency**: No countdown timers or pressure tactics
- **No dark patterns**: Transparent, honest communication
- **Accessibility first**: WCAG 2.1 AA compliant
- **Privacy by design**: Local processing, minimal data collection
- **Evidence-based**: Grounded in scientific research

## 🔒 Privacy & Security

- All biometric data processed locally on device
- No third-party analytics or tracking
- End-to-end encryption for device communication
- GDPR and HIPAA compliant architecture
- Transparent data handling policies

## 📄 License

Copyright © 2026 CRAVEX Technology. All rights reserved.

## 🤝 Contributing

This is a private repository. For questions or support, contact the development team.

---

**Built with calm by design** 🧘‍♀️
