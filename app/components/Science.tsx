'use client'

import React from 'react'

const evidenceItems = [
    { title: 'Measurable Outcomes', body: 'We prioritize data that shows shift in biological state and self-reported stability.' },
    { title: 'Transparency', body: 'Clear distinction between established science and ongoing validation phases.' },
    { title: 'Safety as Constraint', body: 'User ethics and safety are not features; they are the framework for every decision.' }
]

export function Science() {
    return (
        <section id="science" className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight text-center">
                        Evidence, validation, and responsible claims
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto text-center">
                        CRAVEX® is built with a validation mindset:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {evidenceItems.map((item) => (
                        <div key={item.title} className="space-y-4 p-8 rounded-3xl bg-slate-50 border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight">{item.title}</h3>
                            <p className="text-slate-600">{item.body}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold">Current Roadmap</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                <span className="font-medium text-slate-700">Internal Validation</span>
                                <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded">Ongoing</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-100 opacity-60">
                                <span className="font-medium text-slate-700">Planned Publications</span>
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded">Upcoming</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-8 bg-blue-50/30 rounded-[2.5rem] border border-blue-100/30">
                        <p className="text-slate-600 text-sm text-center italic">
                            We measure outcomes by tracking sympathetic nervous system shifts before and after guided interruptions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
