import { NextResponse } from 'next/server';
import { db, users } from '@cravex/db';
import { eq } from 'drizzle-orm';
import { authRequestOtpSchema } from '@cravex/shared';
import { Resend } from 'resend';
import { AuthEmail } from '@/app/emails/AuthEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = authRequestOtpSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { email } = result.data;
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length === 0) {
            await db.insert(users).values({
                email,
                otpCode,
                otpExpiresAt: expiresAt,
            });
        } else {
            await db.update(users)
                .set({ otpCode, otpExpiresAt: expiresAt })
                .where(eq(users.email, email));
        }

        // Send actual email using Resend
        const { error } = await resend.emails.send({
            from: `CRAVEX <${process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'}>`,
            to: email,
            subject: 'Login Verification Code - CRAVEX®',
            react: AuthEmail({ otpCode }),
        });

        if (error) {
            console.error('Resend Error:', error);
            // Even if email fails, we don't necessarily want to expose that to the user for privacy
            // but for debugging purposes during dev/mvp we'll return an error.
            return NextResponse.json({ error: 'Failed to send verification code' }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Auth Request Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
