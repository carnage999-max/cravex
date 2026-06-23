'use client'

import React from 'react'
import { Button } from './ui/Button'
import { StoreButtons } from './StoreButtons'
import { useWalkthrough } from './WalkthroughProvider'

export function Hero() {
    const { startWalkthrough } = useWalkthrough()

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.38),rgba(248,250,252,0.82)_58%,rgba(248,250,252,0.94)_100%)]" />
                <div className="absolute inset-0 bg-white/20" />
            </div>

            <div className="max-w-4xl w-full text-center space-y-12 z-10">
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none">
                        Calm the signal.<br />
                        <span className="text-red-600">Regain control.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        CRAVEX<span className="text-sm align-top">®</span> is a nervous-system technology designed to support people dealing with cravings, anxiety, and stress—through calm, guided pattern interruption and regulation.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-200"
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explore How It Works
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={startWalkthrough}
                        className="w-full sm:w-auto border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                    >
                        Start Guided Walkthrough
                    </Button>
                </div>

                <StoreButtons className="pt-8" />

                <div className="flex flex-col items-center gap-4">
                    <div className="h-px w-24 bg-slate-200" />
                    <div className="px-6 py-2 rounded-full bg-red-50 border border-red-100 shadow-sm animate-pulse-slow">
                        <p className="text-xs md:text-sm text-red-700 font-bold uppercase tracking-[0.2em]">
                            No urgency. No pressure. <span className="text-red-900">Just clarity.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                <div className="w-px h-16 bg-gradient-to-b from-slate-400 to-transparent" />
            </div>
        </section>
    )
}
