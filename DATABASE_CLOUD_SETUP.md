# 🗄️ Database Cloud Deployment Guide

## 💰 FREE Cloud Database Options

### Option 1: PlanetScale (Recommended - FREE)
- ✅ **Free Tier**: 1 database, 1GB storage, 1 billion reads/month
- ✅ **MySQL compatible**
- ✅ **Automatic backups**
- ✅ **Global edge network**
- ✅ **No credit card required**

### Option 2: Supabase (FREE Alternative)
- ✅ **Free Tier**: 500MB database, 2GB bandwidth
- ✅ **PostgreSQL based**
- ✅ **Real-time subscriptions**
- ✅ **Built-in auth**

### Option 3: Railway MySQL (FREE)
- ✅ **Free Tier**: $5 credit monthly (covers small DB)
- ✅ **MySQL/PostgreSQL**
- ✅ **Easy integration**

## 🚀 Quick Setup - PlanetScale (100% FREE)

### 1. Create Account & Database
```bash
# Install CLI
npm install -g @planetscale/cli

# Login (creates free account)
pscale auth login

# Create database
pscale database create travel-management

# Create development branch
pscale branch create travel-management dev

# Get connection string
pscale connect travel-management dev --port 3309
```

### 2. Import Database Schema
```sql
-- Run this in PlanetScale console or via connection

-- 1. Admin table
CREATE TABLE admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin') DEFAULT 'admin',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Agent table
CREATE TABLE agent (
    agent_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Customer table
CREATE TABLE customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    id_type VARCHAR(50),
    id_number VARCHAR(100),
    gender ENUM('male', 'female', 'other'),
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Package table
CREATE TABLE package (
    package_id INT PRIMARY KEY AUTO_INCREMENT,
    agent_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    destination VARCHAR(100) NOT NULL,
    start_location VARCHAR(100),
    duration_days INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    max_persons INT DEFAULT 10,
    includes TEXT,
    excludes TEXT,
    image_url VARCHAR(500),
    status ENUM('available', 'unavailable') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id)
);

-- 5. Hotel table
CREATE TABLE hotel (
    hotel_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    price_per_night DECIMAL(10,2) NOT NULL,
    amenities TEXT,
    image_url VARCHAR(500),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Vehicle table
CREATE TABLE vehicle (
    bus_id INT PRIMARY KEY AUTO_INCREMENT,
    bus_number VARCHAR(50) NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    bus_type ENUM('AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper') DEFAULT 'AC',
    total_seats INT DEFAULT 40,
    available_seats INT DEFAULT 40,
    price_per_seat DECIMAL(8,2) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active'
);

-- 7. Destinations table
CREATE TABLE destinations (
    destination_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    country VARCHAR(100),
    popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Booking table
CREATE TABLE booking (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    package_id INT,
    bus_id INT,
    travel_date DATE,
    total_amount DECIMAL(10,2) NOT NULL,
    seats_booked INT DEFAULT 1,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (package_id) REFERENCES package(package_id),
    FOREIGN KEY (bus_id) REFERENCES vehicle(bus_id)
);

-- 9. Hotel Booking table
CREATE TABLE hotel_booking (
    hotel_booking_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    hotel_id INT NOT NULL,
    checkin_date DATE NOT NULL,
    checkout_date DATE NOT NULL,
    num_rooms INT DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'confirmed',
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id)
);

-- 10. Payment table
CREATE TABLE payment (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    hotel_booking_id INT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'upi', 'cash') DEFAULT 'credit_card',
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'completed',
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id),
    FOREIGN KEY (hotel_booking_id) REFERENCES hotel_booking(hotel_booking_id)
);
```

