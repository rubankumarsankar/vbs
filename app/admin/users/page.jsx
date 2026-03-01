import { requireSuperAdmin } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export default async function AdminUsersPage() {
    // Only SUPER_ADMIN can load this page
    await requireSuperAdmin()

    const users = await prisma.adminUser.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, createdAt: true }
    })

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-10 flex items-center justify-between text-gray-900 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Team Members</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2">
                            Manage access and RBAC permissions for the CMS. Only accessible by Super Admins.
                        </p>
                    </div>
                    <button className="btn-primary text-sm py-3 p-4 shadow-sm">
                        + Invite User
                    </button>
                </div>

                <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary-100 to-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs font-medium text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${user.role === 'SUPER_ADMIN'
                                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                                            : user.role === 'EDITOR'
                                                ? 'bg-primary-50 text-primary-700 border-primary-200'
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500 font-medium whitespace-nowrap">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-primary-600 hover:text-primary-800 font-bold text-sm transition-colors">Edit</button>
                                        <button className="text-red-500 hover:text-red-700 font-bold text-sm ml-4 transition-colors">Revoke</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
