import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function parseResumeWithAI(resumeText: string) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a resume parser. Extract structured data from the resume text and return only valid JSON without any markdown formatting or code blocks. The JSON should match this exact structure:
{
  "name": "string",
  "bio": "string (2-3 sentence professional summary)",
  "skills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "technologies": ["tech1", "tech2"],
      "projectUrl": "string (if available)",
      "githubUrl": "string (if available)"
    }
  ],
  "experience": [
    {
      "id": "string",
      "company": "string",
      "position": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "id": "string",
      "institution": "string",
      "degree": "string",
      "duration": "string",
      "description": "string (optional)"
    }
  ],
  "contact": {
    "email": "string (if available)",
    "phone": "string (if available)",
    "linkedin": "string (if available)",
    "github": "string (if available)",
    "website": "string (if available)",
    "location": "string (if available)"
  }
}`
        },
        {
          role: 'user',
          content: resumeText
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.1,
    })

    const result = completion.choices[0]?.message?.content
    if (!result) {
      throw new Error('No response from AI')
    }

    return JSON.parse(result)
  } catch (error) {
    console.error('Error parsing resume with AI:', error)
    throw error
  }
}

export async function generatePortfolioContent(data: Record<string, unknown>) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional portfolio content generator. Enhance the provided data with better descriptions, professional summaries, and engaging project descriptions. Return only valid JSON.'
        },
        {
          role: 'user',
          content: `Enhance this portfolio data: ${JSON.stringify(data)}`
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.3,
    })

    const result = completion.choices[0]?.message?.content
    if (!result) {
      throw new Error('No response from AI')
    }

    return JSON.parse(result)
  } catch (error) {
    console.error('Error generating content with AI:', error)
    throw error
  }
}