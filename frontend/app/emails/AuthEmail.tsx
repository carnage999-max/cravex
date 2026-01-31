import * as React from "react";
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface AuthEmailProps {
    otpCode: string;
}

export const AuthEmail = ({ otpCode }: AuthEmailProps) => (
    <Html>
        <Head />
        <Preview>Your CRAVEX® login verification code</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logoSection}>
                    <Heading style={logoText}>CRAVEX®</Heading>
                </Section>
                <Heading style={h1}>Login Verification</Heading>
                <Text style={text}>
                    Please use the following code to complete your login to the CRAVEX® platform. This code will expire in 10 minutes.
                </Text>
                <Section style={codeContainer}>
                    <Text style={code}>{otpCode}</Text>
                </Section>
                <Text style={footerText}>
                    If you did not request this code, you can safely ignore this email.
                </Text>
                <Hr style={hr} />
                <Text style={footer}>
                    © {new Date().getFullYear()} CRAVEX® Technology. All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};

const logoSection = {
    padding: "0 40px",
    backgroundColor: "#dc2626",
    textAlign: "center" as const,
};

const logoText = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "900",
    letterSpacing: "4px",
    margin: "20px 0",
};

const h1 = {
    color: "#1e293b",
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "40px",
    margin: "40px 0 0",
    padding: "0 40px",
};

const text = {
    color: "#475569",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "24px 0",
    padding: "0 40px",
};

const codeContainer = {
    padding: "32px 40px",
    textAlign: "center" as const,
};

const code = {
    color: "#1e293b",
    fontSize: "36px",
    fontWeight: "900",
    letterSpacing: "12px",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "24px",
    display: "inline-block",
};

const footerText = {
    color: "#94a3b8",
    fontSize: "12px",
    lineHeight: "20px",
    margin: "12px 0 0",
    padding: "0 40px",
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "40px 0",
};

const footer = {
    color: "#94a3b8",
    fontSize: "12px",
    lineHeight: "16px",
    padding: "0 40px",
    textAlign: "center" as const,
};
