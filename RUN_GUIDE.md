# Travel Management System - Complete Setup & Run Guide

## 🚀 Quick Start (All Platforms)

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- npm or yarn
- Expo CLI (for mobile): `npm install -g expo-cli`

## 📋 Step-by-Step Setup

### 1. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE travelmanagementsystem;"

# Run migration (if using Flyway)
flyway migrate

# OR import directly
mysql -u root -p travelmanagementsystem < db/migration/V1__Complete_Database_Setup.sql
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment (create .env file)
echo "DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=travelmanagementsystem
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000" > .env

# Start backend server
npm start
```

### 3. Web Frontend Setup
```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

### 4. Mobile App Setup (Optional)
```bash
# Open new terminal, navigate to mobile
cd mobile

# Install dependencies
npm install

# Start Expo development server
npm start
```

## 🎯 Access Points

- **Web App**: http://localhost:3000
- **Mobile App**: Scan QR code with Expo Go app
- **Backend API**: http://localhost:5000
- **API Testing**: Open `api_test.html` in browser

## 🧪 Test Accounts

- **Customer**: rahul.sharma@email.com / password123
- **Admin**: admin@travel.com / admin123

## 🔧 Running Commands

### Backend Only
```bash
cd backend && npm start
```

### Web Frontend Only
```bash
cd frontend && npm start
```

### Mobile App Only
```bash
cd mobile && npm start
```

### All Services (Windows)
```batch
# Create run-all.bat
@echo off
start "Backend" cmd /k "cd backend && npm start"
timeout /t 5
start "Frontend" cmd /k "cd frontend && npm start"
timeout /t 5
start "Mobile" cmd /k "cd mobile && npm start"
```

### All Services (Linux/Mac)
```bash
# Create run-all.sh
#!/bin/bash
cd backend && npm start &
sleep 5
cd ../frontend && npm start &
sleep 5
cd ../mobile && npm start &
wait
```

## 📱 Platform Features

| Feature | Web | Mobile |
|---------|-----|--------|
| User Authentication | ✅ | ✅ |
| Package Browsing | ✅ | ✅ |
| Package Booking | ✅ | ✅ |
| Hotel Browsing | ✅ | ✅ |
| Hotel Booking | ✅ | ✅ |
| Destinations | ✅ | ✅ |
| Booking Management | ✅ | ✅ |
| Profile Management | ✅ | ✅ |
| Search & Filter | ✅ | ✅ |
| Responsive Design | ✅ | ✅ |
| Touch Optimized | ❌ | ✅ |
| Offline Support | ❌ | ⚠️ |
| Push Notifications | ❌ | 🔄 |

## 🛠️ Development Workflow

### 1. Start Development Environment
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Web Frontend  
cd frontend && npm start

# Terminal 3: Mobile (optional)
cd mobile && npm start
```

### 2. Make Changes
- Backend: Edit controllers, routes, middleware
- Frontend: Edit React components, pages, services
- Mobile: Edit React Native screens, components

### 3. Test Changes
- Use `api_test.html` for API testing
- Test web app at http://localhost:3000
- Test mobile app via Expo Go

## 🚨 Troubleshooting

### Backend Issues
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <PID> /F

# Check database connection
mysql -u root -p -e "SHOW DATABASES;"
```

### Frontend Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Mobile Issues
```bash
# Clear Expo cache
expo r -c

# Check network connectivity
ping localhost

# Restart Metro bundler
expo start --clear
```

## 📊 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │  Mobile App     │    │   Admin Panel   │
│   (React)       │    │  (React Native) │    │   (Future)      │
│   Port: 3000    │    │  (Expo)         │    │                 │
└─────────┬───────┘    └─────────┬───────┘    └─────────────────┘
          │                      │                      
          └──────────┬───────────┘              
                     │                          
          ┌─────────────────┐                   
          │   Backend API   │                   
          │   (Express.js)  │                   
          │   Port: 5000    │                   
          └─────────┬───────┘                   
                    │                           
          ┌─────────────────┐                   
          │   MySQL DB      │                   
          │   Port: 3306    │                   
          └─────────────────┘                   
```

## 🎉 Success Indicators

✅ Backend server running on port 5000  
✅ Web app accessible at localhost:3000  
✅ Mobile app QR code displayed  
✅ Database connected successfully  
✅ API endpoints responding  
✅ Test accounts working  

**System is ready for use! 🚀**