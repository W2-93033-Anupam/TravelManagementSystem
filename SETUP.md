# Travel Management System - Setup Guide

This guide will help you set up and run the Travel Management System locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download here](https://git-scm.com/)

## Project Structure

```
src2/
├── backend/           # Node.js/Express API server
├── frontend/          # React web application
├── database/          # MySQL database schema
├── README.md          # Project overview
└── SETUP.md          # This setup guide
```

## Database Setup

### 1. Create MySQL Database

1. Start your MySQL server
2. Open MySQL command line or MySQL Workbench
3. Run the database schema:

```bash
mysql -u root -p < database/schema.sql
```

Or manually execute the SQL commands from `database/schema.sql`

### 2. Verify Database Creation

```sql
USE travelmanagementsystem;
SHOW TABLES;
```

You should see the following tables:
- admin
- agent
- customer
- package
- vehicle
- booking
- payment
- destinations

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd src2/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

1. Copy the example environment file:
```bash
copy .env.example .env
```

2. Edit `.env` file with your database credentials:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=travelmanagementsystem
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 4. Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The backend server will start on `http://localhost:5000`

### 5. Verify Backend

Visit `http://localhost:5000/health` - you should see a success message.

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd src2/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration (Optional)

Create `.env` file in frontend directory if you need custom API URL:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start Frontend Application

```bash
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## Running the Complete Application

### 1. Start Backend (Terminal 1)
```bash
cd src2/backend
npm run dev
```

### 2. Start Frontend (Terminal 2)
```bash
cd src2/frontend
npm start
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Default User Accounts

The database comes with sample data including test users:

**Admin Users:**
```
Email: admin@travel.com
Password: password (hashed in database)

Email: manager@travel.com  
Password: password (hashed in database)
```

**Agent Users:**
```
Email: john.agent@travel.com
Password: password (hashed in database)

Email: jane.agent@travel.com
Password: password (hashed in database)
```

**Customer Users:**
```
Email: rahul.sharma@email.com
Password: password (hashed in database)

Email: priya.patel@email.com
Password: password (hashed in database)
```

**Note**: For security, passwords are hashed. You'll need to register new users through the application or update the hashed passwords in the database.

## Features Overview

### Public Features
- Browse travel packages
- View package details
- Browse hotels
- View hotel details
- Explore destinations
- User registration and login

### Authenticated Features
- User dashboard
- Personal profile management
- Customer details management
- Book travel packages
- Book hotels
- View booking history
- Cancel bookings
- Update profile information

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package details
- `POST /api/packages/book` - Book a package
- `GET /api/packages/bookings/my` - Get user's package bookings

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels/book` - Book a hotel
- `GET /api/hotels/bookings/my` - Get user's hotel bookings

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details
- `GET /api/destinations/popular` - Get popular destinations

### Customer Management
- `POST /api/customers` - Add customer details
- `GET /api/customers` - Get customer details
- `PUT /api/customers` - Update customer details
- `DELETE /api/customers` - Delete customer details

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in backend `.env` file
   - Or kill the process using the port

3. **CORS Errors**
   - Verify FRONTEND_URL in backend `.env`
   - Check if both servers are running

4. **Module Not Found Errors**
   - Run `npm install` in respective directories
   - Delete `node_modules` and reinstall if needed

### Database Reset

To reset the database with fresh sample data:

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS travelmanagementsystem;"
mysql -u root -p < database/schema.sql
```

## Development Tips

### Backend Development
- Use `npm run dev` for auto-restart on file changes
- Check logs in terminal for API errors
- Use tools like Postman to test API endpoints

### Frontend Development
- React DevTools browser extension is helpful
- Check browser console for JavaScript errors
- Use browser network tab to debug API calls

### Database Management
- Use MySQL Workbench for visual database management
- Check database logs for query errors
- Use `DESCRIBE table_name;` to view table structure

## Production Deployment

For production deployment:

1. **Backend**:
   - Set `NODE_ENV=production`
   - Use process manager like PM2
   - Set up reverse proxy with Nginx
   - Use environment variables for secrets

2. **Frontend**:
   - Run `npm run build`
   - Serve build files with web server
   - Update API URL for production

3. **Database**:
   - Use production MySQL instance
   - Set up proper backups
   - Configure SSL connections

## Support

If you encounter issues:

1. Check this setup guide
2. Verify all prerequisites are installed
3. Check terminal/console logs for errors
4. Ensure all environment variables are set correctly

## License

This project is for educational purposes. Please check with your institution regarding usage and distribution.
