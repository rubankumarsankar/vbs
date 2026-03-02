import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: { author: true, category: true, tags: true }
        })
        return NextResponse.json(posts)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { title, slug, content, excerpt, featuredImg, isPublished, categoryId } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                featuredImg,
                isPublished: !!isPublished,
                authorId: parseInt(session.user.id),
                categoryId: categoryId ? parseInt(categoryId) : null
            }
        })

        return NextResponse.json(post, { status: 201 })
    } catch (err) {
        console.error(err)
        if (err.code === 'P2002') {
            return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 })
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
