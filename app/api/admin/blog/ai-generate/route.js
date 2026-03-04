import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// Allow larger body sizes and timeouts for document uploads
export const maxDuration = 60; // 60 seconds

export async function POST(request) {
    try {
        const formData = await request.formData()
        const textContent = formData.get('textContent')

        if (!textContent) {
            return NextResponse.json({ error: 'No text content provided.' }, { status: 400 })
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Gemini API Key is missing. Please add GEMINI_API_KEY to your .env file.' },
                { status: 500 }
            )
        }

        // Initialize Gemini SDK
        const ai = new GoogleGenAI({ apiKey })

        // Detailed prompt asking it to structure a blog post and return JSON
        const prompt = `
You are a senior technical writer and blog editor for a digital skills academy called VBS (Virginia Business Solutions).

I am providing you with raw, unstructured text extracted from a document. Your job is to format it into a perfect, engaging blog post.

REQUIREMENTS:
1. Title: Create a catchy, SEO-friendly title based on the text.
2. Excerpt: Write a compelling 2-3 sentence summary of the post.
3. Content: Format the core text using beautiful GitHub-Flavored Markdown. Use headers (##, ###), bullet points, bolding, and code blocks where appropriate. Fix any typos or grammatical errors.
4. Tags: Suggest an array of 2-5 relevant tags (e.g., "React", "Career Advice", "Data Science").

RETURN FORMAT: MUST BE STRICT JSON matching this schema:
{
    "title": "Your Generated Title",
    "excerpt": "Your generated excerpt.",
    "content": "Your markdown formatted content.",
    "tags": ["tag1", "tag2"]
}

RAW TEXT TO PARSE:
"""
${textContent}
"""
`

        // Call Gemini 2.5 Flash for fast textual processing
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const resultJson = response.text
        
        if (!resultJson) {
            throw new Error('Gemini returned an empty response.')
        }

        // Parse JSON
        const parsedData = JSON.parse(resultJson)

        return NextResponse.json({ success: true, data: parsedData }, { status: 200 })

    } catch (error) {
        console.error('AI Generation Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to generate content' },
            { status: 500 }
        )
    }
}
