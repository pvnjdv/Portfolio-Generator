'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  MessageCircle, 
  User, 
  Code, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Loader2,
  ArrowRight,
  Bot,
  Copy,
  Check,
  Send,
  X
} from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'
import { useAutoResizeTextarea } from '@/components/hooks/use-auto-resize-textarea'

interface AIResponseContainerProps {
  data: PortfolioData
  query: string
  onClose: () => void
  onNewQuery?: (newQuery: string) => void
}

interface AIResponse {
  response: string
  responseType: string
  suggestedQuestions: string[]
  timestamp: string
}

export default function AIResponseContainer({ data, query, onClose, onNewQuery }: AIResponseContainerProps) {
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [newQuery, setNewQuery] = useState("")
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 44,
    maxHeight: 128
  })

  // Fetch AI response on mount
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/aiQuery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            portfolioData: data,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const aiData = await response.json()
        setAiResponse(aiData)
        // Start typewriter effect
        setIsTyping(true)
        setDisplayedText("")
      } catch (err) {
        console.error('Error fetching AI response:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate AI response')
      } finally {
        setLoading(false)
      }
    }

    fetchResponse()
  }, [query, data])

  // Typewriter effect
  useEffect(() => {
    if (aiResponse && isTyping) {
      const words = aiResponse.response.split(' ')
      let currentWordIndex = 0
      
      const typeInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setDisplayedText(prev => {
            if (prev === "") {
              return words[currentWordIndex]
            }
            return prev + " " + words[currentWordIndex]
          })
          currentWordIndex++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 150) // Adjust speed here (150ms per word)

      return () => clearInterval(typeInterval)
    }
  }, [aiResponse, isTyping])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuery(e.target.value)
    adjustHeight()
  }

  const handleNewQuery = () => {
    if (newQuery.trim() && onNewQuery) {
      // Reset typewriter state
      setDisplayedText("")
      setIsTyping(false)
      onNewQuery(newQuery.trim())
      setNewQuery("")
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    if (onNewQuery) {
      // Reset typewriter state
      setDisplayedText("")
      setIsTyping(false)
      onNewQuery(question)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleNewQuery()
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const formatResponse = (response: string) => {
    // Convert markdown-style formatting to JSX
    return response
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={`bold-${index}-${line.slice(2, -2)}`} className="font-bold text-white mb-2">
              {line.slice(2, -2)}
            </p>
          )
        }
        if (line.startsWith('## ')) {
          return (
            <h3 key={`header-${index}-${line.slice(3)}`} className="text-xl font-bold text-white mb-3 mt-4">
              {line.slice(3)}
            </h3>
          )
        }
        if (line.trim()) {
          return (
            <p key={`text-${index}-${line.substring(0, 20)}`} className="text-gray-300 mb-2 leading-relaxed">
              {line}
            </p>
          )
        }
        return <br key={`break-${index}`} />
      })
  }

  const getResponseIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'personal': return User
      case 'projects': return Code
      case 'experience': return Briefcase
      case 'education': return GraduationCap
      case 'contact': return Mail
      default: return MessageCircle
    }
  }

  const getResponseColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'personal': return 'blue'
      case 'projects': return 'purple'
      case 'experience': return 'green'
      case 'education': return 'orange'
      case 'contact': return 'cyan'
      case 'skills': return 'pink'
      default: return 'gray'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-start justify-center pt-16 pb-16 p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-black border-2 border-gray-800 rounded-3xl w-full max-w-4xl h-auto max-h-[calc(100vh-8rem)] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-3 sm:p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black border border-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Portfolio.AI</h3>
                <p className="text-xs text-gray-400">Intelligent Portfolio Assistant</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 flex items-center justify-center transition-all hover:border-gray-600"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </button>
          </div>
          
          {/* Query Display */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 p-3 bg-gray-900 border border-gray-700 rounded-xl"
          >
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm leading-relaxed">{query}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 p-2 sm:p-3 pb-4 sm:pb-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 bg-red-900/20 border border-red-800 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-red-300 mb-2 text-base font-medium">Oops! Something went wrong</p>
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Response Tile */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative"
                >
                  <div className={`relative p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    getResponseColor(aiResponse.responseType) === 'blue' ? 'bg-gray-900/50 border-blue-600' :
                    getResponseColor(aiResponse.responseType) === 'purple' ? 'bg-gray-900/50 border-purple-600' :
                    getResponseColor(aiResponse.responseType) === 'green' ? 'bg-gray-900/50 border-green-600' :
                    getResponseColor(aiResponse.responseType) === 'orange' ? 'bg-gray-900/50 border-orange-600' :
                    getResponseColor(aiResponse.responseType) === 'cyan' ? 'bg-gray-900/50 border-cyan-600' :
                    getResponseColor(aiResponse.responseType) === 'pink' ? 'bg-gray-900/50 border-pink-600' :
                    'bg-gray-900/50 border-gray-600'
                  }`}>
                    
                    {/* Response Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          getResponseColor(aiResponse.responseType) === 'blue' ? 'bg-blue-600/20 border border-blue-600/30' :
                          getResponseColor(aiResponse.responseType) === 'purple' ? 'bg-purple-600/20 border border-purple-600/30' :
                          getResponseColor(aiResponse.responseType) === 'green' ? 'bg-green-600/20 border border-green-600/30' :
                          getResponseColor(aiResponse.responseType) === 'orange' ? 'bg-orange-600/20 border border-orange-600/30' :
                          getResponseColor(aiResponse.responseType) === 'cyan' ? 'bg-cyan-600/20 border border-cyan-600/30' :
                          getResponseColor(aiResponse.responseType) === 'pink' ? 'bg-pink-600/20 border border-pink-600/30' :
                          'bg-gray-600/20 border border-gray-600/30'
                        }`}>
                          {(() => {
                            const Icon = getResponseIcon(aiResponse.responseType)
                            return <Icon className={`w-5 h-5 ${
                              getResponseColor(aiResponse.responseType) === 'blue' ? 'text-blue-400' :
                              getResponseColor(aiResponse.responseType) === 'purple' ? 'text-purple-400' :
                              getResponseColor(aiResponse.responseType) === 'green' ? 'text-green-400' :
                              getResponseColor(aiResponse.responseType) === 'orange' ? 'text-orange-400' :
                              getResponseColor(aiResponse.responseType) === 'cyan' ? 'text-cyan-400' :
                              getResponseColor(aiResponse.responseType) === 'pink' ? 'text-pink-400' :
                              'text-gray-400'
                            }`} />
                          })()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-base capitalize">{aiResponse.responseType} Information</p>
                          <p className="text-gray-400 text-xs">
                            {new Date(aiResponse.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(aiResponse.response)}
                        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all group"
                      >
                        {copiedText === aiResponse.response ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                        )}
                      </button>
                    </div>

                    {/* Response Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="prose prose-invert max-w-none text-base"
                    >
                      <div className="text-gray-300 leading-relaxed">
                        {isTyping || displayedText ? (
                          <>
                            {displayedText}
                            {isTyping && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block ml-1 w-2 h-4 bg-purple-400"
                              />
                            )}
                          </>
                        ) : (
                          formatResponse(aiResponse.response)
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Suggested Questions */}
                {aiResponse.suggestedQuestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="mt-6"
                  >
                    <h4 className="text-white font-semibold text-base mb-4 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                      You might also ask:
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {aiResponse.suggestedQuestions.map((question, index) => (
                        <motion.button
                          key={`question-${index}-${question.substring(0, 30)}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                          onClick={() => handleSuggestedQuestion(question)}
                          className="p-3 text-left bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                              {question}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="border-t-2 border-gray-800 bg-black"
        >
          <div className="p-3 sm:p-4">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={newQuery}
                  onChange={handleTextareaChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask another question..."
                  className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none min-h-[40px] max-h-28 text-sm"
                  rows={1}
                />
              </div>
              
              <button
                onClick={handleNewQuery}
                disabled={!newQuery.trim() || loading}
                className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-all flex items-center justify-center group border-2 border-purple-600 hover:border-purple-500"
              >
                <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all flex items-center justify-center group border-2 border-gray-700 hover:border-gray-600"
              >
                <X className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span className="flex items-center space-x-1">
                <Bot className="w-3 h-3" />
                <span>Portfolio.AI</span>
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}