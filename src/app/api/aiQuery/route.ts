import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { PortfolioData } from '@/lib/supabase'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, portfolioData }: { query: string; portfolioData: PortfolioData } = body

    if (!query || !portfolioData) {
      return NextResponse.json(
        { error: 'Query and portfolio data are required' },
        { status: 400 }
      )
    }

    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key') {
      return NextResponse.json(
        { error: 'AI service is not configured. Please check your API configuration.' },
        { status: 503 }
      )
    }

    // Create a comprehensive context from portfolio data
    const portfolioContext = `
Portfolio Owner: ${portfolioData.name}
Bio: ${portfolioData.bio}

Skills: ${portfolioData.skills.join(', ')}

Projects:
${portfolioData.projects.map(project => `
- ${project.title}: ${project.description}
  Technologies: ${project.technologies.join(', ')}
  ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
  ${project.projectUrl ? `Live Demo: ${project.projectUrl}` : ''}
`).join('\n')}

Experience:
${portfolioData.experience.map(exp => `
- ${exp.position} at ${exp.company} (${exp.duration})
  ${exp.description}
`).join('\n')}

Education:
${portfolioData.education.map(edu => `
- ${edu.degree} from ${edu.institution} (${edu.duration})
  ${edu.description || ''}
`).join('\n')}

Contact:
${portfolioData.contact.email ? `Email: ${portfolioData.contact.email}` : ''}
${portfolioData.contact.phone ? `Phone: ${portfolioData.contact.phone}` : ''}
${portfolioData.contact.linkedin ? `LinkedIn: ${portfolioData.contact.linkedin}` : ''}
${portfolioData.contact.github ? `GitHub: ${portfolioData.contact.github}` : ''}
${portfolioData.contact.website ? `Website: ${portfolioData.contact.website}` : ''}
${portfolioData.contact.location ? `Location: ${portfolioData.contact.location}` : ''}
    `

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are ${portfolioData.name} responding to questions about your portfolio and professional background. 
          
          IMPORTANT: Always respond in FIRST PERSON as ${portfolioData.name}. Use "I", "my", "me" - never refer to yourself in third person.
          
          Guidelines:
          - Answer as if you are ${portfolioData.name} personally responding
          - Use the portfolio data provided to give accurate, specific answers about YOUR experience
          - Be conversational, enthusiastic, and professional
          - When discussing projects, skills, or experience, speak from personal experience
          - Keep responses concise but informative (2-4 sentences typically)
          - If asked about something not in your portfolio, redirect to what you do know about yourself
          - Show personality and passion for your work
          - Use specific details from your portfolio data when relevant
          
          RESPONSE FORMAT: You must respond with a JSON object containing:
          {
            "response": "your actual response text",
            "responseType": "one of: skills, projects, experience, education, contact, about, general",
            "suggestedQuestions": ["question1", "question2", "question3"]
          }
          
          Determine the responseType based on what the user is asking about, not just keywords.
          Generate 3 relevant follow-up questions that would be interesting to ask ${portfolioData.name}.
          
          Your Portfolio Data:
          ${portfolioContext}`
        },
        {
          role: 'user',
          content: query
        }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 400,
    })

    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
      throw new Error('No response from AI')
    }

    try {
      // Parse the JSON response from AI
      const parsedResponse = JSON.parse(aiResponse)
      
      return NextResponse.json({ 
        response: parsedResponse.response,
        responseType: parsedResponse.responseType,
        suggestedQuestions: parsedResponse.suggestedQuestions,
        timestamp: new Date().toISOString()
      })
    } catch (parseError) {
      // If AI didn't return valid JSON, extract the text and use general category
      console.warn('AI response was not valid JSON, using text response:', parseError)
      return NextResponse.json({ 
        response: aiResponse,
        responseType: 'general',
        suggestedQuestions: [
          "Tell me more about your background",
          "What are you most passionate about?",
          "How can we work together?"
        ],
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Error generating AI response:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI response. Please try again later.' },
      { status: 500 }
    )
  }
}