'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiOutlineUserAdd, HiOutlineUsers } from 'react-icons/hi'
import { showSuccess, showError } from '@/lib/swal'

export default function BlogAuthorsManager() {
    const [authors, setAuthors] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'EDITOR' })

    const loadAuthors = async () => {
        try {
            const res = await fetch('/api/admin/blog/authors')
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json()
            setAuthors(data)
        } catch (err) {
            showError('Could not load authors.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadAuthors() }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password) return

        setSaving(true)
        try {
            const res = await fetch('/api/admin/blog/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            showSuccess('Author Registered!')
            setFormData({ name: '', email: '', password: '', role: 'EDITOR' })
            await loadAuthors()
        } catch (err) {
            showError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                            <HiOutlineUsers className="text-xl" />
                        </div>
                        Blog Authors
                    </h1>
                    <p className="text-gray-500 font-medium mt-2">Manage registered authors and editors for the blog.</p>
                </div>

                <Link href="/admin/blog" className="text-violet-600 font-bold hover:text-violet-700 transition-colors bg-violet-50 px-4 py-2 rounded-xl text-sm">
                    Back to Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-1">
                    <form onSubmit={handleCreate} className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <HiOutlineUserAdd className="text-violet-500" />
                            Register New Author
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Temp Password</label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/20 shadow-sm transition-all text-sm font-bold"
                                >
                                    <option value="EDITOR">Editor</option>
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? 'Saving...' : 'Register Author'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Table */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center text-gray-400 font-bold">Loading...</div>
                        ) : authors.length === 0 ? (
                            <div className="p-16 text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No authors found</h3>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Name</th>
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Email</th>
                                            <th className="font-bold text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {authors.map((author) => (
                                            <tr key={author.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                                                            {author.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-gray-900">{author.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-500">{author.email}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${author.role === 'SUPER_ADMIN' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                                        {author.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
