'use client'

import { Mail, Phone, MapPin, ExternalLink, Github, Calendar, GraduationCap, Briefcase, Star, Sparkles, Award, Code } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'

interface StaticScrollProps {
  data: PortfolioData
}

export default function StaticScroll({ data }: StaticScrollProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900">
      {/* Header with enhanced design */}
      <header className="relative bg-white border-b border-gray-200 shadow-sm overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                {data.name}
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2" />
            </div>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
            {data.bio}
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            {data.contact.email && (
              <a 
                href={`mailto:${data.contact.email}`} 
                className="flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 hover:scale-105 border border-blue-200"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">{data.contact.email}</span>
              </a>
            )}
            {data.contact.phone && (
              <div className="flex items-center gap-3 px-4 py-3 bg-green-50 rounded-xl border border-green-200">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">{data.contact.phone}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 rounded-xl border border-orange-200">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">{data.contact.location}</span>
              </div>
            )}
            {data.contact.github && (
              <a 
                href={data.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Github className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-700">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Skills Section with enhanced design */}
        <section className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Skills & Technologies</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills.map((skill, index) => (
              <div
                key={skill}
                className="group relative px-6 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {skill}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section with enhanced design */}
        {data.experience.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Professional Experience</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mt-1" />
              </div>
            </div>
            
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="group relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-green-200 to-transparent group-last:hidden" />
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    {/* Content card */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                          <p className="text-lg font-semibold text-green-600">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg mt-2 md:mt-0 w-fit">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-700">{exp.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section with enhanced design */}
        {data.projects.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-1" />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project, index) => (
                <div 
                  key={project.id} 
                  className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Project header with gradient */}
                  <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-t-lg mb-6 -mx-6 -mt-6" />
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 hover:scale-105 transition-transform duration-300"
                        style={{ animationDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 hover:scale-105 font-medium border border-gray-200"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section with enhanced design */}
        {data.education.length > 0 && (
          <section className="relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Education</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-1" />
              </div>
            </div>
            
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={edu.id} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{edu.degree}</h3>
                      <p className="text-lg font-semibold text-orange-600">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-lg mt-2 md:mt-0 w-fit">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-700">{edu.duration}</span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section with enhanced design */}
        <section className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 -mx-6 px-6 py-16 rounded-3xl border border-blue-100">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Interested in working together? I'd love to hear from you. Let's discuss your next project and bring your ideas to life.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              {data.contact.email && (
                <a
                  href={`mailto:${data.contact.email}`}
                  className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Send Email</span>
                </a>
              )}
              {data.contact.linkedin && (
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-800 hover:to-blue-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
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
                  className="group flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200"
                >
                  <Github className="w-5 h-5 group-hover:animate-bounce" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold">{data.name}</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 {data.name}. Crafted with passion using Next.js and deployed on Vercel.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              {data.contact.github && (
                <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.contact.linkedin && (
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {data.contact.email && (
                <a href={`mailto:${data.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}