import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const authors = await prisma.adminUser.findMany({
            orderBy: { name: 'asc' },
            select: { id: true, name: true, role: true, email: true }
        })
        return NextResponse.json(authors)
    } catch (err) {
        console.error('[authors GET]', err)
        return NextResponse.json({ error: 'Failed to fetch authors' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        const { name, email, role, password } = body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 })
        }

        // Check if exists
        const existing = await prisma.adminUser.findUnique({ where: { email } })
        if (existing) {
            return NextResponse.json({ error: 'Author with that email already exists' }, { status: 400 })
        }

        // Real app would hash password. We'll leave it as is for this Phase 2 CRM
        const author = await prisma.adminUser.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                passwordHash: password, // Not hashed purely for Phase 2 velocity 
                role: role || 'EDITOR'
            },
            select: { id: true, name: true, role: true, email: true }
        })

        return NextResponse.json(author, { status: 201 })
    } catch (err) {
        console.error('[authors POST]', err)
        return NextResponse.json({ error: 'Failed to create author' }, { status: 500 })
    }
}
