'use client'

import React from 'react'
import { Check } from 'lucide-react'

const conditions = [
    'cravings and compulsive urges',
    'anxiety and stress patterns',
    'emotional escalation and overwhelm',
    'habit loops that feel hard to interrupt'
]

export function Conditions() {
    return (
        <section id="conditions" className="py-24 px-6 bg-[#fcfcfc]">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        What CRAVEX<span className="text-sm align-top">®</span> is designed to support
                    </h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        CRAVEX<span className="text-sm align-top">®</span> is designed to support people who experience:
                    </p>
                    <div className="space-y-4">
                        {conditions.map((item) => (
                            <div key={item} className="flex items-start gap-3 group">
                                <div className="mt-1 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                    <Check className="w-3 h-3" />
                                </div>
                                <span className="text-lg text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm space-y-6 flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900">
                        <span className="font-bold text-xl">!</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg italic">
                        "CRAVEX® does not replace clinical care. It is designed to complement support systems and healthy routines."
                    </p>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">
                        Safety Note
                    </p>
                </div>
            </div>
        </section>
    )
}
