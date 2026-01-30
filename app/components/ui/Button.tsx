'use client'

import React from 'react'
import { cn } from '@/app/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-200 hover:shadow-red-300',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors',
        outline: 'bg-transparent text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 transition-colors',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
    }

    return (
        <button
            className={cn(
                'rounded-full font-medium active:scale-95 disabled:opacity-50 disabled:active:scale-100',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
}