### 3. Insert Sample Data
```sql
-- Sample Admin Users
INSERT INTO admin (name, email, password, role) VALUES
('Super Admin', 'admin@travel.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS', 'super_admin'),
('Travel Admin', 'admin2@travel.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS', 'admin');

-- Sample Agents
INSERT INTO agent (name, email, phone, commission_rate) VALUES
('Rajesh Kumar', 'rajesh@travel.com', '+91-9876543210', 12.50),
('Priya Sharma', 'priya@travel.com', '+91-9876543211', 10.00),
('Amit Singh', 'amit@travel.com', '+91-9876543212', 15.00);

-- Sample Customers
INSERT INTO customer (full_name, address, email, phone, password, date_of_birth, id_type, id_number, gender, country) VALUES
('Rahul Sharma', '123 MG Road, Mumbai', 'rahul.sharma@email.com', '+91-9876543213', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS', '1990-05-15', 'Passport', 'P1234567', 'male', 'India'),
('Sneha Patel', '456 Park Street, Delhi', 'sneha.patel@email.com', '+91-9876543214', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsxq9w5KS', '1992-08-22', 'Aadhar', '1234-5678-9012', 'female', 'India');

-- Sample Packages
INSERT INTO package (agent_id, title, description, destination, start_location, duration_days, price, max_persons, includes, excludes, image_url) VALUES
(1, 'Golden Triangle Tour', 'Explore Delhi, Agra, and Jaipur in this classic India tour', 'Delhi-Agra-Jaipur', 'Delhi', 7, 25000.00, 8, 'Accommodation, Meals, Transport, Guide', 'Personal expenses, Tips', 'https://images.unsplash.com/photo-1564507592333-c60657eea523'),
(2, 'Kerala Backwaters', 'Experience the serene backwaters of Kerala', 'Alleppey', 'Kochi', 5, 18000.00, 6, 'Houseboat, Meals, Transport', 'Personal expenses', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944'),
(3, 'Goa Beach Holiday', 'Relax on the beautiful beaches of Goa', 'Goa', 'Mumbai', 4, 15000.00, 10, 'Hotel, Breakfast, Airport transfer', 'Lunch, Dinner, Activities', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2');

-- Sample Hotels
INSERT INTO hotel (name, location, description, rating, price_per_night, amenities, image_url) VALUES
('Taj Palace Hotel', 'Mumbai', 'Luxury hotel in the heart of Mumbai', 4.8, 8500.00, 'WiFi,Pool,Spa,Restaurant,Gym,Room Service', 'https://images.unsplash.com/photo-1566073771259-6a8506099945'),
('Heritage Resort', 'Jaipur', 'Traditional Rajasthani architecture with modern amenities', 4.5, 6200.00, 'WiFi,Pool,Restaurant,Cultural Shows,Parking', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'),
('Beach Paradise Resort', 'Goa', 'Beachfront resort with stunning ocean views', 4.6, 7800.00, 'WiFi,Beach Access,Pool,Restaurant,Water Sports', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d');

-- Sample Destinations
INSERT INTO destinations (name, description, image_url, country, popular) VALUES
('Taj Mahal, Agra', 'One of the Seven Wonders of the World', 'https://images.unsplash.com/photo-1564507592333-c60657eea523', 'India', TRUE),
('Kerala Backwaters', 'Serene network of lagoons and lakes', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944', 'India', TRUE),
('Goa Beaches', 'Beautiful coastal paradise', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2', 'India', TRUE),
('Rajasthan Palaces', 'Royal heritage and culture', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b', 'India', TRUE);

-- Sample Bookings
INSERT INTO booking (customer_id, package_id, travel_date, total_amount, seats_booked, status) VALUES
(1, 1, '2024-03-15', 50000.00, 2, 'confirmed'),
(2, 2, '2024-04-10', 18000.00, 1, 'confirmed');

-- Sample Hotel Bookings
INSERT INTO hotel_booking (customer_id, hotel_id, checkin_date, checkout_date, num_rooms, total_amount, status, payment_status) VALUES
(1, 1, '2024-03-15', '2024-03-18', 1, 25500.00, 'confirmed', 'paid'),
(2, 3, '2024-04-20', '2024-04-23', 1, 23400.00, 'confirmed', 'paid');
```

### 4. Get Connection Details
```bash
# Get connection string for your app
pscale connect travel-management dev --port 3309

# Connection details will be:
# Host: 127.0.0.1
# Port: 3309
# Database: travel-management
# Username: root
# Password: (no password needed for local tunnel)
```

### 5. Update Backend Environment
```env
# For PlanetScale production
DB_HOST=gateway01.ap-southeast-1.prod.aws.planetscale.com
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=travel-management
DB_PORT=3306
```

## 💰 Cost Breakdown (ALL FREE)

### PlanetScale FREE Tier:
- ✅ **1 Database**
- ✅ **1GB Storage** (enough for 100k+ records)
- ✅ **1 Billion reads/month**
- ✅ **10 Million writes/month**
- ✅ **Automatic backups**
- ✅ **SSL encryption**
- ✅ **No time limit**

### Alternative FREE Options:

**Supabase FREE:**
- 500MB database
- 2GB bandwidth
- 50MB file storage

**Railway FREE:**
- $5 monthly credit
- Covers small MySQL database
- 500MB storage

**Aiven FREE:**
- 1 month free trial
- Then $19/month (paid option)

## 🔧 Database Management Tools

### 1. PlanetScale Web Console (FREE)
- Built-in query editor
- Schema management
- Monitoring dashboard

### 2. MySQL Workbench (FREE)
- Connect via PlanetScale tunnel
- Visual database design
- Query optimization

### 3. phpMyAdmin (FREE)
- Web-based administration
- Easy data management
- Import/export tools

## 📊 Database Schema Summary

**Total Tables: 10**
1. `admin` - System administrators
2. `agent` - Travel agents
3. `customer` - Customer accounts
4. `package` - Travel packages
5. `hotel` - Hotel listings
6. `vehicle` - Transportation
7. `destinations` - Travel destinations
8. `booking` - Package bookings
9. `hotel_booking` - Hotel reservations
10. `payment` - Payment records

**Sample Data Included:**
- 2 Admin users
- 3 Travel agents
- 2 Sample customers
- 3 Travel packages
- 3 Hotels
- 4 Destinations
- Sample bookings

## 🚀 Quick Deploy Command

```bash
# One-line database setup
pscale database create travel-management && pscale branch create travel-management main
```

**Result: 100% FREE cloud database with all tables and sample data ready for your travel management system!**