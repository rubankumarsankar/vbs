import { prisma } from '@/lib/db'
import { HiOutlineExternalLink, HiOutlineStar } from 'react-icons/hi'

/**
 * Server component that fetches and renders active affiliate links.
 * Can be embedded in any page. Optionally filter by category.
 */
export default async function AffiliateLinksSection({ category, limit, title = 'Recommended Resources', showDisclosure = true }) {
    const where = { isActive: true }
    if (category) where.category = category

    const links = await prisma.affiliateLink.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        take: limit || undefined,
    })

    if (links.length === 0) return null

    return (
        <section className="relative py-24 px-6 text-gray-900 overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-primary-100 backdrop-blur-md shadow-sm mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                        <span className="text-primary-600 text-[10px] font-bold uppercase tracking-widest">Curated by our team</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
                        {title}
                    </h2>
                    <p className="text-gray-600 font-medium text-lg mt-4 max-w-2xl mx-auto">
                        Handpicked platforms and programs we genuinely recommend for building real skills and scaling your capabilities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {links.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative bg-white border border-gray-100 rounded-3xl p-7 hover:bg-[#EDF4FF] transition-all duration-500 block overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:-translate-y-2 ${link.isFeatured ? 'ring-1 ring-amber-500/50 shadow-[0_8px_30px_rgba(245,158,11,0.08)]' : ''}`}
                        >
                            {/* Hover Glass Effect */}
                            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-primary-50/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                            {/* Top subtle highlight */}
                            <div className={`absolute top-0 inset-x-0 h-0.5 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${link.isFeatured ? 'bg-linear-to-r from-amber-400/0 via-amber-400 to-amber-400/0' : 'bg-linear-to-r from-primary-400/0 via-primary-500 to-primary-400/0'}`}></div>

                            <div className="flex items-start justify-between mb-5 relative z-10">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-sm ${link.isFeatured ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-primary-700 bg-primary-50 border-primary-100'}`}>
                                        {link.platform}
                                    </span>
                                    {link.isFeatured && (
                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 backdrop-blur-sm shadow-sm">
                                            <HiOutlineStar className="text-[12px] text-amber-500" /> Top Pick
                                        </span>
                                    )}
                                </div>
                                <div className={`w-8 h-8 rounded-full bg-[#EDF4FF] flex items-center justify-center border border-gray-100 shadow-sm transition-all duration-300 ${link.isFeatured ? 'group-hover:bg-amber-100 group-hover:rotate-12' : 'group-hover:bg-primary-100 group-hover:-rotate-12'}`}>
                                    <HiOutlineExternalLink className={`transition-colors text-gray-400 ${link.isFeatured ? 'group-hover:text-amber-600' : 'group-hover:text-primary-600'}`} />
                                </div>
                            </div>

                            <h3 className={`font-bold text-gray-900 text-lg mb-2 transition-colors relative z-10 ${link.isFeatured ? 'group-hover:text-amber-600' : 'group-hover:text-primary-600'}`}>{link.title}</h3>

                            {link.description && (
                                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6 line-clamp-2 relative z-10 group-hover:text-gray-700 transition-colors">{link.description}</p>
                            )}

                            <div className="mt-auto relative z-10">
                                <span className="inline-block text-[10px] font-bold text-gray-500 bg-[#EDF4FF] px-2.5 py-1.5 rounded-md border border-gray-100 uppercase tracking-wider">
                                    {link.category}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {showDisclosure && (
                    <div className="mt-20 pt-8 border-t border-gray-200 max-w-2xl mx-auto">
                        <p className="text-center text-xs text-gray-500 font-medium leading-relaxed">
                            <strong className="text-primary-600 mr-2">Disclosure:</strong>
                            Some links above are affiliate links. We may earn a small commission at no extra cost to you. We only recommend resources we genuinely believe in and use ourselves.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
