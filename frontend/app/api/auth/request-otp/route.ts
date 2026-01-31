import { NextResponse } from 'next/server';
import { db, users } from '@cravex/db'; // Assuming @cravex/db exports 'db' and tables
import { eq } from 'drizzle-orm';
import { authRequestOtpSchema } from '@cravex/shared';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

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
            // Create new user (or just record otp for verification flow)
            await db.insert(users).values({
                email,
                otpCode,
                otpExpiresAt: expiresAt,
            });
        } else {
            // Update existing user
            await db.update(users)
                .set({ otpCode, otpExpiresAt: expiresAt })
                .where(eq(users.email, email));
        }

        // Send email (mocked for now)
        console.log(`[AUTH] OTP for ${email}: ${otpCode}`);

        // await resend.emails.send({
        //   from: 'CRAVEX <auth@cravex.tech>',
        //   to: email,
        //   subject: 'Your Login Code',
        //   html: `<p>Your code is <strong>${otpCode}</strong></p>`
        // });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Auth Request Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
