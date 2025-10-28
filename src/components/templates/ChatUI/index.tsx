'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Code, Briefcase, Mail, Star, Github, ExternalLink, MapPin, Phone } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'
import { AIInput } from '@/components/ui/AIInput'
import { GlassButton } from '@/components/ui/button'
import AIResponseContainer from '@/components/ui/AIResponseContainer'
import Image from 'next/image'

interface ChatUIProps {
  data: PortfolioData
}

const navItems = [
  { name: "Me", icon: UserCircle, buttonType: "glass" as const, variant: "primary" },
  { name: "Projects", icon: Code, buttonType: "glass" as const, variant: "secondary" },
  { name: "Skills", icon: Star, buttonType: "glass" as const, variant: "success" },
  { name: "Fun", icon: Briefcase, buttonType: "glass" as const, variant: "warning" },
  { name: "Contact", icon: Mail, buttonType: "glass" as const, variant: "danger" }
]

// About Me Component
const AboutMeContent = ({ data, username }: { data: PortfolioData, username?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="w-full px-4 sm:px-6 flex items-center justify-center min-h-[85vh] py-6 sm:py-8 pb-24 sm:pb-8"
  >
    <div className="relative max-w-6xl mx-auto w-full">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-2xl blur-2xl opacity-30"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-700/50 shadow-xl">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-center">
          {/* Profile Image Section */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-4 lg:space-y-6 text-center"
>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border-2 border-white/10 backdrop-blur-sm overflow-hidden">
                {!username ? (
                  <Image
                    src="/profile.png"
                    alt={data.name}
                    width={220}
                    height={220}
                    className="rounded-full object-cover w-full h-full"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 text-gray-300" />
                )}
              </div>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm"
            >
              <div className="text-center p-3 sm:p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">{data.projects.length}+</div>
                <div className="text-xs sm:text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">{data.skills.length}+</div>
                <div className="text-xs sm:text-sm text-gray-400">Skills</div>
              </div>
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
                {data.bio}
              </p>
            </motion.div>
            
            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 hover:bg-blue-500/15 transition-all group">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Location</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Based in India</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 hover:bg-purple-500/15 transition-all group">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Role</div>
                    <div className="text-gray-300 text-xs sm:text-sm">Full Stack Developer</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-500/15 transition-all group">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Specialization</div>
                    <div className="text-gray-300 text-xs sm:text-sm">AI & Cybersecurity</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:border-green-400/40 hover:bg-green-500/15 transition-all group">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-semibold text-sm sm:text-base">Experience</div>
                    <div className="text-gray-300 text-xs sm:text-sm">2+ Years</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

// Projects Component
const ProjectsContent = ({ data }: { data: PortfolioData }) => {
  if (data.projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full px-6 text-center"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200/50 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Amazing Projects Coming Soon!</h3>
          <p className="text-gray-600 text-lg">
            Featured projects and innovations will be showcased here once available. Stay tuned!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-6"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Featured Projects
      </motion.h2>
    
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="group relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 min-h-[180px]"
        >
          {/* Project Number Badge */}
          <div className="inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 bg-blue-500/20 text-blue-300">
            #{index + 1}
          </div>

          {/* Project Content */}
          <div className="space-y-2">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="text-base font-bold text-white"
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="text-gray-300 text-xs leading-relaxed line-clamp-2"
            >
              {project.description}
            </motion.p>
          </div>

          {/* Technologies */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="mb-2"
          >
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 2).map((tech, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-xs font-medium text-blue-300"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 2 && (
                <span className="px-1.5 py-0.5 text-xs text-gray-400">
                  +{project.technologies.length - 2}
                </span>
              )}
            </div>
          </motion.div>

          {/* Action Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="flex gap-1"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-purple-300 hover:border-purple-400/50 hover:bg-purple-500/20 transition-all duration-300 text-xs"
              >
                <Github className="w-3 h-3 mr-1.5" />
                <span>Code</span>
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/20 transition-all duration-300 text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1.5" />
                <span>Demo</span>
              </a>
            )}
          </motion.div>

          {/* Type Indicator */}
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-400"></div>
        </motion.div>
      ))}
      </div>
    </div>

    
  </motion.div>
)
}

