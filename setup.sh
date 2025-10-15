#!/bin/bash

# Pradyumna's Portfolio Generator - Quick Setup Script

echo "🚀 Setting up Pradyumna's Portfolio Generator"
echo "============================================="
echo ""

# Check if required tools are installed
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Please install Node.js first."; exit 1; }
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Please install Git first."; exit 1; }

echo "✅ Node.js and Git are installed"
echo ""

# Install dependencies if not already done
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "🔧 Environment Setup Checklist:"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
    
    # Check if it has placeholder values
    if grep -q "placeholder" .env.local; then
        echo "⚠️  WARNING: .env.local still contains placeholder values"
        echo "   Please update the following:"
        echo "   - NEXT_PUBLIC_SUPABASE_URL"
        echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY" 
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo "   - GROQ_API_KEY"
    else
        echo "✅ Environment variables appear to be configured"
    fi
else
    echo "❌ .env.local file missing"
    echo "   Run: cp .env.example .env.local"
    echo "   Then edit .env.local with your actual API keys"
fi

echo ""
echo "📋 Your Next Steps:"
echo ""
echo "1. 🗄️  Set up Supabase:"
echo "   → Go to https://supabase.com"
echo "   → Create project: 'portfolio-generator'"
echo "   → Run SQL from DEPLOYMENT_CHECKLIST.md"
echo "   → Copy credentials to .env.local"
echo ""
echo "2. 🤖 Set up Groq API:"
echo "   → Go to https://console.groq.com" 
echo "   → Generate API key"
echo "   → Add to .env.local"
echo ""
echo "3. 🌐 Deploy to Vercel:"
echo "   → Push to GitHub: git push origin main"
echo "   → Import to Vercel"
echo "   → Add environment variables"
echo "   → Deploy!"
echo ""
echo "4. 🌍 Custom Domain:"
echo "   → Add 'portfolio.hackydaddy.xyz' in Vercel"
echo "   → Update DNS records"
echo ""

# Test build
echo "🧪 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed - check your configuration"
    exit 1
fi

echo ""
echo "🎯 Ready for Development!"
echo ""
echo "Start development server:"
echo "  npm run dev"
echo ""
echo "Your portfolio will be available at:"
echo "  http://localhost:3000"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "  - README.md"
echo "  - DEPLOYMENT_CHECKLIST.md"
echo ""

# Offer to start dev server
read -p "🚀 Start development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting development server..."
    npm run dev
fi