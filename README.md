  # Travel Management System

A comprehensive web-based travel management system built with React frontend and Node.js/Express backend with MySQL database. Features complete booking management for packages and hotels, customer profile management, and destination browsing.

## 🌟 Features

### Customer Features
- **User Authentication** - Secure login/signup with JWT tokens
- **Profile Management** - Complete customer profile with personal details
- **Travel Package Browsing** - Search, filter, and book travel packages
- **Hotel Booking System** - Browse and book hotels with amenities
- **Destination Explorer** - Discover popular travel destinations with images
- **Booking Management** - View and manage all bookings in one place
- **Payment Integration** - Multiple payment methods support

### Admin Features
- **Dashboard Analytics** - Comprehensive booking and revenue insights
- **Agent Management** - Manage travel agents and commissions
- **Package Management** - Create and manage travel packages
- **Hotel Management** - Add and manage hotel listings
- **Customer Management** - View and manage customer accounts

## 🛠️ Tech Stack

### Frontend (Web)
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Bootstrap 5** - Responsive UI components
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Modern icon library

### Mobile (React Native)
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Icon library
- **React Native Date Picker** - Date selection

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting

## 📁 Project Structure

```
src2_1/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── customerController.js # Customer management
│   │   ├── packageController.js  # Package management
│   │   ├── hotelController.js   # Hotel management
│   │   └── destinationController.js # Destination management
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── validation.js        # Input validation
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── customerRoutes.js    # Customer endpoints
│   │   ├── packageRoutes.js     # Package endpoints
│   │   ├── hotelRoutes.js       # Hotel endpoints
│   │   └── destinationRoutes.js # Destination endpoints
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   └── ProtectedRoute.js # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js          # Landing page
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Dashboard.js     # User dashboard
│   │   │   ├── Packages.js      # Package listing
│   │   │   ├── PackageDetails.js # Package details
│   │   │   ├── Hotels.js        # Hotel listing
│   │   │   ├── HotelDetails.js  # Hotel details
│   │   │   ├── Destinations.js  # Destination listing
│   │   │   ├── MyBookings.js    # Booking management
│   │   │   ├── Profile.js       # User profile
│   │   │   └── CustomerForm.js  # Personal details form
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
│   └── package.json
├── mobile/
│   ├── src/
│   │   ├── components/          # Reusable mobile components
│   │   ├── context/
│   │   │   └── AuthContext.js   # Mobile auth context
│   │   ├── screens/
│   │   │   ├── LoginScreen.js   # Mobile login
│   │   │   ├── RegisterScreen.js # Mobile registration
│   │   │   ├── HomeScreen.js    # Mobile dashboard
│   │   │   ├── PackagesScreen.js # Mobile package listing
│   │   │   ├── PackageDetailsScreen.js # Mobile package details
│   │   │   ├── HotelsScreen.js  # Mobile hotel listing
│   │   │   ├── HotelDetailsScreen.js # Mobile hotel details
│   │   │   ├── DestinationsScreen.js # Mobile destinations
│   │   │   ├── BookingsScreen.js # Mobile booking management
│   │   │   └── ProfileScreen.js # Mobile user profile
│   │   └── services/
│   │       └── apiService.js    # Mobile API service
│   ├── App.js                   # Mobile app component
│   ├── package.json
│   └── MOBILE_SETUP.md          # Mobile setup guide
├── database/
│   └── schema.sql               # Database schema
├── db/
│   └── migration/               # Flyway migrations
│       └── V1__Complete_Database_Setup.sql
├── api_test.html                # API testing interface
├── flyway.conf                  # Flyway configuration
├── DATABASE_SETUP.md            # Database setup guide
├── SETUP.md                     # Setup instructions
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### 1. Database Setup

**Option A: Using Flyway (Recommended)**
```bash
# Install Flyway CLI and run migrations
flyway migrate
```

**Option B: Manual Setup**
```bash
# Create database and import schema
mysql -u root -p -e "CREATE DATABASE travelmanagementsystem;"
mysql -u root -p travelmanagementsystem < database/schema.sql
```

### 2. Backend Setup
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start React development server
npm start
```

### 4. Mobile Setup (Optional)
```bash
cd mobile
npm install

# Install Expo CLI globally
npm install -g expo-cli

# Start mobile development server
npm start
```