// Skills Component
const SkillsContent = ({ data }: { data: PortfolioData }) => {
  // Categorize skills based on common patterns
  const categorizeSkills = (skills: string[]) => {
    const programmingLangs = ['python', 'javascript', 'typescript', 'java', 'c++', 'c#', 'c', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'dart', 'scala', 'r', 'matlab', 'sql', 'html', 'css']
    const frameworks = ['react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'laravel', 'rails', 'flutter', 'react native', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy']
    const cloudDevOps = ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'ci/cd', 'terraform', 'ansible', 'nginx', 'apache']
    const security = ['cybersecurity', 'ethical hacking', 'penetration testing', 'owasp', 'kali linux', 'metasploit', 'wireshark', 'burp suite', 'nmap', 'security']

    const categories = {
      "Programming Languages": skills.filter(skill => 
        programmingLangs.some(lang => skill.toLowerCase().includes(lang))
      ),
      "Frameworks & Libraries": skills.filter(skill => 
        frameworks.some(fw => skill.toLowerCase().includes(fw))
      ),
      "Cloud & DevOps": skills.filter(skill => 
        cloudDevOps.some(cloud => skill.toLowerCase().includes(cloud))
      ),
      "Security & Testing": skills.filter(skill => 
        security.some(sec => skill.toLowerCase().includes(sec))
      ),
      "Other Skills": skills.filter(skill => {
        const lowerSkill = skill.toLowerCase()
        return !programmingLangs.some(lang => lowerSkill.includes(lang)) &&
               !frameworks.some(fw => lowerSkill.includes(fw)) &&
               !cloudDevOps.some(cloud => lowerSkill.includes(cloud)) &&
               !security.some(sec => lowerSkill.includes(sec))
      })
    }

    return Object.entries(categories)
      .filter(([, skills]) => skills.length > 0)
      .map(([title, skills], index) => ({
        title,
        skills,
        color: ["blue", "purple", "cyan", "green", "orange"][index % 5],
        icon: ["💻", "🚀", "☁️", "🔒", "⚡"][index % 5]
      }))
  }

  const skillCategories = data.skills.length > 0 
    ? categorizeSkills(data.skills)
    : []

  if (skillCategories.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full px-6 text-center"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200/50 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Skills Coming Soon!</h3>
          <p className="text-gray-600 text-lg">
            Technical skills and expertise will be showcased here once available. Stay tuned!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-6"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Technical Skills & Expertise
      </motion.h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="relative group"
          >
            <div className={`relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-6 border transition-all duration-300 hover:scale-105 min-h-[260px] ${
              category.color === 'blue' ? 'border-blue-500/30 hover:border-blue-400/50' :
              category.color === 'purple' ? 'border-purple-500/30 hover:border-purple-400/50' :
              category.color === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-400/50' :
              category.color === 'green' ? 'border-green-500/30 hover:border-green-400/50' :
              'border-orange-500/30 hover:border-orange-400/50'
            }`}>
              {/* Header */}
              <div className="flex items-center mb-4">
                <span className="text-lg mr-2">{category.icon}</span>
                <h3 className={`text-sm font-bold ${
                  category.color === 'blue' ? 'text-blue-400' :
                  category.color === 'purple' ? 'text-purple-400' :
                  category.color === 'cyan' ? 'text-cyan-400' :
                  category.color === 'green' ? 'text-green-400' :
                  'text-orange-400'
                }`}>
                  {category.title}
                </h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-2">
                {category.skills.slice(0, 8).map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className={`text-sm px-3 py-2 rounded-lg border transition-all hover:scale-105 ${
                      category.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' :
                      category.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' :
                      category.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300' :
                      category.color === 'green' ? 'bg-green-500/10 border-green-500/20 text-green-300' :
                      'bg-orange-500/10 border-orange-500/20 text-orange-300'
                    }`}
                  >
                    {skill}
                  </motion.div>
                ))}
                {category.skills.length > 8 && (
                  <div className="text-sm text-gray-400 font-medium">
                    +{category.skills.length - 8} more
                  </div>
                )}
              </div>
              
              {/* Category Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (categoryIndex * 0.2) + 0.8 }}
                className="mt-6 pt-4 border-t border-gray-700/50"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{category.skills.length} Skills</span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    category.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                    category.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                    category.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    Advanced
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Experience Component  
const ExperienceContent = ({ data }: { data: PortfolioData }) => {
  const allItems = [
    ...data.experience.map(exp => ({ ...exp, type: 'experience' as const, uniqueKey: `exp-${exp.id}` })),
    ...data.education.map(edu => ({ ...edu, type: 'education' as const, uniqueKey: `edu-${edu.id}` }))
  ].sort((a, b) => {
    // Sort by year (newest first) - extracting year from duration
    const yearA = parseInt(a.duration.split(' - ')[0]) || 0
    const yearB = parseInt(b.duration.split(' - ')[0]) || 0
    return yearB - yearA
  })

  if (allItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full px-6 py-8 text-center"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200/50 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Journey Coming Soon!</h3>
          <p className="text-gray-600 text-lg">
            Experience and education details will be showcased here once available. Stay tuned!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-6 py-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Professional Journey
      </motion.h2>
      
      {/* Simple Timeline Grid */}
      <div className="max-w-6xl mx-auto">
        {/* Horizontal Line */}
        <div className="relative mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto"
          />
        </div>

        {/* Timeline Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allItems.map((item, index) => (
            <motion.div
              key={item.uniqueKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 border transition-all duration-300 hover:scale-105 min-h-[200px] ${
                item.type === 'experience'
                  ? 'border-blue-500/30 hover:border-blue-400/50'
                  : 'border-purple-500/30 hover:border-purple-400/50'
              }`}>
                {/* Date Badge */}
                <div className={`inline-block px-3 py-2 rounded-full text-sm font-medium mb-4 ${
                  item.type === 'experience'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {item.duration}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">
                    {'position' in item ? item.position : item.degree}
                  </h3>
                  <p className={`font-medium text-sm ${
                    item.type === 'experience' ? 'text-blue-400' : 'text-purple-400'
                  }`}>
                    {'company' in item ? item.company : item.institution}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Type Indicator */}
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                  item.type === 'experience' ? 'bg-blue-400' : 'bg-purple-400'
                }`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: allItems.length * 0.4 + 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-cyan-500/30">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-medium text-lg">Currently building the future</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Contact Component
const ContactContent = ({ data }: { data: PortfolioData }) => {
  const contactMethods = [
    ...(data.contact.email ? [{
      icon: Mail,
      label: "Email",
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
      color: "blue",
      description: "Drop me a line anytime",
      gradient: "from-blue-500 to-blue-600"
    }] : []),
    ...(data.contact.github ? [{
      icon: Github,
      label: "GitHub",
      value: data.contact.github.includes('@') ? data.contact.github : `@${data.contact.github}`,
      href: data.contact.github.startsWith('http') ? data.contact.github : `https://github.com/${data.contact.github.replace('@', '')}`,
      color: "purple",
      description: "Check out my repositories",
      gradient: "from-purple-500 to-purple-600"
    }] : []),
    ...(data.contact.linkedin ? [{
      icon: Phone,
      label: "LinkedIn",
      value: "Connect with me",
      href: data.contact.linkedin.startsWith('http') ? data.contact.linkedin : `https://linkedin.com/in/${data.contact.linkedin}`,
      color: "cyan",
      description: "Professional networking",
      gradient: "from-cyan-500 to-cyan-600"
    }] : []),
    ...(data.contact.phone ? [{
      icon: Phone,
      label: "Phone",
      value: data.contact.phone,
      href: `tel:${data.contact.phone}`,
      color: "green",
      description: "Give me a call",
      gradient: "from-green-500 to-green-600"
    }] : []),
    ...(data.contact.website ? [{
      icon: ExternalLink,
      label: "Website",
      value: "Visit my website",
      href: data.contact.website.startsWith('http') ? data.contact.website : `https://${data.contact.website}`,
      color: "orange",
      description: "Explore my online presence",
      gradient: "from-orange-500 to-orange-600"
    }] : [])
  ]

  if (contactMethods.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full px-6 py-8 text-center"
      >
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200/50 max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information Coming Soon!</h3>
          <p className="text-gray-600 text-lg">
            Contact details will be available here once provided. Stay tuned for updates!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full px-4 sm:px-6 py-6 sm:py-8 pb-24 sm:pb-8 min-h-[85vh] flex flex-col justify-center"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Let&apos;s Connect & Build Together
        </motion.h2>
        
        <div className="text-center mb-8 sm:mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Ready to transform your vision into reality? Whether it&apos;s a cutting-edge web application, 
            AI-powered solution, or cybersecurity project, I&apos;m here to bring innovation to life. 
            Let&apos;s collaborate and create something extraordinary together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 mb-8 sm:mb-10"
          >
            <span className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-full border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Available for projects
            </span>
            <span className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Open to collaborations
            </span>
            <span className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Quick to respond
            </span>
          </motion.div>
        </div>
        
        {/* Contact Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className={`relative bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border transition-all duration-300 hover:scale-105 min-h-[160px] sm:min-h-[180px] flex flex-col items-center justify-center text-center ${
                  method.color === 'blue' ? 'border-blue-500/30 hover:border-blue-400/50 hover:shadow-blue-500/20' :
                  method.color === 'purple' ? 'border-purple-500/30 hover:border-purple-400/50 hover:shadow-purple-500/20' :
                  method.color === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-cyan-500/20' :
                  method.color === 'green' ? 'border-green-500/30 hover:border-green-400/50 hover:shadow-green-500/20' :
                  'border-orange-500/30 hover:border-orange-400/50 hover:shadow-orange-500/20'
                } hover:shadow-2xl`}>
                  
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    method.color === 'blue' ? 'bg-blue-500' :
                    method.color === 'purple' ? 'bg-purple-500' :
                    method.color === 'cyan' ? 'bg-cyan-500' :
                    method.color === 'green' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    method.color === 'blue' ? 'bg-blue-500/10 group-hover:bg-blue-500/20' :
                    method.color === 'purple' ? 'bg-purple-500/10 group-hover:bg-purple-500/20' :
                    method.color === 'cyan' ? 'bg-cyan-500/10 group-hover:bg-cyan-500/20' :
                    method.color === 'green' ? 'bg-green-500/10 group-hover:bg-green-500/20' :
                    'bg-orange-500/10 group-hover:bg-orange-500/20'
                  }`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                      method.color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' :
                      method.color === 'purple' ? 'text-purple-400 group-hover:text-purple-300' :
                      method.color === 'cyan' ? 'text-cyan-400 group-hover:text-cyan-300' :
                      method.color === 'green' ? 'text-green-400 group-hover:text-green-300' :
                      'text-orange-400 group-hover:text-orange-300'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <h4 className="font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-white transition-colors">
                    {method.label}
                  </h4>
                  <p className={`text-sm sm:text-base transition-colors duration-300 ${
                    method.color === 'blue' ? 'text-blue-300/80 group-hover:text-blue-200' :
                    method.color === 'purple' ? 'text-purple-300/80 group-hover:text-purple-200' :
                    method.color === 'cyan' ? 'text-cyan-300/80 group-hover:text-cyan-200' :
                    method.color === 'green' ? 'text-green-300/80 group-hover:text-green-200' :
                    'text-orange-300/80 group-hover:text-orange-200'
                  }`}>
                    {method.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function ChatUI({ data }: ChatUIProps) {
  const params = useParams()
  const username = params?.username as string
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = useState("")
  const [showAIResponse, setShowAIResponse] = useState(false)

  const handleAIQuery = (query: string) => {
    setCurrentQuery(query)
    setShowAIResponse(true)
    setActiveTab(null) // Close any open tab when showing AI response
  }

  const closeAIResponse = () => {
    setShowAIResponse(false)
    setCurrentQuery("")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Me":
        return <AboutMeContent data={data} username={username} />
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
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Scale container - increase everything by 10% (origin-top) but exclude footer */}
        <div className="transform scale-110 origin-top w-full">
        
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-2 pb-24 sm:pb-28 md:pb-32">
        {/* Header Section - Only show when no tab is active */}
        {!activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-12 sm:py-16"
          >
            <div className="text-center w-full">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6 drop-shadow-lg"
              >
                Hey Guys, I&apos;m <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">{data.name}</span>
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 relative"
              >
                {!username ? (
                  <>
                    <span className="text-white drop-shadow-2xl">I am </span>
                    <span className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                      Hackydaddy
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 animate-pulse" />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white drop-shadow-2xl">Welcome to </span>
                    <span className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                      My Portfolio
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 animate-pulse" />
                    </span>
                  </>
                )}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-gray-300 mb-6 sm:mb-8"
              >
                <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
                <span className="text-xs sm:text-sm uppercase tracking-widest font-medium px-2">Portfolio 2025</span>
                <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
              </motion.div>
            </div>
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-8 sm:mb-10"
            >
              <Image
                src="/profile.png"
                alt={data.name}
                width={200}
                height={200}
                className="w-full h-full object-cover object-center rounded-full"
              />
            </motion.div>

            {/* AI Input */}
            <div className="w-full max-w-3xl mx-auto mb-2 px-2">
              <AIInput 
                onSubmit={handleAIQuery}
                placeholder="Ask me about my skills, projects, or experience..."
              />
            </div>
          </motion.div>
        )}

        {/* Dynamic Content Area */}
        <div className="w-full mb-8 min-h-[40px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>

        {/* AI Response Modal */}
        <AnimatePresence>
          {showAIResponse && currentQuery && (
            <AIResponseContainer
              data={data}
              query={currentQuery}
              onClose={closeAIResponse}
              onNewQuery={handleAIQuery}
            />
          )}
        </AnimatePresence>

        </div>
        </div>

        {/* Navigation Buttons - Always visible and sticky at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          // outer fixed container is transparent so footer blends with page and buttons appear floating
          className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center pointer-events-auto">
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-3xl shadow-xl px-3 py-2 border border-gray-700/40">
              <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-4">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <GlassButton
                  variant={item.variant as "primary" | "secondary" | "success" | "warning" | "danger"}
                  size="md"
                  isActive={isActive}
                  onClick={() => setActiveTab(activeTab === item.name ? null : item.name)}
                  className="group relative"
                >
                  <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3">
                    <Icon size={16} className="sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                    <span className="text-sm sm:text-base font-medium">
                      {item.name}
                    </span>
                  </div>
                </GlassButton>
              </motion.div>
            )
          })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}