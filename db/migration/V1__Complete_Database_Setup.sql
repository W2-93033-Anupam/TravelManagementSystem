-- Travel Management System - Complete Database Setup
-- Version: 1.0.0
-- Description: Complete database schema with sample data for immediate use

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Admin table
CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent table
CREATE TABLE agent (
    agent_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    commission_rate DECIMAL(5,2) DEFAULT 0.00,
    status ENUM('active', 'inactive') DEFAULT 'active',
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
);

-- Customer table with profile fields
CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    id_type ENUM('Passport', 'Driving License', 'Aadhar Card', 'Voter ID'),
    id_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Package table
CREATE TABLE package (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
    agent_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    start_location VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    duration_days INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('available', 'unavailable') DEFAULT 'available',
    image_url VARCHAR(255),
    includes TEXT,
    excludes TEXT,
    max_persons INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE CASCADE
);

-- Hotel table
CREATE TABLE hotel (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    price_per_night DECIMAL(10,2) NOT NULL,
    amenities TEXT,
    image_url VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicle table
CREATE TABLE vehicle (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    agent_id INT NOT NULL,
    bus_number VARCHAR(50) UNIQUE NOT NULL,
    bus_type ENUM('AC', 'Non-AC', 'Sleeper', 'Seater') NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    fare_per_seat DECIMAL(10,2) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE CASCADE
);

-- Destinations table
CREATE TABLE destinations (
    destination_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    best_time_to_visit VARCHAR(100),
    popular_attractions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Booking table
CREATE TABLE booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    bus_id INT NULL,
    package_id INT NULL,
    agent_id INT NULL,
    vehicle_id INT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATE NOT NULL,
    return_date DATE NULL,
    num_people INT DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    seats_booked INT DEFAULT 1,
    booking_status VARCHAR(50) DEFAULT 'confirmed',
    status ENUM('confirmed', 'cancelled', 'pending', 'completed') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES vehicle(bus_id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES package(package_id) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE SET NULL
);

-- Hotel booking table
CREATE TABLE hotel_booking (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    hotel_id INT NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_rooms INT NOT NULL DEFAULT 1,
    number_of_guests INT NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('confirmed', 'cancelled', 'pending', 'completed') DEFAULT 'confirmed',
    payment_status ENUM('paid', 'unpaid', 'failed') DEFAULT 'paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
);

-- Payment table
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('credit_card', 'debit_card', 'net_banking', 'UPI', 'cash') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status ENUM('paid', 'unpaid', 'failed') DEFAULT 'paid',
    transaction_id VARCHAR(100) UNIQUE,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Sample admin users
INSERT INTO admin (name, email, password, phone) VALUES
('Super Admin', 'admin@travel.com', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', '+91-9876543210'),
('Travel Manager', 'manager@travel.com', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', '+91-9876543211');

-- Sample agents
INSERT INTO agent (admin_id, name, email, phone, commission_rate, status, password) VALUES
(1, 'John Agent', 'john.agent@travel.com', '+91-9876543212', 5.00, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O'),
(1, 'Jane Agent', 'jane.agent@travel.com', '+91-9876543213', 4.50, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O'),
(2, 'Mike Agent', 'mike.agent@travel.com', '+91-9876543214', 6.00, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O');

-- Sample customers
INSERT INTO customer (full_name, address, email, phone, password, city, state, country, gender, id_type, id_number) VALUES
('Rahul Sharma', '123 MG Road, Delhi', 'rahul.sharma@email.com', '+91-9876543220', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Delhi', 'Delhi', 'India', 'Male', 'Passport', 'A1234567'),
('Priya Patel', '456 FC Road, Mumbai', 'priya.patel@email.com', '+91-9876543221', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Mumbai', 'Maharashtra', 'India', 'Female', 'Aadhar Card', '123456789012'),
('Amit Kumar', '789 Brigade Road, Bangalore', 'amit.kumar@email.com', '+91-9876543222', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Bangalore', 'Karnataka', 'India', 'Male', 'Driving License', 'DL1234567890'),
('Sneha Singh', '321 Park Street, Kolkata', 'sneha.singh@email.com', '+91-9876543223', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Kolkata', 'West Bengal', 'India', 'Female', 'Voter ID', 'VOTE123456');

-- Sample packages
INSERT INTO package (agent_id, title, description, start_location, destination, duration_days, price, status, includes, excludes, image_url) VALUES
(1, 'Golden Triangle Tour', 'Explore Delhi, Agra, and Jaipur in this classic India tour', 'Delhi', 'Delhi-Agra-Jaipur', 7, 25000.00, 'available', 'Accommodation, Meals, Transportation, Guide', 'Flight tickets, Personal expenses', 'https://images.unsplash.com/photo-1564507592333-c60657eea523'),
(1, 'Kerala Backwaters', 'Experience the serene backwaters of Kerala', 'Kochi', 'Kerala', 5, 18000.00, 'available', 'Houseboat stay, Meals, Transportation', 'Flight tickets, Personal expenses', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944'),
(2, 'Goa Beach Holiday', 'Relax on the beautiful beaches of Goa', 'Mumbai', 'Goa', 4, 15000.00, 'available', 'Beach resort stay, Breakfast, Airport transfer', 'Lunch, Dinner, Activities', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2'),
(2, 'Himalayan Adventure', 'Trekking and adventure in the Himalayas', 'Delhi', 'Himachal Pradesh', 10, 35000.00, 'available', 'Accommodation, Meals, Trekking guide, Equipment', 'Flight tickets, Personal gear', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'),
(3, 'Rajasthan Royal Tour', 'Experience the royal heritage of Rajasthan', 'Jaipur', 'Rajasthan', 8, 28000.00, 'available', 'Palace hotels, Meals, Cultural shows, Guide', 'Flight tickets, Shopping', 'https://images.unsplash.com/photo-1477587458883-47145ed94245');

-- Sample hotels
INSERT INTO hotel (name, location, description, rating, price_per_night, amenities, image_url) VALUES
('Grand Palace Hotel', 'Jaipur, Rajasthan', 'Luxury heritage hotel with royal ambiance', 4.5, 8500.00, 'WiFi, Pool, Spa, Restaurant, Room Service', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'),
('Backwater Resort', 'Alleppey, Kerala', 'Serene resort on Kerala backwaters', 4.2, 6500.00, 'WiFi, Restaurant, Boat Service, Ayurveda Spa', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'),
('Beach Paradise Resort', 'Goa', 'Beachfront resort with stunning ocean views', 4.3, 7200.00, 'WiFi, Pool, Beach Access, Restaurant, Bar', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'),
('Mountain View Hotel', 'Manali, Himachal Pradesh', 'Cozy hotel with mountain views', 4.0, 4500.00, 'WiFi, Restaurant, Heater, Mountain View', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'),
('Spiritual Retreat', 'Rishikesh, Uttarakhand', 'Peaceful hotel near the Ganges', 4.1, 3800.00, 'WiFi, Yoga Classes, Restaurant, River View', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96');

-- Sample destinations
INSERT INTO destinations (name, country, description, image_url, best_time_to_visit, popular_attractions) VALUES
('Rajasthan', 'India', 'Land of kings with magnificent palaces and forts', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'October to March', 'Jaipur City Palace, Udaipur Lake Palace, Jaisalmer Fort'),
('Kerala', 'India', 'Gods own country with backwaters and spices', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'September to March', 'Alleppey Backwaters, Munnar Tea Gardens, Kochi Fort'),
('Goa', 'India', 'Beach paradise with Portuguese heritage', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'November to February', 'Baga Beach, Old Goa Churches, Dudhsagar Falls'),
('Himachal Pradesh', 'India', 'Mountain state with adventure opportunities', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'March to June, September to November', 'Shimla Mall Road, Manali Solang Valley, Dharamshala'),
('Uttarakhand', 'India', 'Land of gods with spiritual and adventure tourism', 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'April to June, September to November', 'Rishikesh, Haridwar, Valley of Flowers, Kedarnath');

-- Sample vehicles
INSERT INTO vehicle (agent_id, bus_number, bus_type, total_seats, available_seats, source, destination, departure_time, arrival_time, fare_per_seat, status) VALUES
(1, 'DL01AB1234', 'AC', 40, 35, 'Delhi', 'Agra', '2024-12-15 06:00:00', '2024-12-15 09:30:00', 500.00, 'active'),
(1, 'MH02CD5678', 'Sleeper', 30, 28, 'Mumbai', 'Goa', '2024-12-15 22:00:00', '2024-12-16 08:00:00', 800.00, 'active'),
(2, 'KL03EF9012', 'Non-AC', 50, 45, 'Kochi', 'Munnar', '2024-12-15 07:00:00', '2024-12-15 11:00:00', 300.00, 'active'),
(2, 'HP04GH3456', 'AC', 35, 30, 'Delhi', 'Manali', '2024-12-15 20:00:00', '2024-12-16 08:00:00', 1200.00, 'active'),
(3, 'RJ05IJ7890', 'Seater', 45, 40, 'Jaipur', 'Udaipur', '2024-12-15 08:00:00', '2024-12-15 14:00:00', 600.00, 'active');

-- Sample bookings
INSERT INTO booking (customer_id, bus_id, package_id, travel_date, total_amount, seats_booked, status) VALUES
(1, 1, NULL, '2024-12-15', 1000.00, 2, 'confirmed'),
(2, NULL, 1, '2024-12-20', 25000.00, 1, 'confirmed'),
(3, 2, NULL, '2024-12-16', 1600.00, 2, 'confirmed'),
(4, NULL, 2, '2024-12-25', 18000.00, 1, 'confirmed'),
(1, NULL, 3, '2025-01-05', 15000.00, 1, 'confirmed');

-- Sample payments
INSERT INTO payment (booking_id, payment_method, amount, payment_status, transaction_id) VALUES
(1, 'UPI', 1000.00, 'paid', 'TXN001234567890'),
(2, 'credit_card', 25000.00, 'paid', 'TXN001234567891'),
(3, 'debit_card', 1600.00, 'paid', 'TXN001234567892'),
(4, 'net_banking', 18000.00, 'paid', 'TXN001234567893'),
(5, 'UPI', 15000.00, 'paid', 'TXN001234567894');