import CardsSection from '@/components/sections/CardsSection'
import CTASection from '@/components/sections/CTASection'
import HeroSection from '@/components/sections/HeroSection'
import TextSection from '@/components/sections/TextSection'

// Custom Layouts
import { DSHero, DSSkillClusters, DSEvaluation, DSAIImpact, DSMistakes, DSWhereNext } from './sections/layouts/DigitalSkillsLayouts'
import { CoursesHero, CoursesIntro, CoursesStructure, CoursesProgression, CoursesFreePaid, CoursesEvalAndMistakes, CoursesConnecting } from './sections/layouts/CoursesLayouts'
import { CareerHero, CareerIntro, CareerWhyClarity, CareerProgression, CareerGrowth, CareerAIAndMistakes, CareerAligning } from './sections/layouts/CareerLayouts'
import { HomeHero, HomeAudience, HomeChallenge, HomeFramework, HomeStandards } from './sections/layouts/HomeLayouts'

const LAYOUT_MAP = {
    // Home
    'home_hero': HomeHero,
    'home_audience': HomeAudience,
    'home_challenge': HomeChallenge,
    'home_framework': HomeFramework,
    'home_standards': HomeStandards,

    // Digital Skills
    'ds_hero': DSHero,
    'ds_skill_clusters': DSSkillClusters,
    'ds_evaluation': DSEvaluation,
    'ds_ai_impact': DSAIImpact,
    'ds_mistakes': DSMistakes,
    'ds_where_next': DSWhereNext,

    // Courses
    'courses_hero': CoursesHero,
    'courses_intro': CoursesIntro,
    'courses_structure': CoursesStructure,
    'courses_progression': CoursesProgression,
    'courses_free_paid': CoursesFreePaid,
    'courses_eval_mistakes': CoursesEvalAndMistakes,
    'courses_connecting': CoursesConnecting,

    // Career Guides
    'career_hero': CareerHero,
    'career_intro': CareerIntro,
    'career_why_clarity': CareerWhyClarity,
    'career_progression': CareerProgression,
    'career_growth': CareerGrowth,
    'career_ai_mistakes': CareerAIAndMistakes,
    'career_aligning': CareerAligning,
}

export default function SectionRenderer({ sections }) {
    if (!sections || sections.length === 0) return null

    return (
        <>
            {sections
                .filter((s) => s.isActive)
                .sort((a, b) => a.order - b.order)
                .map((section) => {
                    const LayoutComponent = section.data?.layout ? LAYOUT_MAP[section.data.layout] : null;

                    if (LayoutComponent) {
                        return <LayoutComponent key={section.id} data={section.data} />
                    }

                    switch (section.type) {
                        case 'hero':
                            return <HeroSection key={section.id} data={section.data} />
                        case 'cards':
                            return <CardsSection key={section.id} data={section.data} />
                        case 'text':
                            return <TextSection key={section.id} data={section.data} />
                        case 'cta':
                            return <CTASection key={section.id} data={section.data} />
                        default:
                            return null
                    }
                })}
        </>
    )
}
