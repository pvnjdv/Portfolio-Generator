import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const client = getSupabaseClient()

    if (!client) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { username, template, data } = body

    // Check if username already exists
    const { data: existingUser } = await client
      .from('portfolios')
      .select('username')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    // Insert new portfolio
    const { data: portfolio, error } = await client
      .from('portfolios')
      .insert({
        username,
        template,
        data,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save portfolio' },
        { status: 500 }
      )
    }

    return NextResponse.json({ portfolio })
  } catch (error) {
    console.error('Error saving portfolio:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}