import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AccessibilityProvider } from '@/app/components/AccessibilityProvider'
import { WalkthroughProvider } from '@/app/components/WalkthroughProvider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRAVEX® — Calm Nervous-System Technology',
  description: 'CRAVEX® is a nervous-system technology designed to support people dealing with cravings, anxiety, and stress through calm, guided pattern interruption.',
  openGraph: {
    title: 'CRAVEX® — Calm Nervous-System Technology',
    description: 'Calm the signal. Regain control. Professional support for cravings and stress.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#fcfcfc] text-slate-900`}>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <AccessibilityProvider>
          <WalkthroughProvider>
            {children}
          </WalkthroughProvider>
        </AccessibilityProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CRAVEX",
              "url": "https://cravex.tech",
              "logo": "https://cravex.tech/cravex.png",
              "description": "CRAVEX is a nervous-system technology designed to support people dealing with cravings, anxiety, and stress."
            })
          }}
        />
      </body>
    </html>
  )
}
