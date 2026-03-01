import SectionRenderer from '@/components/SectionRenderer'
import AffiliateLinksSection from '@/components/AffiliateLinksSection'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await prisma.page.findUnique({ where: { slug: 'home' } })
    return {
        title: page?.title || 'Virginia Business Solutions',
        description: page?.metaDesc || 'Clear digital career guidance in India for students and working professionals.',
        alternates: { canonical: '/' },
    }
}

export default async function HomePage() {
    const page = await prisma.page.findUnique({
        where: { slug: 'home' },
        include: {
            sections: {
                where: { isActive: true },
                orderBy: { order: 'asc' },
            },
        },
    })

    if (!page) notFound()

    return (
        <main className="min-h-screen selection:bg-primary-500/30">
            <SectionRenderer sections={page.sections} />
            <AffiliateLinksSection title="Recommended Resources" />
        </main>
    )
}
