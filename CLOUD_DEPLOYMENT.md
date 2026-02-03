# Cloud Deployment Guide

## 🚀 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (Vercel)      │────│   (Railway)     │────│    (MySQL)      │
│   React Web     │    │   Node.js API   │    │   (PlanetScale) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         │
┌─────────────────┐
│     Mobile      │
│   (Expo EAS)    │
│  React Native   │
└─────────────────┘
```

## 1. Database Deployment (PlanetScale - Free MySQL)

### Setup PlanetScale
```bash
# Install PlanetScale CLI
npm install -g @planetscale/cli

# Login to PlanetScale
pscale auth login

# Create database
pscale database create travel-management

# Create branch
pscale branch create travel-management main

# Connect to database
pscale connect travel-management main --port 3309
```

### Import Database Schema
```bash
# Run the migration SQL
mysql -h 127.0.0.1 -P 3309 -u root < db/migration/V1__Complete_Database_Setup.sql
```

## 2. Backend Deployment (Railway - Free Node.js hosting)

### Prepare Backend for Deployment
1. Update `package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

2. Update environment variables in Railway:
```env
NODE_ENV=production
PORT=5000
DB_HOST=your-planetscale-host
DB_USER=your-planetscale-user
DB_PASSWORD=your-planetscale-password
DB_NAME=travel-management
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## 3. Frontend Deployment (Vercel - Free React hosting)

### Prepare Frontend for Deployment
1. Update API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-domain.railway.app/api'
  : '/api';
```

2. Add environment variables to Vercel:
```env
REACT_APP_API_URL=https://your-backend-domain.railway.app/api
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Follow prompts and deploy
```

## 4. Mobile Deployment (Expo EAS - Free React Native builds)

### Prepare Mobile for Deployment
1. Update API URL in `src/services/apiService.js`:
```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://192.168.1.7:5000/api'
  : 'https://your-backend-domain.railway.app/api';
```

2. Configure `app.json`:
```json
{
  "expo": {
    "name": "Travel Management",
    "slug": "travel-management",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.travelmanagement"
    },
    "android": {
      "package": "com.yourcompany.travelmanagement"
    }
  }
}
```

### Deploy Mobile App
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS (requires Apple Developer account)
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

## 5. Quick Deployment Commands

### One-time Setup
```bash
# 1. Database
pscale database create travel-management
pscale connect travel-management main --port 3309

# 2. Backend
cd backend
railway init
railway up

# 3. Frontend  
cd frontend
vercel

# 4. Mobile
cd mobile
eas build:configure
eas build --platform android
```

### Environment Variables Summary

**Railway (Backend):**
- `NODE_ENV=production`
- `DB_HOST=gateway01.ap-southeast-1.prod.aws.planetscale.com`
- `DB_USER=your-username`
- `DB_PASSWORD=your-password`
- `DB_NAME=travel-management`
- `JWT_SECRET=your-jwt-secret`

**Vercel (Frontend):**
- `REACT_APP_API_URL=https://your-app.railway.app/api`

**Expo (Mobile):**
- API URL updated in code (no env vars needed)

## 6. Post-Deployment Checklist

- [ ] Database connected and schema imported
- [ ] Backend API responding at `/health` endpoint
- [ ] Frontend loading and making API calls
- [ ] Mobile app connecting to production API
- [ ] CORS configured for frontend domain
- [ ] SSL certificates active (automatic)
- [ ] Environment variables set correctly

## 7. Monitoring & Maintenance

### Health Checks
- Backend: `https://your-app.railway.app/health`
- Frontend: `https://your-app.vercel.app`
- Database: PlanetScale dashboard

### Logs
- Railway: `railway logs`
- Vercel: Vercel dashboard
- Mobile: Expo dashboard

## 8. Cost Estimate (Free Tiers)

- **PlanetScale**: Free (1 database, 1GB storage)
- **Railway**: Free ($5 credit monthly)
- **Vercel**: Free (100GB bandwidth)
- **Expo EAS**: Free (30 builds/month)

**Total Monthly Cost: $0** (within free limits)

## 9. Custom Domain Setup (Optional)

### Frontend Domain
```bash
# Add custom domain in Vercel dashboard
# Update CORS in backend for new domain
```

### Backend Domain  
```bash
# Add custom domain in Railway dashboard
# Update frontend API URL
```

This setup gives you a production-ready travel management system with:
- ✅ Scalable cloud infrastructure
- ✅ Automatic SSL certificates
- ✅ Global CDN (Vercel)
- ✅ Automatic deployments
- ✅ Mobile app distribution
- ✅ Database backups (PlanetScale)