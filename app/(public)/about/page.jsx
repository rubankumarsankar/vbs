import SectionRenderer from '@/components/SectionRenderer'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await prisma.page.findUnique({ where: { slug: 'about' } })
    return {
        title: page?.title ?? 'About Us',
        description: page?.metaDesc ?? 'Learn more about Virginia Business Solutions.',
        alternates: { canonical: '/about' },
    }
}

export default async function AboutPage() {
    const page = await prisma.page.findUnique({
        where: { slug: 'about' },
        include: {
            sections: {
                where: { isActive: true },
                orderBy: { order: 'asc' },
            },
        },
    })

    if (!page) notFound()

    return <SectionRenderer sections={page.sections} />
}
