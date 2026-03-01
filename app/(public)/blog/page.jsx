import { prisma } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { Reveal, StaggerChildren, Child } from '@/components/ui/Reveal'

export const metadata = {
    title: 'VPS Engineering Blog',
    description: 'Insights, tutorials, and architectural deep-dives from the VPS engineering team.',
}

export default async function BlogIndexPage() {
    const posts = await prisma.post.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: {
            author: { select: { name: true } },
            category: true,
            tags: true,
        },
    })

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            {/* Header */}
            <section className="hero-dark pt-40 pb-32">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 animate-pulse-soft" />

                <Container className="relative z-10 text-center">
                    <Reveal>
                        <span className="badge badge-cyan mb-6 px-4 py-1.5 text-sm uppercase tracking-wider">Engineering Blog</span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
                            Build <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-primary-600">Louder</span>.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                            Deeply technical perspectives on modern web architecture, cloud scaling, and digital design.
                        </p>
                    </Reveal>
                </Container>
            </section>

            {/* Posts Grid */}
            <section className="py-24 relative overflow-hidden">
                <Container>
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.length > 0 ? posts.map(post => (
                            <Child key={post.id}>
                                <Link href={`/blog/${post.slug}`} className="card-modern h-full flex flex-col group bg-white relative overflow-hidden transition-all hover:border-primary-200">
                                    {/* Thumbnail */}
                                    <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                                        {post.featuredImg ? (
                                            <img src={post.featuredImg} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">📝</span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            {post.category && (
                                                <span className="text-primary-700 bg-primary-50 px-2 py-1 rounded-md">{post.category.name}</span>
                                            )}
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 font-medium text-sm line-clamp-3 mb-6 flex-1">
                                            {post.excerpt || 'Read the full article to learn more.'}
                                        </p>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                            <span className="text-xs font-bold text-gray-900 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-[10px]">{post.author.name.charAt(0)}</div>
                                                {post.author.name}
                                            </span>
                                            <span className="text-sm font-bold text-primary-600 group-hover:translate-x-1 transition-transform">Read →</span>
                                        </div>
                                    </div>
                                </Link>
                            </Child>
                        )) : (
                            <div className="col-span-full py-20 text-center text-gray-400 font-bold">No posts published yet.</div>
                        )}
                    </StaggerChildren>
                </Container>
            </section>
        </div>
    )
}
