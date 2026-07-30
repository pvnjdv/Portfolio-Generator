import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const client = getSupabaseClient()

    if (!client) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 503 }
      )
    }

    const { username } = await params

    const { data: portfolio, error } = await client
      .from('portfolios')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ portfolio })
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}