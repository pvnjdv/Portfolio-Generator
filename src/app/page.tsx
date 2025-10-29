'use client'

import { useState } from 'react'
import ChatUI from '@/components/templates/ChatUI'
import AnimatedScroll from '@/components/templates/AnimatedScroll'
import StaticScroll from '@/components/templates/StaticScroll'
import Fab from '@/components/Fab'
import CreateForm from '@/components/CreateForm'
import { PortfolioData } from '@/lib/supabase'

// Your personal portfolio data
const personalPortfolioData: PortfolioData = {
  name: "Pavan Jadhav", // Your actual name
  bio: "AI & Cybersecurity enthusiast with 2+ years of experience across full-stack development and secure systems. Founder of Cybershield, leading peer engagement and cybersecurity initiatives at AISSMS IOIT. Skilled in Python, Flutter, Machine Learning, Docker, and CI/CD pipeline development. Driven to solve real-world problems by integrating AI, automation, and secure cloud practices.",
  skills: [
    "Python", "C", "C++", "SQL", "Dart (Flutter)", "JavaScript", 
    "React", "TensorFlow", "Scikit-learn", "Docker", "AWS", 
    "Ethical Hacking", "Kali Linux", "OWASP", "Machine Learning",
    "Data Analysis", "NLP", "Penetration Testing", "Git & GitHub"
  ],
  projects: [
    {
      id: "1",
      title: "Buddy",
      description: "Buddy is a cross-platform, AI-powered productivity suite for developers and teams. It acts as a GitHub Copilot alternative, offering project management, code assistance, remote device access, and seamless integration across desktop, mobile, and web.",
      technologies: ["Python", "FastAPI", "Typescript", "Bootstrap", "Flutter"],
      githubUrl: "https://github.com/pvnjdv/Buddy"
    },
    {
      id: "2",
      title: "Cybershield Club Platform",
      description: "Founded and developed a comprehensive cybersecurity learning platform for students at AISSMS IOIT, increasing engagement by 100% through interactive workshops and collaborative learning.",
      technologies: ["Python", "Flask", "JavaScript", "Bootstrap", "MySQL"],
    },
    {
      id: "3",
      title: "AI-Powered Portfolio Generator",
      description: "An AI-powered portfolio platform showcasing Pavan Jadhav's professional work with 3 switchable templates, plus the ability for others to create their own dynamic portfolios instantly using AI resume parsing.",
      technologies: ["React", "Next.js", "Typescript", "Grok-API", "Supabase"],
      projectUrl: "https://portfolio.hackydaddy.xyz/",
      githubUrl: "https://github.com/pvnjdv/Portfolio-Generator" 
    },
    {
      id: "4",
      title: "Penetration Testing Toolkit",
      description: "Comprehensive cybersecurity toolkit for vulnerability assessment and penetration testing. Includes automated scanning, reporting, and security protocol implementation.",
      technologies: ["Python", "Kali Linux", "Bash", "SQL", "Docker"],
    },
    {
      id: "5",
      title: "Data Science Analytics Dashboard",
      description: "Interactive dashboard for complex data analysis and visualization. Built predictive models and provided actionable insights from large datasets during internship at CodeClause.",
      technologies: ["Python", "Pandas", "Matplotlib", "Tableau", "PowerBI", "Jupyter"],
    }
  ],
  experience: [
    {
      id: "1",
      company: "Kootumb Multimedia Pvt Ltd",
      position: "Full Stack Developer",
      duration: "Jun 2025 - Present",
      description: "Working on development of multimedia platform with focus on UI improvements. Adding AI features like AI quick call/message response system. Contributing to both frontend and backend development using modern technologies."
    },
    {
      id: "2",
      company: "Cybershield, AISSMS IOIT",
      position: "Executive Chairperson",
      duration: "Sept 2025 - Present",
      description: "Leading the cybersecurity club, organizing workshops, and fostering a collaborative learning environment. Managing team operations and strategic planning for cybersecurity initiatives."
    },
    {
      id: "3",
      company: "Cybershield, AISSMS IOIT",
      position: "CEO & Founder",
      duration: "Aug 2024 - Sept 2025 ",
      description: "Founded a student cybersecurity club, increasing productivity and engagement by 100%. Led workshops and fostered a collaborative learning environment. Managed team operations and strategic planning for cybersecurity initiatives."
    },
    {
      id: "4",
      company: "CodeClause Pvt Ltd",
      position: "Data Science Intern",
      duration: "Jan 2024 - Mar 2024",
      description: "Developed predictive models and derived actionable insights from complex datasets. Collaborated with cross-functional teams on data-driven decision-making. Worked with Python, machine learning algorithms, and data visualization tools."
    },
    {
      id: "5",
      company: "Codesoft",
      position: "Python Programming Intern",
      duration: "Nov 2023 - Dec 2023",
      description: "Built and optimized Python-based applications ensuring clean and efficient code. Participated in debugging, performance tuning, and peer code reviews. Gained experience in software development best practices."
    },
    {
      id: "6",
      company: "Technohacks Edutech Pvt Ltd",
      position: "Cybersecurity Intern",
      duration: "Oct 2023 - Nov 2023",
      description: "Conducted security audits and vulnerability assessments to identify risks. Assisted in implementing updated security protocols. Gained hands-on experience with penetration testing and ethical hacking tools."
    }
  ],
  education: [
    {
      id: "1",
      institution: "AISSMS Institute of Information Technology, Pune",
      degree: "B.Tech in Artificial Intelligence and Data Science",
      duration: "Pursuing (Current CGPA: 8.4)",
      description: "Specialized coursework in AI, Machine Learning, Data Science, and Cybersecurity. Active in student organizations and technical clubs."
    },
    {
      id: "2",
      institution: "Jawahar Navodaya Vidyalaya, Dhule",
      degree: "Higher Secondary Certificate (HSC)",
      duration: "Completed",
      description: "Science stream with focus on Mathematics, Physics, and Chemistry. Participated in various academic competitions and extracurricular activities."
    },
    {
      id: "3",
      institution: "Jawahar Navodaya Vidyalaya, Dhule",
      degree: "Secondary School Certificate (SSC)",
      duration: "Completed",
      description: "Strong foundation in core subjects with excellent academic performance. Active participation in science fairs and technical exhibitions."
    }
  ],
  contact: {
    email: "admin@hackydaddy.xyz", // Update with your actual email
    phone: "+91 9579348057", // Update with your actual phone
    linkedin: "https://linkedin.com/hackydaddy", // Update if different
    github: "https://github.com/pvnjdv", // Your GitHub is correct
    website: "https://HackyDaddy.xyz", // Update with your actual domain
    location: "Pune, Maharashtra, India"
  }
}

export default function Home() {
  const [currentTemplate, setCurrentTemplate] = useState<'1' | '2' | '3'>('1')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleTemplateSwitch = () => {
    setCurrentTemplate(prev => {
      switch (prev) {
        case '1': return '2'
        case '2': return '3'
        case '3': return '1'
        default: return '1'
      }
    })
  }

  const handleCreatePortfolio = () => {
    setShowCreateForm(true)
  }

  const renderTemplate = () => {
    switch (currentTemplate) {
      case '1':
        return <ChatUI data={personalPortfolioData} />
      case '2':
        return <AnimatedScroll data={personalPortfolioData} />
      case '3':
        return <StaticScroll data={personalPortfolioData} />
      default:
        return <ChatUI data={personalPortfolioData} />
    }
  }

  return (
    <main className="relative">
      {renderTemplate()}
      
      <Fab 
        onTemplateSwitch={handleTemplateSwitch}
        onCreatePortfolio={handleCreatePortfolio}
      />
      
      <CreateForm 
        isOpen={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </main>
  )
}