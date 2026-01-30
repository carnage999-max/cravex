import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
}

export const ContactEmail = ({
    name,
    email,
    message,
}: ContactEmailProps) => (
    <Html>
        <Head />
        <Preview>New contact from {name} - CRAVEX®</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoContainer}>
                    {/* Note: In production, this should be a full URL to your hosted logo */}
                    <Text style={logoText}>CRAVEX®</Text>
                </Section>
                <Heading style={heading}>New Connection Request</Heading>
                <Section style={section}>
                    <Text style={text}>
                        <strong>Name:</strong> {name}
                    </Text>
                    <Text style={text}>
                        <strong>Email:</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link>
                    </Text>
                    <Hr style={hr} />
                    <Text style={label}>Message:</Text>
                    <Text style={messageText}>{message}</Text>
                </Section>
                <Text style={footer}>
                    This inquiry was sent from the CRAVEX® landing page.
                    <br />
                    © 2026 CRAVEX Technology. Calm by design.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ContactEmail;

const main = {
    backgroundColor: '#fcfcfc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
};

const logoContainer = {
    marginBottom: '32px',
};

const logoText = {
    fontSize: '24px',
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: '-0.05em',
    textTransform: 'uppercase' as const,
};

const heading = {
    fontSize: '28px',
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: '-0.05em',
    marginBottom: '24px',
};

const section = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const text = {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '24px',
    margin: '8px 0',
};

const label = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#ef4444',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.2em',
    marginBottom: '8px',
};

const messageText = {
    fontSize: '16px',
    color: '#0f172a',
    lineHeight: '26px',
    backgroundColor: '#fff1f2',
    padding: '20px',
    borderRadius: '16px',
    border: '1px solid #fee2e2',
    fontStyle: 'italic',
};

const link = {
    color: '#ef4444',
    textDecoration: 'underline',
};

const hr = {
    borderColor: '#f1f5f9',
    margin: '24px 0',
};

const footer = {
    color: '#94a3b8',
    fontSize: '12px',
    textAlign: 'center' as const,
    marginTop: '32px',
};
