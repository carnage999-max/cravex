# Development Workflow - CRAVEX® Monorepo

## 🏗️ Project Structure

```
cravex/
├── frontend/              # Next.js website + API
│   ├── app/
│   │   ├── components/    # React components
│   │   ├── api/          # API route handlers
│   │   ├── emails/       # Email templates
│   │   └── lib/          # Utilities
│   └── public/           # Static assets
│
├── mobile/               # Expo React Native app
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── components/   # Reusable components
│   │   └── animations/   # Three.js animations
│   └── App.tsx           # Root component
│
└── packages/
    ├── shared/           # Shared Zod schemas
    │   └── src/index.ts
    └── db/               # Database layer
        ├── src/
        │   ├── schema.ts # Drizzle schema
        │   └── index.ts  # DB client
        └── drizzle.config.ts
```

## 🔄 Development Workflow

### Adding a New Feature

#### 1. Frontend Feature
```bash
# Create a new component
cd frontend/app/components
touch NewFeature.tsx

# Import and use in your page
# Edit frontend/app/page.tsx
```

#### 2. Mobile Feature
```bash
# Create a new screen
cd mobile/src/screens
touch NewScreen.tsx

# Add to navigation in mobile/App.tsx
```

#### 3. API Endpoint
```bash
# Create a new API route
cd frontend/app/api
mkdir new-endpoint
touch new-endpoint/route.ts

# Implement GET/POST handlers
# Access at /api/new-endpoint
```

#### 4. Database Table
```bash
# Edit the schema
cd packages/db/src
# Edit schema.ts to add new table

# Generate migration
pnpm generate

# Apply to database
pnpm push
```

#### 5. Shared Schema
```bash
# Add to shared package
cd packages/shared/src
# Edit index.ts to add new Zod schema

# Use in frontend
import { newSchema } from '@cravex/shared';

# Use in mobile
import { newSchema } from '@cravex/shared';
```

## 🧪 Testing Workflow

### Frontend Testing
```bash
cd frontend

# Run dev server
pnpm dev

# Test in browser
open http://localhost:3000

# Check accessibility
# Use browser DevTools > Lighthouse
```

### Mobile Testing
```bash
cd mobile

# Start Expo
pnpm start

# Test on physical device
# Scan QR code with Expo Go app

# Test on simulator
pnpm ios    # macOS only
pnpm android
```

### API Testing
```bash
# Use curl
curl http://localhost:3000/api/contact -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# Or use Postman/Insomnia
```

## 📦 Package Management

### Adding Dependencies

**Frontend:**
```bash
cd frontend
pnpm add package-name
pnpm add -D dev-package-name
```

**Mobile:**
```bash
cd mobile
pnpm add package-name
npx expo install expo-specific-package
```

**Shared:**
```bash
cd packages/shared
pnpm add package-name
```

### Using Workspace Packages

In `package.json`:
```json
{
  "dependencies": {
    "@cravex/shared": "workspace:*",
    "@cravex/db": "workspace:*"
  }
}
```

## 🎨 Styling Guidelines

### Frontend (Tailwind CSS)
```tsx
// Use utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-lg">
  
// Use cn() for conditional classes
import { cn } from '@/lib/utils';
<div className={cn(
  "base-classes",
  isActive && "active-classes"
)}>
```

### Mobile (StyleSheet)
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
});
```

## 🔧 Common Tasks

### Update All Dependencies
```bash
# From root
pnpm update -r
```

### Clear All Caches
```bash
# Next.js
cd frontend && rm -rf .next

# Expo
cd mobile && rm -rf .expo

# Node modules
rm -rf node_modules */node_modules
pnpm install
```

### Format All Code
```bash
# From root
pnpm format
```

### Build for Production
```bash
# Build all packages
pnpm build

# Build frontend only
cd frontend && pnpm build

# Build mobile (requires EAS)
cd mobile && eas build
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd frontend
vercel

# Production deployment
vercel --prod
```

### Mobile (EAS)
```bash
# Install EAS CLI
pnpm add -g eas-cli

# Configure
cd mobile
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Database (Neon)
```bash
# Migrations are automatic with Drizzle
cd packages/db
pnpm push
```

## 📝 Git Workflow

### Commit Messages
```bash
# Format: type(scope): message

git commit -m "feat(frontend): add new hero section"
git commit -m "fix(mobile): resolve navigation bug"
git commit -m "docs: update README"
git commit -m "style(frontend): improve button styling"
```

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/new-feature

# Create fix branch
git checkout -b fix/bug-description

# Merge to main
git checkout main
git merge feature/new-feature
```

## 🐛 Debugging

### Frontend
```tsx
// Use console.log
console.log('Debug:', data);

// Use React DevTools
// Install browser extension

// Check Network tab
// Monitor API calls in DevTools
```

### Mobile
```tsx
// Use console.log (appears in terminal)
console.log('Debug:', data);

// Use React Native Debugger
// Press Cmd+D (iOS) or Cmd+M (Android)
// Select "Debug"

// Use Expo DevTools
// Appears in browser when running pnpm start
```

### Database
```bash
# Use Drizzle Studio
cd packages/db
pnpm studio

# Direct SQL queries
# Use Neon dashboard SQL editor
```

## 📊 Performance Optimization

### Frontend
- Use `next/image` for images
- Implement lazy loading with `dynamic()`
- Minimize bundle size with tree shaking
- Use React.memo() for expensive components

### Mobile
- Optimize images with `expo-image`
- Use FlatList for long lists
- Implement virtualization
- Reduce Three.js polygon count

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - It's in .gitignore
2. **Validate all inputs** - Use Zod schemas
3. **Sanitize user content** - Prevent XSS
4. **Use HTTPS** - In production
5. **Rate limit APIs** - Prevent abuse
6. **Keep dependencies updated** - Run `pnpm update` regularly

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Expo Docs](https://docs.expo.dev)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Three.js Docs](https://threejs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Happy developing! 🎉**
