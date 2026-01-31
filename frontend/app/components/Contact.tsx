'use client'

import React, { useState } from 'react'
import { Button } from './ui/Button'
import { ContactFormData } from '@/app/lib/schema'
import { Loader2, Mail, Send } from 'lucide-react'

export function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to send')
            }

            setStatus('success')
            setFormData({ name: '', email: '', message: '' })
        } catch (err: any) {
            setStatus('error')
            setErrorMessage(err.message || 'Something went wrong')
        }
    }

    return (
        <section id="contact" className="py-24 px-6 bg-[#fcfcfc]">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Let's connect
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            If you are a clinician, partner, reviewer, or someone seeking clarity, reach out.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-slate-600">
                            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shadow-sm shadow-red-50">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-slate-900 underline decoration-red-200 decoration-2 underline-offset-4 pointer-events-none">contact@cravex.tech</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-sm shadow-slate-200/50">
                    {status === 'success' ? (
                        <div className="text-center space-y-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Sent with care</h3>
                            <p className="text-slate-600">Thank you. We’ll respond with care and clarity.</p>
                            <Button variant="outline" className="mt-4" onClick={() => setStatus('idle')}>
                                Send another message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-200 focus:bg-white transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-200 focus:bg-white transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-200 focus:bg-white transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-sm font-medium text-red-500 ml-1">{errorMessage}</p>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    'Send message'
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
