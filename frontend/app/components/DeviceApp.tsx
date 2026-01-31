'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StoreButtons } from './StoreButtons'
import { Sparkles, Shield, Map, Accessibility } from 'lucide-react'

const features = [
    { icon: <Map className="w-5 h-5" />, text: 'guided flows' },
    { icon: <Sparkles className="w-5 h-5" />, text: 'gentle progress tracking' },
    { icon: <Shield className="w-5 h-5" />, text: 'privacy-first defaults' },
    { icon: <Accessibility className="w-5 h-5" />, text: 'accessible design' },
]

export function DeviceApp() {
    return (
        <section id="device" className="py-24 px-6 bg-[#fcfcfc] overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white">
                        <Image
                            src="/cravex-equipment-on-wrist.png"
                            alt="CRAVEX Device on wrist"
                            width={600}
                            height={800}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-slate-200/50 rounded-full blur-3xl -z-10" />
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            A device-and-app experience designed for real life
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            CRAVEX® is experienced through a device and companion app that guide calm interruption flows, track patterns privately, and help users build consistency over time.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pb-4">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                <div className="text-slate-400">{feature.icon}</div>
                                <span className="text-slate-900 font-medium">{feature.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 p-10 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-sm shadow-slate-200/50">
                        <div className="space-y-2 text-left">
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">Get Started</p>
                            <p className="text-lg font-bold text-slate-900 leading-tight">
                                Download the CRAVEX® companion app to begin your journey.
                            </p>
                        </div>
                        <StoreButtons variant="left" />
                    </div>
                </div>
            </div>
        </section>
    )
}
