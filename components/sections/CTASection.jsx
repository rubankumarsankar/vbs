import Link from 'next/link'
import Container from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export default function CTASection({ data }) {
    if (!data) return null

    return (
        <section className="py-32 relative overflow-hidden">
            <Container>
                <Reveal yOffset={60} scale={0.95} duration={0.8}>
                    <div className="relative overflow-hidden rounded-2xl p-12 md:p-20 text-center">

                        {/* Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-secondary-600 via-[#253545] to-[#162030]" />

                        {/* Teal orbs */}
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary-500/15 rounded-full blur-[100px] animate-float" />
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-[120px] animate-float-slow" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-500/8 rounded-full blur-[80px]" />

                        {/* Grid */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <Reveal delay={0.2}>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                    {data.heading}
                                </h2>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p className="text-lg md:text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                                    {data.body}
                                </p>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link href="/contact" className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-extrabold py-4 px-10 rounded-xl shadow-lg shadow-primary-500/25 transition-all duration-300 hover:-translate-y-0.5 text-lg">
                                        Get Started Now
                                    </Link>
                                    <Link href="/about" className="w-full sm:w-auto bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30 font-bold py-4 px-10 rounded-xl backdrop-blur-sm transition-all duration-300 text-lg">
                                        Learn More
                                    </Link>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    )
}
