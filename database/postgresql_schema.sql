-- PostgreSQL version of Travel Management System Database

-- Admin table
CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent table
CREATE TABLE agent (
    agent_id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admin(admin_id) ON DELETE CASCADE
);

-- Customer table
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
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
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    id_type VARCHAR(20) CHECK (id_type IN ('Passport', 'Driving License', 'Aadhar Card', 'Voter ID')),
    id_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Package table
CREATE TABLE package (
    package_id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    start_location VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    duration_days INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'available',
    image_url VARCHAR(255),
    includes TEXT,
    excludes TEXT,
    max_persons INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE CASCADE
);

-- Hotel table
CREATE TABLE hotel (
    hotel_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    price_per_night DECIMAL(10,2) NOT NULL,
    amenities TEXT,
    image_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle table
CREATE TABLE vehicle (
    bus_id SERIAL PRIMARY KEY,
    agent_id INTEGER NOT NULL,
    bus_number VARCHAR(50) UNIQUE NOT NULL,
    bus_type VARCHAR(20) CHECK (bus_type IN ('AC', 'Non-AC', 'Sleeper', 'Seater')) NOT NULL,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    source VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    fare_per_seat DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE CASCADE
);

-- Destinations table
CREATE TABLE destinations (
    destination_id SERIAL PRIMARY KEY,
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
    booking_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    bus_id INTEGER NULL,
    package_id INTEGER NULL,
    agent_id INTEGER NULL,
    vehicle_id INTEGER NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATE NOT NULL,
    return_date DATE NULL,
    num_people INTEGER DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    seats_booked INTEGER DEFAULT 1,
    booking_status VARCHAR(50) DEFAULT 'confirmed',
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES vehicle(bus_id) ON DELETE SET NULL,
    FOREIGN KEY (package_id) REFERENCES package(package_id) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES agent(agent_id) ON DELETE SET NULL
);

-- Hotel booking table
CREATE TABLE hotel_booking (
    booking_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    hotel_id INTEGER NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_rooms INTEGER NOT NULL DEFAULT 1,
    number_of_guests INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    payment_status VARCHAR(20) DEFAULT 'paid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotel(hotel_id) ON DELETE CASCADE
);

-- Payment table
CREATE TABLE payment (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(20) CHECK (payment_method IN ('credit_card', 'debit_card', 'net_banking', 'UPI', 'cash')) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'paid',
    transaction_id VARCHAR(100) UNIQUE,
    FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO admin (name, email, password, phone) VALUES
('Super Admin', 'admin@travel.com', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', '+91-9876543210'),
('Travel Manager', 'manager@travel.com', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', '+91-9876543211');

INSERT INTO agent (admin_id, name, email, phone, commission_rate, status, password) VALUES
(1, 'John Agent', 'john.agent@travel.com', '+91-9876543212', 5.00, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O'),
(1, 'Jane Agent', 'jane.agent@travel.com', '+91-9876543213', 4.50, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O'),
(2, 'Mike Agent', 'mike.agent@travel.com', '+91-9876543214', 6.00, 'active', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O');

INSERT INTO customer (full_name, address, email, phone, password, city, state, country, gender, id_type, id_number) VALUES
('Rahul Sharma', '123 MG Road, Delhi', 'rahul.sharma@email.com', '+91-9876543220', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Delhi', 'Delhi', 'India', 'Male', 'Passport', 'A1234567'),
('Priya Patel', '456 FC Road, Mumbai', 'priya.patel@email.com', '+91-9876543221', '$2b$12$rOzJg.8K8H8K8H8K8H8K8O', 'Mumbai', 'Maharashtra', 'India', 'Female', 'Aadhar Card', '123456789012');

INSERT INTO package (agent_id, title, description, start_location, destination, duration_days, price, status, includes, excludes, image_url) VALUES
(1, 'Golden Triangle Tour', 'Explore Delhi, Agra, and Jaipur', 'Delhi', 'Delhi-Agra-Jaipur', 7, 25000.00, 'available', 'Accommodation, Meals, Transportation', 'Flight tickets', 'https://images.unsplash.com/photo-1564507592333-c60657eea523'),
(1, 'Kerala Backwaters', 'Experience Kerala backwaters', 'Kochi', 'Kerala', 5, 18000.00, 'available', 'Houseboat stay, Meals', 'Flight tickets', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944');

INSERT INTO hotel (name, location, description, rating, price_per_night, amenities, image_url) VALUES
('Grand Palace Hotel', 'Jaipur, Rajasthan', 'Luxury heritage hotel', 4.5, 8500.00, 'WiFi, Pool, Spa, Restaurant', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'),
('Beach Resort Goa', 'Goa', 'Beautiful beach resort', 4.2, 6500.00, 'WiFi, Pool, Beach Access', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4');

INSERT INTO destinations (name, country, description, image_url, best_time_to_visit) VALUES
('Jaipur', 'India', 'The Pink City of India', 'https://images.unsplash.com/photo-1477587458883-47145ed94245', 'October to March'),
('Kerala', 'India', 'Gods Own Country', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944', 'September to March');