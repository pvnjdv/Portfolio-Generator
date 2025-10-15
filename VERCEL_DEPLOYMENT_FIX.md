# 🚀 Vercel Deployment Fix Guide for Pradyumna's Portfolio

## Current Status ✅
- ✅ Code pushed to GitHub successfully
- ✅ Build works locally 
- ✅ Environment variables configured
- ✅ Supabase and Groq API keys ready

## 🔧 Step-by-Step Vercel Deployment

### Step 1: Commit the Fixed Configuration
```bash
git add .
git commit -m "Fix vercel.json configuration for proper deployment"
git push origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project" 
4. Import `pvnjdv/Portfolio-Generator`
5. Configure these settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Install Command**: `npm install` (default)
   - **Output Directory**: `.next` (default)

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Step 3: Add Environment Variables in Vercel

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL = https://gzutvsrwizzfmtoshkpb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dXR2c3J3aXp6Zm10b3Noa3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0Mzk4MDEsImV4cCI6MjA3NjAxNTgwMX0.T98qmV-qA3XF28kTZ1PN9AV4aZne3n06iHu-hOCjhMY
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dXR2c3J3aXp6Zm10b3Noa3BiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQzOTgwMSwiZXhwIjoyMDc2MDE1ODAxfQ.SSXsNIOxjqib-9kwEwiLc9-vARIPHoWFF8Hzojqq3BU
GROQ_API_KEY = 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
NEXT_PUBLIC_APP_URL = https://your-app-name.vercel.app
```

**Important**: Set all environment variables for **Production**, **Preview**, and **Development** environments.

### Step 4: Trigger Deployment

After adding environment variables:
1. Go to **Deployments** tab
2. Click "..." on the latest deployment
3. Click "Redeploy"

OR push a small change:
```bash
git commit --allow-empty -m "Trigger Vercel deployment"
git push origin main
```

## 🐛 Common Issues & Solutions

### Issue 1: "Build Failed" Error
**Solution**: Check environment variables are set correctly in Vercel dashboard

### Issue 2: "Function Timeout" Error  
**Solution**: The Groq API calls might be slow. This is normal for first deployment.

### Issue 3: "Supabase Connection Error"
**Solution**: Verify your Supabase database is set up:
```sql
-- Run this in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS portfolios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  template TEXT NOT NULL CHECK (template IN ('1', '2', '3')),
  resumeUrl TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Issue 4: "Module Not Found" Errors
**Solution**: Clear build cache and redeploy:
```bash
rm -rf .next
npm run build
git add .
git commit -m "Clear build cache"
git push origin main
```

## 🎯 Expected Results

After successful deployment:
- ✅ Your portfolio loads at `https://your-app.vercel.app`
- ✅ Template switching works (FAB button)
- ✅ Portfolio creation form works
- ✅ Dynamic routes work (`/[username]`)
- ✅ AI features work (resume parsing)

## 🌐 Custom Domain Setup

Once deployed successfully:
1. Go to **Settings** → **Domains** in Vercel
2. Add custom domain: `portfolio.hackydaddy.xyz`
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## 🔍 Debugging Steps

If deployment still fails:

1. **Check Vercel Function Logs**:
   - Go to **Functions** tab in Vercel dashboard
   - Check logs for errors

2. **Test API Routes Locally**:
   ```bash
   npm run dev
   curl http://localhost:3000/api/getPortfolio/test
   ```

3. **Verify Environment Variables**:
   - Make sure no variables have trailing spaces
   - Ensure all required variables are set

4. **Check Build Logs**:
   - Look for specific error messages in Vercel build logs
   - Common issues: missing dependencies, environment variables

## 📞 Next Steps

1. Run the commit command above to fix vercel.json
2. Try importing to Vercel again
3. Add environment variables
4. Test your live portfolio!

Your portfolio should be live within 2-3 minutes after proper configuration! 🚀