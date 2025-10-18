'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, Mail, Phone, MapPin, Calendar, Code, Briefcase, Sparkles } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'

interface AnimatedScrollProps {
  data: PortfolioData
}

export default function AnimatedScroll({ data }: AnimatedScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} className="bg-black text-white relative">
      {/* Hero Section */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 max-w-5xl mx-auto px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
            className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-8"
          >
            {data.name}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            {data.bio}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg"
          >
            <span className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Explore My Work
            </span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {data.bio}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-400">Skills & Technologies</h3>
              <div className="grid grid-cols-1 gap-3">
                {data.skills.length > 0 ? (
                  data.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                      <span className="text-gray-300 font-medium">{skill}</span>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-400">Technical skills will be showcased here soon!</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20"
            >
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Get In Touch</h3>
              <div className="space-y-4">
                {data.contact?.email && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">{data.contact.email}</span>
                  </div>
                )}
                {data.contact?.phone && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">{data.contact.phone}</span>
                  </div>
                )}
                {data.contact?.location && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">{data.contact.location}</span>
                  </div>
                )}
                {!data.contact?.email && !data.contact?.phone && !data.contact?.location && (
                  <div className="text-center py-4">
                    <p className="text-gray-400">Contact information will be available soon!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section className="py-20 px-6 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.length > 0 ? (
              data.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50"
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <Code className="w-16 h-16 text-blue-400" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-700/50"
                >
                  <Code className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Projects Coming Soon</h3>
                  <p className="text-gray-400 text-lg">
                    Exciting projects are in development and will be showcased here soon!
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </motion.div>

          <div className="space-y-8">
            {data.experience.length > 0 ? (
              data.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col items-center gap-8`}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 bg-gradient-to-br from-orange-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20">
                    <h3 className="text-2xl font-bold mb-2 text-orange-400">{exp.position}</h3>
                    <p className="text-xl text-pink-300 mb-3">{exp.company}</p>
                    <div className="flex items-center text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-orange-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-12 border border-orange-500/20"
                >
                  <Briefcase className="w-20 h-20 text-orange-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-orange-400 mb-4">Experience Journey Begins</h3>
                  <p className="text-gray-300 text-lg">
                    Professional experience and achievements will be highlighted here as the journey unfolds.
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section className="py-20 px-6 bg-gradient-to-br from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s create something amazing together.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {data.contact?.email && (
                <motion.a
                  href={`mailto:${data.contact.email}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg"
                >
                  <Mail className="w-6 h-6" />
                  <span>Send Email</span>
                </motion.a>
              )}

              {data.contact?.phone && (
                <motion.a
                  href={`tel:${data.contact.phone}`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl font-semibold text-lg"
                >
                  <Phone className="w-6 h-6" />
                  <span>Call Now</span>
                </motion.a>
              )}

              {!data.contact?.email && !data.contact?.phone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl font-semibold text-lg cursor-default"
                >
                  <Mail className="w-6 h-6" />
                  <span>Contact Info Coming Soon</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
