'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
    reduceMotion: boolean
    toggleReduceMotion: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('cravex-reduce-motion')
        if (saved !== null) {
            setReduceMotion(saved === 'true')
        } else {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            setReduceMotion(prefersReduced)
        }
    }, [])

    const toggleReduceMotion = () => {
        setReduceMotion((prev) => {
            const next = !prev
            localStorage.setItem('cravex-reduce-motion', String(next))
            return next
        })
    }

    return (
        <AccessibilityContext.Provider value={{ reduceMotion, toggleReduceMotion }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext)
    if (context === undefined) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider')
    }
    return context
}
