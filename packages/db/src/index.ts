import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production') {
    // We only log a warning here instead of throwing immediately.
    // This allows 'next build' to complete if it's just doing static analysis
    // or generating pages that don't strictly call the DB during build.
    console.warn('WARNING: DATABASE_URL is not defined in production environment.');
}

const client = neon(databaseUrl || '');
export const db = drizzle(client, { schema });

export * from './schema';
