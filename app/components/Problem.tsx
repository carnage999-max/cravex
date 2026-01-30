'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAccessibility } from './AccessibilityProvider'

export function Problem() {
    const { reduceMotion } = useAccessibility()

    return (
        <section id="problem" className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        When cravings and stress take over, it rarely feels logical.
                    </h2>
                    <div className="space-y-6 text-xl md:text-2xl text-slate-600 leading-relaxed">
                        <p>
                            CRAVEX<span className="text-sm align-top">®</span> is not just a tool; it's a <span className="text-red-600 font-bold underline decoration-red-200 underline-offset-8">shift in perspective</span>.
                            Cravings, anxiety, and stress often show up as patterns—not decisions. They can override intention and pull attention into loops that feel difficult to interrupt.
                        </p>
                        <p className="font-bold text-slate-900 border-l-4 border-red-600 pl-6 py-2 bg-red-50/30 rounded-r-2xl">
                            CRAVEX<span className="text-sm align-top">®</span> focuses on the nervous system layer: what happens before choice.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all duration-500">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 opacity-50">Urgency-Driven Systems</h3>
                        <p className="text-slate-600">Many approaches rely on willpower or high-intensity distractions, which can increase stress when you need calm.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-red-600 shadow-2xl shadow-red-200/50 text-white flex flex-col justify-between transform md:translate-y-6 transition-all duration-500 hover:scale-[1.02]">
                        <h3 className="text-xl font-bold mb-4">The Calm Approach</h3>
                        <p className="opacity-90 leading-relaxed font-medium">CRAVEX<span className="text-sm align-top">®</span> creates space before the response, allowing the nervous system to settle naturally through structured, safe interruption.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
