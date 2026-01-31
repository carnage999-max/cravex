import { NextResponse } from 'next/server';
import { contactFormSchema } from '@cravex/shared';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = contactFormSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input', details: result.error.format() }, { status: 400 });
        }

        const { name, email, message } = result.data;

        // Log support request (mocked)
        console.log(`[SUPPORT] From: ${name} <${email}>: ${message}`);

        // await resend.emails.send(...)

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Support POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
