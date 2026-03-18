const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a car name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['economy', 'comfort', 'premium', 'luxury'],
      default: 'economy',
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Please provide a price per day'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      default: '',
    },
    images: [String],
    available: {
      type: Boolean,
      default: true,
    },
    features: [String],
    seatingCapacity: {
      type: Number,
      default: 5,
    },
    fuelType: {
      type: String,
      enum: ['petrol', 'diesel', 'hybrid', 'electric'],
      default: 'petrol',
    },
    transmission: {
      type: String,
      enum: ['manual', 'automatic'],
      default: 'automatic',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
