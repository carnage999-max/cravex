'use client'

import React, { Suspense, useMemo, useRef } from 'react'
import Image from 'next/image'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, useScroll, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'
import Link from 'next/link'
import { Button } from './ui/Button'
import { StoreButtons } from './StoreButtons'
import { useAccessibility } from './AccessibilityProvider'
import { useWalkthrough } from './WalkthroughProvider'

function CalmingShape() {
    const mesh = useRef<THREE.Mesh>(null!)
    const { reduceMotion } = useAccessibility()

    useFrame((state) => {
        if (reduceMotion) return
        const time = state.clock.getElapsedTime()
        mesh.current.rotation.x = Math.sin(time / 4) * 0.2
        mesh.current.rotation.y = Math.sin(time / 2) * 0.2
    })

    return (
        <Float speed={reduceMotion ? 0 : 1.5} rotationIntensity={reduceMotion ? 0 : 0.5} floatIntensity={reduceMotion ? 0 : 0.5}>
            <Sphere ref={mesh} args={[1, 64, 64]} scale={2}>
                <MeshDistortMaterial
                    color="#fca5a5"
                    speed={reduceMotion ? 0 : 2}
                    distort={reduceMotion ? 0 : 0.3}
                    radius={1}
                    emissive="#fee2e2"
                    emissiveIntensity={0.2}
                    roughness={0.2}
                    metalness={0.1}
                    transparent
                    opacity={0.6}
                />
            </Sphere>
        </Float>
    )
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#94a3b8" />
            <CalmingShape />
        </>
    )
}

export function Hero() {
    const { startWalkthrough } = useWalkthrough()

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
            {/* Background 3D */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,_#fff_0%,_#f9fafb_100%)]">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>
                </Canvas>
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
