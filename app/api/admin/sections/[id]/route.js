import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(request, { params }) {
  try {
    const { id: paramId } = await params
    const id = parseInt(paramId)
    if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })

    const body = await request.json()
    const { isActive, order, data } = body

    const updated = await prisma.section.update({
      where: { id },
      data: {
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
        ...(data !== undefined && { data }),
      },
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
