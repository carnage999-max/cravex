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
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center justify-center overflow-hidden group-hover:border-red-500 transition-all duration-500">
              <Image
                src="/cravex.png"
                alt="CRAVEX Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="text-center">
              <div className="text-2xl font-black tracking-tighter text-slate-900 leading-none uppercase">
                CRAVEX<span className="text-xs align-top relative top-0.5 ml-0.5 opacity-40 font-bold">®</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-black leading-none mt-2">
                Control the Craving
              </div>
            </div>
          </div>

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
