import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { prisma } from '@/lib/db'

// Cache this layout for 60s — settings rarely change, and admin PUT revalidates
export const revalidate = 60

export default async function PublicLayout({ children }) {
    // Fetch global site settings (cached via revalidate above)
    const siteSettings = await prisma.siteSettings.findFirst()

    return (
        <>
            <Navbar settings={siteSettings} />
            <main>{children}</main>
            <Footer settings={siteSettings} />
        </>
    )
}
