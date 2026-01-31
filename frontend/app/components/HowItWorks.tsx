'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from './AccessibilityProvider'
import { CheckCircle2 } from 'lucide-react'

const steps = [
    'reduce overwhelm',
    'restore moment-to-moment stability',
    'support follow-through without pressure'
]

export function HowItWorks() {
    const { reduceMotion } = useAccessibility()

    return (
        <section id="how-it-works" className="py-24 px-6 bg-[#fcfcfc]">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Pattern interruption, designed to feel safe.
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                        CRAVEX<span className="text-sm align-top">®</span> is built around a simple idea: when the nervous system escalates, the fastest path back is often a structured interruption that is calm, guided, and repeatable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step}
                            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-[2rem] bg-white shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-4 hover:border-red-100 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <p className="text-lg font-bold text-slate-900 leading-snug">
                                {step}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="p-10 md:p-12 rounded-[3rem] bg-red-600 text-white space-y-4 shadow-2xl shadow-red-200">
                    <p className="text-xs uppercase tracking-[0.3em] text-red-100 font-black">Our Philosophy</p>
                    <p className="text-2xl md:text-3xl font-bold leading-tight">
                        CRAVEX<span className="text-sm align-top">®</span> is not built on fear or urgency. It is built on <span className="underline decoration-red-400 underline-offset-8">calm design</span> and clear steps.
                    </p>
                </div>
            </div>
        </section>
    )
}
