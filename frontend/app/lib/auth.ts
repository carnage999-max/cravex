import { db, sessions, users } from '@cravex/db';
import { eq, and, gt } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export type Session = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    createdAt: Date;
};

export async function authorize(request: NextRequest | Request): Promise<Session | null> {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return null;

    const results = await db.select().from(sessions)
        .where(and(eq(sessions.tokenHash, token), gt(sessions.expiresAt, new Date())))
        .limit(1);

    if (results.length === 0) return null;
    return results[0] as Session;
}
