import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function PATCH(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { title, slug, content, excerpt, featuredImg, isPublished, categoryId, authorId } = body

        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }
        
        const { id: paramId } = await params

        const post = await prisma.post.update({
            where: { id: parseInt(paramId) },
            data: {
                title,
                slug,
                content,
                excerpt,
                featuredImg,
                isPublished: !!isPublished,
                authorId: authorId ? parseInt(authorId) : undefined,
                categoryId: categoryId ? parseInt(categoryId) : null
            }
        })

        return NextResponse.json(post)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id: paramId } = await params

        await prisma.post.delete({
            where: { id: parseInt(paramId) }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
