const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * Seeds Page records + default sections for all public pages.
 * Safe to run multiple times - uses upsert for pages.
 */
async function main() {
  const pages = [
    {
      slug: 'about',
      title: 'About Us | Virginia Business Solutions',
      metaDesc: 'Learn about our mission, values, and the team behind Virginia Business Solutions.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            title: "Build the Future.",
            subtitle: "We are a passionate team crafting premium digital experiences, resilient cloud infrastructures, and intelligent data systems that empower modern enterprises.",
            buttons: [
              { label: "Our Services", url: "/digital-skills", style: "primary" },
              { label: "Contact Us", url: "/contact", style: "secondary" }
            ],
            bgImage: ""
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            title: "Core Values",
            subtitle: "The principles that guide every line of code we write.",
            cards: [
              { title: "Speed & Precision", content: "We optimize for milliseconds, ensuring your users never wait and operations remain perfectly efficient and scalable.", icon: "⚡" },
              { title: "Unbreakable Security", content: "Security isn't an afterthought. It's woven into our architecture from the foundational layer upwards.", icon: "🛡️" },
              { title: "Continuous Evolution", content: "We constantly adapt to emerging tech, guaranteeing our stack remains modern and your competitive edge sharp.", icon: "🌱" }
            ]
          }
        }
      ]
    },
    {
      slug: 'contact',
      title: 'Contact Us | Virginia Business Solutions',
      metaDesc: 'Get in touch with our team. We respond within 2 hours.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            title: "Let's build something iconic.",
            subtitle: "Whether you need a massive digital transformation or a surgical precision API, our architects are ready to map it out.",
            buttons: [
              { label: "Email Us", url: "mailto:contact@vbs-digital.com", style: "primary" }
            ],
            bgImage: ""
          }
        },
        {
          type: 'cta',
          order: 2,
          isActive: true,
          data: {
            title: "Ready to Start?",
            subtitle: "Our technical leads usually reply within 2 hours. Drop us a message and let's begin your project.",
            buttonText: "Send a Message",
            buttonUrl: "mailto:contact@vbs-digital.com"
          }
        }
      ]
    },
    {
      slug: 'career-guides',
      title: 'Career Guides | Virginia Business Solutions',
      metaDesc: 'Deep-dive articles, architectural breakdowns, and strategic blueprints from our senior engineering team.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            title: "Master Your Craft.",
            subtitle: "Deep-dive articles, architectural breakdowns, and strategic blueprints from our senior engineering team.",
            buttons: [
              { label: "Browse Guides", url: "#guides", style: "primary" }
            ],
            bgImage: ""
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            title: "Latest Guides",
            subtitle: "Strategic insights for modern developers.",
            cards: [
              { title: "The 2026 Developer Roadmap", content: "A comprehensive guide to the tools and frameworks that matter.", icon: "🗺️" },
              { title: "Why Vercel Edge is Winning", content: "Understanding the shift to edge computing and what it means for your projects.", icon: "☁️" },
              { title: "Design Systems in Figma", content: "Building scalable design systems that bridge design and development.", icon: "🎨" },
              { title: "Scaling Prisma to 10M Rows", content: "Production-tested patterns for high-volume database operations.", icon: "📊" }
            ]
          }
        }
      ]
    },
    {
      slug: 'courses-certifications',
      title: 'Courses & Certifications | Virginia Business Solutions',
      metaDesc: 'Industry-aligned curriculum designed by leading experts. Master the exact technologies driving digital transformations.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            title: "Accelerate Your Career Trajectory.",
            subtitle: "Industry-aligned curriculum designed by leading experts. Master the exact technologies driving today's largest digital transformations.",
            buttons: [
              { label: "View All Courses", url: "#courses", style: "primary" }
            ],
            bgImage: ""
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            title: "Premium Offerings",
            subtitle: "Select the program that matches your career trajectory.",
            cards: [
              { title: "AI Mastery Program", content: "6 Months • Advanced - Deep learning, NLP, and production ML systems.", icon: "🤖" },
              { title: "Data Science Pro Track", content: "4 Months • Intermediate - Statistical analysis, Python, and data visualization.", icon: "📊" },
              { title: "Cloud DevOps FastTrack", content: "3 Months • Intermediate - AWS, CI/CD pipelines, and container orchestration.", icon: "☁️" },
              { title: "Full-Stack Developer Bootcamp", content: "5 Months • Beginner - React, Node.js, and database design from scratch.", icon: "💻" },
              { title: "Cybersecurity Analyst", content: "4 Months • Advanced - Threat detection, penetration testing, and compliance.", icon: "🛡️" },
              { title: "UI/UX Designer Launchpad", content: "2 Months • Beginner - Figma, design principles, and user research.", icon: "🎨" }
            ]
          }
        }
      ]
    },
    {
      slug: 'digital-skills',
      title: 'Digital Skills | Virginia Business Solutions',
      metaDesc: 'Augment your team with specialized engineers who live and breathe modern web architectures.',
      sections: [
        {
          type: 'hero',
          order: 1,
          isActive: true,
          data: {
            title: "Hire the 1%.",
            subtitle: "Augment your team with specialized engineers who live and breathe modern web architectures.",
            buttons: [
              { label: "Explore Skills", url: "#skills", style: "primary" }
            ],
            bgImage: ""
          }
        },
        {
          type: 'cards',
          order: 2,
          isActive: true,
          data: {
            title: "In-Demand Skills",
            subtitle: "High-performance expertise for modern teams.",
            cards: [
              { title: "React Performance Tuning", content: "Optimizing render cycles and memoization for blazing-fast UIs.", icon: "⚡" },
              { title: "Serverless Architectures", content: "AWS Lambda, Vercel Edge, and Cloudflare Workers for scalable backends.", icon: "☁️" },
              { title: "GraphQL Federation", content: "Scaling APIs across microservices seamlessly with unified schemas.", icon: "🕸️" },
              { title: "WebGL / Three.js", content: "High-performance 3D rendering in the browser for immersive experiences.", icon: "🧊" }
            ]
          }
        }
      ]
    }
  ]

  for (const pageData of pages) {
    const { slug, title, metaDesc, sections } = pageData

    // Upsert the page
    const page = await prisma.page.upsert({
      where: { slug },
      update: { title, metaDesc },
      create: { slug, title, metaDesc, isPublished: true }
    })

    // Only seed sections if the page has zero sections (don't overwrite existing)
    const existingCount = await prisma.section.count({ where: { pageId: page.id } })
    if (existingCount === 0) {
      for (const section of sections) {
        await prisma.section.create({
          data: { pageId: page.id, ...section }
        })
      }
      console.log(`✅ Seeded "${slug}" with ${sections.length} sections`)
    } else {
      console.log(`⏭️  "${slug}" already has ${existingCount} sections - skipping seed`)
    }
  }

  console.log('\n✅ All pages seeded successfully!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
