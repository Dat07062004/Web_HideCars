const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment'],
      minlength: [10, 'Comment must be at least 10 characters'],
    },
  },
  { timestamps: true }
);

// Index for unique review per user per car
reviewSchema.index({ userId: 1, carId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
