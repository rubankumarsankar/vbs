'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ClientEnhancements() {
    const [loading, setLoading] = useState(true)
    const [scrollPct, setScrollPct] = useState(0)
    const [showTopBtn, setShowTopBtn] = useState(false)
    const pathname = usePathname()

    // 1. Loader Effect
    useEffect(() => {
        // Schedule the loading true state out of the sync effect loop to satisfy linter
        const startTimer = setTimeout(() => {
            setLoading(true)
        }, 0)

        const endTimer = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => {
            clearTimeout(startTimer)
            clearTimeout(endTimer)
        }
    }, [pathname])

    // 2. Scroll Progress & Scroll-to-Top Button Visibility
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            setScrollPct(scrolled)
            setShowTopBtn(scrollTop > 400)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {/* Scroll Progress Bar */}
            <div
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-400 z-[9999] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(65,114,181,0.5)]"
                style={{ width: `${scrollPct}%` }}
            />

            {/* Floating Glass Scroll To Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 w-12 h-12 bg-white/70 backdrop-blur-xl border border-white/80 hover:border-primary-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-[9000] focus:outline-none group ${showTopBtn ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none translate-y-4'}`}
                aria-label="Scroll to top"
            >
                <div className="absolute inset-0 rounded-full bg-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xl font-black text-gray-400 group-hover:text-primary-600 leading-none pt-1 z-10 transition-colors">^</span>
            </button>

            {/* Premium Light Glass Page Loader Overlay */}
            <div
                className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#EDF4FF]/70 backdrop-blur-2xl transition-opacity duration-500 ease-in-out pointer-events-none ${loading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
                <div className="relative w-16 h-16 flex items-center justify-center animate-pulse">
                    <div className="absolute inset-0 border-[4px] border-primary-500/80 rounded-lg skew-x-[-12deg] skew-y-[12deg] animate-[spin_3s_linear_infinite]" />
                    <span className="font-black text-primary-600 text-3xl z-10 pt-[2px]">V</span>
                </div>
            </div>
        </>
    )
}
