import { NextRequest, NextResponse } from 'next/server'
import { parseResumeWithAI } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeText } = body

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    const parsedData = await parseResumeWithAI(resumeText)

    return NextResponse.json({ data: parsedData })
  } catch (error) {
    console.error('Error parsing resume:', error)
    return NextResponse.json(
      { error: 'Failed to parse resume' },
      { status: 500 }
    )
  }
}