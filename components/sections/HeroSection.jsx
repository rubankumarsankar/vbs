import Link from 'next/link'
import Container from '@/components/ui/Container'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'

export default function HeroSection({ data }) {
    if (!data) return null

    const hasBgImage = !!data.bgImage
    const align = data.contentAlign || 'center';

    const containerAlignClass =
        align === 'left' ? 'text-left items-start' :
            align === 'right' ? 'text-right items-end' :
                'text-center items-center';

    const btnAlignClass =
        align === 'left' ? 'justify-start' :
            align === 'right' ? 'justify-end' :
                'justify-center';

    return (
        <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-secondary-600">
            {/* Background */}
            {hasBgImage ? (
                <>
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${data.bgImage})` }}
                    />
                    <div className={`absolute inset-0 z-0 ${align === 'right' ? 'bg-linear-to-l' : 'bg-linear-to-r'} from-secondary-900/95 via-secondary-900/50 to-transparent`} />
                </>
            ) : (
                <>
                    <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary-500/10 rounded-full blur-[120px] animate-float pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-400/8 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
                    <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                </>
            )}

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#fafbfd] to-transparent z-10 pointer-events-none" />

            <Container className="relative z-10 w-full flex flex-col pt-32 pb-32 lg:pt-40 lg:pb-40">
                <div className={`max-w-5xl flex flex-col ${containerAlignClass} ${align === 'center' ? 'mx-auto' : ''}`}>
                    <Reveal yOffset={30} duration={0.8} className={`flex flex-col ${containerAlignClass}`}>
                        {data.trustBadge && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm mb-10 border bg-white/5 text-primary-300 border-white/10 backdrop-blur-sm shadow-lg">
                                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse-soft" />
                                {data.trustBadge}
                            </div>
                        )}

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tight">
                            <span className="bg-linear-to-b from-white via-primary-100 to-primary-300 bg-clip-text text-transparent">
                                {data.heading}
                            </span>
                        </h1>

                        <p className={`text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mb-12 leading-relaxed text-gray-400 ${align === 'center' ? 'mx-auto' : ''}`}>
                            {data.subheading}
                        </p>

                        <div className={`flex flex-col sm:flex-row items-center gap-4 ${btnAlignClass}`}>
                            {data.ctaText && data.ctaHref && (
                                <Link href={data.ctaHref} className="group relative bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto text-center text-lg">
                                    {data.ctaText}
                                </Link>
                            )}
                            {data.secondaryCtaText && data.secondaryCtaHref && (
                                <Link href={data.secondaryCtaHref} className="border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 w-full sm:w-auto text-center text-lg backdrop-blur-sm">
                                    {data.secondaryCtaText}
                                </Link>
                            )}
                        </div>

                        {/* Stats bar */}
                        <div className={`mt-20 flex flex-wrap items-center gap-8 lg:gap-16 ${btnAlignClass}`}>
                            {[
                                { value: '10K+', label: 'Students Guided' },
                                { value: '50+', label: 'Digital Skills' },
                                { value: '95%', label: 'Success Rate' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl lg:text-4xl font-black text-primary-400">{stat.value}</div>
                                    <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    )
}
