import Link from 'next/link'
import {
    HiOutlineBriefcase, HiOutlineTrendingUp, HiOutlineLightBulb,
    HiOutlineUserAdd, HiOutlineStar, HiOutlineChartPie,
    HiOutlineShieldExclamation, HiOutlineViewGridAdd, HiOutlineCurrencyRupee,
    HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineLocationMarker,
    HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineExclamationCircle
} from 'react-icons/hi'

const iconMap = {
    HiOutlineBriefcase, HiOutlineTrendingUp, HiOutlineLightBulb,
    HiOutlineUserAdd, HiOutlineStar, HiOutlineChartPie,
    HiOutlineShieldExclamation, HiOutlineViewGridAdd, HiOutlineCurrencyRupee,
    HiOutlineLightningBolt, HiOutlineGlobe, HiOutlineLocationMarker,
    HiOutlineArrowRight, HiOutlineCheckCircle, HiOutlineExclamationCircle
}

export function CareerHero({ data }) {
    return (
        <section className="relative bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[100px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-400/8 rounded-full blur-[80px]" />
                <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500/12 rounded-full blur-[100px]" />
            </div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-32 md:pt-48 md:pb-40 text-center">
                <p className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">{data.tag || 'Virginia Business Solutions'}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                    <span className="text-white">{data.heading?.split('|')[0] || 'Understand Where Digital Skills'}</span><br />
                    <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                        {data.heading?.split('|')[1] || 'Can Take You'}
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                    {data.subheading}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {data.ctaText && (
                        <a href={data.ctaHref || '#'} className="px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-500/25 hover:-translate-y-0.5 transition-all">
                            {data.ctaText}
                        </a>
                    )}
                    {data.secondaryCtaText && (
                        <Link href={data.secondaryCtaHref || '#'} className="px-8 py-3.5 bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25 font-bold text-sm rounded-xl backdrop-blur-sm transition-all">
                            {data.secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
            <span className="sr-only">Digital career paths and skill growth roadmap</span>
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
            </div>
        </section>
    )
}

export function CareerIntro({ data }) {
    return (
        <section className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-8 leading-tight">{data.heading}</h2>
                <div className="text-gray-600 font-medium leading-relaxed space-y-6 text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: data.body }} />
            </div>
        </section>
    )
}

export function CareerWhyClarity({ data }) {
    return (
        <section className="bg-white py-24 px-6 border-y border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Clarity Matters */}
                    <div className="group bg-white/80 backdrop-blur-xl border border-gray-100 p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1.5 transition-all duration-500">
                        <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 text-primary-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <HiOutlineLightBulb className="text-3xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-6">{data.leftHeading}</h2>
                        <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: data.leftBody }} />
                    </div>

                    {/* Translation */}
                    <div className="bg-linear-to-br from-secondary-600 via-[#253545] to-[#162030] p-10 rounded-2xl shadow-sm relative overflow-hidden border border-white/10 group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-[60px]" />
                        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-primary-400 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10 backdrop-blur-sm">
                            <HiOutlineViewGridAdd className="text-3xl" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6 relative z-10">{data.rightHeading}</h2>
                        <div className="space-y-4 text-gray-400 font-medium leading-relaxed relative z-10 text-lg" dangerouslySetInnerHTML={{ __html: data.rightBody }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CareerProgression({ data }) {
    return (
        <section id="career-progression" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag || 'The Timeline'}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{data.heading}</h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto mt-6 text-lg">
                        {data.subheading}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.cards?.map((stage, i) => {
                        const Icon = iconMap[stage.icon] || HiOutlineUserAdd
                        const color = stage.color || 'from-primary-500 to-primary-700'
                        const shadow = stage.shadow || 'shadow-primary-500/20'

                        return (
                            <div key={i} className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg ${shadow} shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{stage.level || stage.title}</h3>
                                        <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mt-1.5">{stage.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8 grow">
                                    {stage.description}
                                </p>

                                <div className="bg-[#EDF4FF] rounded-xl p-6 border border-gray-100 mb-6 grow">
                                    <ul className="space-y-4">
                                        {stage.bullets?.map((item, j) => (
                                            <li key={j} className="text-sm text-gray-700 font-medium flex gap-3 items-start">
                                                <HiOutlineCheckCircle className="text-primary-500 text-[20px] shrink-0 mt-0.5" />
                                                <span className="leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mt-auto content-end">
                                    <p className="text-xs font-bold text-primary-700 uppercase tracking-widest text-center leading-relaxed">
                                        {stage.focus}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function CareerGrowth({ data }) {
    return (
        <section className="bg-white py-24 px-6 relative overflow-hidden border-t border-gray-100">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(13,184,146,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(13,184,146,0.15) 0%, transparent 50%)' }} />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag || 'Economics of Value'}</p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-8 leading-tight">{data.heading}</h2>

                        <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-lg mb-10" dangerouslySetInnerHTML={{ __html: data.body }} />

                        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 space-y-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                            {data.checklist?.map((item, i) => (
                                <div key={i} className="flex items-center gap-5">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 font-bold text-base">{i + 1}</div>
                                    <p className="text-gray-800 font-medium text-lg">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">{data.rightHeading}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {data.cards?.map((factor, i) => {
                                const Icon = iconMap[factor.icon] || HiOutlineViewGridAdd
                                return (
                                    <div key={i} className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1 transition-all duration-500">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                                            <Icon className="text-gray-600 group-hover:text-primary-600 text-xl transition-colors" />
                                        </div>
                                        <p className="text-gray-700 font-bold text-sm tracking-wide">{factor.name || factor.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-10 p-6 bg-primary-50 border-l-4 border-primary-500 rounded-r-xl">
                            <p className="text-primary-700 font-medium tracking-wide leading-relaxed">
                                {data.footerText}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CareerAIAndMistakes({ data }) {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* AI Section */}
                    <div>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20 shrink-0">
                                <HiOutlineLightningBolt className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{data.leftHeading}</h2>
                        </div>

                        <div className="space-y-6 text-gray-600 font-medium leading-relaxed mb-10 text-lg" dangerouslySetInnerHTML={{ __html: data.leftBody }} />

                        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1.5">
                            <p className="text-gray-900 font-bold mb-6 text-xl">{data.leftListTitle}</p>
                            <ul className="space-y-4 mb-6">
                                {data.leftList?.map((item, i) => {
                                    const Ico = i === 0 ? HiOutlineGlobe : i === 1 ? HiOutlineViewGridAdd : HiOutlineTrendingUp
                                    return (
                                        <li key={i} className="flex items-center gap-4 text-gray-700 font-medium text-lg">
                                            <Ico className="text-primary-500 text-2xl shrink-0" /> {item}
                                        </li>
                                    )
                                })}
                            </ul>
                            <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mt-8 border-t border-gray-100 pt-6">
                                {data.leftFooter}
                            </p>
                        </div>
                    </div>

                    {/* Mistakes Section */}
                    <div>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                                <HiOutlineShieldExclamation className="text-white text-2xl" />
                            </div>
                            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{data.rightHeading}</h2>
                        </div>

                        <p className="text-gray-600 font-medium mb-10 text-lg">{data.rightSubheading}</p>

                        <div className="space-y-4 mb-10">
                            {data.rightCards?.map((mistake, i) => (
                                <div key={i} className="group flex items-start gap-5 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1 transition-all duration-500">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                                        <HiOutlineExclamationCircle className="text-gray-500 group-hover:text-rose-500 text-xl transition-colors" />
                                    </div>
                                    <p className="text-gray-700 font-medium text-base leading-relaxed pt-2 group-hover:text-gray-900 transition-colors">{mistake.text || mistake.title}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-lg font-bold text-rose-600 border-l-4 border-rose-500 pl-5 py-2 bg-rose-50 rounded-r-xl">
                            {data.rightFooter}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CareerAligning({ data }) {
    return (
        <section className="py-24 px-6 text-center relative z-10 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-12">{data.heading}</h2>

                <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-10 md:p-16 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 space-y-8 text-lg font-medium leading-relaxed">
                        <p className="text-gray-600 max-w-3xl mx-auto text-xl">
                            {data.subheading}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 border-y border-gray-100 py-12">
                            {data.cards?.slice(0, 3).map((step, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-6">
                                        <span className="text-primary-600 font-black text-xl">{i + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-bold leading-relaxed">{step.description || step.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-3xl font-black text-gray-900 tracking-tight">
                            {data.footerText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
