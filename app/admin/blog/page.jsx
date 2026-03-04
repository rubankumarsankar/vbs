import { requireEditor } from '@/lib/auth'
import { prisma, queryWithRetry } from '@/lib/db'
import Link from 'next/link'

export default async function AdminBlogDashboard() {
    await requireEditor()

    const posts = await queryWithRetry(() =>
        prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { name: true } },
                category: { select: { name: true } }
            }
        })
    )

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-6 py-10 animate-fade-up">
                <div className="mb-10 flex items-center justify-between text-gray-900 bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Articles & Posts</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2">
                            Manage your content marketing, SEO articles, and engineering updates.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/blog/categories" className="btn-secondary py-3 px-6 shadow-sm inline-flex bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors">
                            Categories
                        </Link>
                        <Link href="/admin/blog/authors" className="btn-secondary py-3 px-6 shadow-sm inline-flex bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors">
                            Authors
                        </Link>
                        <Link href="/admin/blog/new" className="btn-primary py-3 px-6 shadow-sm inline-flex ml-2">
                            + Write Post
                        </Link>
                    </div>
                </div>

                <div className="bg-white border text-gray-900 border-gray-100 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Post</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {posts.length > 0 ? posts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-bold text-gray-900 line-clamp-1">{post.title}</p>
                                        <p className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">/{post.slug}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-md">{post.author.name}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {post.category ? (
                                            <span className="text-sm font-semibold text-cyan-700 bg-cyan-50 px-3 py-1 rounded-md">{post.category.name}</span>
                                        ) : (
                                            <span className="text-sm font-medium text-gray-400">Uncategorized</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${post.isPublished
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                            }`}>
                                            {post.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href={`/admin/blog/${post.id}/edit`} className="text-primary-600 hover:text-primary-800 font-bold text-sm transition-colors">Edit</Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-gray-400 font-bold">
                                        No posts found. Start writing your first article!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
