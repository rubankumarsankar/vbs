import SectionRenderer from '@/components/SectionRenderer'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
    const page = await prisma.page.findUnique({ where: { slug: 'contact' } })
    return {
        title: page?.title ?? 'Contact Us',
        description: page?.metaDesc ?? 'Get in touch with Virginia Business Solutions.',
        alternates: { canonical: '/contact' },
    }
}

export default async function ContactPage() {
    const page = await prisma.page.findUnique({
        where: { slug: 'contact' },
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
        </main>
    )
}
