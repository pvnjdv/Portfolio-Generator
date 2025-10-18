'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload, User, Palette, Sparkles, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CreateFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateForm({ isOpen, onClose }: CreateFormProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    template: '1',
    resumeFile: null as File | null,
    enhanceWithAI: true
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, hyphens, and underscores'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long'
    }
    
    if (!formData.resumeFile) {
      newErrors.resumeFile = 'Please upload your resume'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const { parsePDF } = await import('../lib/pdfParser')
    return await parsePDF(file)
  }

  const handleSubmit = async () => {
    if (!validateStep1()) return

    setLoading(true)
    try {
      // Enhanced fallback data with more realistic defaults
      let portfolioData = {
        name: formData.username || 'Portfolio Creator',
        bio: 'Passionate professional dedicated to creating innovative solutions and building impactful projects. Experienced in modern technologies and committed to continuous learning and growth.',
        skills: [
          'JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 
          'Git', 'Problem Solving', 'Team Collaboration', 'Agile Development'
        ],
        projects: [
          {
            id: '1',
            title: 'Personal Portfolio Website',
            description: 'A modern, responsive portfolio website built with cutting-edge technologies to showcase professional work and skills.',
            technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
            projectUrl: '',
            githubUrl: ''
          }
        ],
        experience: [
          {
            id: '1',
            company: 'Freelance / Personal Projects',
            position: 'Developer',
            duration: 'Present',
            description: 'Working on various personal and professional projects to develop skills and create innovative solutions.'
          }
        ],
        education: [
          {
            id: '1',
            institution: 'Learning Institution',
            degree: 'Computer Science / Related Field',
            duration: 'In Progress',
            description: 'Pursuing education in technology and computer science with focus on practical application and project development.'
          }
        ],
        contact: {
          email: '',
          phone: '',
          github: '',
          linkedin: '',
          website: '',
          location: ''
        }
      }

      // If AI enhancement is enabled and we have a resume, parse it
      if (formData.enhanceWithAI && formData.resumeFile) {
        try {
          // Show progress to user by updating loading state
          const resumeText = await extractTextFromPDF(formData.resumeFile)
          
          if (resumeText.trim().length > 100) { // Ensure we have substantial content
            const response = await fetch('/api/parseResume', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ resumeText }),
            })

            if (response.ok) {
              const { data } = await response.json()
              
              // Merge AI-parsed data with fallback data, prioritizing AI data
              portfolioData = {
                name: data.name || portfolioData.name,
                bio: data.bio || portfolioData.bio,
                skills: data.skills && data.skills.length > 0 ? data.skills : portfolioData.skills,
                projects: data.projects && data.projects.length > 0 ? data.projects : portfolioData.projects,
                experience: data.experience && data.experience.length > 0 ? data.experience : portfolioData.experience,
                education: data.education && data.education.length > 0 ? data.education : portfolioData.education,
                contact: {
                  email: data.contact?.email || portfolioData.contact.email,
                  phone: data.contact?.phone || portfolioData.contact.phone,
                  github: data.contact?.github || portfolioData.contact.github,
                  linkedin: data.contact?.linkedin || portfolioData.contact.linkedin,
                  website: data.contact?.website || portfolioData.contact.website,
                  location: data.contact?.location || portfolioData.contact.location,
                }
              }
            } else {
              console.warn('AI parsing service unavailable, using fallback data')
            }
          } else {
            console.warn('Resume content too short for AI parsing, using fallback data')
          }
        } catch (error) {
          console.error('AI parsing failed, using fallback data:', error)
          // Continue with fallback data - no need to throw error
        }
      }

      // Save portfolio to database
      const saveResponse = await fetch('/api/savePortfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          template: formData.template,
          data: portfolioData,
        }),
      })

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json()
        throw new Error(errorData.error || 'Failed to create portfolio')
      }

      // Redirect to the new portfolio
      router.push(`/${formData.username}`)
      onClose()
    } catch (error) {
      console.error('Error creating portfolio:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to create portfolio' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Portfolio</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-3 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="your-awesome-username"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              <p className="text-gray-500 text-sm mt-1">
                Your portfolio will be available at: <span className="font-mono text-blue-600">portfolio.hackydaddy.xyz/{formData.username || 'username'}</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Upload className="w-4 h-4 inline mr-2" />
                Resume (PDF)
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                formData.resumeFile 
                  ? 'border-green-500 bg-green-50' 
                  : errors.resumeFile 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleInputChange('resumeFile', e.target.files?.[0] || null)}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  {formData.resumeFile ? (
                    <p className="text-green-600 font-medium">{formData.resumeFile.name}</p>
                  ) : (
                    <p className="text-gray-600">Click to upload your resume</p>
                  )}
                </label>
              </div>
              {errors.resumeFile && <p className="text-red-500 text-sm mt-1">{errors.resumeFile}</p>}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <input
                  type="checkbox"
                  id="enhance-ai"
                  checked={formData.enhanceWithAI}
                  onChange={(e) => handleInputChange('enhanceWithAI', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="enhance-ai" className="text-sm font-medium text-gray-700 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1 text-purple-500" />
                  Enhance with AI (Recommended)
                </label>
              </div>
              <p className="text-xs text-gray-600 ml-7">
                AI will automatically extract your name, bio, skills, experience, education, and contact information from your resume. 
                If parsing fails, we&apos;ll use smart fallback data to ensure your portfolio is ready to customize.
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Next: Choose Template
            </button>
          </div>
        )}

        {/* Step 2: Template Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Palette className="w-4 h-4 inline mr-2" />
                Choose Template
              </label>
              <div className="grid gap-4">
                {[
                  { id: '1', name: 'ChatGPT Style', description: 'Interactive chat interface' },
                  { id: '2', name: 'Animated Scroll', description: 'Modern with smooth animations' },
                  { id: '3', name: 'Static Scroll', description: 'Clean and minimal' }
                ].map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleInputChange('template', template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.template === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Portfolio'
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}