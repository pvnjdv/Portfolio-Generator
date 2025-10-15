# 🗄️ Supabase Database Setup for Pradyumna's Portfolio

## Your Supabase Configuration ✅
- **Project URL**: https://gzutvsrwizzfmtoshkpb.supabase.co
- **Status**: Keys configured ✅

## Required Database Setup

### 1. Create the Portfolios Table

Go to your Supabase dashboard → SQL Editor → New Query and run:

```sql
-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  template TEXT NOT NULL CHECK (template IN ('1', '2', '3')),
  resumeUrl TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_portfolios_username ON portfolios(username);

-- Enable Row Level Security
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
DROP POLICY IF EXISTS "Allow public read access" ON portfolios;
CREATE POLICY "Allow public read access" ON portfolios
  FOR SELECT TO PUBLIC USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON portfolios;
CREATE POLICY "Allow public insert" ON portfolios
  FOR INSERT TO PUBLIC WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_portfolios_updated_at ON portfolios;
CREATE TRIGGER update_portfolios_updated_at 
    BEFORE UPDATE ON portfolios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 2. Insert Your Personal Portfolio (Optional)

```sql
-- Insert Pradyumna's portfolio as the main demo
INSERT INTO portfolios (username, template, data) VALUES (
  'pradyumna',
  '1',
  '{
    "name": "Pradyumna Vaidya",
    "bio": "AI & Cybersecurity enthusiast with 2+ years of experience across full-stack development and secure systems. Founder of Cybershield, leading peer engagement and cybersecurity initiatives at AISSMS IOIT.",
    "skills": ["Python", "C", "C++", "SQL", "Dart (Flutter)", "JavaScript", "React", "TensorFlow", "Scikit-learn", "Docker", "AWS", "Ethical Hacking", "Kali Linux", "OWASP", "Machine Learning", "Data Analysis", "NLP", "Penetration Testing", "Git & GitHub"],
    "projects": [
      {
        "id": "1",
        "title": "Cybershield Club Platform",
        "description": "Founded and developed a comprehensive cybersecurity learning platform for students at AISSMS IOIT, increasing engagement by 100% through interactive workshops and collaborative learning.",
        "technologies": ["Python", "Flask", "JavaScript", "Bootstrap", "MySQL"]
      }
    ],
    "experience": [
      {
        "id": "1",
        "company": "Kootumb Multimedia Pvt Ltd",
        "position": "Full Stack Developer",
        "duration": "Jun 2025 - Present",
        "description": "Working on development of multimedia platform with focus on UI improvements. Adding AI features like AI quick call/message response system."
      }
    ],
    "education": [
      {
        "id": "1",
        "institution": "AISSMS Institute of Information Technology, Pune",
        "degree": "B.Tech in Artificial Intelligence and Data Science",
        "duration": "Pursuing (Current CGPA: 8.4)",
        "description": "Specialized coursework in AI, Machine Learning, Data Science, and Cybersecurity."
      }
    ],
    "contact": {
      "email": "pradyumnavaidya@email.com",
      "github": "https://github.com/pvnjdv",
      "linkedin": "https://linkedin.com/in/pradyumnavaidya",
      "location": "Pune, Maharashtra, India"
    }
  }'
) ON CONFLICT (username) DO NOTHING;
```

### 3. Test Database Connection

```sql
-- Verify the table was created
SELECT * FROM portfolios WHERE username = 'pradyumna';

-- Check table structure
\d portfolios;
```

### 4. Configure Storage (Optional - for resume uploads)

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket: `resumes`
3. Make it public for file access
4. Set up RLS policies:

```sql
-- Storage policies for resume uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);

CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT TO PUBLIC WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT TO PUBLIC USING (bucket_id = 'resumes');
```

## 🧪 Test Your Database

After setting up, you can test the connection:

1. **Via Supabase API**:
   Visit: `https://gzutvsrwizzfmtoshkpb.supabase.co/rest/v1/portfolios?select=*`
   (You should see your data)

2. **Via Your App** (after Vercel deployment):
   - Try creating a test portfolio
   - Check if data saves correctly
   - Test the `/pradyumna` route

## 🚨 Important Notes

- ✅ Your API keys are already configured
- ✅ Database URL is correct
- 🔧 Just need to run the SQL above
- 🔧 Then test with Vercel deployment

## Next Steps

1. ✅ Database setup (run SQL above)
2. 🚀 Deploy to Vercel with environment variables
3. 🧪 Test portfolio creation
4. 🌐 Set up custom domain

Your Supabase is ready - just need to create the table structure! 🎯