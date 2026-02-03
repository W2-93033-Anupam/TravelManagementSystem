@echo off
echo 🚀 Travel Management System - Cloud Deployment Script
echo ======================================================

echo 📋 Installing required CLIs...
npm install -g @planetscale/cli @railway/cli vercel @expo/eas-cli

echo.
echo 🗄️ Step 1: Database Setup (PlanetScale)
echo =========================================
set /p db_name="Enter your PlanetScale database name [travel-management]: "
if "%db_name%"=="" set db_name=travel-management

echo Creating database: %db_name%
pscale database create %db_name%
pscale branch create %db_name% main

echo ✅ Database created. Import schema manually from PlanetScale dashboard
echo.

echo 🖥️ Step 2: Backend Deployment (Railway)
echo ========================================
cd backend
echo Deploying backend to Railway...
railway login
railway init
railway up

echo Get your Railway URL and update environment variables
echo.

echo 🌐 Step 3: Frontend Deployment (Vercel)
echo =======================================
cd ..\frontend
echo Deploying frontend to Vercel...
vercel login
vercel --prod

echo.
echo 📱 Step 4: Mobile App Build (Expo EAS)
echo =====================================
cd ..\mobile
echo Building mobile app...
eas login
eas build:configure
eas build --platform android --profile preview

echo.
echo 🎉 Deployment Complete!
echo ======================
echo ✅ Database: PlanetScale
echo ✅ Backend: Railway  
echo ✅ Frontend: Vercel
echo ✅ Mobile: Expo EAS
echo.
echo 📝 Next Steps:
echo 1. Update environment variables in Railway dashboard
echo 2. Import database schema to PlanetScale
echo 3. Update API URLs in frontend and mobile
echo 4. Test all endpoints

pause