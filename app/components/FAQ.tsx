'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/app/lib/utils'

const faqs = [
    {
        q: "Is CRAVEX® a medical device?",
        a: "CRAVEX® is presented here as a nervous-system technology concept and product platform. Regulatory status depends on jurisdiction and implementation details."
    },
    {
        q: "Who is CRAVEX® for?",
        a: "Individuals dealing with cravings, anxiety, or stress; family members researching options; clinicians; institutional partners; and reviewers who need a clear, responsible explanation."
    },
    {
        q: "Does it replace therapy or clinical care?",
        a: "No. CRAVEX® is designed to complement support systems, not replace them."
    },
    {
        q: "How do you handle privacy?",
        a: "Privacy-first defaults, minimal analytics, and clear consent. We avoid invasive tracking."
    }
]

function FAQItem({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
                aria-expanded={isOpen}
            >
                <span className={cn(
                    "text-lg font-semibold transition-colors duration-300",
                    isOpen ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                )}>
                    {q}
                </span>
                <ChevronDown className={cn(
                    "w-5 h-5 text-slate-400 transition-transform duration-300",
                    isOpen && "rotate-180 text-slate-900"
                )} />
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-slate-600 leading-relaxed max-w-2xl">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="py-24 px-6 bg-[#fcfcfc]">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500">
                        Clarity on our technology, mission, and boundaries.
                    </p>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                        {faqs.map((faq, i) => (
                            <FAQItem
                                key={i}
                                {...faq}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
