# Car Booking System - Full Stack Application

A complete, production-ready Car Booking System with **separated backend and frontend** architectures.

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Database Design](#database-design)
- [Authentication](#authentication)

## 🎯 Overview

This is a complete car rental booking system with:
- **Backend**: Node.js + Express.js + MongoDB
- **Frontend**: Next.js 14 (App Router) + React 18 + Tailwind CSS
- **Architecture**: MVC pattern with services layer
- **Authentication**: JWT-based security
- **Database**: MongoDB with Mongoose ODM

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Nodemon** - Development server

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Fetch API** - HTTP client
- **React Icons** - Icon library

## 📁 Project Structure

```
Web1/
├── backend/                    # Express.js Backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── models/            # MongoDB schemas
│   │   ├── middlewares/       # Middlewares
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   ├── app.js             # Express app
│   │   └── server.js          # Server entry
│   ├── package.json
│   ├── .env.local
│   └── README.md
│
├── frontend/                   # Next.js Frontend
│   ├── app/
│   │   ├── auth/              # Auth pages
│   │   ├── booking/           # Booking page
│   │   ├── cars/              # Car pages
│   │   ├── profile/           # Profile page
│   │   ├── admin/             # Admin dashboard
│   │   ├── layout.jsx         # Root layout
│   │   ├── page.jsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   ├── services/              # API services
│   ├── utils/                 # Helpers
│   ├── hooks/                 # Custom hooks
│   ├── package.json
│   ├── .env.local
│   └── README.md
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn**

### One-Command Setup (Optional)

\`\`\`bash
# Start both backend and frontend with npm scripts
# Terminal 1: Backend
cd backend && npm install && npm run dev

# Terminal 2: Frontend
cd frontend && npm install && npm run dev
\`\`\`

## 📦 Installation

### 1. Clone and Navigate
```bash
cd Web1
```

### 2. Backend Setup

\`\`\`bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI

# Seed database (optional)
npm run seed
\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Verify API URL points to backend
\`\`\`

## ▶️ Running the Application

### Terminal 1: Start Backend Server

\`\`\`bash
cd backend
npm run dev
```

**Expected output:**
```
Server is running on http://localhost:5000
MongoDB Connected: localhost
```

### Terminal 2: Start Frontend Development Server

```bash
cd frontend
npm run dev
```

**Expected output:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Main Endpoints

#### Authentication
```
POST   /auth/register           - Register user
POST   /auth/login              - Login user
POST   /auth/forgot-password    - Request password reset
POST   /auth/reset-password     - Reset password
PUT    /auth/profile            - Update profile
POST   /auth/change-password    - Change password
GET    /auth/profile            - Get profile
```

#### Cars
```
GET    /cars                    - Get all cars (with filters)
GET    /cars/:id                - Get car details
POST   /cars                    - Create car (admin)
PUT    /cars/:id                - Update car (admin)
DELETE /cars/:id                - Delete car (admin)
PATCH  /cars/:id/toggle-availability - Toggle availability (admin)
```

#### Bookings
```
POST   /booking                 - Create booking
GET    /booking/user            - Get user bookings
GET    /booking/:id             - Get booking details
PUT    /booking/:id             - Update booking
DELETE /booking/:id             - Cancel booking
PATCH  /booking/:id/confirm     - Confirm booking (admin)
```

#### Reviews
```
POST   /review                  - Create review
GET    /review/:carId           - Get car reviews
GET    /review/:carId/rating    - Get average rating
DELETE /review/:id              - Delete review
```

#### Promotions
```
GET    /promotion               - Get all promotions
GET    /promotion/:code         - Get promotion by code
POST   /promotion               - Create promotion (admin)
PUT    /promotion/:id           - Update promotion (admin)
DELETE /promotion/:id           - Delete promotion (admin)
```

## ✨ Features

### Epic 1: Authentication & Account
- ✅ User registration with validation
- ✅ User login with JWT
- ✅ Password reset flow
- ✅ Profile management
- ✅ Change password
- ✅ Account verification ready

### Epic 2: Booking & Service
- ✅ Book a car with date selection
- ✅ Automatic price calculation
- ✅ Booking management (modify, cancel)
- ✅ Booking history
- ✅ Review and rating system
- ✅ Promotion/discount system

### Epic 3: Browsing & Discovery
- ✅ Browse all cars
- ✅ Search by keyword
- ✅ Filter by category (economy, comfort, premium, luxury)
- ✅ Filter by price range
- ✅ View detailed car information
- ✅ See reviews and ratings

### Additional Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Role-based access control (user, admin)
- ✅ Error handling and validation
- ✅ Loading states
- ✅ Toast notifications

## 🗄️ Database Design

### User Schema
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

### Car Schema
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

### Booking Schema
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

### Review Schema
```javascript
{
  userId: ObjectId (ref: User),
  carId: ObjectId (ref: Car),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
```

## 🔐 Authentication

### Flow
1. User registers/logs in
2. Backend validates credentials
3. Backend issues JWT token (7-day expiry)
4. Frontend stores token in localStorage
5. Frontend sends token in Authorization header for protected requests
6. Backend validates token for each protected route

### Testing Credentials (After Seeding)

**User Account:**
```
Email: john@example.com
Password: password123
```

**Admin Account:**
```
Email: admin@example.com
Password: admin123
```

## 🔍 Testing APIs

### Using cURL

**Get All Cars:**
```bash
curl http://localhost:5000/api/cars
```

**Get Cars with Filters:**
```bash
curl "http://localhost:5000/api/cars?category=premium&priceMax=200"
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

## 🌐 Deployment

### Backend Deployment (Heroku, Railway, Render, etc.)

\`\`\`bash
# Set environment variables
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
PORT=5000
\`\`\`

### Frontend Deployment (Vercel)

\`\`\`bash
# Update .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url/api

# Deploy to Vercel
vercel
\`\`\`

## 🐛 Troubleshooting

### Backend Connection Issues
- ✅ Ensure MongoDB is running
- ✅ Check MongoDB URI in .env.local
- ✅ Verify port 5000 is not in use

### Frontend API Errors
- ✅ Check backend is running on http://localhost:5000
- ✅ Verify NEXT_PUBLIC_API_BASE_URL in .env.local
- ✅ Check browser network tab for actual errors

### CORS Errors
- ✅ Backend CORS is configured for localhost:3000
- ✅ Update CORS origin if frontend runs on different port

### Token Expired
- ✅ Tokens expire in 7 days
- ✅ Users must log in again
- ✅ Use forgot password for reset

## 📖 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 🚀 Performance Optimization

- Database indexes on frequently queried fields
- JWT token caching in frontend
- API response compression
- Image optimization in Next.js
- CSS minification with Tailwind

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Input validation on all routes
- ✅ Role-based access control
- ✅ Protected API endpoints
- ✅ Secure token storage (localStorage with security notes)

## 📈 Scalability Features

- Modular services architecture
- Database indexes for performance
- API pagination ready
- Caching mechanisms in place
- Error tracking setup

## 🤝 Contributing

Guidelines for contributing to this project:
1. Follow the MVC architecture
2. Add proper error handling
3. Write meaningful commits
4. Test before submitting

## 📄 License

ISC

## 📧 Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend/frontend READMEs
3. Check application logs

---

**Happy Booking! 🚗**

Built with ❤️ using Next.js, Express.js, and MongoDB
