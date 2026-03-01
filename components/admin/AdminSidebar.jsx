'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
    HiOutlineViewGrid,
    HiOutlineDocumentText,
    HiOutlinePhotograph,
    HiOutlinePencilAlt,
    HiOutlineCog,
    HiOutlineLink,
    HiOutlineUserGroup,
    HiOutlineLogout,
    HiOutlineExternalLink,
    HiOutlineChevronDown,
} from 'react-icons/hi'

const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: HiOutlineViewGrid },
    { label: 'CMS Pages', href: '/admin/pages', icon: HiOutlineDocumentText },
    { label: 'Media Library', href: '/admin/media', icon: HiOutlinePhotograph },
    { label: 'Blog Engine', href: '/admin/blog', icon: HiOutlinePencilAlt },
    { label: 'Affiliate Links', href: '/admin/affiliates', icon: HiOutlineLink },
    { label: 'Site Settings', href: '/admin/settings', icon: HiOutlineCog },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()

    return (
        <aside className="w-72 min-h-screen bg-linear-to-b from-[#0f0f1a] to-[#1a1a2e] border-r border-white/5 flex flex-col select-none">
            {/* Brand */}
            <div className="p-6 pb-2">
                <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-b from-violet-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                        <span className="text-white font-black text-lg">V</span>
                    </div>
                    <div>
                        <h1 className="text-white font-extrabold text-base tracking-tight">VPS Admin</h1>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Control Panel</p>
                    </div>
                </Link>
            </div>

            {/* User Badge */}
            {session?.user && (
                <div className="mx-4 mt-4 mb-2 px-4 py-3 bg-white/ rounded-xl border border-white/">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-b from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black uppercase">
                            {session.user.name?.[0] || session.user.email?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-xs font-bold truncate">{session.user.name || 'Admin'}</p>
                            <p className="text-gray-500 text-[10px] font-semibold truncate">{session.user.email}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Nav Items */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-3">Main Menu</p>
                {navItems.map(item => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${isActive
                                    ? 'bg-linear-to-b from-violet-600/20 to-indigo-600/10 text-white border border-violet-500/20 shadow-sm shadow-violet-500/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/'
                                }`}
                        >
                            <Icon className={`text-lg shrink-0 ${isActive ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                            <span>{item.label}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
                        </Link>
                    )
                })}

                {/* Super Admin Section */}
                {session?.user?.role === 'SUPER_ADMIN' && (
                    <>
                        <div className="pt-4 pb-2">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4">Administration</p>
                        </div>
                        <Link
                            href="/admin/users"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${pathname.startsWith('/admin/users')
                                    ? 'bg-linear-to-b from-violet-600/20 to-indigo-600/10 text-white border border-violet-500/20 shadow-sm shadow-violet-500/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/'
                                }`}
                        >
                            <HiOutlineUserGroup className={`text-lg shrink-0 ${pathname.startsWith('/admin/users') ? 'text-violet-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                            <span>Users & Roles</span>
                        </Link>
                    </>
                )}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 space-y-1 border-t border-white/">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-cyan-400 hover:bg-white/ transition-all group"
                >
                    <HiOutlineExternalLink className="text-lg group-hover:text-cyan-400" />
                    <span>View Live Site</span>
                </Link>
                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-400 hover:bg-red-500/ transition-all group"
                >
                    <HiOutlineLogout className="text-lg group-hover:text-red-400" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    )
}
