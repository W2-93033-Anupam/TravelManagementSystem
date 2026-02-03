#!/bin/bash

echo "🚀 Travel Management System - Cloud Deployment Script"
echo "======================================================"

# Check if required CLIs are installed
check_cli() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 CLI not found. Installing..."
        npm install -g $2
    else
        echo "✅ $1 CLI found"
    fi
}

echo "📋 Checking required CLIs..."
check_cli "pscale" "@planetscale/cli"
check_cli "railway" "@railway/cli"
check_cli "vercel" "vercel"
check_cli "eas" "@expo/eas-cli"

echo ""
echo "🗄️  Step 1: Database Setup (PlanetScale)"
echo "========================================="
read -p "Enter your PlanetScale database name [travel-management]: " db_name
db_name=${db_name:-travel-management}

echo "Creating database: $db_name"
pscale database create $db_name
pscale branch create $db_name main

echo "✅ Database created. Import schema manually from PlanetScale dashboard"
echo ""

echo "🖥️  Step 2: Backend Deployment (Railway)"
echo "========================================"
cd backend
echo "Deploying backend to Railway..."
railway login
railway init
railway up

echo "Get your Railway URL and update the following:"
echo "1. Frontend REACT_APP_API_URL"
echo "2. Mobile API_BASE_URL"
echo ""

echo "🌐 Step 3: Frontend Deployment (Vercel)"
echo "======================================="
cd ../frontend
echo "Deploying frontend to Vercel..."
vercel login
vercel --prod

echo ""
echo "📱 Step 4: Mobile App Build (Expo EAS)"
echo "====================================="
cd ../mobile
echo "Building mobile app..."
eas login
eas build:configure
eas build --platform android --profile preview

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "✅ Database: PlanetScale"
echo "✅ Backend: Railway"
echo "✅ Frontend: Vercel"
echo "✅ Mobile: Expo EAS"
echo ""
echo "📝 Next Steps:"
echo "1. Update environment variables in Railway dashboard"
echo "2. Import database schema to PlanetScale"
echo "3. Update API URLs in frontend and mobile"
echo "4. Test all endpoints"
echo ""
echo "🔗 Useful Links:"
echo "- Railway Dashboard: https://railway.app/dashboard"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- PlanetScale Dashboard: https://app.planetscale.com"
echo "- Expo Dashboard: https://expo.dev"