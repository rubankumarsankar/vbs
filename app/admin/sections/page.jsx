'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { showWarning, showError, showSuccess } from '@/lib/swal'

import SectionFormBuilder from '@/components/admin/SectionFormBuilder'
import { SECTION_TEMPLATES } from '@/lib/section-templates'

const typeLabels = {
    hero: '🦸 Hero Breakout',
    cards: '🃏 Content Cards',
    text: '📄 Dynamic Text',
    cta: '📣 Call to Action',
}

function SectionRow({ section, onToggle, onSave, onMoveUp, onMoveDown, isFirst, isLast }) {
    const [editing, setEditing] = useState(false)

    async function handleSaveData(id, data) {
        await onSave(id, data)
        setEditing(false)
    }

    return (
        <div className={`bg-white border border-gray-100 rounded-[1.25rem] shadow-sm transition-all duration-300 ${!section.isActive ? 'opacity-60 bg-gray-50 grayscale pt-0' : 'hover:border-cyan-200 hover:shadow-md'}`}>
            <div className="flex items-center justify-between px-6 py-5 gap-4">
                {/* Order + type */}
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-700 font-extrabold text-sm shadow-sm">
                        {section.order}
                    </span>
                    <span className="font-extrabold text-gray-900 text-lg">
                        {typeLabels[section.type] || section.type}
                    </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                        onClick={() => onMoveUp(section.id)}
                        disabled={isFirst}
                        className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 text-sm font-bold transition-colors"
                        title="Move up"
                    >↑</button>
                    <button
                        onClick={() => onMoveDown(section.id)}
                        disabled={isLast}
                        className="px-2.5 py-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30 text-sm font-bold transition-colors"
                        title="Move down"
                    >↓</button>

                    <button
                        onClick={() => onToggle(section.id, !section.isActive)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${section.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200'
                            }`}
                    >
                        {section.isActive ? 'Active' : 'Draft'}
                    </button>

                    <button
                        onClick={() => setEditing(!editing)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all shadow-sm ${editing ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:text-cyan-700'}`}
                    >
                        {editing ? 'Close Editor' : 'Edit Block'}
                    </button>
                </div>
            </div>

            {/* Visual CMS Editor */}
            {editing && (
                <SectionFormBuilder
                    section={section}
                    onSave={handleSaveData}
                    onCancel={() => setEditing(false)}
                />
            )}
        </div>
    )
}

