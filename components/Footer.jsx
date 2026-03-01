'use client'

import Link from 'next/link'
import Container from '@/components/ui/Container'

const footerLinks = {
    'Quick Links': [
        { label: 'About', href: '/about' },
        { label: 'What should I learn', href: '/digital-skills' },
        { label: 'Where should I learn it', href: '/courses-certifications' },
        { label: 'What does this lead to', href: '/career-guides' },
        { label: 'Contact', href: '/contact' },
    ],
    'Programs': [
        { label: 'AI & Data Science', href: '/courses-certifications' },
        { label: 'Digital Marketing', href: '/courses-certifications' },
        { label: 'Cloud & DevOps', href: '/courses-certifications' },
        { label: 'UI/UX Design', href: '/courses-certifications' },
    ],
    'Legal': [
        { label: 'Privacy Policy', href: '/about' },
        { label: 'Terms of Service', href: '/about' },
    ],
}

export default function Footer({ settings }) {
    const siteName = settings?.siteName || 'Virginia Business Solutions'
    const footerText = settings?.footerText || ''
    const socialLinks = settings?.socialLinks || {}

    return (
        <footer className="bg-secondary-600 text-white pt-24 pb-12 relative overflow-hidden mt-16 rounded-t-[2.5rem] lg:rounded-t-[4rem] border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.05)]">
            {/* Ambient teal glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/3 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Watermark */}
            <div className="absolute -bottom-4 md:-bottom-8 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0">
                <span className="text-[12vw] md:text-[9vw] font-black text-white/2 whitespace-nowrap leading-[0.85] tracking-tighter">
                    {siteName}
                </span>
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="inline-block mb-6 group">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 flex items-center justify-center bg-linear-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
                                    <span className="font-black text-white text-xl z-10">V</span>
                                </div>
                                <span className="font-bold text-white text-xl tracking-tight leading-none uppercase">
                                    {siteName.split(' ')[0]} <br /> <span className="text-sm font-semibold text-primary-300 capitalize tracking-normal">{siteName.split(' ').slice(1).join(' ')}</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium pr-4">
                            {footerText || 'Empowering careers through digital skills and expert training programs.'}
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.linkedin && (
                                <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 flex items-center justify-center transition-all text-gray-400">
                                    <span className="font-bold text-xs">in</span>
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500 hover:bg-primary-500/10 hover:text-primary-400 flex items-center justify-center transition-all text-gray-400">
                                    <span className="font-bold text-xs">𝕏</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="md:col-span-1">
                            <h4 className="text-primary-400 font-bold text-xs mb-6 tracking-widest uppercase">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200 block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-center relative z-10">
                    <p className="text-gray-500 text-sm font-medium">
                        &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
