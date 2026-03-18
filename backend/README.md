# Car Booking System - Backend

## Overview
Complete Express.js + MongoDB backend for a Car Booking System with JWT authentication, full CRUD operations for cars, bookings, reviews, and promotions.

## Tech Stack
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for Authentication
- **CORS** enabled
- **Bcryptjs** for password hashing

## Project Structure
```
backend/
  /src
    /controllers      # Request handlers
    /routes          # API routes
    /models          # MongoDB schemas
    /middlewares     # Auth & error handling
    /services        # Business logic
    /utils           # Helpers (JWT, validation, DB, email)
    app.js           # Express configuration
    server.js        # Server entry point
  package.json
  .env.local
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and update:
```env
MONGO_URI=mongodb://localhost:27017/car-booking
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

### 3. Start MongoDB
Make sure MongoDB is running:
```bash
# On Windows (if installed as service)
mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongo mongo:latest
```

### 4. Seed Database (Optional)
```bash
npm run seed
```
This creates sample users, cars, and promotions.

### 5. Start Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server will be running at `http://localhost:5000`

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Create new account
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/forgot-password` - Request password reset
- **POST** `/api/auth/reset-password` - Reset password with token
- **POST** `/api/auth/change-password` - Change password (requires auth)
- **GET** `/api/auth/profile` - Get user profile (requires auth)
- **PUT** `/api/auth/profile` - Update profile (requires auth)

### Cars
- **GET** `/api/cars` - Get all cars with filters
  - Query: `search`, `category`, `priceMin`, `priceMax`
- **GET** `/api/cars/:id` - Get car details
- **POST** `/api/cars` - Create car (admin only)
- **PUT** `/api/cars/:id` - Update car (admin only)
- **DELETE** `/api/cars/:id` - Delete car (admin only)
- **PATCH** `/api/cars/:id/toggle-availability` - Toggle availability (admin)

### Bookings
- **POST** `/api/booking` - Create booking (requires auth)
- **GET** `/api/booking/user` - Get user's bookings (requires auth)
- **GET** `/api/booking/:id` - Get booking details (requires auth)
- **PUT** `/api/booking/:id` - Update booking (requires auth)
- **DELETE** `/api/booking/:id` - Cancel booking (requires auth)
- **PATCH** `/api/booking/:id/confirm` - Confirm booking (admin only)

### Reviews
- **POST** `/api/review` - Create review (requires auth)
- **GET** `/api/review/:carId` - Get car reviews
- **GET** `/api/review/:carId/rating` - Get average rating
- **DELETE** `/api/review/:id` - Delete review (requires auth)

### Promotions
- **GET** `/api/promotion` - Get all active promotions
- **GET** `/api/promotion/:code` - Get promotion by code
- **POST** `/api/promotion` - Create promotion (admin only)
- **PUT** `/api/promotion/:id` - Update promotion (admin only)
- **DELETE** `/api/promotion/:id` - Delete promotion (admin only)

## Sample User Accounts (After Seeding)

**Regular User:**
- Email: `john@example.com`
- Password: `password123`

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`

## Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user" | "admin",
  phone: String,
  avatar: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Car
```javascript
{
  name: String,
  category: "economy" | "comfort" | "premium" | "luxury",
  pricePerDay: Number,
  description: String,
  images: [String],
  available: Boolean,
  features: [String],
  seatingCapacity: Number,
  fuelType: "petrol" | "diesel" | "hybrid" | "electric",
  transmission: "manual" | "automatic"
}
```

### Booking
```javascript
{
  userId: ObjectId (ref: User),
  carId: ObjectId (ref: Car),
  startDate: Date,
  endDate: Date,
  status: "pending" | "confirmed" | "cancelled",
  totalPrice: Number,
  numberOfDays: Number,
  pickupLocation: String,
  dropoffLocation: String,
  specialRequests: String
}
```

### Review
```javascript
{
  userId: ObjectId (ref: User),
  carId: ObjectId (ref: Car),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

## Features Implemented

✅ **Authentication & Authorization**
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (user/admin)
- Password reset functionality

✅ **Car Management**
- Full CRUD operations
- Search and filter by name, category, price
- Availability tracking

✅ **Booking System**
- Create, read, update, cancel bookings
- Automatic price calculation
- Status management

✅ **Reviews & Ratings**
- Users can review cars they've booked
- Unique review per user per car
- Average rating calculation

✅ **Promotions**
- Create and manage discount codes
- Expiry date and usage limit tracking

✅ **Error Handling**
- Comprehensive error middleware
- Input validation
- Duplicate key error handling
- JWT error handling

## Testing the APIs

### Using Postman or cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get All Cars:**
```bash
curl http://localhost:5000/api/cars
```

**Get Cars with Filter:**
```bash
curl "http://localhost:5000/api/cars?category=premium&priceMax=200"
```

**Create Booking (requires auth):**
```bash
curl -X POST http://localhost:5000/api/booking \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "carId": "car_id_here",
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "pickupLocation": "Airport",
    "dropoffLocation": "City Center"
  }'
```

## Environment Variables

```env
# Database
MONGO_URI=mongodb://localhost:27017/car-booking

# Authentication
JWT_SECRET=super_secret_key_change_in_production

# Server
NODE_ENV=development
PORT=5000

# Email (Optional)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Development Notes

- All passwords are automatically hashed before saving
- JWT tokens expire in 7 days
- Timestamps (createdAt, updatedAt) are automatic
- Middleware order matters in app.js
- Error middleware must be last in app.js

## Production Deployment

1. **Environment Variables:** Update all secrets in production
2. **JWT Secret:** Use a strong, random secret
3. **MongoDB:** Use managed service (MongoDB Atlas)
4. **CORS:** Update allowed origins
5. **Rate Limiting:** Consider adding rate limiting middleware
6. **Logging:** Implement proper logging

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGO_URI in .env.local
- Verify port 27017 is accessible

### JWT Errors
- Token might be expired (expires in 7 days)
- Check Authorization header format: `Bearer TOKEN`

### CORS Errors
- Frontend origin must match CORS_ORIGIN in backend
- Update CORS config in app.js if needed

## License
ISC
