'use client'

import React from 'react'
import { Navbar } from '../components/Navbar'
import { Button } from '../components/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
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
                            Global Privacy Policy
                        </h1>
                        <p className="text-slate-500 font-medium">Last Updated: {lastUpdated}</p>
                    </div>

                    <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
                            <p>
                                This Global Privacy Policy (the “Policy”) describes how CRAVEX® (“Company,” “we,” “our,” or “us”) collects, uses, discloses, and safeguards personal information across all current and future websites, subdomains, and online services (collectively, the “Services”). This Policy sets a global standard for privacy compliance and data protection in accordance with the highest international legal frameworks, including but not limited to the General Data Protection Regulation (EU) 2016/679 (“GDPR”), the California Consumer Privacy Act and Privacy Rights Act (CCPA/CPRA), the Virginia Consumer Data Protection Act (VCDPA), the Canadian Personal Information Protection and Electronic Documents Act (PIPEDA), and the Brazilian General Data Protection Law (LGPD). It applies to all users regardless of geographic location.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">1. Scope and Applicability</h2>
                            <p>
                                This Policy applies to all visitors, customers, and users of our Services, and to all data collected online or offline through any form of interaction. By using our Services, you consent to the practices described herein.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
                            <p>
                                We collect personal data directly and automatically, including identifiers (name, email, phone number, address), commercial data (transactions, purchases, payment methods), biometric and health data (where applicable), geolocation, internet activity, behavioral analytics, device identifiers, and any other data required for lawful and legitimate business operations.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">3. Automated and AI‑Based Processing</h2>
                            <p>
                                We utilize Artificial Intelligence and Machine Learning (“AI/ML”) technologies to analyze behavioral data, enhance service personalization, detect fraud, and improve user experience. Automated decision‑making may influence personalized recommendations or fraud prevention mechanisms, never without appropriate human oversight and legal safeguards.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">4. How We Use Information</h2>
                            <p>
                                We process data for legitimate business purposes: service delivery, account management, communication, compliance, analytics, marketing, personalization, and platform security. Processing is always grounded in a lawful basis under applicable law.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">5. Disclosure and Data Sharing</h2>
                            <p>
                                We do not sell personal data. We share information only with trusted service providers, payment processors, affiliates, analytics vendors, and legal authorities when required by law. Each third‑party partner is contractually obligated to maintain equivalent data protection standards.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">6. International Data Transfers</h2>
                            <p>
                                Data may be processed and stored in the United States and other jurisdictions. All transfers comply with GDPR Chapter V and equivalent safeguards through Standard Contractual Clauses, adequacy decisions, or binding corporate rules.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">7. Data Retention</h2>
                            <p>
                                Personal data is retained only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Retention schedules are periodically reviewed for compliance and minimization.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">8. Children’s Privacy</h2>
                            <p>
                                We comply with the Children’s Online Privacy Protection Act (COPPA) and do not knowingly collect data from children under 13 years old (or 16 in applicable jurisdictions) without verifiable parental consent. Parents may contact us to review or delete their child’s data at any time.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">9. Your Rights</h2>
                            <p>
                                Depending on your jurisdiction, you may have the right to access, correct, delete, restrict processing, object to processing, port your data, or withdraw consent. Requests can be submitted using the contact information below.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">10. Security and Safeguards</h2>
                            <p>
                                We employ administrative, technical, and physical safeguards that meet or exceed industry standards, including encryption, pseudonymization, role‑based access controls, multi‑factor authentication, and continuous threat monitoring.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">11. Cookies and Tracking Technologies</h2>
                            <p>
                                We use cookies, web beacons, and similar tools for site functionality, analytics, and marketing. Users can control cookie preferences via browser settings or our Cookie Management Tool.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">12. Cross‑Border Compliance</h2>
                            <p>
                                This Policy incorporates global privacy principles such as lawfulness, fairness, transparency, purpose limitation, data minimization, accuracy, integrity, and accountability. These principles apply uniformly across all operations and subsidiaries.
                            </p>
                        </section>

                        <section className="space-y-4 border-l-4 border-red-600 pl-6 bg-red-50/30 p-6 rounded-r-3xl">
                            <h2 className="text-2xl font-bold text-slate-900">13. Data Protection Officer and Contact</h2>
                            <p>
                                We maintain a designated Data Protection Officer (“DPO”) to oversee compliance. Users may exercise their rights or submit complaints via email at <span className="text-red-600 font-bold">privacy@cravex.tech</span> or by mail to our registered office in Florida, USA.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">14. Updates to This Policy</h2>
                            <p>
                                We may update this Policy to reflect legal, technical, or business developments. The latest version will always be available on our website, with a new 'Last Updated' date. Continued use of our Services constitutes acceptance of any modifications.
                            </p>
                        </section>
                    </div>

                    <div className="pt-12 border-t border-slate-100 flex items-center justify-between text-slate-400 text-sm">
                        <p>© 2026 CRAVEX®. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link>
                            <Link href="/#contact" className="hover:text-red-600 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
