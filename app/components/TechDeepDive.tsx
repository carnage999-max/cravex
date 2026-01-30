'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/app/lib/utils'
import { Info } from 'lucide-react'

const phases = [
    { id: 'trigger', label: 'Trigger', description: 'The internal or external event that signals the nervous system to react.' },
    { id: 'escalation', label: 'Escalation', description: 'A rapid rise in biological intensity, often felt as tension or narrowing focus.' },
    { id: 'loop', label: 'Loop', description: 'The repetitive pattern where the craving or anxiety reinforces itself.' },
    { id: 'interruption', label: 'Interruption', description: 'A gentle, structured pause introduced by CRAVEX® to break the cycle.', color: 'red' },
    { id: 'recovery', label: 'Recovery', description: 'The return to a stable, regulated state where clarity and choice return.' },
]

export function TechDeepDive() {
    const [activePhase, setActivePhase] = useState<string | null>(null)

    return (
        <section id="technology" className="py-24 px-6 bg-white border-y border-slate-100">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="space-y-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        A nervous-system lens (without the jargon)
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        CRAVEX® explains cravings and stress as signals moving through a system—trigger, escalation, and response.
                    </p>
                </div>

                {/* Interactive Diagram */}
                <div className="relative p-8 md:p-12 rounded-[3rem] bg-slate-50 border border-slate-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        {phases.map((phase, i) => (
                            <React.Fragment key={phase.id}>
                                <button
                                    onMouseEnter={() => setActivePhase(phase.id)}
                                    onMouseLeave={() => setActivePhase(null)}
                                    onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                                    className={cn(
                                        "group relative flex flex-col items-center gap-3 transition-all duration-300",
                                        activePhase === phase.id ? "scale-110" : "hover:scale-105"
                                    )}
                                    aria-expanded={activePhase === phase.id}
                                    aria-controls={`description-${phase.id}`}
                                >
                                    <div className={cn(
                                        "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
                                        phase.id === 'interruption'
                                            ? "bg-red-600 text-white shadow-lg shadow-red-200 ring-4 ring-red-50"
                                            : (activePhase === phase.id ? "bg-white text-slate-900 shadow-md" : "bg-slate-200/50 text-slate-500")
                                    )}>
                                        <span className="text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <span className={cn(
                                        "text-sm font-semibold transition-colors duration-300",
                                        activePhase === phase.id ? "text-slate-900" : "text-slate-500"
                                    )}>
                                        {phase.label}
                                    </span>
                                </button>
                                {i < phases.length - 1 && (
                                    <div className="hidden md:block w-px h-8 bg-slate-200 flex-1 relative -top-4" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-12 h-32 flex items-center justify-center text-center">
                        <AnimatePresence mode="wait">
                            {activePhase ? (
                                <motion.div
                                    key={activePhase}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    id={`description-${activePhase}`}
                                    className="max-w-lg space-y-2"
                                >
                                    <h4 className="text-lg font-black text-red-600 uppercase tracking-widest italic">
                                        {phases.find(p => p.id === activePhase)?.label}
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        {phases.find(p => p.id === activePhase)?.description}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-slate-400 flex items-center gap-2"
                                >
                                    <Info className="w-4 h-4" />
                                    <span>Hover or tap an element to explore the cycle</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Subtle connecting line backgroud */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-16 hidden md:block" />
                </div>

                <p className="text-center text-slate-500 italic max-w-xl mx-auto">
                    "The goal is to help users recognize the pattern early and introduce a safe interruption."
                </p>
            </div>
        </section>
    )
}
