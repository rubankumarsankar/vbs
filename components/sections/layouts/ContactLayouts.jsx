'use client'

import Container from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import ContactForm from '@/components/ContactForm'
import { HiOutlineMail } from 'react-icons/hi'

/* ─── 1. Contact Hero ──────────────────────────────────────────── */
export function ContactHero({ data }) {
    return (
        <section className="relative bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent-400/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-36 text-center">
                <Reveal>
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" /> {data.tag || 'Contact'}
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                        {data.heading || 'Get in Touch'}
                    </h1>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
                        {data.subheading}
                    </p>
                </Reveal>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
            </div>
        </section>
    )
}

/* ─── 2. Contact Form Section ──────────────────────────────────── */
export function ContactFormSection({ data }) {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
            <Container className="max-w-5xl relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    {/* Left — Info */}
                    <div className="lg:col-span-2">
                        <Reveal>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight">
                                {data.heading || 'Contact Us'}
                            </h2>
                            <div className="text-gray-600 leading-relaxed space-y-4 mb-10" dangerouslySetInnerHTML={{ __html: data.body }} />
                        </Reveal>

                        <Reveal delay={0.1}>
                            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0">
                                        <HiOutlineMail className="text-xl text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 mb-0.5">Drop us a line</p>
                                        <a href={`mailto:${data.email || 'contact@virginiabusinesssolutions.in'}`} className="text-primary-600 font-bold hover:text-primary-700 transition-colors">
                                            {data.email || 'contact@virginiabusinesssolutions.in'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right — Form */}
                    <div className="lg:col-span-3">
                        <Reveal delay={0.15}>
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1.5">
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}
