'use client'

import React from 'react'
import { Navbar } from '../components/Navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
    const lastUpdated = "January 30, 2026"

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <div className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-600 transition-colors uppercase tracking-widest">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            Global Terms of Service
                        </h1>
                        <p className="text-slate-500 font-medium">Last Updated: {lastUpdated}</p>
                    </div>

                    <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
                            <p>
                                These Global Terms of Service (the “Terms”) govern your access to and use of CRAVEX® (“Company,” “we,” “our,” or “us”) services, websites, and applications (collectively, the “Services”). By accessing or using our Services, you agree to be bound by these Terms.
                            </p>
                        </section>

                        <section className="space-y-4 font-bold text-slate-900 border-l-4 border-red-600 pl-6 bg-red-50/30 p-6 rounded-r-3xl italic">
                            <p>
                                CRAVEX® is a nervous-system technology concept. It does not replace clinical care or medical advice. Use of the system is at your own discretion.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                            <p>
                                By using our Services, you establish a binding agreement with CRAVEX®. If you do not agree to these Terms, you may not access or use the Services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">2. Eligibility</h2>
                            <p>
                                You must be at least 13 years old (or 16 in some jurisdictions) to use our Services. Use by minors requires verifiable parental consent.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">3. User Conduct</h2>
                            <p>
                                Users are expected to interact with CRAVEX® in a manner that is respectful of the platform's mission to reduce harm and promote calm. Any attempt to reverse engineer, disrupt, or exploit the Services is prohibited.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">4. Intellectual Property</h2>
                            <p>
                                All content, trademarks, logos, and technology associated with CRAVEX® are the exclusive property of CRAVEX®. Use of these materials without express written consent is prohibited.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">5. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, CRAVEX® shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Services.
                            </p>
                        </section>

                        <section className="space-y-4 font-medium">
                            <h2 className="text-2xl font-bold text-slate-900">6. Governing Law</h2>
                            <p>
                                These Terms are governed by the laws of the State of Florida, USA, without regard to conflict of law principles.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">7. Contact Information</h2>
                            <p>
                                Requests or questions regarding these Terms can be submitted via email at <span className="text-red-600 font-bold">legal@cravex.tech</span>.
                            </p>
                        </section>
                    </div>

                    <div className="pt-12 border-t border-slate-100 flex items-center justify-between text-slate-400 text-sm">
                        <p>© 2026 CRAVEX®. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
                            <Link href="/#contact" className="hover:text-red-600 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
