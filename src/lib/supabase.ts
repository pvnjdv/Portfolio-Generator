import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }

  return supabaseClient
}

export const supabase = getSupabaseClient()

// Types for our database
export interface Portfolio {
  id: string
  username: string
  template: '1' | '2' | '3'
  resumeUrl?: string
  data: PortfolioData
  created_at: string
  updated_at: string
}

export interface PortfolioData {
  name: string
  bio: string
  skills: string[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  contact: Contact
  theme?: {
    primaryColor?: string
    secondaryColor?: string
  }
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  projectUrl?: string
  githubUrl?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  duration: string
  description?: string
}

export interface Contact {
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  website?: string
  location?: string
}