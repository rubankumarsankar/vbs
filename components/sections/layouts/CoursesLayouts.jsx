import Link from 'next/link'
import {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck,
    HiOutlineSearchCircle, HiOutlineExclamationCircle, HiOutlinePlay,
    HiOutlineDocumentSearch, HiOutlineLightBulb, HiOutlineStar,
    HiOutlineShieldCheck, HiOutlineCheckCircle,
} from 'react-icons/hi'

const iconMap = {
    HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck,
    HiOutlineSearchCircle, HiOutlineExclamationCircle, HiOutlinePlay,
    HiOutlineDocumentSearch, HiOutlineLightBulb, HiOutlineStar,
    HiOutlineShieldCheck, HiOutlineCheckCircle,
}

export function CoursesHero({ data }) {
    return (
        <section className="relative bg-linear-to-b from-secondary-600 via-[#253545] to-[#162030] overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-[120px] animate-pulse-soft" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-400/10 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary-500/8 rounded-full blur-[100px]" />
            </div>
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-40 pb-32 md:pt-48 md:pb-40 text-center">
                <p className="text-primary-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">{data.tag || 'Virginia Business Solutions'}</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
                    <span className="text-white">{data.heading?.split('|')[0] || 'Structured Learning Paths'}</span><br />
                    <span className="bg-linear-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                        {data.heading?.split('|')[1] || 'for Real Skill Development'}
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
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60L1440 60L1440 0C1440 0 1082 40 720 40C358 40 0 0 0 0L0 60Z" fill="#F4F6F9" /></svg>
            </div>
        </section>
    )
}

export function CoursesIntro({ data }) {
    return (
        <section className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">{data.heading}</h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: data.body }} />
        </section>
    )
}

export function CoursesStructure({ data }) {
    return (
        <section className="bg-white py-20 border-y border-gray-100">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="md:w-1/3 pt-2">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">{data.heading}</h2>
                    </div>
                    <div className="md:w-2/3 space-y-4 text-gray-600 font-medium leading-relaxed bg-white/80 backdrop-blur-xl border border-gray-100 p-8 md:p-10 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)]" dangerouslySetInnerHTML={{ __html: data.body }} />
                </div>
            </div>
        </section>
    )
}

export function CoursesProgression({ data }) {
    return (
        <section id="learning-progression" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag}</p>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">{data.heading}</h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">{data.subheading}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {data.cards?.map((stage, i) => {
                        const Icon = iconMap[stage.icon] || HiOutlineSearchCircle
                        const color = stage.color || 'from-primary-500 to-primary-700'
                        const shadow = stage.shadow || 'shadow-primary-500/20'

                        return (
                            <div key={i} className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center shadow-lg ${shadow} shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon className="text-white text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">{stage.level}</p>
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{stage.title}</h3>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-8 grow">
                                    {stage.description}
                                </p>

                                <div className="space-y-6">
                                    <div className="bg-primary-50 rounded-xl p-5 border border-primary-100">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                                            <HiOutlineCheckCircle className="text-primary-500 text-lg" /> Best Suited For:
                                        </h4>
                                        <ul className="space-y-2">
                                            {stage.suitedFor?.map((item, j) => (
                                                <li key={j} className="text-sm text-gray-700 font-medium flex gap-2">
                                                    <span className="text-primary-500 mt-0.5">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-[#EDF4FF] rounded-xl p-5 border border-gray-100">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                                            <HiOutlineAcademicCap className="text-primary-500 text-lg" /> Recommended Approach:
                                        </h4>
                                        <ul className="space-y-2">
                                            {stage.approach?.map((item, j) => (
                                                <li key={j} className="text-sm text-gray-700 font-medium flex gap-2">
                                                    <span className="text-primary-600 font-bold mt-0.5">›</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export function CoursesFreePaid({ data }) {
    return (
        <section className="bg-white py-24 px-6 relative overflow-hidden border-t border-gray-100">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="inline-block px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{data.tag}</p>
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-6 leading-tight">{data.heading}</h2>
                        <div className="text-gray-600 font-medium leading-relaxed mb-8 space-y-4 text-lg" dangerouslySetInnerHTML={{ __html: data.body }} />

                        <p className="text-primary-700 font-bold mb-5 bg-primary-50 border-l-4 border-primary-300 px-4 py-2 rounded-r-lg">{data.listTitle || 'Paid programs become valuable when:'}</p>
                        <ul className="space-y-4">
                            {data.checklist?.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <HiOutlineShieldCheck className="text-primary-500 text-2xl shrink-0" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-10 text-center flex flex-col justify-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-b from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <span className="text-6xl mb-6 block drop-shadow-lg relative z-10">💡</span>
                        <p className="text-2xl text-gray-900 font-bold leading-relaxed mb-4 relative z-10">
                            {data.cardHighlight}
                        </p>
                        <p className="text-gray-600 text-sm font-medium relative z-10">{data.cardDescription}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CoursesEvalAndMistakes({ data }) {
    return (
        <section className="py-24 px-6 bg-white border-t border-gray-100 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Evaluating Any Course */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-6 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 shadow-lg shadow-primary-500/10"><HiOutlineSearchCircle className="text-2xl" /></span>
                            {data.leftHeading}
                        </h2>
                        <p className="text-gray-600 font-medium mb-8 text-lg">{data.leftSubheading}</p>

                        <div className="space-y-4">
                            {data.leftList?.map((item, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-start gap-4 hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1">
                                    <div className="w-8 h-8 rounded-full bg-primary-50 border border-primary-100 flex items-center justify-center shrink-0 text-primary-600 font-bold text-xs mt-0.5">
                                        {i + 1}
                                    </div>
                                    <p className="font-bold text-gray-700">{item}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-primary-600 mt-8 px-2 tracking-wide uppercase">{data.leftFooter}</p>
                    </div>

                    {/* Common Mistakes */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-6 flex items-center gap-4">
                            <span className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/10"><HiOutlineExclamationCircle className="text-2xl" /></span>
                            {data.rightHeading}
                        </h2>
                        <p className="text-gray-600 font-medium mb-8 text-lg">{data.rightSubheading}</p>

                        <div className="grid grid-cols-1 gap-4">
                            {data.rightCards?.map((mistake, i) => {
                                const Icon = iconMap[mistake.icon] || HiOutlineBadgeCheck
                                return (
                                    <div key={i} className="group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-primary-200 hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] transition-all duration-500 hover:-translate-y-1 flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary-50 group-hover:border-primary-100 transition-colors">
                                            <Icon className="text-gray-500 group-hover:text-rose-500 text-2xl transition-colors" />
                                        </div>
                                        <p className="font-bold text-gray-700 text-[15px] group-hover:text-gray-900 transition-colors">{mistake.text || mistake.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <p className="text-sm font-bold text-gray-500 mt-8 px-2 uppercase tracking-widest">{data.rightFooter}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function CoursesConnecting({ data }) {
    return (
        <section className="py-24 px-6 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8">{data.heading}</h2>
                <div className="space-y-6 text-gray-600 font-medium leading-relaxed text-lg md:text-xl mb-10" dangerouslySetInnerHTML={{ __html: data.body }} />
            </div>
        </section>
    )
}
