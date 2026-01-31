'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils'
import { useAccessibility } from './AccessibilityProvider'
import { useWalkthrough } from './WalkthroughProvider'
import { Button } from './ui/Button'
import { Zap, ZapOff } from 'lucide-react'

const navLinks = [
    { href: '#problem', label: 'Problem' },
    { href: '#how-it-works', label: 'Process' },
    { href: '#technology', label: 'Tech' },
    { href: '#conditions', label: 'Use Cases' },
    { href: '#science', label: 'Science' },
    { href: '#contact', label: 'Contact' },
]

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const pathname = usePathname()
    const { reduceMotion, toggleReduceMotion } = useAccessibility()
    const { startWalkthrough } = useWalkthrough()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)

            if (pathname !== '/') {
                setActiveSection('')
                return
            }

            const sections = navLinks.map(link => link.href.substring(1))
            for (const section of sections.reverse()) {
                const el = document.getElementById(section)
                if (el && el.getBoundingClientRect().top <= 100) {
                    setActiveSection(section)
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-6 transition-transform hover:scale-[1.02] active:scale-95 group">
                        <Image
                            src="/cravex.png"
                            alt="CRAVEX Logo Mark"
                            width={100}
                            height={100}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-2xl shadow-xl shadow-slate-200/50 hover:scale-105 transition-all duration-500"
                            priority
                        />
                        <div className="flex flex-col">
                            <span className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 leading-none uppercase">
                                CRAVEX<span className="text-xs align-top relative top-0.5 ml-0.5 opacity-40 font-bold">®</span>
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.4em] text-red-600 font-black leading-none mt-2 grayscale group-hover:grayscale-0 transition-all">
                                Control the Craving
                            </span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={`/${link.href}`}
                                className={cn(
                                    'text-sm font-bold transition-all hover:text-red-600 uppercase tracking-widest',
                                    activeSection === link.href.substring(1) ? 'text-red-600' : 'text-slate-500'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleReduceMotion}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                            reduceMotion
                                ? "bg-slate-100 text-slate-400"
                                : "bg-red-50 text-red-600 shadow-sm shadow-red-100"
                        )}
                        title={reduceMotion ? "Enable animations" : "Reduce motion"}
                    >
                        {reduceMotion ? <ZapOff className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        <span className="hidden sm:inline">{reduceMotion ? 'Motion: Off' : 'Motion: On'}</span>
                    </button>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={startWalkthrough}
                        className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 font-black uppercase tracking-widest text-[10px] py-3 px-6 shadow-xl shadow-red-200"
                    >
                        Start Walkthrough
                    </Button>
                </div>
            </div>
        </nav>
    )
}
