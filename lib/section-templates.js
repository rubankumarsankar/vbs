// This file defines the predefined section templates available in the Admin Panel.
// It uses the standard generic section types (hero, text, cards, cta) but leverages
// the custom 'layout' property to render premium designs via SectionRenderer.

export const SECTION_TEMPLATES = [
    // ════════ HOME PAGES ════════
    {
        id: 'home_hero_gradient',
        name: 'Homepage: Deep Gradient Hero',
        category: 'hero',
        description: 'Immersive dark hero with animated gradient orbs and grid pattern.',
        type: 'hero',
        data: {
            layout: 'home_hero',
            tag: "Virginia Business Solutions",
            heading: "Make Smarter Decisions About|Digital Skills, Courses, and Careers",
            subheading: "Clear guidance for students and working professionals in India - without hype or shortcuts",
            ctaText: "Explore Digital Skills",
            ctaHref: "/digital-skills",
            secondaryCtaText: "Learn About Us",
            secondaryCtaHref: "/about"
        }
    },
    {
        id: 'home_audience_cards',
        name: 'Homepage: Audience Target Cards',
        category: 'cards',
        description: 'Three distinct cards targeted at different user segments with checklist points.',
        type: 'cards',
        data: {
            layout: 'home_audience',
            heading: "Who We Help",
            cards: [
                { title: "Students", icon: "HiOutlineAcademicCap", description: "You are exploring digital careers and want to understand where to begin. Countless skills compete for your attention." },
                { title: "Early Career Professionals", icon: "HiOutlineBriefcase", description: "You have entered the workforce and want to strengthen your direction. Certifications promise growth, but not all paths move you forward." },
                { title: "Working Professionals", icon: "HiOutlineUserGroup", description: "You are considering upskilling or transitioning into a digital role. The landscape is evolving quickly." }
            ]
        }
    },
    {
        id: 'home_framework_grid',
        name: 'Homepage: Feature Framework Grid',
        category: 'cards',
        description: 'Three large cards linking out to pillar pages with deep hover states.',
        type: 'cards',
        data: {
            layout: 'home_framework',
            tag: "Our Approach",
            heading: "A Clear Framework for Smarter Career Decisions",
            subheading: "Instead of chasing trends or reacting to noise, a structured approach helps you understand what to learn.",
            cards: [
                { title: "Digital Skills", icon: "HiOutlineLightningBolt", description: "Understand which digital skills are foundational and which are temporary trends.", href: "/digital-skills" },
                { title: "Courses & Certifications", icon: "HiOutlineBookOpen", description: "Evaluate learning paths with clarity. Compare free and paid options.", href: "/courses-certifications" },
                { title: "Career Guides", icon: "HiOutlineTrendingUp", description: "See how skills and courses translate into career pathways.", href: "/career-guides" }
            ]
        }
    },

    // ════════ DIGITAL SKILLS PAGES ════════
    {
        id: 'ds_hero_pulse',
        name: 'Skills: Pulsing Hero',
        category: 'hero',
        description: 'Dark hero banner with pulsing background elements and dual CTAs.',
        type: 'hero',
        data: {
            layout: 'ds_hero',
            tag: "Virginia Business Solutions",
            heading: "Choosing the Right Digital|Skills for Long-Term Growth",
            subheading: "Understand which digital skills matter and how they shape real careers",
            ctaText: "Explore Courses →",
            ctaHref: "/courses-certifications",
            secondaryCtaText: "View Career Guides",
            secondaryCtaHref: "/career-guides"
        }
    },
    {
        id: 'ds_skill_clusters',
        name: 'Skills: Core Skill Clusters',
        category: 'cards',
        description: 'Complex card layout with icons, descriptions, and a "Best suited for" subtext block.',
        type: 'cards',
        data: {
            layout: 'ds_skill_clusters',
            tag: "Explore Clusters",
            heading: "Core Digital Skill Clusters",
            subheading: "Instead of focusing on individual tools, understand how different skills function.",
            cards: [
                { title: "Marketing & Growth", icon: "HiOutlineTrendingUp", description: "These skills focus on visibility, acquisition, and measurable performance.", suited: "Individuals who prefer strategic thinking and outcome-based work." },
                { title: "Data & Analytics", icon: "HiOutlineChartBar", description: "Data-oriented skills revolve around interpreting performance metrics.", suited: "Individuals who prefer logical frameworks and structured problem-solving." }
            ],
            footerText: "Understanding these clusters is the first step."
        }
    },
    {
        id: 'ds_evaluation_cards',
        name: 'Skills: Evaluation Box List',
        category: 'cards',
        description: 'Dark themed vertical list of styled cards with icons.',
        type: 'cards',
        data: {
            layout: 'ds_evaluation',
            tag: "Before You Commit",
            heading: "How to Evaluate a Digital Skill",
            subheading: "Choosing a skill requires examining how sustainable and transferable that skill will be over time.",
            cards: [
                { title: "Is It Foundational or Tool-Specific?", icon: "HiOutlineShieldCheck", description: "Foundational skills remain valuable even as tools change." },
                { title: "Does It Build Transferable Thinking?", icon: "HiOutlineCube", description: "Strong digital skills develop problem-solving ability, not just platform familiarity." }
            ]
        }
    },
    {
        id: 'ds_where_next',
        name: 'Skills: Where to Go Next Block',
        category: 'cards',
        description: 'Side-by-side large CTA cards offering direct pathways.',
        type: 'cards',
        data: {
            layout: 'ds_where_next',
            heading: "Where to Go Next",
            subheading: "Once you have identified which skill cluster aligns with your interests, the next step is structured learning.",
            cards: [
                { title: "Courses & Certifications", icon: "HiOutlineAcademicCap", description: "Explore curated learning paths that build depth.", url: "/courses-certifications" },
                { title: "Career Guides", icon: "HiOutlineTrendingUp", description: "Understand how specific skills translate into real roles.", url: "/career-guides" }
            ],
            footerText: ""
        }
    },

    // ════════ COURSES & CERTIFICATIONS PAGES ════════
    {
        id: 'courses_hero',
        name: 'Courses: Structured Learning Hero',
        category: 'hero',
        description: 'Immersive dark hero emphasizing structured steps.',
        type: 'hero',
        data: {
            layout: 'courses_hero',
            tag: "Virginia Business Solutions",
            heading: "Structured Learning Paths|for Real Skill Development",
            subheading: "Move from foundational knowledge to applied competence with clear pathways.",
            ctaText: "View Learning Stages ↓",
            ctaHref: "#learning-progression",
            secondaryCtaText: "Explore Career Guides",
            secondaryCtaHref: "/career-guides"
        }
    },
    {
        id: 'courses_progression',
        name: 'Courses: Progression Stages',
        category: 'cards',
        description: 'Detailed 3-column progression map detailing level, objective, approach, and suitability.',
        type: 'cards',
        data: {
            layout: 'courses_progression',
            tag: "The Roadmap",
            heading: "A Structured Learning Progression",
            subheading: "Digital learning works best when approached in stages.",
            cards: [
                { title: "Foundational Exposure", level: "Beginner Stage", icon: "HiOutlineSearchCircle", description: "At this level, the objective is clarity and orientation." },
                { title: "Applied Skill Development", level: "Intermediate Stage", icon: "HiOutlineBriefcase", description: "Here, the focus shifts from theory to structured practice." },
                { title: "Professional Positioning", level: "Advanced Stage", icon: "HiOutlineStar", description: "At this stage, learning becomes specialized." }
            ]
        }
    },
    {
        id: 'courses_free_paid',
        name: 'Courses: Free vs Paid Comparison',
        category: 'text',
        description: 'Dark-themed split container detailing free and paid investments with a large highlight callout box.',
        type: 'text',
        data: {
            layout: 'courses_free_paid',
            tag: "Investment",
            heading: "Free vs Paid Learning: Making the Right Choice",
            body: "<p>Free resources are effective when the goal is exploration or foundational clarity.</p>",
            listTitle: "Paid programs become valuable when:",
            checklist: [
                "Structured curriculum is required",
                "Project-based validation matters",
                "Mentorship or feedback is important",
                "Credentials influence hiring decisions"
            ],
            cardHighlight: "The decision should reflect your stage, not marketing pressure.",
            cardDescription: "Use free resources to build a foundation. Invest in paid programs to validate expertise."
        }
    },
    {
        id: 'courses_eval_mistakes',
        name: 'Courses: Evaluation & Mistakes Split',
        category: 'cards',
        description: 'Side by side split list detailing criteria on the left and common mistakes on the right.',
        type: 'cards',
        data: {
            layout: 'courses_eval_mistakes',
            leftHeading: "How to Evaluate Any Course",
            leftSubheading: "Consider evaluating the program through these key questions.",
            leftList: [
                "Is the curriculum transparent and structured?",
                "Does it include practical application?",
                "Are learning outcomes clearly defined?"
            ],
            leftFooter: "Evaluating courses with discipline prevents wasted effort.",
            rightHeading: "Common Mistakes in Course Selection",
            rightSubheading: "Many learners fall into these traps.",
            rightCards: [
                { title: "Enroll in advanced programs too early", icon: "HiOutlineExclamationCircle" },
                { title: "Prioritize completion over comprehension", icon: "HiOutlinePlay" }
            ],
            rightFooter: "Structured progression reduces these risks."
        }
    },

    // ════════ CAREER GUIDES PAGES ════════
    {
        id: 'career_hero',
        name: 'Careers: Pathways Hero',
        category: 'hero',
        description: 'Immersive dark hero banner discussing where skills can lead.',
        type: 'hero',
        data: {
            layout: 'career_hero',
            tag: "Virginia Business Solutions",
            heading: "Understand Where Digital Skills|Can Take You",
            subheading: "Explore real digital career paths, role expectations, and growth potential.",
            ctaText: "Explore Career Paths ↓",
            ctaHref: "#career-progression",
            secondaryCtaText: "View Digital Skills",
            secondaryCtaHref: "/digital-skills"
        }
    },
    {
        id: 'career_progression',
        name: 'Careers: Role Progression Timeline',
        category: 'cards',
        description: 'Vertical progression stack for Entry, Mid, and Senior roles highlighting focus shifts.',
        type: 'cards',
        data: {
            layout: 'career_progression',
            tag: "The Timeline",
            heading: "Career Progression by Stage",
            subheading: "Growth in digital careers follows a progression from execution to ownership.",
            cards: [
                { title: "Entry-Level Roles", subtitle: "You as a FRESHER", icon: "HiOutlineUserAdd", description: "This is where careers begin, learning how things work.", focus: "Building confidence through consistent execution." },
                { title: "Mid-Level Roles", subtitle: "Moving to Ownership", icon: "HiOutlineTrendingUp", description: "Moving from doing tasks to owning outcomes.", focus: "Growth comes from accountability and measurable impact." }
            ]
        }
    },
    {
        id: 'career_aligning',
        name: 'Careers: Aligning CTA Block',
        category: 'cta',
        description: 'A dark, premium 3-step timeline block aiming to align disciplines.',
        type: 'cta',
        data: {
            layout: 'career_aligning',
            heading: "Aligning Skills, Courses, and Career Direction",
            subheading: "Strong career progression begins with choosing the right skill foundation and building it through structured learning.",
            cards: [
                { title: "Understanding digital skills provides clarity at the starting point." },
                { title: "Structured courses strengthen application." },
                { title: "Career awareness aligns those efforts with long-term outcomes." }
            ],
            footerText: "When these three elements connect, progression becomes intentional."
        }
    }
]
