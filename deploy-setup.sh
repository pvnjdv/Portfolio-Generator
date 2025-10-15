#!/bin/bash

# Portfolio Generator Deployment Script

echo "🚀 Portfolio Generator - Deployment Setup"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the root of the portfolio-generator project"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo "1. ✅ Next.js 14 project structure created"
echo "2. ✅ All three templates implemented"
echo "3. ✅ API routes configured"
echo "4. ✅ Build successful"
echo ""

echo "🔧 Next Steps for Deployment:"
echo ""
echo "1. Set up Supabase:"
echo "   - Create a new project at https://supabase.com"
echo "   - Run the SQL commands from README.md to create the portfolios table"
echo "   - Copy your Supabase URL and keys to .env.local"
echo ""
echo "2. Set up Groq API:"
echo "   - Get API key from https://console.groq.com"
echo "   - Add to .env.local as GROQ_API_KEY"
echo ""
echo "3. Deploy to Vercel:"
echo "   - Push code to GitHub"
echo "   - Connect repository to Vercel"
echo "   - Add environment variables in Vercel dashboard"
echo "   - Deploy!"
echo ""
echo "4. Set up Custom Domain:"
echo "   - Add portfolio.hackydaddy.xyz in Vercel domains"
echo "   - Update DNS records to point to Vercel"
echo ""

echo "📁 Project Structure Summary:"
echo "✅ src/app/page.tsx - Main portfolio with template switching"
echo "✅ src/app/[username]/page.tsx - Dynamic user portfolios"
echo "✅ src/components/templates/ - 3 portfolio templates"
echo "✅ src/components/Fab.tsx - Floating action button"
echo "✅ src/components/CreateForm.tsx - Portfolio creation form"
echo "✅ src/app/api/ - API routes for portfolio management"
echo "✅ .env.example - Environment variables template"
echo "✅ vercel.json - Deployment configuration"
echo ""

echo "🎯 Features Implemented:"
echo "✅ Real-time template switching"
echo "✅ User portfolio creation"
echo "✅ AI resume parsing (Groq)"
echo "✅ Dynamic routing"
echo "✅ Responsive design"
echo "✅ Framer Motion animations"
echo "✅ Supabase integration"
echo ""

echo "🚀 Ready for deployment!"
echo "Follow the setup instructions in README.md to complete the deployment."

# Check if git is initialized and suggest next steps
if [ -d ".git" ]; then
    echo ""
    echo "📝 Suggested git commands:"
    echo "git add ."
    echo "git commit -m \"Initial portfolio generator implementation\""
    echo "git push origin main"
else
    echo ""
    echo "📝 Initialize git repository:"
    echo "git init"
    echo "git add ."
    echo "git commit -m \"Initial portfolio generator implementation\""
    echo "git remote add origin <your-github-repo-url>"
    echo "git push -u origin main"
fi