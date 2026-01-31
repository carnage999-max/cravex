'use client'

import React from 'react'
import { ShieldCheck, EyeOff, ClipboardCheck, Layout } from 'lucide-react'

const principles = [
    { icon: <EyeOff className="w-6 h-6" />, title: 'Minimal Analytics', text: 'We avoid invasive tracking and prefer server-side logs without PII.' },
    { icon: <ShieldCheck className="w-6 h-6" />, title: 'User Control', text: 'You own your data. We minimize collection and optimize for privacy.' },
    { icon: <ClipboardCheck className="w-6 h-6" />, title: 'Clear Consent', text: 'No dark patterns. No legalese. Just honest, clear communication.' },
    { icon: <Layout className="w-6 h-6" />, title: 'Accessibility', text: 'Inclusive design is a safety requirement, not an afterthought.' }
]

export function PrivacySafety() {
    return (
        <section id="privacy" className="py-24 px-6 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Privacy-first by default
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        CRAVEX® minimizes data collection and avoids invasive tracking. We do not use dark patterns. We do not optimize for addiction or compulsion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {principles.map((p) => (
                        <div key={p.title} className="flex gap-6 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors duration-500">
                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-900 shadow-sm">
                                {p.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{p.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center p-8 border-t border-slate-100">
                    <p className="text-sm text-slate-400 font-medium">
                        Our ethics are built into the code. We build to reduce harm, not increase engagement.
                    </p>
                </div>
            </div>
        </section>
    )
}
