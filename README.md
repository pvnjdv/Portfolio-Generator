# Portfolio Generator

An AI-integrated portfolio platform where users can view a personal portfolio with 3 switchable templates and create their own portfolio instantly.

## 🌟 Features

- **Real-time template switching** between 3 different portfolio styles
- **AI-powered resume parsing** using Groq API
- **Dynamic user portfolios** at `/[username]` routes
- **Interactive chat interface** (Template 1)
- **Animated scrolling portfolio** (Template 2) 
- **Clean static layout** (Template 3)
- **Supabase backend** for data storage
- **File upload support** for resumes

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI
- **Database**: Supabase
- **AI Integration**: Groq API
- **Hosting**: Vercel

## 📁 Project Structure

```
/app
 ├── page.tsx                   → Main portfolio (default = Template 1)
 ├── [username]/page.tsx        → Dynamic portfolio renderer
 ├── api/
 │    ├── savePortfolio/route.ts  → Saves portfolio data to Supabase
 │    ├── getPortfolio/[username]/route.ts → Fetches portfolio by username
 │    └── parseResume/route.ts    → AI resume parsing endpoint
 └── components/
      ├── Fab.tsx               → Floating action button
      ├── CreateForm.tsx        → Portfolio creation modal
      └── templates/
           ├── ChatUI/           → Template 1 (ChatGPT style)
           ├── AnimatedScroll/   → Template 2 (animated scroll)
           └── StaticScroll/     → Template 3 (static layout)
```

## 🛠️ Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `GROQ_API_KEY`: Your Groq API key for AI features
- `UPLOADTHING_SECRET`: UploadThing secret for file uploads
- `UPLOADTHING_APP_ID`: UploadThing app ID

### 3. Groq API Setup (AI Features)

**Get Your Groq API Key:**

1. **Create Groq Account:**
   - Visit [https://console.groq.com](https://console.groq.com)
   - Sign up with your email or GitHub account
   - Verify your email address

2. **Generate API Key:**
   - Once logged in, go to "API Keys" section
   - Click "Create API Key"
   - Give it a name like "Portfolio Generator"
   - Copy the generated API key (starts with `gsk_...`)
   - **Important**: Save this key securely - you won't see it again!

3. **Add to Environment:**
   - Add to your `.env.local`:
     ```
     GROQ_API_KEY=gsk_your_actual_groq_api_key_here
     ```

4. **Test the Integration:**
   - The AI features include:
     - **Resume Parsing**: Extracts structured data from uploaded PDFs
     - **Content Enhancement**: Improves portfolio descriptions
     - **Chat Responses**: Powers the interactive chat in Template 1
   - Test by creating a portfolio with resume upload enabled

**Groq API Benefits:**
- **Fast**: Lightning-fast inference with LPU architecture
- **Free Tier**: Generous free usage for development
- **Multiple Models**: Access to Mixtral, Llama, and other LLMs
- **High Quality**: State-of-the-art language models

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🌐 Deployment

### 4. Deploy to Vercel

**Complete Deployment Guide:**

1. **Prepare Your Repository:**
   ```bash
   # Commit all changes
   git add .
   git commit -m "Portfolio generator with personal data"
   
   # Push to GitHub (if not already done)
   git remote add origin https://github.com/pvnjdv/Portfolio-Generator.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "Add New..." → "Project"
   - Import your `Portfolio-Generator` repository
   - Configure project:
     - **Framework Preset**: Next.js
     - **Root Directory**: `./` (leave default)
     - **Build Command**: `npm run build` (default)
     - **Install Command**: `npm install` (default)

3. **Add Environment Variables:**
   - In the deployment settings, go to "Environment Variables"
   - Add these variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
     SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
     GROQ_API_KEY = gsk_your_groq_api_key
     UPLOADTHING_SECRET = your_uploadthing_secret (optional)
     UPLOADTHING_APP_ID = your_uploadthing_app_id (optional)
     NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
     ```

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your portfolio will be live at `https://your-app.vercel.app`

5. **Set Up Custom Domain:**
   - In your Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add domain: `portfolio.hackydaddy.xyz`
   - Follow DNS configuration instructions:
     ```
     Type: A
     Name: portfolio
     Value: 76.76.19.61 (Vercel's IP)
     
     OR
     
     Type: CNAME
     Name: portfolio
     Value: cname.vercel-dns.com
     ```

6. **Update DNS Settings:**
   - Log into your domain registrar (where you bought hackydaddy.xyz)
   - Update DNS records as instructed by Vercel
   - Wait for DNS propagation (can take up to 24 hours)

7. **Verify Deployment:**
   - Visit `https://portfolio.hackydaddy.xyz`
   - Test template switching
   - Try creating a test portfolio
   - Check AI features work with resume upload

**Automatic Deployments:**
- Every push to `main` branch will trigger a new deployment
- Preview deployments are created for pull requests
- You can see build logs and manage deployments in Vercel dashboard

### Custom Domain Setup

1. Add `portfolio.hackydaddy.xyz` as a custom domain in Vercel
2. Update DNS records to point to Vercel
3. SSL certificate will be automatically provisioned

## 📝 Customization

### Update Personal Portfolio Data

Edit the `personalPortfolioData` object in `src/app/page.tsx`:

```typescript
const personalPortfolioData: PortfolioData = {
  name: "Your Name",
  bio: "Your professional bio...",
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  // ... add your projects, experience, education, and contact info
}
```

### Template Customization

Each template is a separate component in `src/components/templates/`:
- **ChatUI**: Interactive chat interface
- **AnimatedScroll**: Modern with animations
- **StaticScroll**: Clean and minimal

## 🔧 API Endpoints

- `POST /api/savePortfolio`: Create a new portfolio
- `GET /api/getPortfolio/[username]`: Fetch portfolio by username
- `POST /api/parseResume`: Parse resume text with AI

## 📱 User Flow

1. **View Portfolio**: Users land on your main portfolio
2. **Switch Templates**: Click FAB → "Switch Template" for real-time switching
3. **Create Portfolio**: Click FAB → "Create Your Portfolio"
4. **Fill Form**: Username + Resume upload + Template selection
5. **AI Enhancement**: Optional AI parsing of resume data
6. **Live Portfolio**: Instantly available at `/[username]`

## 🤖 AI Features

- **Resume parsing**: Extracts structured data from PDF resumes
- **Content enhancement**: Improves descriptions and summaries
- **Chat responses**: Template 1 includes AI-powered chat responses

## 🐛 Troubleshooting

### Common Issues

1. **Build errors**: Make sure all environment variables are set
2. **Supabase connection**: Verify your Supabase credentials
3. **AI parsing**: Check your Groq API key and rate limits
4. **File uploads**: Ensure UploadThing is properly configured

### Development Tips

- Use `npm run build` to test production build locally
- Check browser console for client-side errors
- Monitor Vercel function logs for API issues

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js 14, Supabase, and AI
