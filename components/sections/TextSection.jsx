import Container from '@/components/ui/Container'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'

export default function TextSection({ data }) {
    if (!data) return null

    return (
        <section className="py-28 relative overflow-hidden text-gray-900">
            {/* Subtle accent decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[80px] pointer-events-none -z-10" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left text content */}
                    <div className="lg:pr-4">
                        <Reveal>
                            {data.tag && (
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-primary-600 border border-primary-100 shadow-sm font-bold text-xs uppercase tracking-wider mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                                    {data.tag}
                                </span>
                            )}
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-gray-900">
                                {data.heading}
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="text-lg text-gray-600 font-medium leading-relaxed mb-8 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: data.body }}>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Checklist */}
                    <Reveal delay={0.2} xOffset={30} className="relative h-full flex flex-col justify-center">
                        {data.checklist && data.checklist.length > 0 ? (
                            <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] transition-shadow duration-500 overflow-hidden">
                                {/* Corner accent */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-primary-100 to-transparent rounded-bl-full -z-10 blur-xl" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-blue-100 to-transparent rounded-tr-full -z-10 blur-xl" />

                                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary-300/30 to-transparent"></div>

                                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3 relative z-10">
                                    <span className="w-8 h-8 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </span>
                                    Key Considerations
                                </h3>

                                <StaggerChildren className="space-y-5 relative z-10">
                                    {data.checklist.map((item, idx) => {
                                        const parts = item.split(': ')
                                        const hasTitle = parts.length > 1

                                        return (
                                            <Child key={idx}>
                                                <div className="flex items-start gap-4 group p-3 rounded-2xl hover:bg-slate-50 transition-colors duration-300">
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 text-primary-500 group-hover:bg-primary-50 group-hover:border-primary-200 group-hover:text-primary-600 group-hover:scale-110 transition-all duration-300 shrink-0 mt-0.5 shadow-sm">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                    <div>
                                                        {hasTitle ? (
                                                            <>
                                                                <span className="text-gray-900 font-bold block group-hover:text-primary-700 transition-colors">{parts[0]}</span>
                                                                <span className="text-gray-600 font-medium text-sm block mt-1 leading-relaxed group-hover:text-gray-700 transition-colors">{parts.slice(1).join(': ')}</span>
                                                            </>
                                                        ) : (
                                                            <span className="text-gray-700 font-medium leading-relaxed block group-hover:text-gray-900 transition-colors">{item}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Child>
                                        )
                                    })}
                                </StaggerChildren>
                            </div>
                        ) : (
                            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-gray-100 h-full min-h-[300px] flex items-center justify-center relative overflow-hidden group hover:border-primary-200 transition-colors duration-500 shadow-sm">
                                <div className="absolute inset-0 bg-linear-to-br from-primary-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="text-primary-600 font-medium flex items-center gap-2 relative z-10">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Educational Guidance
                                </span>
                            </div>
                        )}
                    </Reveal>

                </div>
            </Container>
        </section>
    )
}
