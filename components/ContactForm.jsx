'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { showSuccess, showError } from '@/lib/swal'

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Enter a valid email address'),
    subject: z.string().min(1, 'Please select a subject'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

const SUBJECTS = [
    'General Query',
    'Learning Guidance',
    'Feedback',
    'Partnership / Collaboration',
]

const inputClasses = 'w-full bg-white border-2 border-gray-100 text-gray-900 placeholder-gray-400 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10 transition-all duration-200 font-medium'

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: zodResolver(schema) })

    async function onSubmit(data) {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error('Failed to submit')
            showSuccess('Message sent! We\'ll get back to you within a reasonable timeframe.')
            reset()
        } catch {
            showError('Something went wrong. Please try again.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4 tracking-wider uppercase">
                Get in Touch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('name')}
                        placeholder="Your full name"
                        className={inputClasses}
                    />
                    {errors.name && <p className="mt-1.5 text-sm font-semibold text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClasses}
                    />
                    {errors.email && <p className="mt-1.5 text-sm font-semibold text-red-500">{errors.email.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                </label>
                <select
                    {...register('subject')}
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    defaultValue=""
                >
                    <option value="" disabled>Select a subject...</option>
                    {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                {errors.subject && <p className="mt-1.5 text-sm font-semibold text-red-500">{errors.subject.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="How can we help you?"
                    className={`${inputClasses} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-sm font-semibold text-red-500">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 mt-2 text-lg disabled:opacity-60"
            >
                {isSubmitting ? 'Sending...' : 'Submit →'}
            </button>
        </form>
    )
}
