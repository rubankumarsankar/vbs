import { prisma, queryWithRetry } from '@/lib/db'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Reveal } from '@/components/ui/Reveal'

// In a full production app you'd parse Phase 2's rich text content with a markdown parser like react-markdown.
// We'll safely render HTML if you store HTML, or we can just render the raw string for this Phase.

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = await queryWithRetry(() => prisma.post.findUnique({ where: { slug } }))
    if (!post) return { title: 'Post Not Found' }

    return {
        title: `${post.title} | VBS Blog`,
        description: post.excerpt || 'Read the full article on VBS Digital.',
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params
    const post = await queryWithRetry(() =>
        prisma.post.findUnique({
            where: { slug },
            include: {
                author: { select: { name: true, role: true } },
                category: true,
                tags: true,
            },
        })
    )

    if (!post || !post.isPublished) {
        notFound()
    }

    // Estimate read time (assuming ~250 words per minute)
    const wordCount = post.content.split(/\s+/).length
    const readTime = Math.max(1, Math.ceil(wordCount / 250))

    return (
        <div className="min-h-screen bg-[#F4F6F9]">
            {/* Article Header */}
            <section className="bg-white pt-40 pb-20 border-b border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

                <Container className="max-w-4xl relative z-10">
                    <Reveal yOffset={30}>
                        <Link href="/blog" className="text-primary-600 font-bold text-sm mb-8 inline-flex items-center hover:text-primary-700 transition-colors">
                            ← Back to Engineering Blog
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {post.category && (
                                <span className="bg-primary-50 text-primary-700 font-bold text-xs uppercase tracking-wide px-3 py-1.5 rounded-full">
                                    {post.category.name}
                                </span>
                            )}
                            <span className="text-gray-400 font-semibold text-sm flex items-center gap-1.5">
                                📅 {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-gray-400 font-semibold text-sm flex items-center gap-1.5">
                                ⏱️ {readTime} min read
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-primary-500/20">
                                {post.author.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{post.author.name}</p>
                                <p className="text-sm font-medium text-gray-500">{post.author.role === 'SUPER_ADMIN' ? 'Head of Engineering' : 'Technical Author'}</p>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Featured Image if exists */}
            {post.featuredImg && (
                <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
                    <Reveal yOffset={40} delay={0.2}>
                        <div className="rounded-4xl overflow-hidden shadow-2xl shadow-gray-200/50 border-4 border-white h-[400px] md:h-[500px] bg-gray-100">
                            <img src={post.featuredImg} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    </Reveal>
                </div>
            )}

            {/* Article Body */}
            <section className="py-20">
                <Container className="max-w-3xl">
                    <Reveal delay={post.featuredImg ? 0.3 : 0.2}>
                        {/* We use prose-lg for gorgeous typography inside the article */}
                        <article className="prose prose-lg prose-neutral prose-headings:font-extrabold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed max-w-none">
                            {/* In Phase 2 we map newline characters to breaks for simple text. In a final prod this would use react-markdown */}
                            {post.content.split('\n').map((paragraph, idx) => (
                                paragraph.trim() !== '' ? <p key={idx}>{paragraph}</p> : <br key={idx} />
                            ))}
                        </article>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                                <span className="text-gray-900 font-bold mr-2 my-auto">Tags:</span>
                                {post.tags.map(tag => (
                                    <span key={tag.id} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold hover:bg-gray-200 cursor-pointer transition-colors">
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </Reveal>
                </Container>
            </section>
        </div>
    )
}
