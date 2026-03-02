import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/db'

// Render on-demand per request — prevents build-time DB connection storm
// (MySQL host only allows 5 connections; 30 pages pre-rendering = crash)
export const dynamic = 'force-dynamic'

export default async function PublicLayout({ children }) {
    const siteSettings = await prisma.siteSettings.findFirst()

    return (
        <>
            <Navbar settings={siteSettings} />
            <main>{children}</main>
            <Footer settings={siteSettings} />
        </>
    )
}
