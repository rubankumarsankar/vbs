import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export default async function PublicLayout({ children }) {
    noStore()
    // Fetch global site settings
    const siteSettings = await prisma.siteSettings.findFirst()

    return (
        <>
            <Navbar settings={siteSettings} />
            <main>{children}</main>
            <Footer settings={siteSettings} />
        </>
    )
}
