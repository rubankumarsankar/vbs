import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions)

    // If not logged in (e.g. login page itself, or an unauthenticated route that will redirect),
    // don't render the sidebar, just render the content.
    if (!session) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Global Zenith Sidebar */}
            <AdminSidebar user={session.user} />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
                {/* Optional subtle top decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-indigo-50/50 to-transparent pointer-events-none -z-10" />

                {children}
            </main>
        </div>
    )
}
