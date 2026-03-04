import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: { posts: true }
                }
            }
        })
        return NextResponse.json(categories)
    } catch (err) {
        console.error('[categories GET]', err)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name } = body

        if (!name?.trim()) {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

        // Check if exists
        const existing = await prisma.category.findUnique({ where: { slug } })
        if (existing) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: { name: name.trim(), slug }
        })

        return NextResponse.json(category, { status: 201 })
    } catch (err) {
        console.error('[categories POST]', err)
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}
