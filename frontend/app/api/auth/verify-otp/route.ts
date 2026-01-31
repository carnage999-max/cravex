import { NextResponse } from 'next/server';
import { db, users, sessions } from '@cravex/db';
import { eq, and, gt } from 'drizzle-orm';
import { authVerifyOtpSchema } from '@cravex/shared';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = authVerifyOtpSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { email, code } = result.data;
        const now = new Date();

        const resultUsers = await db.select()
            .from(users)
            .where(and(eq(users.email, email), eq(users.otpCode, code), gt(users.otpExpiresAt, now)))
            .limit(1);

        if (resultUsers.length === 0) {
            return NextResponse.json({ error: 'Invalid code or expired' }, { status: 401 });
        }

        const user = resultUsers[0];

        // Create session token
        const token = randomUUID(); // Simple token for MVP
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

        await db.insert(sessions).values({
            userId: user.id,
            tokenHash: token,
            expiresAt: expiresAt,
        });

        // Clear OTP
        await db.update(users)
            .set({ otpCode: null, otpExpiresAt: null })
            .where(eq(users.id, user.id));

        return NextResponse.json({
            ok: true,
            token: token,
            userId: user.id
        });

    } catch (error) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
