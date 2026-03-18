# Car Booking System - Frontend

## Overview
Modern Next.js (App Router) + Tailwind CSS frontend for the Car Booking System. Connect to the Express backend for complete car rental experience.

## Tech Stack
- **Next.js 14** with App Router
- **React 18** for UI components
- **Tailwind CSS** for styling
- **Fetch API** for REST calls
- **React Icons** for icons

## Project Structure
```
frontend/
  /app
    /auth              # Login, Register, Forgot password
    /booking           # Booking flow
    /cars              # Car listing and details
    /profile           # User profile
    /admin             # Admin dashboard (placeholder)
    layout.jsx         # Root layout
    page.jsx           # Home page
    globals.css        # Global styles
  /components          # Reusable components
  /services            # API integration
  /utils               # Helper functions
  /hooks               # Custom React hooks
  package.json
  tailwind.config.js
  next.config.js
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend will be running at `http://localhost:3000`

## Pages & Features

### Public Pages
- **`/`** - Home page with hero section
- **`/cars`** - Browse all cars with filters
- **`/cars/[id]`** - Car details with reviews
- **`/auth/login`** - User login
- **`/auth/register`** - User registration
- **`/auth/forgot-password`** - Password recovery

### Protected Pages (Requires Login)
- **`/booking`** - Booking form with price calculation
- **`/my-bookings`** - View and cancel user bookings
- **`/profile`** - User profile and settings

### Admin Pages (Placeholder)
- **`/admin`** - Admin dashboard (to be implemented)

## Components

### Navbar.jsx
- Navigation menu
- Authentication state
- Login/Logout functionality
- Mobile responsive

### CarCard.jsx
- Displays car information
- Shows price and availability
- Link to car details

### Alert.jsx
- Success, error, info messages
- Dismissible alerts

### Loading.jsx
- Loading spinner
- Full page centered

### Pagination.jsx
- Page navigation
- Previous/Next buttons

## Services (API Integration)

### authService
- `register()` - Create new account
- `login()` - User login
- `logout()` - Clear token
- `forgotPassword()` - Request password reset
- `resetPassword()` - Reset with token
- `getProfile()` - Fetch user profile
- `updateProfile()` - Update profile info
- `changePassword()` - Change password

### carService
- `getAllCars()` - Get cars with filters
- `getCarById()` - Get car details
- `createCar()` - Create car (admin)
- `updateCar()` - Update car (admin)
- `deleteCar()` - Delete car (admin)
- `toggleAvailability()` - Toggle availability (admin)

### bookingService
- `createBooking()` - Create new booking
- `getUserBookings()` - Get user's bookings
- `getBookingById()` - Get booking details
- `updateBooking()` - Update booking
- `cancelBooking()` - Cancel booking
- `confirmBooking()` - Confirm booking (admin)

### reviewService
- `createReview()` - Add car review
- `getCarReviews()` - Get car reviews
- `getCarAverageRating()` - Get average rating
- `deleteReview()` - Delete review

### promotionService
- `getAllPromotions()` - Get active promotions
- `getPromotionByCode()` - Validate promo code
- `createPromotion()` - Create promo (admin)
- `updatePromotion()` - Update promo (admin)
- `deletePromotion()` - Delete promo (admin)

## Utilities

### api.js
- `apiCall()` - Centralized API requests
- `getAuthToken()` - Retrieve JWT token
- `setAuthToken()` - Store JWT token
- `removeAuthToken()` - Clear JWT token
- `getAuthHeader()` - Add auth header to requests

### helpers.js
- `formatDate()` - Format dates
- `calculateDays()` - Calculate booking days
- `calculateTotalPrice()` - Calculate total cost
- `formatCurrency()` - Format amounts to currency

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Token automatically cleared on logout

## API Request Example

```javascript
// In a component
import { carService } from '@/services/carService';

async function fetchCars() {
  try {
    const response = await carService.getAllCars({
      search: 'Toyota',
      category: 'premium',
      priceMax: 150
    });
    console.log(response.data); // Array of cars
  } catch (error) {
    console.error(error.message);
  }
}
```

## Building for Production

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Optional: For production
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url/api
```

## Features Implemented

✅ **Authentication**
- User registration with validation
- User login with JWT
- Forgot password flow
- Profile management
- Password change

✅ **Car Browsing**
- View all cars
- Search by name
- Filter by category
- Filter by price range
- View car details
- See reviews and ratings

✅ **Booking System**
- Select dates
- Automatic price calculation
- Specify pickup/dropoff locations
- Special requests
- View booking history
- Cancel bookings

✅ **User Profile**
- Update profile information
- Change password
- View account details

✅ **Responsive Design**
- Mobile-first approach
- Tailwind CSS styling
- Mobile menu in navbar

## Styling

### Tailwind CSS Configuration
- Custom colors configured
- Responsive breakpoints (md: 768px)
- Global styles in `globals.css`

### Color Scheme
- Primary: Blue (#3b82f6)
- Secondary: Slate (#1e293b)
- Success: Green
- Error: Red
- Warning: Yellow

## Development Tips

1. **Hot Reload:** Changes auto-refresh in dev mode
2. **Network Tab:** Check API calls in browser DevTools
3. **Local Storage:** View tokens using `localStorage` in console
4. **Protected Routes:** Redirect to login if no token found

## Common Issues

### "API Error" on Login
- Ensure backend is running on `http://localhost:5000`
- Check `.env.local` API URL
- Verify credentials are correct

### Blank Pages After Login
- Check browser console for errors
- Verify token is stored in localStorage
- Check Network tab for API 401 errors

### CORS Errors
- Backend CORS must allow frontend origin
- Check backend `.env` CORS_ORIGIN setting

### Components Not Rendering
- Use `'use client'` directive in components using hooks
- Ensure imports are correct
- Check for TypeScript errors

## Testing Accounts

After seeding the backend database:

**User Account:**
- Email: `john@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## Deployment Checklist

- [ ] Set NEXT_PUBLIC_API_BASE_URL to production backend
- [ ] Test all authentication flows
- [ ] Test booking functionality
- [ ] Verify responsive design on mobile
- [ ] Check console for errors
- [ ] Test on different browsers
- [ ] Implement error boundary
- [ ] Add loading states
- [ ] Set up analytics

## Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard for managing bookings
- [ ] Real-time notifications
- [ ] User reviews and ratings management
- [ ] Advanced filters and sorting
- [ ] Booking history and receipts
- [ ] Loyalty program

## License
ISC