function SectionsManager() {
    const [sections, setSections] = useState([])
    const [loading, setLoading] = useState(true)
    const [addingTemplate, setAddingTemplate] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const searchParams = useSearchParams()
    const pageId = searchParams.get('pageId')

    useEffect(() => {
        const url = pageId ? `/api/admin/sections?pageId=${pageId}` : '/api/admin/sections'
        fetch(url)
            .then((r) => r.json())
            .then(setSections)
            .finally(() => setLoading(false))
    }, [pageId])

    async function handleToggle(id, isActive) {
        await fetch(`/api/admin/sections/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive }),
        })
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive } : s)),
        )
    }

    async function handleSaveData(id, data) {
        await fetch(`/api/admin/sections/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        })
        setSections((prev) =>
            prev.map((s) => (s.id === id ? { ...s, data } : s)),
        )
    }

    async function handleMove(id, direction) {
        const sorted = [...sections].sort((a, b) => a.order - b.order)
        const idx = sorted.findIndex((s) => s.id === id)
        const swapIdx = direction === 'up' ? idx - 1 : idx + 1
        if (swapIdx < 0 || swapIdx >= sorted.length) return

        const current = sorted[idx]
        const swap = sorted[swapIdx]
        const newOrder = current.order
        const swapOrder = swap.order

        await Promise.all([
            fetch(`/api/admin/sections/${current.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: swapOrder }),
            }),
            fetch(`/api/admin/sections/${swap.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: newOrder }),
            }),
        ])

        setSections((prev) =>
            prev.map((s) => {
                if (s.id === current.id) return { ...s, order: swapOrder }
                if (s.id === swap.id) return { ...s, order: newOrder }
                return s
            }),
        )
    }

    const sorted = [...sections].sort((a, b) => a.order - b.order)

    async function handleAddTemplate(template) {
        setIsPosting(true)
        try {
            // Need the actual page ID we are mutating. If not passed in URL, we fetched the `home` page in GET but our POST requires explicit pageId.
            // A quick fix is extracting the pageId from the first existing section, but if 0 sections exist, we need to pass it strictly.
            // For now, let's parse the actual pageId from the `sections[0]` or just require pageId in URL properly.
            // Since we know the admin list passes pageId to the URL, we can safely grab it if exists.

            // To be totally bulletproof across all phases:
            const targetPageId = pageId || (sections.length > 0 ? sections[0].pageId : null)

            if (!targetPageId) {
                showWarning('Cannot add sections without a defined Page ID. Please navigate from the Pages dashboard.')
                setIsPosting(false)
                return
            }

            const res = await fetch(`/api/admin/sections`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId: targetPageId,
                    type: template.type,
                    data: template.data
                })
            })

            if (!res.ok) throw new Error("Failed to create section")
            const newSec = await res.json()

            setSections(prev => [...prev, newSec])
            setAddingTemplate(false)
            showSuccess('Section added successfully!')
        } catch (err) {
            showError(err.message)
        } finally {
            setIsPosting(false)
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Manage Sections</h1>
                    <p className="text-gray-500 font-medium text-sm mt-2">
                        Reorder, toggle visibility, or edit the content of each section. Changes are live immediately.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400 font-bold text-lg">Loading sections...</div>
                ) : (
                    <div className="space-y-5">
                        {sorted.map((section, idx) => (
                            <div className={`animate-fade-up stagger-${(idx % 6) + 1}`} key={section.id}>
                                <SectionRow
                                    section={section}
                                    onToggle={handleToggle}
                                    onSave={handleSaveData}
                                    onMoveUp={() => handleMove(section.id, 'up')}
                                    onMoveDown={() => handleMove(section.id, 'down')}
                                    isFirst={idx === 0}
                                    isLast={idx === sorted.length - 1}
                                />
                            </div>
                        ))}

                        {/* Add Section Button */}
                        <div className="pt-4 flex justify-center animate-fade-up stagger-6">
                            <button
                                onClick={() => setAddingTemplate(true)}
                                className="group flex items-center justify-center gap-3 w-full max-w-md py-4 border-2 border-dashed border-gray-300 rounded-[1.25rem] text-gray-500 font-extrabold hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all shadow-sm"
                            >
                                <span className="bg-gray-100 text-gray-400 group-hover:bg-cyan-100 group-hover:text-cyan-600 w-8 h-8 rounded-full flex items-center justify-center font-black transition-colors">+</span>
                                Add New Layout Block
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Template Selection Modal */}
            {addingTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden ring-1 ring-gray-900/5">

                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Layout Library</h2>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Select a predefined structural template to inject into your page.</p>
                            </div>
                            <button
                                onClick={() => setAddingTemplate(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                            {['hero', 'cards', 'text', 'cta'].map(category => {
                                const categoryTemplates = SECTION_TEMPLATES.filter(t => t.category === category)
                                if (categoryTemplates.length === 0) return null

                                return (
                                    <div key={category} className="mb-10 last:mb-0">
                                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                                            {category === 'cta' ? 'Calls to Action' : category} Templates
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {categoryTemplates.map(template => (
                                                <div
                                                    key={template.id}
                                                    onClick={() => !isPosting && handleAddTemplate(template)}
                                                    className={`bg-white border-2 border-transparent p-5 rounded-2xl shadow-sm text-left group transition-all cursor-pointer ring-1 ring-gray-100 hover:shadow-lg hover:ring-cyan-500 hover:border-cyan-100 ${isPosting ? 'opacity-50 pointer-events-none' : ''}`}
                                                >
                                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform group-hover:bg-cyan-50">
                                                        {category === 'hero' ? '🦸' : category === 'cards' ? '🃏' : category === 'cta' ? '📣' : '📄'}
                                                    </div>
                                                    <h4 className="font-extrabold text-gray-900 text-base mb-1 group-hover:text-cyan-700">{template.name}</h4>
                                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{template.description}</p>

                                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{template.type} block</span>
                                                        <span className="text-xs font-bold text-cyan-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                            Inject &rarr;
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AdminSectionsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading CMS...</div>}>
            <SectionsManager />
        </Suspense>
    )
}
