'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, Code, Briefcase, Mail, Star, Github, ExternalLink, MapPin, Phone } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'
import { AIInput } from '@/components/ui/AIInput'
import { GlassButton } from '@/components/ui/button'
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
const AboutMeContent = ({ data }: { data: PortfolioData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="w-full px-6 flex items-center justify-center min-h-[60vh]"
  >
    <div className="relative max-w-4xl mx-auto">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-3xl blur-2xl"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl blur-3xl opacity-30"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Profile Image Section */}
          <div className="lg:col-span-1 flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-48 h-48 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full flex items-center justify-center border-2 border-white/10 backdrop-blur-sm overflow-hidden">
                <Image
                  src="/profile.png"
                  alt={data.name}
                  width={180}
                  height={180}
                  className="rounded-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-4 w-full"
            >
              <div className="text-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="text-xl font-bold text-blue-400">{data.projects.length}+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="text-xl font-bold text-purple-400">{data.skills.length}+</div>
                <div className="text-xs text-gray-400">Skills</div>
              </div>
            </motion.div>
          </div>
          
          {/* Content Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-200 leading-relaxed text-lg mb-6">
                {data.bio}
              </p>
            </motion.div>
            
            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 gap-4"
            >
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-colors group">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-medium">Location</div>
                    <div className="text-gray-300 text-sm">Based in India</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-medium">Role</div>
                    <div className="text-gray-300 text-sm">Full Stack Developer</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-medium">Specialization</div>
                    <div className="text-gray-300 text-sm">AI & Cybersecurity</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-colors group">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-white font-medium">Experience</div>
                    <div className="text-gray-300 text-sm">2+ Years</div>
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
        className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Featured Projects & Innovation
      </motion.h2>
    
    <div className="grid lg:grid-cols-2 gap-8">
      {data.projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: index * 0.2,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="group relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 group-hover:border-gray-600/80 transition-all duration-500 group-hover:scale-105">
            {/* Project Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2"
                >
                  {project.title}
                </motion.h3>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: index * 0.2 + 0.4, duration: 0.8 }}
                  className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mb-4"
                />
              </div>
              
              {/* Project Number */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
              >
                <span className="text-blue-400 font-bold text-sm">0{index + 1}</span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="text-gray-300 leading-relaxed mb-6 text-base"
            >
              {project.description}
            </motion.p>

            {/* Technologies */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="mb-6"
            >
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.6 + i * 0.05 }}
                    className="group/tech px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg text-xs font-medium text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/20 transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Action Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.7 }}
              className="flex gap-4"
            >
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 hover:border-purple-400/50 hover:bg-purple-500/20 transition-all duration-300"
                >
                  <Github className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                  <span className="text-sm font-medium">View Code</span>
                </a>
              )}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/20 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/link:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>
              )}
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.8 }}
              className="absolute top-6 right-6 flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Active</span>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Additional Projects CTA */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: data.projects.length * 0.2 + 0.5 }}
      className="text-center mt-16"
    >
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <h4 className="text-xl font-semibold text-white mb-3">More Projects Coming Soon</h4>
        <p className="text-gray-300 mb-4">
          I&apos;m constantly working on new projects and expanding my portfolio. Check back regularly for updates!
        </p>
        <div className="flex justify-center items-center space-x-2">
          <Github className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400">Follow my GitHub for the latest updates</span>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}

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
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="relative group"
          >
            <div className={`relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${
              category.color === 'blue' ? 'border-blue-500/30 hover:border-blue-400/50' :
              category.color === 'purple' ? 'border-purple-500/30 hover:border-purple-400/50' :
              category.color === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-400/50' :
              category.color === 'green' ? 'border-green-500/30 hover:border-green-400/50' :
              'border-orange-500/30 hover:border-orange-400/50'
            }`}>
              {/* Header */}
              <div className="flex items-center mb-3">
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
                {category.skills.slice(0, 6).map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
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
                {category.skills.length > 6 && (
                  <div className="text-xs text-gray-400 font-medium">
                    +{category.skills.length - 6} more
                  </div>
                )}
              </div>
              
              {/* Category Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (categoryIndex * 0.2) + 0.8 }}
                className="mt-4 pt-4 border-t border-gray-700/50"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{category.skills.length} Skills</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
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
      
      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h4 className="text-lg font-semibold text-gray-300 mb-4">Always Learning & Growing</h4>
          <p className="text-gray-400 text-sm">
            Continuously expanding my skill set with emerging technologies and industry best practices.
            Currently exploring advanced AI/ML techniques and modern cybersecurity frameworks.
          </p>
        </div>
      </motion.div>
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
        className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
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
              <div className={`relative bg-gray-900/90 backdrop-blur-xl rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${
                item.type === 'experience'
                  ? 'border-blue-500/30 hover:border-blue-400/50'
                  : 'border-purple-500/30 hover:border-purple-400/50'
              }`}>
                {/* Date Badge */}
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                  item.type === 'experience'
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {item.duration}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white">
                    {'position' in item ? item.position : item.degree}
                  </h3>
                  <p className={`font-medium text-xs ${
                    item.type === 'experience' ? 'text-blue-400' : 'text-purple-400'
                  }`}>
                    {'company' in item ? item.company : item.institution}
                  </p>
                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Type Indicator */}
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
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
          className="text-center mt-8"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-cyan-500/30">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-medium">Currently building the future</span>
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
      className="w-full px-6 py-8"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
      >
        Let&apos;s Build Something Amazing Together
      </motion.h2>
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg mb-8"
        >
          Ready to collaborate? Let&apos;s connect and build something amazing together!
        </motion.p>
        
        {/* Contact Tiles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className={`relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border transition-all duration-300 hover:scale-105 ${
                  method.color === 'blue' ? 'border-blue-500/30 hover:border-blue-400/50' :
                  method.color === 'purple' ? 'border-purple-500/30 hover:border-purple-400/50' :
                  'border-cyan-500/30 hover:border-cyan-400/50'
                }`}>
                  {/* Icon */}
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${
                    method.color === 'blue' ? 'bg-blue-500/10' :
                    method.color === 'purple' ? 'bg-purple-500/10' :
                    'bg-cyan-500/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      method.color === 'blue' ? 'text-blue-400' :
                      method.color === 'purple' ? 'text-purple-400' :
                      'text-cyan-400'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {method.label}
                  </h4>
                  <p className={`text-xs ${
                    method.color === 'blue' ? 'text-blue-300' :
                    method.color === 'purple' ? 'text-purple-300' :
                    'text-cyan-300'
                  }`}>
                    Connect
                  </p>
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
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [currentQuery, setCurrentQuery] = useState("")
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const generateSearchResult = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('yourself') || lowerQuery.includes('about') || lowerQuery.includes('who')) {
      return `## About ${data.name}\n\n${data.bio}\n\n**Current Focus:** AI & Cybersecurity enthusiast building innovative solutions through modern web technologies and secure systems.`
    }
    
    if (lowerQuery.includes('skill')) {
      return `## Skills & Technologies\n\n**Programming Languages:** ${data.skills.slice(0, 6).join(', ')}\n\n**Frameworks & Tools:** ${data.skills.slice(6).join(', ')}\n\n**Specializations:** Full-stack development, Machine Learning, Cybersecurity, Cloud Computing`
    }
    
    if (lowerQuery.includes('project')) {
      if (data.projects.length > 0) {
        return `## Featured Projects\n\n${data.projects.map((project, index) => 
          `**${index + 1}. ${project.title}**\n${project.description}\n\n🛠️ *Technologies:* ${project.technologies.join(', ')}\n🔗 [View Project](${project.projectUrl}) | 📁 [Source Code](${project.githubUrl})`
        ).join('\n\n---\n\n')}`
      }
      return "## Current Projects\n\nWorking on exciting full-stack applications that showcase modern web development practices and cybersecurity implementations."
    }
    
    if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
      if (data.experience.length > 0) {
        return `## Professional Experience\n\n${data.experience.map((exp, index) => 
          `**${index + 1}. ${exp.position}** • ${exp.company}\n📅 *${exp.duration}*\n\n${exp.description}`
        ).join('\n\n---\n\n')}`
      }
      return "## Professional Journey\n\nBuilding experience through innovative projects and collaborative development in modern tech stacks."
    }
    
    if (lowerQuery.includes('education') || lowerQuery.includes('study')) {
      if (data.education.length > 0) {
        return `## Educational Background\n\n${data.education.map((edu, index) => 
          `**${index + 1}. ${edu.degree}**\n🏫 ${edu.institution}\n📅 ${edu.duration}${edu.description ? `\n\n${edu.description}` : ''}`
        ).join('\n\n---\n\n')}`
      }
      return "## Learning Philosophy\n\nCommitted to continuous learning and staying current with emerging technologies and industry best practices."
    }
    
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('hire')) {
      return `## Get In Touch\n\nReady to collaborate on your next project or discuss opportunities.\n\n📧 **Email:** ${data.contact?.email || 'Available upon request'}\n💼 **LinkedIn:** ${data.contact?.linkedin || 'Connect with me'}\n🐙 **GitHub:** ${data.contact?.github || 'View my repositories'}\n\n💡 **Available for:** Full-time roles, freelance projects, consulting, and collaborative opportunities.`
    }

    // Default search suggestions
    return `## Search Suggestions\n\nTry asking about:\n\n🔍 **"Tell me about yourself"** - Learn about my background\n🔍 **"What are your skills?"** - View technical expertise\n🔍 **"Show me your projects"** - Explore my work\n🔍 **"Your work experience"** - Professional journey\n🔍 **"How can I contact you?"** - Get in touch\n\nType any question to learn more about my portfolio!`
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResult(null)
      setCurrentQuery("")
      return
    }

    setCurrentQuery(query)
    setIsSearching(true)
    setSearchResult(null)

    // Simulate search delay for better UX
    setTimeout(() => {
      setSearchResult(generateSearchResult(query))
      setIsSearching(false)
    }, 800 + Math.random() * 500)
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[10vh] px-4 pt-2">
        
        {/* Header Section - Only show when no tab is active */}
        {!activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-start w-full max-w-2xl mx-auto"
          >
            <div className="mt-6 text-center w-full">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl font-semibold text-white mb-4 drop-shadow-lg"
              >
                Hey Guys, I&apos;m <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">{data.name}</span>
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 relative"
              >
                <span className="text-white drop-shadow-2xl">I cooked </span>
                <span className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                  HackyDaddy
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 animate-pulse" />
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-gray-300 mb-8"
              >
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
                <span className="text-sm uppercase tracking-widest font-medium">Portfolio 2024</span>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
              </motion.div>
            </div>
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/profile.png"
                alt={data.name}
                width={200}
                height={200}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Dynamic Content Area */}
        <div className="w-full mb-8 min-h-[40px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>

        {/* Google-style Search Results */}
        {(currentQuery || searchResult || isSearching) && (
          <div className="w-full max-w-4xl mx-auto px-4 mb-8">
            {currentQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <p className="text-gray-400 text-sm mb-2">
                  Search results for: <span className="text-white font-medium">&quot;{currentQuery}&quot;</span>
                </p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
              </motion.div>
            )}
            
            {isSearching ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center py-12"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </motion.div>
            ) : searchResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="prose prose-invert max-w-none">
                  {searchResult.split('\n').map((line, index) => {
                    if (line.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-bold text-white mb-4 mt-6 first:mt-0">
                          {line.replace('## ', '')}
                        </h2>
                      )
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <h3 key={index} className="text-lg font-semibold text-blue-400 mb-2 mt-4">
                          {line.replace(/\*\*/g, '')}
                        </h3>
                      )
                    }
                    if (line.startsWith('🛠️') || line.startsWith('📅') || line.startsWith('🔗') || line.startsWith('📁') || line.startsWith('🏫') || line.startsWith('📧') || line.startsWith('💼') || line.startsWith('🐙') || line.startsWith('💡') || line.startsWith('🔍')) {
                      return (
                        <p key={index} className="text-gray-300 mb-2 text-sm italic">
                          {line}
                        </p>
                      )
                    }
                    if (line === '---') {
                      return (
                        <div key={index} className="border-t border-gray-600 my-4"></div>
                      )
                    }
                    if (line.trim()) {
                      return (
                        <p key={index} className="text-gray-200 mb-3 leading-relaxed">
                          {line}
                        </p>
                      )
                    }
                    return <br key={index} />
                  })}
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Google-style Search Input */}
        <div className="w-full max-w-2xl mx-auto mb-8 mt-2">
          <AIInput 
            onSubmit={handleSearch}
            placeholder={searchResult ? "Search for something else..." : "Ask me about my skills, projects, or experience..."}
          />
        </div>

        {/* Navigation Buttons Below Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center flex-wrap gap-3 mb-8"
        >
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
                  size="sm"
                  isActive={isActive}
                  onClick={() => setActiveTab(activeTab === item.name ? null : item.name)}
                  className="group relative"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="transition-transform group-hover:scale-110" />
                    <span className="text-sm font-medium">
                      {item.name}
                    </span>
                  </div>
                </GlassButton>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}