import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/app/lib/schema'
import { ContactEmail } from '@/app/emails/ContactEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validated = contactSchema.parse(body)

        const { name, email, message } = validated

        // Simple in-memory rate limiting could be added here, 
        // but without a persistent store it's limited to the current instance.
        // For MVP, we'll proceed with sending.

        const toEmails = (process.env.CONTACT_TO_EMAIL || 'admin@example.com')
            .split(',')
            .map(email => email.trim())
            .filter(email => email.length > 0)

        const { data, error } = await resend.emails.send({
            from: `CRAVEX <${process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'}>`,
            to: toEmails,
            subject: `New contact from ${name} - CRAVEX®`,
            react: ContactEmail({ name, email, message }),
            replyTo: email,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
        }

        return NextResponse.json({ success: true, id: data?.id })
    } catch (err: any) {
        console.error('Contact API error:', err)
        if (err.name === 'ZodError') {
            return NextResponse.json({ error: err.errors }, { status: 400 })
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
