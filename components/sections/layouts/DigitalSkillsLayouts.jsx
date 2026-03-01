import Link from 'next/link'
import {
    HiOutlineTrendingUp, HiOutlinePencilAlt, HiOutlineChartBar,
    HiOutlineColorSwatch, HiOutlineLightningBolt, HiOutlineShieldCheck,
    HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCube,
    HiOutlineRefresh, HiOutlineClock, HiOutlineArrowRight,
} from 'react-icons/hi'

export function DSHero({ data }) {
    return (
        <section className="relative bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/8 rounded-full blur-[100px]" />
            </div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
                <p className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">{data.tag || 'Virginia Business Solutions'}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                    <span className="text-white">{data.heading?.split('|')[0] || 'Choosing the Right Digital'}</span><br />
                    <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                        {data.heading?.split('|')[1] || 'Skills for Long-Term Growth'}
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                    {data.subheading || 'Understand which digital skills matter and how they shape real careers'}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {data.ctaText && (
                        <Link href={data.ctaHref || '#'} className="px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-500/25 hover:-translate-y-0.5 transition-all">
                            {data.ctaText}
                        </Link>
                    )}
                    {data.secondaryCtaText && (
                        <Link href={data.secondaryCtaHref || '#'} className="px-8 py-3.5 bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25 font-bold text-sm rounded-xl backdrop-blur-sm transition-all">
                            {data.secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
            </div>
        </section>
    )
}

const iconMap = {
    HiOutlineTrendingUp, HiOutlinePencilAlt, HiOutlineChartBar,
    HiOutlineColorSwatch, HiOutlineLightningBolt, HiOutlineShieldCheck,
    HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineCube,
    HiOutlineRefresh, HiOutlineClock, HiOutlineArrowRight,
}

export function DSSkillClusters({ data }) {
    return (
        <section className="py-24 px-6 relative z-10 border-y border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag || 'Explore Clusters'}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">{data.heading || 'Core Digital Skill Clusters'}</h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">{data.subheading}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.cards?.map((cluster, i) => {
                        const Icon = iconMap[cluster.icon] || HiOutlineShieldCheck
                        const color = cluster.color || 'from-primary-500 to-primary-700'
                        const shadow = cluster.shadow || 'shadow-primary-500/20'
                        return (
                            <div key={i} className="group bg-white border border-gray-100 hover:border-primary-200 rounded-2xl p-8 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center mb-6 shadow-lg ${shadow} group-hover:scale-110 transition-transform`}>
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{cluster.title}</h3>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 grow">{cluster.description}</p>
                                <div className="bg-primary-50 rounded-xl px-5 py-4 border border-primary-100 mt-auto">
                                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mb-1">Best suited for</p>
                                    <p className="text-sm text-primary-700 font-bold leading-relaxed">{cluster.suited}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {data.footerText && (
                    <p className="text-center text-gray-600 font-medium text-lg mt-12 max-w-2xl mx-auto leading-relaxed border-t border-gray-100 pt-8">
                        {data.footerText}
                    </p>
                )}
            </div>
        </section>
    )
}

export function DSEvaluation({ data }) {
    return (
        <section className="bg-white py-24 px-6 relative overflow-hidden border-b border-gray-100">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">{data.heading}</h2>
                    <p className="text-gray-600 font-medium max-w-xl mx-auto text-lg">{data.subheading}</p>
                </div>

                <div className="space-y-4">
                    {data.cards?.map((item, i) => {
                        const Icon = iconMap[item.icon] || HiOutlineBadgeCheck
                        return (
                            <div key={i} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 flex gap-6 items-start hover:border-primary-200 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all">
                                    <Icon className="text-primary-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed">{item.description || item.text}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {data.footerText && (
                    <p className="text-center text-gray-600 text-lg font-medium mt-12 max-w-xl mx-auto leading-relaxed">
                        {data.footerText}
                    </p>
                )}
            </div>
        </section>
    )
}

export function DSAIImpact({ data }) {
    return (
        <section className="py-24 px-6 relative z-10 border-b border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20">
                                <HiOutlineLightningBolt className="text-white text-2xl" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{data.heading}</h2>
                        </div>
                        <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: data.body }} />
                    </div>

                    <div className="space-y-4 mt-2">
                        {data.cards?.map((item, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-primary-200 shadow-sm transition-all group">
                                <p className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-2 group-hover:text-accent-600 transition-colors">In {item.title}</p>
                                <p className="text-gray-700 font-medium leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export function DSMistakes({ data }) {
    return (
        <section className="bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-rose-400 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse-soft" />
                        {data.tag}
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">{data.heading}</h2>
                    <p className="text-gray-400 font-medium max-w-2xl mx-auto text-lg">{data.subheading}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.cards?.map((mistake, i) => {
                        const Icon = iconMap[mistake.icon] || HiOutlineRefresh
                        return (
                            <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 hover:border-primary-400/30 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="text-rose-400 text-2xl" />
                                </div>
                                <h3 className="font-bold text-white text-lg mb-3">{mistake.title}</h3>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">{mistake.description || mistake.text}</p>
                            </div>
                        )
                    })}
                </div>

                {data.footerText && (
                    <p className="text-center text-gray-500 text-base font-medium mt-12 max-w-lg mx-auto border-t border-white/10 pt-8">
                        {data.footerText}
                    </p>
                )}
            </div>
        </section>
    )
}

export function DSWhereNext({ data }) {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">{data.heading}</h2>
                <p className="text-gray-600 font-medium mb-12 max-w-2xl mx-auto leading-relaxed text-lg">{data.subheading}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {data.cards?.map((card, i) => {
                        const Icon = iconMap[card.icon] || HiOutlineAcademicCap
                        const isEven = i % 2 === 0
                        const iconBg = isEven ? 'from-primary-500 to-primary-700 shadow-primary-500/20' : 'from-primary-400 to-primary-600 shadow-primary-400/20'

                        return (
                            <Link key={i} href={card.url || '#'} className="group bg-white border border-gray-100 hover:border-primary-200 rounded-2xl p-10 block transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden">
                                <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${iconBg} flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
                                    <Icon className="text-white text-3xl" />
                                </div>
                                <h3 className="font-extrabold text-gray-900 text-2xl mb-3 relative z-10">{card.title}</h3>
                                <p className="text-base text-gray-600 font-medium mb-6 relative z-10 leading-relaxed">{card.description}</p>
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 group-hover:text-primary-700 group-hover:gap-3 transition-all relative z-10 tracking-wide uppercase">
                                    Explore <HiOutlineArrowRight className="text-lg" />
                                </span>
                            </Link>
                        )
                    })}
                </div>

                {data.footerText && (
                    <p className="text-gray-500 text-sm font-medium mt-16 max-w-lg mx-auto leading-relaxed border-t border-gray-100 pt-8">
                        {data.footerText}
                    </p>
                )}
            </div>
        </section>
    )
}
