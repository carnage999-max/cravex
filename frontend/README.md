# CRAVEX® — Calm Nervous-System Technology

CRAVEX® is a modern, premium, mobile-first single-page website built with Next.js (App Router). It serves as a credibility engine and education platform for a nervous-system pattern interruption technology.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS
- **Interactions**: Framer Motion (reduced-motion aware)
- **3D Hero**: Three.js (@react-three/fiber + @react-three/drei)
- **Forms**: Zod (validation) + Resend (email)
- **Language**: TypeScript

## Key Features
- **Calm UI**: Designed to be non-triggering, using soft gradients, glassmorphism, and generous whitespace.
- **Accessibility**: WCAG-minded, full keyboard navigation support, and a dedicated "Reduce Motion" toggle.
- **Interactive Diagrams**: Explained the nervous-system signal cycle through an accessible interactive flow.
- **Privacy-First**: Minimal analytics approach, no dark patterns, and ethical data handling.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your Resend API credentials.
   ```bash
   cp .env.example .env.local
   ```
4. **Run the development server**
   ```bash
   pnpm dev
   ```
5. **Open the site**
   Visit [http://localhost:3000](http://localhost:3000)

## Deployment

The project is designed to be platform-agnostic but optimized for AWS (via Amplify or Vercel).
1. Ensure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are set in your production environment.
2. Build the project: `pnpm build`
3. Deploy the `out` or the serverless build depending on your hosting provider.

## Accessibility Note
Motion is kept subtle by default. The "Reduce Motion" toggle in the navbar allows users to disable Three.js animations and Framer Motion transitions globally. This state is persisted in `localStorage`.

## Content & Ethics
Content is derived from `content.txt` and follows the hard constraints in `instructions.txt`. No medical claims or urgency-driven marketing tactics are used.
