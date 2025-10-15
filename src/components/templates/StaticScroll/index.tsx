'use client'

import { Mail, Phone, MapPin, ExternalLink, Github, Calendar, GraduationCap, Briefcase } from 'lucide-react'
import { PortfolioData } from '@/lib/supabase'

interface StaticScrollProps {
  data: PortfolioData
}

export default function StaticScroll({ data }: StaticScrollProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.name}</h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">{data.bio}</p>
          
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            {data.contact.email && (
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <Mail className="w-4 h-4" />
                {data.contact.email}
              </a>
            )}
            {data.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {data.contact.phone}
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {data.contact.location}
              </div>
            )}
            {data.contact.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-sm" />
            </div>
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.skills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-gray-100 rounded-lg text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-green-600" />
              </div>
              Professional Experience
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-gray-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-600 rounded-sm transform rotate-45" />
              </div>
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
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
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm font-medium">Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-orange-600" />
              </div>
              Education
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-gray-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-lg text-orange-600 font-medium">{edu.institution}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="bg-gray-50 -mx-6 px-6 py-12 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get In Touch</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Interested in working together? I&apos;d love to hear from you. Let&apos;s discuss your next project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {data.contact.email && (
              <a
                href={`mailto:${data.contact.email}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            )}
            {data.contact.linkedin && (
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {data.contact.github && (
              <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 {data.name}. Built with Next.js and deployed on Vercel.
          </p>
        </div>
      </footer>
    </div>
  )
}