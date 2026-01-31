# 🚀 Quick Start Guide - CRAVEX® Monorepo

## Prerequisites Check

Before you begin, ensure you have:
- ✅ Node.js 20+ installed
- ✅ pnpm 9+ installed (`npm install -g pnpm`)
- ✅ Git installed

## Step 1: Environment Setup

Create your environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Get a free API key from https://resend.com
RESEND_API_KEY=re_your_actual_key_here

# Your email addresses
CONTACT_TO_EMAIL=your-email@example.com
CONTACT_FROM_EMAIL=noreply@yourdomain.com

# Get a free database from https://neon.tech
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

## Step 2: Install Dependencies

All dependencies are already installed! If you need to reinstall:

```bash
pnpm install
```

## Step 3: Database Setup (Optional)

If you want to use the database features:

```bash
# Navigate to the db package
cd packages/db

# Generate migration files
pnpm generate

# Push schema to your Neon database
pnpm push

# (Optional) Open Drizzle Studio to view your database
pnpm studio
```

## Step 4: Run the Applications

### Option A: Run Everything at Once

```bash
# From the root directory
pnpm dev
```

This will start:
- Frontend on http://localhost:3000
- Mobile Expo server

### Option B: Run Individually

**Frontend Only:**
```bash
cd frontend
pnpm dev
```
Visit http://localhost:3000

**Mobile Only:**
```bash
cd mobile
pnpm start
```
Then:
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Press `w` for web browser
- Scan QR code with Expo Go app on your phone

## Step 5: Explore the Applications

### Frontend Features to Try:
1. **Guided Walkthrough**: Click "Start Tour" in the navbar
2. **Motion Toggle**: Toggle animations on/off
3. **Contact Form**: Test the email functionality
4. **3D Animations**: Scroll through the page to see various Three.js effects
5. **Legal Pages**: Visit `/privacy` and `/terms`

### Mobile Features to Try:
1. **Home Screen**: Overview of CRAVEX®
2. **Device Pairing**: See the connection animation
3. **Monitoring**: View simulated biometric data

## Common Commands

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all packages
pnpm build

# Format code
pnpm format

# Run linting
pnpm lint

# Clean and reinstall
rm -rf node_modules */node_modules
pnpm install
```

## Troubleshooting

### "Module not found" errors
```bash
# Clean install
rm -rf node_modules */node_modules pnpm-lock.yaml
pnpm install
```

### Next.js build errors
```bash
cd frontend
rm -rf .next
pnpm dev
```

### Expo errors
```bash
cd mobile
rm -rf .expo
pnpm start --clear
```

### Database connection errors
- Verify your `DATABASE_URL` in `.env.local`
- Ensure your Neon database is active
- Check that your IP is whitelisted in Neon dashboard

## Next Steps

1. **Customize the Frontend**: Edit files in `frontend/app/components/`
2. **Add Mobile Screens**: Create new screens in `mobile/src/screens/`
3. **Extend the Database**: Add tables in `packages/db/src/schema.ts`
4. **Create API Routes**: Add endpoints in `frontend/app/api/`
5. **Share Schemas**: Add Zod schemas in `packages/shared/src/`

## Getting Help

- Check the main [README.md](./README.md) for detailed documentation
- Review [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) for architecture overview
- Consult the design notes in `style.txt`, `flow.txt`, etc.

---

**Happy coding! 🎉**
