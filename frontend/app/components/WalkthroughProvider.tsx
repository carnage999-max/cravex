'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, X, Play } from 'lucide-react'
import { Button } from './ui/Button'

interface WalkthroughStep {
    id: string
    title: string
    content: string
}

const steps: WalkthroughStep[] = [
    { id: 'hero', title: 'The Starting Signal', content: 'Welcome to CRAVEX®. Our journey begins with understanding how to calm the nervous system signals.' },
    { id: 'problem', title: 'Identifying the Pattern', content: 'We look at cravings and stress not as decisions, but as biological patterns that can be interrupted.' },
    { id: 'how-it-works', title: 'The Core Process', content: 'Learn how structured interruption creates safety and restores moment-to-moment stability.' },
    { id: 'technology', title: 'Interactive Science', content: 'Explore the 5 phases of the nervous system cycle: Trigger, Escalation, Loop, Interruption, and Recovery.' },
    { id: 'conditions', title: 'Targeted Support', content: 'See the specific anxiety and habit loops CRAVEX® is designed to help you manage.' },
    { id: 'science', title: 'Validation & Roadmap', content: 'Our commitment to evidence and measurable outcomes in nervous system regulation.' },
    { id: 'device', title: 'The CRAVEX Experience', content: 'A glimpse at the device and app designed to integrate seamlessly into your daily life.' },
    { id: 'privacy', title: 'Ethics First', content: 'Understanding our privacy-first defaults and commitment to non-invasive tracking.' },
    { id: 'faq', title: 'Have Questions?', content: 'We provided clear answers to common questions about regulatory status and clinical support.' },
    { id: 'contact', title: 'Reach Out', content: 'If you are a clinician or partner, we would love to connect with care and clarity.' },
]

interface WalkthroughContextType {
    isActive: boolean
    currentStep: number
    startWalkthrough: () => void
    stopWalkthrough: () => void
    nextStep: () => void
    prevStep: () => void
}

const WalkthroughContext = createContext<WalkthroughContextType | undefined>(undefined)

export function WalkthroughProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()
    const pathname = usePathname()

    const stopWalkthrough = useCallback(() => {
        setIsActive(false)
        document.body.style.overflow = 'auto'
    }, [])

    const startWalkthrough = useCallback(() => {
        if (pathname !== '/') {
            router.push('/?walkthrough=true')
            return
        }
        setIsActive(true)
        setCurrentStep(0)
        document.body.style.overflow = 'hidden'
        const target = document.getElementById(steps[0].id)
        target?.scrollIntoView({ behavior: 'smooth' })
    }, [pathname, router])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('walkthrough') === 'true' && pathname === '/') {
            // Remove the param immediately so it doesn't restart on refresh
            window.history.replaceState({}, '', '/')
            startWalkthrough()
        }
    }, [pathname, startWalkthrough])

    const nextStep = useCallback(() => {
        if (currentStep < steps.length - 1) {
            const next = currentStep + 1
            setCurrentStep(next)
            const target = document.getElementById(steps[next].id)
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else {
            stopWalkthrough()
        }
    }, [currentStep, stopWalkthrough])

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            const prev = currentStep - 1
            setCurrentStep(prev)
            const target = document.getElementById(steps[prev].id)
            target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }, [currentStep])

    return (
        <WalkthroughContext.Provider value={{ isActive, currentStep, startWalkthrough, stopWalkthrough, nextStep, prevStep }}>
            {children}

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-end p-6 md:p-12 mb-10"
                    >
                        {/* Spotlight overlay (simplified) */}
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] pointer-events-auto" onClick={stopWalkthrough} />

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 pointer-events-auto border border-slate-100"
                        >
                            <button
                                onClick={stopWalkthrough}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-900"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-red-600 font-black">
                                        Step {currentStep + 1} of {steps.length}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">
                                        {steps[currentStep].title}
                                    </h3>
                                </div>

                                <p className="text-slate-600 text-lg leading-relaxed">
                                    {steps[currentStep].content}
                                </p>

                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={prevStep}
                                            disabled={currentStep === 0}
                                            className="p-3 rounded-full border border-slate-100 disabled:opacity-30 enabled:hover:bg-slate-50 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-200 transition-all active:scale-95"
                                        >
                                            <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next Section'}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={stopWalkthrough}
                                        className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                                    >
                                        Skip
                                    </button>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="absolute bottom-0 left-0 h-1 bg-red-600 transition-all duration-500 rounded-b-full" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </WalkthroughContext.Provider>
    )
}

export function useWalkthrough() {
    const context = useContext(WalkthroughContext)
    if (context === undefined) {
        throw new Error('useWalkthrough must be used within a WalkthroughProvider')
    }
    return context
}
