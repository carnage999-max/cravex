'use client'

import React from 'react'

export function About() {
    return (
        <section id="about" className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-8 text-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border border-slate-100">
                    Our Mission
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                    Built to reduce harm, not increase attention.
                </h2>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                    CRAVEX® exists to make nervous-system support feel calm, clear, and safe—especially for people who are tired of being pushed by urgency-driven systems.
                </p>

                <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="space-y-2">
                        <p className="text-4xl font-bold text-slate-900">01</p>
                        <p className="font-semibold text-slate-900">Calm by Design</p>
                        <p className="text-sm text-slate-500">Every interaction is engineered to lower intensity.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-bold text-slate-900">02</p>
                        <p className="font-semibold text-slate-900">Education First</p>
                        <p className="text-sm text-slate-500">Understanding the signal is the first step to control.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-bold text-slate-900">03</p>
                        <p className="font-semibold text-slate-900">Privacy Default</p>
                        <p className="text-sm text-slate-500">Your state of mind is your most private data.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
