# Travel Management System - Quick Start Guide

##  Quick Setup

### Prerequisites
- Node.js (v14+)
- MySQL (v8.0+)
- npm

### 1. Database Setup
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE travelmanagementsystem;"

# Run migration
flyway migrate
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

##  Testing

### API Testing
Open `api_test.html` in browser for comprehensive API testing.

### Test Accounts
- **Customer**: rahul.sharma@email.com / password123
- **Admin**: admin@travel.com / admin123

##  Core Features

-  User Registration & Login
-  Package Browsing & Booking
-  Hotel Browsing & Booking  
-  Destination Exploration
-  Booking Management
-  Profile Management

## 🎯 Key URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## Sample Data Included

- 2 Admin users
- 3 Travel agents
- 4 Sample customers
- 5 Travel packages
- 5 Hotels
- 5 Destinations
- Sample bookings

##  One-Command Setup

For fresh installation:
1. Create MySQL database
2. Run Flyway migration (V1__Complete_Database_Setup.sql)
3. Start backend and frontend servers
4. System ready to use!

**Everything works out of the box!  injection prevention 
- XSS protection 
- CORS configuration 

##  Conclusion

All use cases have been successfully verified. The Travel Management System demonstrates:

1. **Complete User Journey**: Registration → Profile → Browse → Book → Manage
2. **Robust Error Handling**: Proper validation and error messages
3. **Secure Authentication**: JWT-based security implementation
4. **Seamless Integration**: Frontend-backend communication
5. **Data Integrity**: Consistent database operations
6. **User Experience**: Intuitive interface and navigation

