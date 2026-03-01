'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const DEFAULT_NAV_LINKS = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'What should I learn', url: '/digital-skills' },
    { label: 'Where should I learn it?', url: '/courses-certifications' },
    { label: 'What does this lead to?', url: '/career-guides' },
    { label: 'Resources', url: '/resources' },
]

export default function AdminSettingsPage() {
    const [data, setData] = useState({
        siteName: '',
        logoUrl: '',
        contactEmail: '',
        contactPhone: '',
        footerText: '',
        seoDefaultTitle: '',
        seoDefaultDesc: '',
        socialLinks: { linkedin: '', twitter: '' },
        navLinks: DEFAULT_NAV_LINKS
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState({ text: '', type: '' })

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(settings => {
                if (settings && Object.keys(settings).length > 0) {
                    setData({
                        ...settings,
                        socialLinks: settings.socialLinks || { linkedin: '', twitter: '' },
                        navLinks: settings.navLinks || DEFAULT_NAV_LINKS,
                        logoUrl: settings.logoUrl || ''
                    })
                }
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                setMessage({ text: 'Failed to load configuration.', type: 'error' })
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        setMessage({ text: '', type: '' })

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!res.ok) throw new Error('Failed to update config')

            setMessage({ text: 'Global settings successfully updated.', type: 'success' })
            setTimeout(() => setMessage({ text: '', type: '' }), 3000)
        } catch (error) {
            setMessage({ text: error.message, type: 'error' })
        } finally {
            setSaving(false)
        }
    }

    // Nav link helpers
    const addNavLink = () => {
        setData(prev => ({
            ...prev,
            navLinks: [...(prev.navLinks || []), { label: '', url: '' }]
        }))
    }
    const removeNavLink = (idx) => {
        setData(prev => ({
            ...prev,
            navLinks: prev.navLinks.filter((_, i) => i !== idx)
        }))
    }
    const updateNavLink = (idx, field, value) => {
        setData(prev => ({
            ...prev,
            navLinks: prev.navLinks.map((link, i) => i === idx ? { ...link, [field]: value } : link)
        }))
    }
    const moveNavLink = (idx, direction) => {
        const links = [...(data.navLinks || [])]
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1
        if (swapIdx < 0 || swapIdx >= links.length) return
            ;[links[idx], links[swapIdx]] = [links[swapIdx], links[idx]]
        setData(prev => ({ ...prev, navLinks: links }))
    }

    if (loading) {
        return <div className="p-10 text-gray-400 font-bold animate-pulse text-center">Loading Configuration...</div>
    }

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md text-sm font-medium text-gray-900 transition-all"

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-10 flex items-center justify-between text-gray-900 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/50 rounded-bl-full -z-10" />
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Global Configurations</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2 max-w-xl leading-relaxed">
                            Manage your core website identity, navigation, footer content, and default SEO parameters. Changes apply globally instantly.
                        </p>
                    </div>
                </div>

                {message.text && (
                    <div className={`mb-8 px-6 py-4 rounded-xl font-bold text-sm shadow-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {message.type === 'success' ? '✅' : '⚠️'} {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Identity Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">1</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Brand Identity</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Website Brand Name (Navbar)</label>
                                <input type="text" required value={data.siteName || ''} onChange={e => setData({ ...data, siteName: e.target.value })} className={`${inputClass} font-bold`} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Logo Image URL <span className="text-gray-400 font-normal">(Leave empty for default icon)</span></label>
                                <div className="flex gap-3 items-center">
                                    <input type="url" value={data.logoUrl || ''} onChange={e => setData({ ...data, logoUrl: e.target.value })} className={inputClass} placeholder="https://example.com/logo.png" />
                                    {data.logoUrl && (
                                        <img src={data.logoUrl} alt="Logo preview" className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shrink-0" />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary Support Email</label>
                                    <input type="email" value={data.contactEmail || ''} onChange={e => setData({ ...data, contactEmail: e.target.value })} className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Support Phone</label>
                                    <input type="text" value={data.contactPhone || ''} onChange={e => setData({ ...data, contactPhone: e.target.value })} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navbar Links Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">2</span>
                                <h2 className="text-lg font-extrabold tracking-tight">Navigation Links</h2>
                            </div>
                            <button type="button" onClick={addNavLink} className="text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-lg transition-colors">
                                + Add Link
                            </button>
                        </div>

                        <div className="space-y-3">
                            {(data.navLinks || []).map((link, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-gray-50/80 rounded-xl p-3 border border-gray-100 group hover:border-primary-100 transition-colors">
                                    <div className="flex flex-col gap-0.5">
                                        <button type="button" onClick={() => moveNavLink(idx, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px] font-bold leading-none">▲</button>
                                        <button type="button" onClick={() => moveNavLink(idx, 'down')} disabled={idx === (data.navLinks || []).length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-[10px] font-bold leading-none">▼</button>
                                    </div>
                                    <span className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">{idx + 1}</span>
                                    <input
                                        type="text"
                                        placeholder="Label"
                                        value={link.label}
                                        onChange={e => updateNavLink(idx, 'label', e.target.value)}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all min-w-0"
                                    />
                                    <input
                                        type="text"
                                        placeholder="/url-path"
                                        value={link.url}
                                        onChange={e => updateNavLink(idx, 'url', e.target.value)}
                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium font-mono text-gray-600 outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-500/20 shadow-sm focus:shadow-md transition-all min-w-0"
                                    />
                                    <button type="button" onClick={() => removeNavLink(idx)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0 text-sm font-bold">
                                        ×
                                    </button>
                                </div>
                            ))}
                            {(!data.navLinks || data.navLinks.length === 0) && (
                                <p className="text-center text-gray-400 text-sm font-medium py-6">No navigation links configured. Click "+ Add Link" to begin.</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">3</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Footer Injection</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Global Footer Bio / Tagline</label>
                                <textarea required value={data.footerText || ''} onChange={e => setData({ ...data, footerText: e.target.value })} rows={3} className={`${inputClass} resize-y`} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">LinkedIn URL</label>
                                    <input type="url" value={data.socialLinks?.linkedin || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, linkedin: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://linkedin.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">X (Twitter) URL</label>
                                    <input type="url" value={data.socialLinks?.twitter || ''} onChange={e => setData({ ...data, socialLinks: { ...data.socialLinks, twitter: e.target.value } })} className={`${inputClass} font-mono text-[13px]`} placeholder="https://x.com/..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO Block */}
                    <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_10px_40px_rgba(72,115,174,0.08)] hover:border-primary-200 hover:-translate-y-1">
                        <div className="mb-6 pb-4 border-b border-gray-50 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">4</span>
                            <h2 className="text-lg font-extrabold tracking-tight">Default Search Engine Config</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Fallback Meta Title (Overridden by distinct pages)</label>
                                <input type="text" required value={data.seoDefaultTitle || ''} onChange={e => setData({ ...data, seoDefaultTitle: e.target.value })} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Fallback Meta Description</label>
                                <textarea required value={data.seoDefaultDesc || ''} onChange={e => setData({ ...data, seoDefaultDesc: e.target.value })} rows={3} className={`${inputClass} resize-y`} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-8 py-4 disabled:opacity-60 shadow-lg shadow-primary-500/30 transition-all hover:shadow-primary-500/40 hover:-translate-y-0.5 rounded-xl w-full sm:w-auto"
                        >
                            {saving ? 'Synchronizing State...' : 'Commit Global Master Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
