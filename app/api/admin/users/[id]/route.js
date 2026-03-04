import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function DELETE(request, { params }) {
    try {
        const session = await getAuthSession()
        if (!session || session.user.role !== 'SUPER_ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id: paramId } = await params
        const userId = parseInt(paramId)

        if (userId === parseInt(session.user.id)) {
            return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
        }

        await prisma.adminUser.delete({
            where: { id: userId }
        })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
