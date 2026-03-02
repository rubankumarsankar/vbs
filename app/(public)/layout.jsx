import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma, queryWithRetry } from '@/lib/db'

// Render on-demand per request — prevents build-time DB connection storm
// (MySQL host only allows 5 connections; 30 pages pre-rendering = crash)
export const dynamic = 'force-dynamic'

export default async function PublicLayout({ children }) {
    let siteSettings = null
    try {
        siteSettings = await queryWithRetry(() => prisma.siteSettings.findFirst())
    } catch (err) {
        console.error('[PublicLayout] Failed to fetch site settings:', err.message)
        // Navbar/Footer gracefully fall back to defaults when settings is null
    }

    return (
        <>
            <Navbar settings={siteSettings} />
            <main>{children}</main>
            <Footer settings={siteSettings} />
        </>
    )
}
