'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface StoreButtonsProps {
    className?: string;
    variant?: 'center' | 'left';
}

export function StoreButtons({ className, variant = 'center' }: StoreButtonsProps) {
    const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL || '#'
    const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '#'

    return (
        <div className={`flex flex-col ${variant === 'center' ? 'items-center' : 'items-start'} gap-6 ${className}`}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Download the Companion App</p>
            <div className="flex items-center gap-4">
                <Link href={appStoreUrl} className="transition-transform hover:scale-105 active:scale-95">
                    <Image
                        src="/store/app-store.jpeg"
                        alt="Download on the App Store"
                        width={140}
                        height={42}
                        className="h-10 w-auto rounded-lg shadow-xl shadow-slate-200"
                    />
                </Link>
                <Link href={playStoreUrl} className="transition-transform hover:scale-105 active:scale-95">
                    <Image
                        src="/store/play-store.svg"
                        alt="Get it on Google Play"
                        width={140}
                        height={42}
                        className="h-10 w-auto rounded-lg shadow-xl shadow-slate-200"
                    />
                </Link>
            </div>
        </div>
    )
}
