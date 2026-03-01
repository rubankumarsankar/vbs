'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineLightningBolt, HiOutlineRefresh, HiOutlineChartBar, HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineTrendingUp, HiOutlineEye, HiOutlineArrowRight, HiOutlineStar } from 'react-icons/hi'

const ICON_MAP = {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup,
    HiOutlineLightningBolt, HiOutlineRefresh, HiOutlineChartBar,
    HiOutlineShieldCheck, HiOutlineCheckCircle, HiOutlineTrendingUp,
    HiOutlineEye, HiOutlineArrowRight, HiOutlineStar
}

/* ─── 1. About Hero ────────────────────────────────────────────── */
export function AboutHero({ data }) {
    return (
        <section className="relative bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-400/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-28 text-center">
                <Reveal>
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-primary-300 text-sm font-bold tracking-wider uppercase mb-8 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-accent-400 rounded-full" /> {data.tag || 'About Us'}
                    </span>
                </Reveal>
                <Reveal delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        {data.heading?.split('|').map((line, i) => (
                            <span key={i} className={i === 1 ? 'text-transparent bg-clip-text bg-linear-to-r from-primary-300 to-primary-500 block' : 'block'}>{line}</span>
                        ))}
                    </h1>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed mb-10">
                        {data.subheading}
                    </p>
                </Reveal>
                {data.ctaText && (
                    <Reveal delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={data.ctaHref || '/digital-skills'} className="bg-primary-500 hover:bg-primary-600 text-white font-extrabold py-4 px-10 rounded-lg shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 text-lg">
                                {data.ctaText}
                            </Link>
                        </div>
                    </Reveal>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
            </div>
        </section>
    )
}

/* ─── 2. About Intro (Why + Mission + Vision) ──────────────────── */
export function AboutIntro({ data }) {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-accent-400/5 rounded-full blur-[80px] pointer-events-none" />
            <Container className="max-w-4xl relative z-10">
                <Reveal>
                    <div className="text-lg text-gray-600 font-medium leading-relaxed mb-16 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: data.body }} />
                </Reveal>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <Reveal delay={0.1}>
                        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-5">
                                <HiOutlineStar className="text-2xl text-primary-600" />
                            </div>
                            <h2 className="text-xl font-extrabold text-gray-900 mb-3">{data.missionHeading || 'Our Mission'}</h2>
                            <p className="text-gray-600 leading-relaxed">{data.missionText}</p>
                        </div>
                    </Reveal>

                    {/* Vision */}
                    <Reveal delay={0.2}>
                        <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-5">
                                <HiOutlineEye className="text-2xl text-accent-600" />
                            </div>
                            <h2 className="text-xl font-extrabold text-gray-900 mb-3">{data.visionHeading || 'Our Vision'}</h2>
                            <p className="text-gray-600 leading-relaxed">{data.visionText}</p>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}

/* ─── 3. Who We Serve ──────────────────────────────────────────── */
export function AboutAudience({ data }) {
    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] pointer-events-none" />
            <Container className="max-w-5xl relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-md bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase mb-5">
                            {data.tag || 'Our Audience'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">{data.heading}</h2>
                    </div>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-14 leading-relaxed">{data.body}</p>
                </Reveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.cards?.map((card, i) => {
                        const Icon = ICON_MAP[card.icon] || HiOutlineUserGroup
                        return (
                            <Reveal key={i} delay={0.1 + i * 0.08}>
                                <div className="bg-gray-50 rounded-xl p-7 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                                    <div className="w-12 h-12 rounded-xl bg-primary-500 text-white flex items-center justify-center mb-5">
                                        <Icon className="text-2xl" />
                                    </div>
                                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">{card.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

/* ─── 4. Our Approach ──────────────────────────────────────────── */
export function AboutApproach({ data }) {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-accent-400/5 rounded-full blur-[100px] pointer-events-none" />
            <Container className="max-w-5xl relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-md bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase mb-5">
                            {data.tag || 'Our Approach'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">{data.heading}</h2>
                    </div>
                </Reveal>

                {/* Skills → Courses → Careers flow */}
                <Reveal delay={0.1}>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14">
                        {data.steps?.map((step, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="bg-linear-to-br from-primary-500 to-primary-700 text-white px-8 py-4 rounded-xl font-extrabold text-lg shadow-lg shadow-primary-500/15 text-center">
                                    {step}
                                </div>
                                {i < data.steps.length - 1 && (
                                    <HiOutlineArrowRight className="text-primary-400 text-2xl hidden md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {data.cards?.map((card, i) => (
                        <Reveal key={i} delay={0.15 + i * 0.08}>
                            <div className="bg-white rounded-xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full">
                                <div className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-3">Step {i + 1}</div>
                                <p className="text-gray-700 leading-relaxed">{card.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.3}>
                    <div className="bg-primary-50 border border-primary-100 rounded-xl p-8 text-center">
                        <p className="text-gray-700 font-medium leading-relaxed text-lg">{data.footerText}</p>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}

/* ─── 5. What Makes This Different ─────────────────────────────── */
export function AboutDifferent({ data }) {
    return (
        <section className="bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-400/5 rounded-full blur-[80px] pointer-events-none" />

            <Container className="max-w-5xl relative z-10">
                <Reveal>
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-white/5 border border-white/10 text-primary-300 text-xs font-bold tracking-widest uppercase mb-5 backdrop-blur-sm">
                            {data.tag || 'Our Difference'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{data.heading}</h2>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-8 mb-14">
                    {/* We don't do */}
                    <Reveal delay={0.1}>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-red-400 mb-5">{data.dontHeading || 'We do not...'}</h3>
                            <ul className="space-y-3">
                                {data.dontList?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400/60 shrink-0" />
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* We focus on */}
                    <Reveal delay={0.2}>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                            <h3 className="text-lg font-bold text-primary-400 mb-5">{data.doHeading || 'Instead, we focus on...'}</h3>
                            <ul className="space-y-3">
                                {data.doList?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <HiOutlineCheckCircle className="mt-0.5 text-primary-400 shrink-0" />
                                        <span className="text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.3}>
                    <p className="text-center text-gray-400 max-w-2xl mx-auto leading-relaxed">{data.footerText}</p>
                </Reveal>
            </Container>
        </section>
    )
}

/* ─── 6. Building Careers CTA ──────────────────────────────────── */
export function AboutCTA({ data }) {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[80px] pointer-events-none" />
            <Container className="max-w-4xl relative z-10">
                <Reveal>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">{data.heading}</h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">{data.body}</p>
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <div className="bg-linear-to-br from-secondary-600 via-[#253545] to-[#162030] rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-[60px]" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-400/10 rounded-full blur-[60px]" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-4">{data.ctaHeading || 'Start With the Right Foundation'}</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">{data.ctaBody}</p>
                            <Link href={data.ctaHref || '/digital-skills'} className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 text-lg">
                                {data.ctaText || 'Explore Digital Skills'}
                                <HiOutlineArrowRight />
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}
