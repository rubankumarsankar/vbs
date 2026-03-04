'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiChevronRight, HiHome } from 'react-icons/hi'
import JsonLd from './JsonLd'

const LABEL_MAP = {
    'about': 'About Us',
    'digital-skills': 'Digital Skills',
    'courses-certifications': 'Courses & Certifications',
    'career-guides': 'Career Guides',
    'career-roadmap': 'Career Roadmap',
    'skill-quiz': 'Skill Quiz',
    'blog': 'Blog',
    'contact': 'Contact',
    'resources': 'Resources',
}

export default function Breadcrumbs() {
    const pathname = usePathname()

    if (pathname === '/') return null

    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbItems = [
        { name: 'Home', url: '/' },
        ...segments.map((seg, i) => ({
            name: LABEL_MAP[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            url: i === segments.length - 1 ? null : '/' + segments.slice(0, i + 1).join('/'),
        })),
    ]

    return (
        <>
            <JsonLd type="BreadcrumbList" data={{ items: breadcrumbItems }} />
            <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 pt-28 pb-2">
                <ol className="flex items-center gap-1.5 text-sm font-medium flex-wrap">
                    {breadcrumbItems.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                            {i > 0 && (
                                <HiChevronRight className="text-gray-300 text-xs shrink-0" />
                            )}
                            {item.url ? (
                                <Link
                                    href={item.url}
                                    className="text-gray-400 hover:text-primary-600 transition-colors flex items-center gap-1"
                                >
                                    {i === 0 && <HiHome className="text-sm" />}
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <span className="text-primary-700 font-semibold truncate max-w-[200px]">
                                    {item.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
}
