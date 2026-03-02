import SectionRenderer from '@/components/SectionRenderer'
import { prisma, queryWithRetry } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const page = await queryWithRetry(() => prisma.page.findUnique({ where: { slug } }))
    if (!page) return { title: 'Not Found' }

    return {
        title: page.title,
        description: page.metaDesc || 'VBS Digital custom page.',
        alternates: { canonical: `/${slug}` },
    }
}

export default async function DynamicCMSPage({ params }) {
    // If it conflicts with existing hardcoded routes (about, contact, etc.), Next.js favors the literal folders first.
    // This strictly handles anything NOT explicitly defined in the app structure.

    const { slug } = await params

    if (slug === 'home' || slug === 'admin' || slug === 'api') {
        notFound()
    }

    const page = await queryWithRetry(() =>
        prisma.page.findUnique({
            where: { slug },
            include: {
                sections: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
            },
        })
    )

    if (!page) {
        notFound()
    }

    return <SectionRenderer sections={page.sections} />
}
