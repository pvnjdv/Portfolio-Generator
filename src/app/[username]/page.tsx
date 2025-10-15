'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ChatUI from '@/components/templates/ChatUI'
import AnimatedScroll from '@/components/templates/AnimatedScroll'
import StaticScroll from '@/components/templates/StaticScroll'
import { Portfolio } from '@/lib/supabase'
import { Loader2, AlertCircle } from 'lucide-react'

export default function UserPortfolio() {
  const params = useParams()
  const username = params.username as string
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/getPortfolio/${username}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfolio not found')
          } else {
            setError('Failed to load portfolio')
          }
          return
        }

        const { portfolio } = await response.json()
        setPortfolio(portfolio)
      } catch (err) {
        console.error('Error fetching portfolio:', err)
        setError('Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchPortfolio()
    }
  }, [username])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "The portfolio you're looking for doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const renderTemplate = () => {
    switch (portfolio.template) {
      case '1':
        return <ChatUI data={portfolio.data} />
      case '2':
        return <AnimatedScroll data={portfolio.data} />
      case '3':
        return <StaticScroll data={portfolio.data} />
      default:
        return <ChatUI data={portfolio.data} />
    }
  }

  return (
    <main>
      {renderTemplate()}
    </main>
  )
}