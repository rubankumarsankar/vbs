const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const homePage = await prisma.page.findUnique({ where: { slug: 'home' } })
  
  if (!homePage) {
    console.log('Home page not found')
    return
  }

  // Update Home Page Meta
  await prisma.page.update({
    where: { slug: 'home' },
    data: {
      title: 'Digital Career Guidance in India | Virginia Business Solutions',
      metaDesc: 'Clear digital career guidance in India for students and working professionals. Explore digital skills, courses, and career paths without hype or shortcuts.',
    }
  })

  // Delete existing sections
  await prisma.section.deleteMany({ where: { pageId: homePage.id } })

  const sections = [
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        heading: 'Make Smarter Decisions About Digital Skills, Courses, and Careers',
        subheading: 'Clear guidance for students and working professionals in India, without hype or shortcuts',
        ctaText: 'Explore Digital Skills →',
        ctaHref: '/digital-skills',
        trustBadge: 'Make smarter decisions about digital skills, courses, and careers',
      }
    },
    {
      type: 'cards',
      order: 2,
      isActive: true,
      data: {
        heading: 'Who is this for?',
        cards: [
          {
            title: 'Students',
            description: 'You’re exploring digital careers and want to understand where to begin. There are countless skills, tools, and courses competing for your attention. Before choosing your first step, you want clarity on what truly matters.',
            icon: '🎓'
          },
          {
            title: 'Early Career Professionals',
            description: 'You’ve entered the workforce and want to strengthen your direction. Certifications and skill upgrades promise growth, but not all paths move you forward. Before investing your time and effort, you want clarity on what adds real value.',
            icon: '🚀'
          },
          {
            title: 'Working Professionals',
            description: 'You’re considering upskilling or transitioning into a digital role. The landscape is evolving quickly, and staying relevant requires thoughtful choices. Before committing your time and money, you want clarity about your next move.',
            icon: '💼'
          }
        ]
      }
    },
    {
      type: 'text',
      order: 3,
      isActive: true,
      data: {
        heading: 'Why Choosing Digital Skills Today Feels Confusing',
        body: 'The digital space has expanded rapidly over the last few years. New tools, certifications, and roles appear almost every month, each claiming to offer better opportunities and faster growth.\n\nSocial media platforms amplify success stories, while course providers promise quick results.\n\nAt the same time, automation and AI are reshaping how work is done, making it harder to understand which skills will remain valuable long term.\n\nFor students and professionals alike, the challenge is not a lack of options, it’s an excess of them.\n\nWithout a clear structure, it becomes difficult to separate foundational skills from temporary trends.',
        tag: 'The Challenge'
      }
    },
    {
      type: 'text',
      order: 4,
      isActive: true,
      data: {
        heading: 'A Clear Framework for Smarter Career Decisions',
        body: 'Making informed decisions becomes easier when you follow a clear structure. Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn, where to learn it, and how it connects to real career outcomes.',
        tag: 'The Solution'
      }
    },
    {
      type: 'cards',
      order: 5,
      isActive: true,
      data: {
        heading: 'Our Core Pillars',
        cards: [
          {
            title: 'Digital Skills',
            description: 'Understand which digital skills are foundational and which are temporary trends. Explore how different skills connect to real-world roles and where AI is reshaping expectations.',
            icon: '💻'
          },
          {
            title: 'Courses & Certifications',
            description: 'Evaluate learning paths with clarity. Compare free and paid options, structured programs, and certifications to choose what aligns with your stage and goals.',
            icon: '📜'
          },
          {
            title: 'Career Guides',
            description: 'See how skills and courses translate into career pathways. Understand role expectations, growth trajectories, and how to stay relevant in a changing landscape.',
            icon: '🧭'
          }
        ]
      }
    },
    {
      type: 'text',
      order: 6,
      isActive: true,
      data: {
        heading: 'How Recommendations Are Evaluated',
        tag: 'Our Criteria',
        checklist: [
          'Practical Relevance: Does this skill or course reflect how work is actually done today?',
          'Learning Depth: Does it build real understanding, not just surface familiarity?',
          'Curriculum Clarity: Is the structure transparent, structured, and outcome-oriented?',
          'Long-Term Value: Will this knowledge remain useful beyond short-term trends?',
          'Stage Alignment: Is it suitable for beginners, early professionals, or experienced learners?',
          'Balanced Options: Are free and paid paths both considered based on value, not marketing?'
        ]
      }
    }
  ]
  
  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: homePage.id, ...section }
    })
  }

  console.log('✅ VBS Homepage content seeded')

  // Phase 7: Seed Site Settings
  const defaultSettings = {
    siteName: 'Virginia Business Solutions',
    logoUrl: '',
    contactEmail: 'contact@vbs-digital.com',
    contactPhone: '+91 98765 43210',
    footerText: 'Empowering students and professionals with clear, structured, and actionable digital career guidance.',
    seoDefaultTitle: 'Virginia Business Solutions | Digital Guidance',
    seoDefaultDesc: 'Clear digital career guidance in India without hype or shortcuts.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/vbs',
      twitter: 'https://twitter.com/vbs',
    },
    navLinks: [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'What should I learn', url: '/digital-skills' },
      { label: 'Where should I learn it?', url: '/courses-certifications' },
      { label: 'What does this lead to?', url: '/career-guides' },
    ]
  }

  const existingSettings = await prisma.siteSettings.findFirst()
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: defaultSettings
    })
    console.log('✅ Global SiteSettings updated')
  } else {
    await prisma.siteSettings.create({
      data: defaultSettings
    })
    console.log('✅ Global SiteSettings seeded')
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
