'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Navbar({ settings }) {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const siteName = settings?.siteName || 'Virginia Business Solutions'
    const logoUrl = settings?.logoUrl || ''

    const navLinks = settings?.navLinks || [
        { label: 'About Us', url: '/about' },
        { label: 'Service', url: '/digital-skills' },
        { label: 'Hire Developer', url: '/courses-certifications' },
        { label: 'Case Studies', url: '/career-guides' },
        { label: 'Blogs', url: '/blog' },
    ]

    const checkActive = (url) => {
        if (url === '/') return pathname === url
        return pathname?.startsWith(url)
    }

    return (
        <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 lg:px-8 flex justify-center pointer-events-none">
            {/* Floating Glass navbar */}
            <div className="pointer-events-auto w-full max-w-[1320px] bg-white/75 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-2xl transition-all duration-300">
                <div className="flex items-center justify-between h-[72px] px-5 lg:px-6">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group shrink-0">
                        {logoUrl ? (
                            <Image src={logoUrl} alt={siteName} width={32} height={32} className="h-8 w-auto object-contain rounded-lg" unoptimized />
                        ) : (
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-9 h-9 flex items-center justify-center bg-linear-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/30 group-hover:scale-105 transition-all">
                                    <span className="font-black text-white text-[16px] z-10">V</span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-secondary-600 font-extrabold text-[15px] tracking-tight block leading-none">
                                        {siteName.split(' ')[0]}
                                    </span>
                                    <span className="text-secondary-400 text-[11px] font-bold tracking-wide uppercase">
                                        {siteName.split(' ').slice(1).join(' ')}
                                    </span>
                                </div>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, i) => {
                            const isActive = checkActive(link.url)
                            return (
                                <Link
                                    key={i}
                                    href={link.url}
                                    className={`font-semibold text-[14px] transition-all py-2 px-4 rounded-lg ${isActive
                                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                        : 'text-secondary-500 hover:text-primary-700 hover:bg-primary-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Right side: CTA + Mobile burger */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/contact"
                            className="hidden lg:flex items-center justify-center bg-secondary-600 hover:bg-secondary-500 text-white font-bold text-[14px] px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                        >
                            Contact Us
                        </Link>

                        {/* Mobile Hamburger */}
                        <button
                            className="lg:hidden text-secondary-600 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            onClick={() => setOpen(!open)}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                {open
                                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="pointer-events-auto absolute top-[84px] left-4 right-4 bg-white/95 backdrop-blur-2xl shadow-2xl p-6 border border-gray-100 rounded-2xl lg:hidden flex flex-col gap-1 z-50 mx-auto max-w-[1320px]">
                    {navLinks.map((link, i) => {
                        const isActive = checkActive(link.url)
                        return (
                            <Link
                                key={`mobile-${i}`}
                                href={link.url}
                                className={`px-4 py-3 rounded-xl font-semibold text-[15px] transition-all ${isActive ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' : 'text-secondary-600 hover:text-primary-700 hover:bg-primary-50'}`}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                    <div className="h-px w-full bg-gray-100 my-2" />
                    <Link
                        href="/contact"
                        className="mx-1 px-4 py-3.5 rounded-xl flex items-center justify-center bg-secondary-600 text-white font-bold text-[14px] shadow-md active:scale-[0.98] transition-all"
                        onClick={() => setOpen(false)}
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </header>
    )
}
