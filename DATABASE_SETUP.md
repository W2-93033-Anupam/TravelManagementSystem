# Database Migration with Flyway

This project uses Flyway for database version control and migration management.

## Prerequisites

1. **MySQL Server** running on localhost:3306
2. **Flyway CLI** installed (Download from https://flywaydb.org/download/)
3. **MySQL JDBC Driver** (usually included with Flyway)

## Quick Setup

### Option 1: Using Flyway CLI

1. **Install Flyway CLI**
   ```bash
   # Download from https://flywaydb.org/download/
   # Extract and add to PATH
   ```

2. **Run Migrations**
   ```bash
   # Navigate to project root
   cd /path/to/travel-management-system
   
   # Run migrations
   flyway migrate
   
   # Check migration status
   flyway info
   ```

### Option 2: Manual Database Setup

If you don't want to use Flyway, you can run the migrations manually:

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS travelmanagementsystem;"

# Run migrations in order
mysql -u root -p travelmanagementsystem < db/migration/V1__Create_core_tables.sql
mysql -u root -p travelmanagementsystem < db/migration/V2__Add_customer_profile_fields.sql
mysql -u root -p travelmanagementsystem < db/migration/V3__Create_hotel_tables.sql
mysql -u root -p travelmanagementsystem < db/migration/V4__Insert_sample_data.sql
```

## Migration Files

- **V1__Create_core_tables.sql** - Core tables (admin, agent, package, vehicle, customer, booking, payment, destinations)
- **V2__Add_customer_profile_fields.sql** - Customer profile enhancements (id_type, id_number, gender, country)
- **V3__Create_hotel_tables.sql** - Hotel management tables (hotel, hotel_booking)
- **V4__Insert_sample_data.sql** - Sample data for testing

## Configuration

Update `flyway.conf` with your database credentials:

```properties
flyway.url=jdbc:mysql://localhost:3306/travelmanagementsystem?createDatabaseIfNotExist=true
flyway.user=your_username
flyway.password=your_password
```

## Useful Flyway Commands

```bash
# Check migration status
flyway info

# Run pending migrations
flyway migrate

# Validate applied migrations
flyway validate

# Clean database (removes all objects)
flyway clean

# Repair metadata table
flyway repair
```

## Database Schema Overview

### Core Tables
- `admin` - System administrators
- `agent` - Travel agents
- `customer` - Customer accounts with profile details
- `package` - Travel packages
- `vehicle` - Transportation (buses)
- `hotel` - Hotel information
- `destinations` - Travel destinations

### Booking Tables
- `booking` - Package and vehicle bookings
- `hotel_booking` - Hotel reservations
- `payment` - Payment records

### Sample Data Included
- 2 Admin users
- 3 Travel agents
- 5 Travel packages
- 5 Vehicles/buses
- 5 Hotels
- 4 Sample customers
- 5 Sample bookings
- 5 Payment records
- 5 Destinations with images

## Troubleshooting

1. **Connection Issues**: Verify MySQL is running and credentials are correct
2. **Permission Issues**: Ensure database user has CREATE, ALTER, INSERT privileges
3. **Migration Conflicts**: Use `flyway repair` if metadata is corrupted
4. **Clean Start**: Use `flyway clean` followed by `flyway migrate` for fresh setup