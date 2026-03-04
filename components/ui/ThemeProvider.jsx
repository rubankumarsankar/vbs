'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } })

export function useTheme() {
    return useContext(ThemeContext)
}

// Read initial theme synchronously to avoid flash
function getInitialTheme() {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('vbs-theme')
    if (stored) return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
}

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light'
        setTheme(next)
        localStorage.setItem('vbs-theme', next)
        document.documentElement.setAttribute('data-theme', next)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
