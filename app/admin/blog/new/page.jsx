'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { showSuccess, showError } from '@/lib/swal'
import { HiOutlineSparkles, HiOutlineDocumentText, HiOutlineX } from 'react-icons/hi'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

export default function NewBlogPost() {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [showAiModal, setShowAiModal] = useState(false)
    const [error, setError] = useState('')
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const fileInputRef = useRef(null)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featuredImg: '',
        authorId: '',
        categoryId: '',
        isPublished: false,
    })

    // Fetch categories and authors on load
    useEffect(() => {
        Promise.all([
            fetch('/api/admin/blog/categories').then(res => res.json()),
            fetch('/api/admin/blog/authors').then(res => res.json())
        ]).then(([cats, auths]) => {
            setCategories(cats)
            setAuthors(auths)
        }).catch(err => console.error('Failed to load metadata dropdowns:', err))
    }, [])

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

    const onImageUpload = async (file) => {
        const payload = new FormData()
        payload.append('file', file)

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: payload })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            return data.url
        } catch (err) {
            showError('Image upload failed: ' + err.message)
            return null
        }
    }

    const handleAiGenerate = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setGenerating(true)
        setShowAiModal(false)

        try {
            const rawText = await file.text()

            const payload = new FormData()
            payload.append('textContent', rawText)

            const res = await fetch('/api/admin/blog/ai-generate', {
                method: 'POST',
                body: payload
            })

            const json = await res.json()

            if (!res.ok) throw new Error(json.error || 'AI generation failed')

            const { title, excerpt, content, tags } = json.data

            setFormData(prev => ({
                ...prev,
                title: title || prev.title,
                slug: (title || prev.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
                excerpt: excerpt || prev.excerpt,
                content: content || prev.content
            }))

            showSuccess('AI generation complete!')
        } catch (err) {
            console.error(err)
            showError(err.message)
        } finally {
            setGenerating(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    // Custom drop handler for MDEditor
    const handleDrop = async (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            const url = await onImageUpload(file)
            if (url) {
                const imgMarkdown = `\n![${file.name}](${url})\n`
                setFormData(prev => ({ ...prev, content: prev.content + imgMarkdown }))
            }
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
                    {generating && <span className="text-xs font-bold text-violet-500 bg-violet-50 px-2 py-1 rounded animate-pulse">🤖 Generating AI Content...</span>}
                </div>
                <button
                    type="button"
                    onClick={() => setShowAiModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20 hover:scale-105 transition-transform"
                >
                    <HiOutlineSparkles className="text-lg" />
                    Generate with AI
                </button>
            </div>

            {/* AI Modal */}
            {showAiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative">
                        <button onClick={() => setShowAiModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
                            <HiOutlineX className="text-2xl" />
                        </button>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                <HiOutlineSparkles />
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900">AI Blog Generator</h3>
                            <p className="text-gray-500 text-sm mt-2 font-medium">Upload a raw document (.txt, .md) and let Gemini format it into a perfect blog post.</p>
                        </div>
                        <div className="border-2 border-dashed border-violet-200 bg-violet-50/50 hover:bg-violet-50 transition-colors rounded-2xl p-8 text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept=".txt,.md"
                                onChange={handleAiGenerate}
                                ref={fileInputRef}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <HiOutlineDocumentText className="text-4xl text-violet-400 mx-auto mb-2" />
                            <p className="text-violet-900 font-bold text-sm">Click to upload document</p>
                            <p className="text-violet-500 font-medium text-xs mt-1">Supports TXT and MD</p>
                        </div>
                    </div>
                </div>
            )}

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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category (Optional)</label>
                                    <select
                                        value={formData.categoryId}
                                        onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    >
                                        <option value="">-- No Category --</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                                    <select
                                        required
                                        value={formData.authorId}
                                        onChange={e => setFormData({ ...formData, authorId: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent text-gray-900 rounded-xl px-4 py-3 outline-none focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all text-sm font-medium"
                                    >
                                        <option value="" disabled>-- Select Author --</option>
                                        {authors.map(a => (
                                            <option key={a.id} value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
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

                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">Article Content</h2>
                                <p className="text-xs text-gray-500 font-medium mt-1">Drag & drop images directly into the editor.</p>
                            </div>
                            <span className="text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-md">Markdown Supported</span>
                        </div>
                        <div className="p-0 border-t-0" data-color-mode="light" onDrop={handleDrop}>
                            <MDEditor
                                value={formData.content}
                                onChange={val => setFormData({ ...formData, content: val || '' })}
                                height={600}
                                preview="live"
                                hideToolbar={false}
                                className="border-0! shadow-none!"
                                textareaProps={{
                                    placeholder: 'Write your article here... Drag and drop images to upload them automatically.'
                                }}
                            />
                        </div>
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
        </div >
    )
}
