import Link from 'next/link'
import {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup,
    HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp,
    HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineEye,
    HiOutlineTemplate, HiOutlineClock, HiOutlineScale, HiOutlineCheckCircle,
} from 'react-icons/hi'

const iconMap = {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineUserGroup,
    HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineTrendingUp,
    HiOutlineArrowRight, HiOutlineShieldCheck, HiOutlineEye,
    HiOutlineTemplate, HiOutlineClock, HiOutlineScale, HiOutlineCheckCircle,
}

export function HomeHero({ data }) {
    const hasBgImage = !!data.bgImage;

    return (
        <section className="relative w-full overflow-hidden">
            {/* Dark Hero */}
            <div className={`relative w-full pt-40 pb-36 px-6 flex flex-col items-center justify-center text-center overflow-hidden z-10 ${hasBgImage ? 'bg-secondary-600' : 'bg-linear-to-br from-secondary-600 via-[#253545] to-[#162030]'}`}>

                {hasBgImage && (
                    <>
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat"
                            style={{ backgroundImage: `url(${data.bgImage})` }}
                        />
                        <div className="absolute inset-0 z-0 bg-secondary-600/70 backdrop-blur-[2px]" />
                    </>
                )}

                {!hasBgImage && (
                    <>
                        {/* Teal glow orbs */}
                        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-primary-500/8 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-400/6 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/4 rounded-full blur-[120px] pointer-events-none" />

                        {/* Grid pattern */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                    </>
                )}

                {/* Floating icons */}
                <div className="absolute hidden lg:flex top-[25%] left-[10%] w-14 h-14 bg-white/5 border border-white/10 rounded-xl items-center justify-center animate-float backdrop-blur-sm"><HiOutlineTrendingUp className="text-primary-400 text-2xl" /></div>
                <div className="absolute hidden lg:flex top-[30%] right-[12%] w-16 h-16 bg-white/5 border border-white/10 rounded-2xl items-center justify-center animate-float-slow backdrop-blur-sm" style={{ animationDelay: '1s' }}><HiOutlineLightningBolt className="text-primary-300 text-3xl" /></div>
                <div className="absolute hidden md:flex bottom-[30%] left-[18%] w-12 h-12 bg-white/5 border border-white/10 rounded-xl items-center justify-center animate-float-slow backdrop-blur-sm" style={{ animationDelay: '0.5s' }}><HiOutlineAcademicCap className="text-primary-400 text-xl" /></div>
                <div className="absolute hidden md:flex bottom-[20%] right-[22%] w-14 h-14 bg-white/5 border border-white/10 rounded-xl items-center justify-center animate-float backdrop-blur-sm" style={{ animationDelay: '1.5s' }}><HiOutlineBriefcase className="text-primary-300 text-2xl" /></div>

                <div className="relative z-20 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" />
                        <span className="text-primary-300 text-xs font-bold uppercase tracking-wider">Digital Career Guidance</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
                        <span className="text-white">{data.heading?.split('|')[0] || data.heading?.replace('|', ' ')}</span>
                        {data.heading?.includes('|') && (
                            <>
                                <br />
                                <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                                    {data.heading?.split('|')[1]}
                                </span>
                            </>
                        )}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                        {data.subheading}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {data.ctaText && (
                            <Link href={data.ctaHref || '#'} className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-[15px] rounded-xl shadow-lg shadow-primary-500/25 transition-all hover:-translate-y-0.5 active:scale-95">
                                {data.ctaText}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        )}
                        {data.secondaryCtaText && (
                            <Link href={data.secondaryCtaHref || '#'} className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/25 font-bold text-[15px] rounded-xl transition-all backdrop-blur-sm">
                                {data.secondaryCtaText}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
                </div>
            </div>


        </section>
    )
}

export function HomeAudience({ data }) {
    return (
        <section className="py-20 px-6 -mt-4 relative z-10">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || HiOutlineAcademicCap
                        const color = card.color || 'from-primary-500 to-primary-700'
                        const shadow = card.shadow || 'shadow-primary-500/20'

                        return (
                            <div
                                key={i}
                                className={`group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1.5 transition-all duration-500`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${color} flex items-center justify-center mb-5 shadow-lg ${shadow} group-hover:scale-110 transition-transform`}>
                                    <Icon className="text-white text-xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">{card.title}</h3>
                                <div className="space-y-3">
                                    {card.lines?.map((line, j) => (
                                        <p key={j} className="text-sm text-gray-700 font-medium leading-relaxed flex gap-2">
                                            <span className="text-primary-400 mt-0.5 shrink-0">›</span>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function HomeChallenge({ data }) {
    return (
        <section className="bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] py-24 px-6 relative overflow-hidden">
            {/* Subtle glow effects */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-primary-400 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" />
                        {data.tag || 'The Challenge'}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{data.heading}</h2>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                    <div className="space-y-6 text-gray-300 font-medium leading-relaxed text-[16px] md:text-[18px]" dangerouslySetInnerHTML={{ __html: data.body }} />
                </div>
            </div>
        </section>
    )
}

export function HomeFramework({ data }) {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-5xl mx-auto z-10 relative">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag || 'Our Approach'}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">{data.heading}</h2>
                    <p className="text-gray-700 font-medium max-w-2xl mx-auto text-lg">
                        {data.subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || HiOutlineLightningBolt
                        const color = card.color || 'from-primary-500 to-primary-700'
                        return (
                            <Link
                                key={i}
                                href={card.href || '#'}
                                className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 block shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden"
                            >

                                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center mb-6 shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform`}>
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{card.title}</h3>
                                <p className="text-sm text-gray-700 font-medium leading-relaxed mb-6">{card.description}</p>
                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-500 group-hover:text-primary-600 group-hover:gap-3 transition-all">
                                    Know More <HiOutlineArrowRight className="text-xs" />
                                </span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function HomeStandards({ data }) {
    return (
        <section className="bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-24 px-6 relative overflow-hidden border-t border-gray-100">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-500 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag || 'Our Standards'}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">{data.heading}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.cards?.map((item, i) => {
                        const Icon = iconMap[item.icon] || HiOutlineCheckCircle
                        return (
                            <div key={i} className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-xl bg-linear-to-b from-primary-500/20 to-primary-300/20 border border-primary-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <Icon className="text-primary-500 text-xl" />
                                </div>
                                <h3 className="text-gray-900 font-bold text-[16px] mb-2">{item.title}</h3>
                                <p className="text-gray-700 text-sm font-medium leading-relaxed">{item.text || item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
