'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, User, Bot, Sparkles } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'

interface ChatUIProps {
  data: PortfolioData
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

const predefinedPrompts = [
  "Tell me about yourself",
  "What are your skills?",
  "Show me your projects",
  "What's your experience?",
  "How can I contact you?",
  "Tell me about your education"
]

export default function ChatUI({ data }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! I'm ${data.name}'s portfolio assistant. Ask me anything about their background, skills, projects, or experience!`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('skill') || lowerQuestion.includes('technology')) {
      return `${data.name} has expertise in: ${data.skills.join(', ')}. They're particularly strong in ${data.skills.slice(0, 3).join(', ')}.`
    }
    
    if (lowerQuestion.includes('project')) {
      if (data.projects.length > 0) {
        return `Here are some of ${data.name}'s notable projects:\n\n${data.projects.map(p => 
          `• ${p.title}: ${p.description} (Built with: ${p.technologies.join(', ')})`
        ).join('\n\n')}`
      }
      return `${data.name} has worked on various projects. You can check their portfolio for more details!`
    }
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work')) {
      if (data.experience.length > 0) {
        return `${data.name}'s professional experience includes:\n\n${data.experience.map(e => 
          `• ${e.position} at ${e.company} (${e.duration})\n  ${e.description}`
        ).join('\n\n')}`
      }
      return `${data.name} has valuable professional experience. Feel free to ask about specific aspects!`
    }
    
    if (lowerQuestion.includes('education') || lowerQuestion.includes('study')) {
      if (data.education.length > 0) {
        return `${data.name}'s educational background:\n\n${data.education.map(e => 
          `• ${e.degree} from ${e.institution} (${e.duration})`
        ).join('\n\n')}`
      }
      return `${data.name} has a strong educational foundation. Ask me about specific areas!`
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
      const contacts = []
      if (data.contact.email) contacts.push(`Email: ${data.contact.email}`)
      if (data.contact.linkedin) contacts.push(`LinkedIn: ${data.contact.linkedin}`)
      if (data.contact.github) contacts.push(`GitHub: ${data.contact.github}`)
      if (data.contact.website) contacts.push(`Website: ${data.contact.website}`)
      
      return contacts.length > 0 
        ? `You can reach ${data.name} through:\n\n${contacts.join('\n')}`
        : `Feel free to connect with ${data.name}! Check their portfolio for contact information.`
    }
    
    if (lowerQuestion.includes('about') || lowerQuestion.includes('yourself') || lowerQuestion.includes('who')) {
      return `${data.bio}\n\nWith expertise in ${data.skills.slice(0, 5).join(', ')}, ${data.name} brings a unique perspective to every project.`
    }
    
    // Default response
    return `That's a great question! ${data.name} is a skilled professional with expertise in ${data.skills.slice(0, 3).join(', ')}. Feel free to ask about their projects, experience, or skills!`
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(message),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{data.name}</h1>
            <p className="text-sm text-gray-500">Portfolio Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                }`}>
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-3 max-w-3xl">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask me anything about this portfolio..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}