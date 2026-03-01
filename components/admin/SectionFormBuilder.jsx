'use client'

import { useState } from 'react'

export default function SectionFormBuilder({ section, onSave, onCancel }) {
    const [data, setData] = useState(section.data || {})
    const [saving, setSaving] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        await onSave(section.id, data)
        setSaving(false)
    }

    const renderHeroForm = () => (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Hero Heading</label>
                <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" placeholder="Enter headline..." />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Subheading</label>
                <textarea required value={data.subheading || ''} onChange={e => setData({ ...data, subheading: e.target.value })} rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" placeholder="Supporting text..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Text</label>
                    <input type="text" value={data.ctaText || ''} onChange={e => setData({ ...data, ctaText: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Link</label>
                    <input type="text" value={data.ctaHref || ''} onChange={e => setData({ ...data, ctaHref: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" placeholder="/destination" />
                </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Background Image URL (Optional)</label>
                <div className="flex gap-3">
                    <input type="text" value={data.bgImage || ''} onChange={e => setData({ ...data, bgImage: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm font-mono" placeholder="https://..." />
                    <button type="button" onClick={() => window.open('/admin/media', '_blank')} className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors whitespace-nowrap">
                        Browse Media
                    </button>
                </div>
                <p className="text-[11px] font-medium text-gray-400 mt-2 ml-1">Leave blank for default clean white background. If provided, text will automatically switch to overlap mode.</p>
            </div>
        </div>
    )

    const renderTextForm = () => (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Tagline (Eyebrow)</label>
                    <input type="text" value={data.tag || ''} onChange={e => setData({ ...data, tag: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Main Heading</label>
                    <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Body Text</label>
                <textarea value={data.body || ''} onChange={e => setData({ ...data, body: e.target.value })} rows={6} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" />
            </div>

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                        <label className="block text-sm font-bold text-gray-900">Feature Checklist</label>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Add dynamic checkmarks to this section.</p>
                    </div>
                    <button type="button" onClick={() => setData({ ...data, checklist: [...(data.checklist || []), ''] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Item</button>
                </div>

                <div className="space-y-3">
                    {data.checklist && data.checklist.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center group">
                            <div className="w-6 flex justify-center text-gray-400 font-bold text-xs">{idx + 1}.</div>
                            <input type="text" value={item} onChange={e => {
                                const newChecklist = [...data.checklist];
                                newChecklist[idx] = e.target.value;
                                setData({ ...data, checklist: newChecklist })
                            }} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                            <button type="button" onClick={() => {
                                setData({ ...data, checklist: data.checklist.filter((_, i) => i !== idx) })
                            }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-50 group-hover:opacity-100">✕</button>
                        </div>
                    ))}
                    {(!data.checklist || data.checklist.length === 0) && (
                        <div className="text-center py-4 text-xs font-bold text-gray-400">No checklist items.</div>
                    )}
                </div>
            </div>
        </div>
    )

    const renderCtaForm = () => (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Heading</label>
                <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Subheading</label>
                <textarea value={data.subheading || ''} onChange={e => setData({ ...data, subheading: e.target.value })} rows={2} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 resize-y transition-all shadow-sm" />
            </div>

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary CTA Text</label>
                    <input type="text" value={data.ctaText || ''} onChange={e => setData({ ...data, ctaText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Primary URL</label>
                    <input type="text" value={data.ctaHref || ''} onChange={e => setData({ ...data, ctaHref: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary CTA Text</label>
                    <input type="text" value={data.secondaryCtaText || ''} onChange={e => setData({ ...data, secondaryCtaText: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Secondary URL</label>
                    <input type="text" value={data.secondaryCtaHref || ''} onChange={e => setData({ ...data, secondaryCtaHref: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all" />
                </div>
            </div>
        </div>
    )

    const renderCardsForm = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Section Heading</label>
                <input required type="text" value={data.heading || ''} onChange={e => setData({ ...data, heading: e.target.value })} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-900 transition-all shadow-sm" />
            </div>

            <div className="bg-white border text-gray-900 border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div>
                        <label className="block text-sm font-bold text-gray-900">Card Elements</label>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">Manage the individual cards in this layout.</p>
                    </div>
                    <button type="button" onClick={() => setData({ ...data, cards: [...(data.cards || []), { title: '', description: '', icon: '' }] })} className="text-xs bg-indigo-50 text-indigo-700 font-bold px-4 py-2 border-indigo-200 hover:bg-indigo-100 border rounded-xl shadow-sm transition-colors">+ Add Card</button>
                </div>

                <div className="space-y-4">
                    {data.cards && data.cards.map((card, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 p-5 rounded-xl relative group transition-all hover:bg-white hover:border-indigo-200 hover:shadow-md">
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Card {idx + 1}</span>
                                <button type="button" onClick={() => setData({ ...data, cards: data.cards.filter((_, i) => i !== idx) })} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm opacity-0 group-hover:opacity-100">✕</button>
                            </div>

                            <div className="space-y-4 pr-12">
                                <div className="grid grid-cols-5 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Icon</label>
                                        <input type="text" value={card.icon || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].icon = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 text-center text-lg transition-all" placeholder="✨" />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Title</label>
                                        <input type="text" required value={card.title || ''} onChange={e => {
                                            const newCards = [...data.cards];
                                            newCards[idx].title = e.target.value;
                                            setData({ ...data, cards: newCards })
                                        }} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-bold text-gray-900 transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Card Description</label>
                                    <textarea value={card.description || ''} onChange={e => {
                                        const newCards = [...data.cards];
                                        newCards[idx].description = e.target.value;
                                        setData({ ...data, cards: newCards })
                                    }} rows={3} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium text-gray-700 resize-y transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {(!data.cards || data.cards.length === 0) && (
                        <div className="text-center py-6 text-sm font-bold text-gray-400">No cards configured.</div>
                    )}
                </div>
            </div>
        </div>
    )

    let FormContent = null
    if (section.type === 'hero') FormContent = renderHeroForm()
    else if (section.type === 'text') FormContent = renderTextForm()
    else if (section.type === 'cards') FormContent = renderCardsForm()
    else if (section.type === 'cta') FormContent = renderCtaForm()
    else FormContent = <div className="text-red-500 font-bold p-6 bg-red-50 border border-red-100 rounded-xl text-center">Unknown section builder type.</div>

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-100 px-6 sm:px-8 py-8 bg-[#fdfdfd] rounded-b-[1.5rem]">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-1">Editing Layout</h3>
                    <p className="text-gray-500 text-sm font-medium">Update the content payload for this active layout block.</p>
                </div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 shadow-sm">
                    {section.type} builder
                </span>
            </div>

            {FormContent}

            <div className="mt-10 flex flex-row-reverse gap-4 pt-8 border-t border-gray-100">
                <button
                    type="submit"
                    disabled={saving}
                    className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-8 py-3.5 disabled:opacity-60 shadow-md shadow-indigo-500/20 w-full sm:w-auto"
                >
                    {saving ? 'Saving Section...' : 'Deploy Section Updates'}
                </button>
                <button
                    type="button"
                    onClick={() => { setData(section.data); onCancel() }}
                    className="bg-white border text-gray-600 font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm w-full sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