### 5. Access the Application
- **Web Frontend**: http://localhost:3000
- **Mobile App**: Scan QR code with Expo Go app
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🗄️ Database Schema

### Core Tables
- **admin** - System administrators
- **agent** - Travel agents with commission rates
- **customer** - Customer accounts with profile details
- **package** - Travel packages with pricing
- **hotel** - Hotel listings with amenities
- **vehicle** - Transportation options
- **destinations** - Travel destinations with images

### Booking Tables
- **booking** - Package and vehicle bookings
- **hotel_booking** - Hotel reservations
- **payment** - Payment transaction records

### Sample Data Included
- 2 Admin users
- 3 Travel agents
- 5 Travel packages (₹15,000 - ₹35,000)
- 5 Hotels with ratings and amenities
- 4 Sample customers
- 5 Destinations with high-quality images
- Sample bookings and payments

## 🔧 API Endpoints

### Authentication
- `POST /api/customer/register` - Customer registration
- `POST /api/customer/login` - Customer login
- `GET /api/customer/profile` - Get customer profile
- `PUT /api/customer/profile` - Update customer profile

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package details
- `POST /api/packages/book` - Book a package
- `GET /api/packages/bookings/my` - Get user bookings

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels/book` - Book a hotel
- `GET /api/hotels/bookings/my` - Get user hotel bookings

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details
- `GET /api/destinations/popular` - Get popular destinations

## 🧪 Testing

### API Testing Tools
- **`api_test_comprehensive.html`** - Complete API testing interface
- **`login_test_enhanced.html`** - Authentication testing tool

### Test Accounts
- **Customer**: rahul.sharma@email.com / password123
- **Admin**: admin@travel.com / admin123

### Running Tests
1. Start the backend server
2. Open test HTML files in browser
3. Test all endpoints with real-time results

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin security
- **Helmet Security** - HTTP security headers
- **Input Validation** - Server-side validation
- **SQL Injection Protection** - Parameterized queries

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean, professional interface
- **Interactive Components** - Hover effects and animations
- **Toast Notifications** - User feedback system
- **Loading States** - Better user experience
- **Error Handling** - Graceful error displays
- **Image Optimization** - High-quality destination images

## 📱 Key Functionalities

### Customer Journey (Web & Mobile)
1. **Registration/Login** - Secure account creation
2. **Profile Setup** - Add personal details and ID information
3. **Browse & Search** - Explore packages, hotels, destinations
4. **Booking Process** - Select dates, guests, and confirm
5. **Payment** - Multiple payment options
6. **Booking Management** - View, modify, or cancel bookings

### Mobile-Specific Features
1. **Native Navigation** - Bottom tabs and stack navigation
2. **Touch Optimized** - Mobile-first UI components
3. **Offline Ready** - Local data caching with AsyncStorage
4. **Push Notifications** - Booking confirmations and updates
5. **Camera Integration** - Profile photo and document upload
6. **Location Services** - Nearby destinations and hotels

### Admin Features
1. **Dashboard Analytics** - Revenue and booking insights
2. **Content Management** - Add/edit packages and hotels
3. **User Management** - Customer and agent administration
4. **Booking Oversight** - Monitor all system bookings

## 🔄 Database Migration

The project uses Flyway for database version control:

- **V1** - Core tables (admin, agent, package, customer, etc.)
- **V2** - Customer profile enhancements
- **V3** - Hotel management tables
- **V4** - Sample data insertion

See `DATABASE_SETUP.md` for detailed migration instructions.

## 🚀 Deployment

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=travelmanagementsystem
DB_PORT=3306

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=production

# CORS
FRONTEND_URL=http://localhost:3000
```

### Production Setup
1. Set up MySQL database
2. Configure environment variables
3. Run database migrations
4. Build React frontend: `npm run build`
5. Start backend server: `npm start`
6. Serve frontend with nginx/apache

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the `DATABASE_SETUP.md` for database issues
- Use the HTML test files for API debugging
- Review the `SETUP.md` for detailed setup instructions

## 🎯 Future Enhancements

- [ ] Real-time chat support
- [ ] Advanced search filters
- [x] **Mobile app development** ✅
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Review and rating system
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Push notifications for mobile
- [ ] Offline mode for mobile
- [ ] Biometric authentication
- [ ] AR destination preview
