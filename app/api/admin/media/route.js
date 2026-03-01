import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function GET() {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const media = await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json(media)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getAuthSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const formData = await request.formData()
        const file = formData.get('file')

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const fileExtension = path.extname(file.name)
        const newFilename = `${uniqueSuffix}${fileExtension}`

        // Save to public/uploads directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }
        
        const filePath = path.join(uploadDir, newFilename)
        await writeFile(filePath, buffer)

        // Save record to DB
        const mediaUrl = `/uploads/${newFilename}`
        const mediaRecord = await prisma.media.create({
            data: {
                filename: file.name,
                url: mediaUrl,
                mimeType: file.type,
                sizeBytes: file.size,
            }
        })

        return NextResponse.json(mediaRecord, { status: 201 })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ error: 'Server error during upload' }, { status: 500 })
    }
}
