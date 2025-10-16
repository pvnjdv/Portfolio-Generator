'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Code, Briefcase, Mail, Star, Github, ExternalLink, MapPin, Phone, User, Bot } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'
import AiInput from '@/components/ui/AiInput'
import Image from 'next/image'

interface ChatUIProps {
  data: PortfolioData
}

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

const navItems = [
  { name: "Me", icon: UserCircle },
  { name: "Projects", icon: Code },
  { name: "Skills", icon: Star },
  { name: "Fun", icon: Briefcase },
  { name: "Contact", icon: Mail }
]

// About Me Component
const AboutMeContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto px-6"
  >
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            {data.bio}
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <MapPin className="w-5 h-5 mr-3 text-blue-400" />
              <span>Based in India</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Code className="w-5 h-5 mr-3 text-purple-400" />
              <span>Full Stack Developer</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-600">
              <Image
                src="/profile.jpg"
                alt={data.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

// Projects Component
const ProjectsContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-6xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      My Projects
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
          <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs border border-blue-600/30"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 mr-1" />
                <span className="text-sm">Code</span>
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                <span className="text-sm">Live</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)

// Skills Component
const SkillsContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      My Skills
    </h2>
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-gray-600 text-center hover:scale-105 transition-transform duration-300"
          >
            <span className="text-white font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
)

// Experience Component
const ExperienceContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Experience & Education
    </h2>
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
              <p className="text-blue-400 font-medium">{exp.company}</p>
            </div>
            <span className="text-gray-400 text-sm">{exp.duration}</span>
          </div>
          <p className="text-gray-300">{exp.description}</p>
        </motion.div>
      ))}
      
      {data.education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (data.experience.length + index) * 0.1 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
              <p className="text-purple-400 font-medium">{edu.institution}</p>
            </div>
            <span className="text-gray-400 text-sm">{edu.duration}</span>
          </div>
          {edu.description && <p className="text-gray-300">{edu.description}</p>}
        </motion.div>
      ))}
    </div>
  </motion.div>
)

// Contact Component
const ContactContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-4xl mx-auto px-6"
  >
    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Get In Touch
    </h2>
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Let&apos;s Connect</h3>
          <p className="text-gray-300 mb-6">
            I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </p>
          
          <div className="space-y-4">
            {data.contact.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <Mail className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>{data.contact.email}</span>
              </a>
            )}
            
            {data.contact.phone && (
              <a
                href={`tel:${data.contact.phone}`}
                className="flex items-center text-gray-300 hover:text-green-400 transition-colors group"
              >
                <Phone className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>{data.contact.phone}</span>
              </a>
            )}
            
            {data.contact.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors group"
              >
                <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            
            {data.contact.github && (
              <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-purple-400 transition-colors group"
              >
                <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Mail className="w-16 h-16 text-white" />
            </div>
            <p className="text-gray-400">Ready to start a conversation?</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

export default function ChatUI({ data }: ChatUIProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    
    if (lowerQuestion.includes('yourself') || lowerQuestion.includes('about') || lowerQuestion.includes('who')) {
      return `${data.bio} I'm passionate about creating innovative solutions and continuously learning new technologies.`
    }
    
    if (lowerQuestion.includes('skill')) {
      return `My key skills include: ${data.skills.join(', ')}. I'm always expanding my skill set to stay current with industry trends.`
    }
    
    if (lowerQuestion.includes('project')) {
      if (data.projects.length > 0) {
        return `Here are some of my notable projects:\n\n${data.projects.map(project => 
          `🚀 **${project.title}**\n${project.description}\nTechnologies: ${project.technologies.join(', ')}`
        ).join('\n\n')}`
      }
      return "I'm currently working on some exciting projects that showcase my skills in modern web development."
    }
    
    if (lowerQuestion.includes('experience') || lowerQuestion.includes('work')) {
      if (data.experience.length > 0) {
        return `My professional experience includes:\n\n${data.experience.map(exp => 
          `💼 **${exp.position}** at ${exp.company}\n${exp.duration}\n${exp.description}`
        ).join('\n\n')}`
      }
      return "I'm building my professional experience through various projects and learning opportunities."
    }
    
    if (lowerQuestion.includes('education') || lowerQuestion.includes('study')) {
      if (data.education.length > 0) {
        return `My educational background:\n\n${data.education.map(edu => 
          `🎓 **${edu.degree}** from ${edu.institution}\n${edu.duration}${edu.description ? `\n${edu.description}` : ''}`
        ).join('\n\n')}`
      }
      return "I believe in continuous learning and staying updated with the latest technologies and industry practices."
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
      return `You can reach out to me through:\n\n📧 Email: ${data.contact.email || 'Available upon request'}\n💼 LinkedIn: ${data.contact.linkedin || 'Available upon request'}\n🐙 GitHub: ${data.contact.github || 'Available upon request'}\n\nI'm always open to discussing new opportunities and collaborations!`
    }
    
    return "That's a great question! I'd be happy to help you learn more about my background, skills, projects, or experience. Feel free to ask about any specific area you're interested in."
  }

  const handleChatMessage = (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
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
    }, 1500 + Math.random() * 1000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Me":
        return <AboutMeContent data={data} />
      case "Projects":
        return <ProjectsContent data={data} />
      case "Skills":
        return <SkillsContent data={data} />
      case "Fun":
        return <ExperienceContent data={data} />
      case "Contact":
        return <ContactContent data={data} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        
        {/* Header Section - Only show when no tab is active */}
        {!activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 max-w-2xl"
          >
            <p className="text-lg text-gray-400 mb-4">Hey Guys, I&apos;m {data.name}</p>
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              I cooked <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">PORTFOLIO</span>
            </h1>
            
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-64 h-64 mx-auto mb-8 mt-8 rounded-full overflow-hidden border-4 border-gray-600"
            >
              <Image
                src="/profile.jpg"
                alt={data.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Dynamic Content Area */}
        <div className="w-full mb-8 min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="w-full max-w-4xl mx-auto px-4 mb-8">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-100 border border-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        message.type === 'user' 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.content}
                        </p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="w-full max-w-2xl mx-auto px-4 mb-8">
          <AiInput 
            onSubmit={(message) => {
              if (message.trim()) {
                handleChatMessage(message)
              }
            }}
            placeholder={{
              search: "Search portfolio info...",
              ask: `Ask about ${data.name}...`
            }}
          />
        </div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center space-x-1 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(activeTab === item.name ? null : item.name)}
                className={`relative flex flex-col items-center px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}