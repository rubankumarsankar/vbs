'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { showSuccess, showError } from '@/lib/swal'

export default function NewBlogPost() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImg: '',
        isPublished: false,
    })

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === '' || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                : prev.slug
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const res = await fetch('/api/admin/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create post')
            }

            showSuccess('Article created successfully!')
            router.push('/admin/blog')
            router.refresh()
        } catch (err) {
            showError(err.message)
            setSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            {/* Top bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm shadow-gray-100/50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog" className="text-gray-400 font-bold hover:text-violet-600 text-sm transition-colors">← Blog Engine</Link>
                    <span className="text-gray-200">|</span>
                    <span className="font-extrabold text-gray-900 tracking-tight">New Article</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-up">
                <form onSubmit={handleSubmit} className="space-y-8">


                    {/* Metadata Card */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <h2 className="text-xl font-extrabold text-gray-900 mb-6">Post Metadata</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. 10 Next.js Performance Tricks for 2026"
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">URL Slug</label>
                                    <div className="flex bg-gray-50 rounded-xl border-2 border-transparent focus-within:border-primary-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/20 shadow-sm focus-within:shadow-md transition-all">
                                        <span className="flex items-center pl-4 text-gray-400 font-bold text-sm select-none">/blog/</span>
                                        <input
                                            type="text"
                                            required
                                            value={formData.slug}
                                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full bg-transparent text-gray-900 px-2 py-3 outline-none font-medium text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.featuredImg}
                                        onChange={e => setFormData({ ...formData, featuredImg: e.target.value })}
                                        placeholder="https://..."
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt for SEO</label>
                                <textarea
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all font-medium text-sm resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900">Article Content</h2>
                            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-md">Markdown Supported</span>
                        </div>
                        <textarea
                            required
                            rows={20}
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your article here..."
                            className="w-full bg-[#1e1e2e] text-emerald-400 font-mono text-sm rounded-xl p-6 border border-gray-200 resize-y outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 shadow-inner block"
                        />
                    </div>

                    {/* Submit Bar */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                />
                                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.isPublished ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.isPublished ? 'translate-x-6' : ''}`}></div>
                            </div>
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Publish Immediately</span>
                                <span className="block text-xs font-medium text-gray-500">Live on the public site</span>
                            </div>
                        </label>

                        <div className="flex items-center gap-4">
                            <Link href="/admin/blog" className="text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors">Cancel</Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary py-3 px-8 shadow-sm disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Article'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
