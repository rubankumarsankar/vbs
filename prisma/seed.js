const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

require('dotenv').config()

const prisma = new PrismaClient()

async function main() {
  // ─── Admin User ───────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12)
  await prisma.adminUser.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@vps.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@vps.com',
      name: 'Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✅ AdminUser seeded')

  // ─── Home Page ────────────────────────────────────────────────────────────
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Home',
      metaDesc:
        'VPS - helping students, early-career professionals and working adults build job-ready digital skills for the 2026 economy.',
    },
  })
  console.log('✅ Page (home) seeded')

  // ─── Check if sections already exist ──────────────────────────────────────
  const existingCount = await prisma.section.count({ where: { pageId: homePage.id } })
  if (existingCount > 0) {
    console.log('ℹ️  Sections already exist, skipping seed')
    return
  }

  // ─── Sections ─────────────────────────────────────────────────────────────
  const sections = [
    {
      type: 'hero',
      order: 1,
      isActive: true,
      data: {
        heading: 'Get Job-Ready with VPS Digital Skills',
        subheading:
          'Practical courses, career guides and expert mentorship - built for students, early-career & working professionals.',
        ctaText: 'Explore Courses',
        ctaHref: '/courses',
        trustBadge: '🏆 Trusted by 10,000+ learners',
      },
    },
    {
      type: 'cards',
      order: 2,
      isActive: true,
      data: {
        heading: 'Who Is This For?',
        cards: [
          {
            title: 'Students',
            description:
              'Bridge the gap between college curriculum and real-world job requirements.',
            icon: '🎓',
          },
          {
            title: 'Early-Career Professionals',
            description:
              'Level up your skills and fast-track your promotions with in-demand tech skills.',
            icon: '🚀',
          },
          {
            title: 'Working Professionals',
            description:
              'Stay relevant, reskill efficiently and open doors to high-salary roles.',
            icon: '💼',
          },
        ],
      },
    },
    {
      type: 'text',
      order: 3,
      isActive: true,
      data: {
        heading: 'Feeling Confused About Which Skills to Learn?',
        body: 'The tech landscape changes every year. Finding the right path - without wasting time or money - is harder than ever. Most learners pick the wrong course, learn outdated skills, or never finish what they start. VPS was built to fix that.',
        tag: 'The Problem',
      },
    },
    {
      type: 'text',
      order: 4,
      isActive: true,
      data: {
        heading: 'The VPS Framework: Learn → Practice → Apply',
        body: 'Every VPS programme follows a proven 3-step framework. You learn the theory, practice on real projects, and apply your skills to portfolio work that hiring managers actually care about.',
        tag: 'Our Framework',
        pillars: [
          { icon: '📚', label: 'Learn - structured, expert-curated content' },
          { icon: '🛠', label: 'Practice - hands-on projects and assignments' },
          { icon: '✅', label: 'Apply - portfolio-ready outcomes' },
          { icon: '🎯', label: 'Hire - career support and job matching' },
        ],
      },
    },
    {
      type: 'text',
      order: 5,
      isActive: true,
      data: {
        heading: 'How to Evaluate an Online Course Before Enrolling',
        tag: 'Smart Decisions',
        checklist: [
          'Is the curriculum updated for 2025–2026?',
          'Does it include real-world projects?',
          'Is there mentor or community support?',
          'Does it offer a recognised certificate?',
          'Is there a money-back guarantee?',
        ],
      },
    },
    {
      type: 'cta',
      order: 6,
      isActive: true,
      data: {
        heading: 'Ready to Start Your Digital Journey?',
        subheading:
          'Join thousands of learners who have already transformed their careers with VPS.',
        ctaText: 'Get Started Free',
        ctaHref: '/contact',
        secondaryCtaText: 'Browse Courses',
        secondaryCtaHref: '/courses',
      },
    },
  ]

  for (const section of sections) {
    await prisma.section.create({
      data: { pageId: homePage.id, ...section },
    })
  }
  console.log('✅ Homepage sections seeded (6)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
