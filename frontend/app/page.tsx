'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Navbar } from './components/Navbar'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { TechDeepDive } from './components/TechDeepDive'
import { Conditions } from './components/Conditions'
import { Science } from './components/Science'
import { DeviceApp } from './components/DeviceApp'
import { PrivacySafety } from './components/PrivacySafety'
import { FAQ } from './components/FAQ'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { StoreButtons } from './components/StoreButtons'

const Hero = dynamic(() => import('./components/Hero').then(mod => mod.Hero), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#fcfcfc]" />
})

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <TechDeepDive />
      <Conditions />
      <Science />
      <DeviceApp />
      <PrivacySafety />
      <FAQ />
      <About />
      <Contact />

      <footer className="py-24 px-6 bg-[#fcfcfc] border-t border-slate-100 italic">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 group">
            <Image
              src="/cravex.png"
              alt="CRAVEX Logo"
              width={100}
              height={100}
              className="w-24 h-24 object-contain rounded-[2rem] shadow-xl shadow-slate-200/50 hover:scale-105 transition-all duration-500"
            />
            <div className="text-center">
              <div className="text-3xl font-black tracking-tighter text-slate-900 leading-none uppercase">
                CRAVEX<span className="text-xs align-top relative top-0.5 ml-0.5 opacity-40 font-bold">®</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.6em] text-red-600 font-black leading-none mt-3">
                Control the Craving
              </div>
            </div>
          </div>

          <StoreButtons />

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100 pt-12">
            <div className="text-sm text-slate-400 font-medium">
              © 2026 CRAVEX Technology. All rights reserved. Calm by design.
            </div>

            <div className="flex items-center gap-8">
              <a href="/privacy" className="text-xs font-black text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-xs font-black text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors">Terms of Service</a>
              <a href="#contact" className="text-xs font-black text-slate-500 hover:text-red-600 uppercase tracking-widest transition-colors">Connect</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
