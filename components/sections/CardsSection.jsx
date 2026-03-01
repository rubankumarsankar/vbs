import Container from '@/components/ui/Container'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'

export default function CardsSection({ data }) {
    if (!data) return null

    // Gradient accent combos for each card
    const accents = [
        { bg: 'from-primary-500/10 to-blue-500/10', icon: 'from-primary-500 to-blue-500', border: 'group-hover:border-primary-200', glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]' },
        { bg: 'from-primary-500/10 to-pink-500/10', icon: 'from-primary-500 to-pink-500', border: 'group-hover:border-primary-200', glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]' },
        { bg: 'from-primary-500/10 to-teal-500/10', icon: 'from-primary-500 to-teal-500', border: 'group-hover:border-primary-200', glow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]' },
        { bg: 'from-orange-500/10 to-red-500/10', icon: 'from-orange-500 to-red-500', border: 'group-hover:border-orange-200', glow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]' },
        { bg: 'from-green-500/10 to-primary-500/10', icon: 'from-green-500 to-primary-500', border: 'group-hover:border-green-200', glow: 'group-hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]' },
        { bg: 'from-rose-500/10 to-pink-500/10', icon: 'from-rose-500 to-pink-500', border: 'group-hover:border-rose-200', glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]' },
    ]

    return (
        <section className="py-28 relative overflow-hidden">
            {/* Ambient décor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-100/50 rounded-full blur-[120px] pointer-events-none -z-10" />

            <Container>
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white text-primary-600 border border-primary-100 shadow-sm text-xs font-bold uppercase tracking-wider mb-5">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
                            What We Offer
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-gray-900">
                            {data.heading}
                        </h2>
                    </div>
                </Reveal>

                {data.cards && (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                        {data.cards.map((card, idx) => {
                            const accent = accents[idx % accents.length]
                            return (
                                <Child key={idx}>
                                    <div className={`group relative bg-white h-full flex flex-col p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${accent.border} ${accent.glow} transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                                        {/* Hover gradient glow in background */}
                                        <div className={`absolute inset-0 bg-linear-to-br ${accent.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl`} />

                                        {/* Top gradient line */}
                                        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${accent.icon} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className={`w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm shadow-gray-200/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-gray-50`}>
                                                <span className={`text-2xl bg-clip-text text-transparent bg-linear-to-br ${accent.icon}`}>
                                                    {card.icon}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                                                {card.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed font-medium text-[15px] mb-6 grow">
                                                {card.description}
                                            </p>

                                            <div className="mt-auto pt-5 border-t border-gray-100 group-hover:border-primary-100 transition-colors">
                                                <span className={`text-sm font-bold bg-clip-text text-transparent bg-linear-to-r ${accent.icon} flex items-center gap-2 group-hover:gap-3 transition-all`}>
                                                    Learn more
                                                    <svg className="w-4 h-4 text-primary-500 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Child>
                            )
                        })}
                    </StaggerChildren>
                )}
            </Container>
        </section>
    )
}
