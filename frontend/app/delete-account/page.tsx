import React from 'react';
import { Navbar } from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DeleteAccount() {
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
                            Account Deletion & Data Removal
                        </h1>
                        <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Requirement for Google Play Data Safety</p>
                    </div>

                    <div className="prose prose-slate max-w-none space-y-10 text-slate-600 leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">How to Delete Your CRAVEX® Account</h2>
                            <p>
                                We believe you should have full control over your data. You can request the deletion of your account and all associated biometric data through either of the following methods:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Option 1: In-App Request</h3>
                                    <p className="text-sm">
                                        Open the CRAVEX mobile app, navigate to <strong>Settings</strong> (via the profile icon), and tap on <strong>Delete Account</strong>. Follow the on-screen prompts to confirm your request.
                                    </p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Option 2: Email Request</h3>
                                    <p className="text-sm">
                                        Send an email from your registered address to <span className="text-red-600 font-bold">privacy@cravex.net</span> with the subject "Account Deletion Request".
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">What Data is Deleted?</h2>
                            <p>
                                Upon processing your deletion request, CRAVEX will permanently remove the following from our active production systems:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Account Profile:</strong> Your email address and authentication tokens.</li>
                                <li><strong>Biometric History:</strong> All recorded heart rate and skin conductance events.</li>
                                <li><strong>Device Pairings:</strong> All records of hardware devices linked to your account.</li>
                                <li><strong>Preferences:</strong> Your haptic intensity, LED brightness, and sensitivity settings.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">Data Retention & Exceptions</h2>
                            <p>
                                Once deleted, your data cannot be recovered. Please note the following retention specifics:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Backups:</strong> Residual data may remain in our secure encrypted backups for up to 30 days before being fully purged.</li>
                                <li><strong>Internal Logs:</strong> We may retain anonymized usage data (which cannot be linked back to you) for internal system auditing and security purposes.</li>
                                <li><strong>Legal Requirements:</strong> We may be legally required to retain transaction-related data if you have made a purchase through our platform.</li>
                            </ul>
                        </section>

                        <section className="space-y-4 border-l-4 border-red-600 pl-6 bg-red-50/30 p-8 rounded-r-3xl">
                            <h2 className="text-2xl font-bold text-slate-900">Important Warning</h2>
                            <p className="font-medium text-slate-800">
                                Deleting your account will immediately stop all cloud synchronization. Your CRAVEX hardware device will continue to function in autonomous local mode, but you will lose access to the Activity Log and historical trend analysis.
                            </p>
                        </section>
                    </div>

                    <div className="pt-12 border-t border-slate-100 flex items-center justify-between text-slate-400 text-sm">
                        <p>© 2026 CRAVEX®. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
                            <Link href="/#contact" className="hover:text-red-600 transition-colors">Contact Support</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
