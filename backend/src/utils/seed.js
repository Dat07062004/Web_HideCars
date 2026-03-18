require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const Promotion = require('../models/Promotion');
const connectDB = require('./db');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Promotion.deleteMany({});

    // Create sample users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1234567890',
      isVerified: true,
      role: 'user',
    });

    const user2 = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '+1234567891',
      isVerified: true,
      role: 'admin',
    });

    const users = [user1, user2];

    // Create sample cars
    const cars = await Car.insertMany([
      {
        name: 'Toyota Corolla',
        category: 'economy',
        pricePerDay: 50,
        description: 'Reliable and fuel-efficient sedan',
        available: true,
        features: ['Air Conditioning', 'Power Steering', 'CD Player'],
        seatingCapacity: 5,
        fuelType: 'petrol',
        transmission: 'automatic',
      },
      {
        name: 'BMW 3 Series',
        category: 'premium',
        pricePerDay: 150,
        description: 'Luxury performance sedan',
        available: true,
        features: ['Leather Seats', 'Sunroof', 'Navigation System'],
        seatingCapacity: 5,
        fuelType: 'diesel',
        transmission: 'automatic',
      },
      {
        name: 'Mercedes-Benz E-Class',
        category: 'luxury',
        pricePerDay: 250,
        description: 'Ultra-luxury executive sedan',
        available: true,
        features: ['Premium Audio', 'Heated Seats', 'Panoramic Sunroof'],
        seatingCapacity: 5,
        fuelType: 'hybrid',
        transmission: 'automatic',
      },
      {
        name: 'Honda Civic',
        category: 'comfort',
        pricePerDay: 75,
        description: 'Comfortable and spacious family car',
        available: true,
        features: ['Backup Camera', 'AUX Input', 'Power Windows'],
        seatingCapacity: 5,
        fuelType: 'petrol',
        transmission: 'manual',
      },
    ]);

    // Create sample promotions
    await Promotion.insertMany([
      {
        code: 'SAVE20',
        discountPercent: 20,
        description: '20% off on all bookings',
        isActive: true,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'WELCOME10',
        discountPercent: 10,
        description: '10% off for first-time users',
        isActive: true,
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      },
    ]);

    console.log('Database seeded successfully! ✨');
    console.log('📊 Seeded:');
    console.log('   - 2 Users (1 regular + 1 admin)');
    console.log('   - 4 Cars');
    console.log('   - 2 Promotions');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run seed when executed directly
seedDatabase();
