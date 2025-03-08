# Booking Service - Flight Booking Application

## Overview
The `booking-service` is a microservice within the Flight Booking Application, responsible for handling flight bookings, managing payments, and ensuring seat availability. It is built using Node.js and Express.js, with MySQL as the database and Sequelize as the ORM.

## Features
- **Express.js server** for handling API requests
- **Sequelize ORM** for database interactions
- **MySQL database** for storing booking details
- **Booking management** with status updates
- **Payment processing** with idempotency key handling
- **Seat availability validation** to prevent overbooking
- **Automated cleanup** of unpaid bookings using cron jobs
- **Logging with Winston** for debugging and monitoring

## Environment Variables
Ensure you have a `.env` file with the following variables:
```
PORT=4000
FLIGHT_SERVICE='http://localhost:3500'
```

## Installation
### Prerequisites
- Node.js installed on your machine
- MySQL database running

### Steps
1. Clone the repository:
   ```sh
   git clone <https://github.com/faridomarAf/flight-booking-service.git>
   cd booking-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Initialize Sequelize:
   ```sh
   npx sequelize init
   ```
4. Create the `Booking` model:
   ```sh
   npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum,noOfSeats:integer,totalCost:integer
   ```
5. Run database migrations:
   ```sh
   npx sequelize db:migrate
   ```

## Usage
### Development Mode
To start the server in development mode:
```sh
npm run dev
```

## Booking Management
### Booking Creation
- Users can book a flight by providing flight details, number of seats, and payment confirmation.
- Seat availability is validated before confirming a booking.

### Booking Cancellation
- If a booking is canceled, the reserved seats are returned to the available seats in the flight.
- A function `cancelBooking` is implemented to handle this logic.

### Automatic Cleanup for Unpaid Bookings
- If a booking is **initiated but not paid within 5 minutes**, it is automatically canceled.
- To achieve this, `node-cron` is used to schedule a task that checks and cancels such bookings every 5 minutes.
- Install `node-cron`:
  ```sh
  npm install node-cron
  ```

## Payment Handling
### Idempotent Key for Payments
- An **idempotent key** ensures that a payment request is processed only once, even if sent multiple times.
- A temporary in-memory object is used to store `idempotencyKey` in the `payment-controller`.
- A better approach is to use **Redis** or a **database table** for storing `idempotencyKey`.

## Dependencies
- `express` - Web framework for Node.js
- `dotenv` - Environment variable management
- `winston` - Logging library
- `http-status-codes` - Standard HTTP status codes
- `mysql2` - MySQL database driver
- `sequelize` - ORM for MySQL
- `sequelize-cli` - CLI tool for managing Sequelize
- `node-cron` - Task scheduling for automatic cleanup
- `axios` - HTTP client for external API calls

## Author
**Farid**

