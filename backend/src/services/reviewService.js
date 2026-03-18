const Review = require('../models/Review');
const Booking = require('../models/Booking');

class ReviewService {
  static async createReview(userId, reviewData) {
    // Check if user has booked this car
    const booking = await Booking.findOne({
      userId,
      carId: reviewData.carId,
      status: 'confirmed',
    });

    if (!booking) {
      throw new Error('You can only review cars you have booked');
    }

    // Check for existing review
    const existingReview = await Review.findOne({
      userId,
      carId: reviewData.carId,
    });

    if (existingReview) {
      throw new Error('You have already reviewed this car');
    }

    const review = await Review.create({
      userId,
      carId: reviewData.carId,
      rating: reviewData.rating,
      comment: reviewData.comment,
    });

    await review.populate('userId', 'name avatar');

    return review;
  }

  static async getCarReviews(carId) {
    const reviews = await Review.find({ carId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });

    return reviews;
  }

  static async getCarAverageRating(carId) {
    const result = await Review.aggregate([
      { $match: { carId: require('mongoose').Types.ObjectId(carId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    return result[0] || { averageRating: 0, totalReviews: 0 };
  }

  static async deleteReview(reviewId, userId) {
    const review = await Review.findById(reviewId);

    if (!review) {
      throw new Error('Review not found');
    }

    if (review.userId.toString() !== userId) {
      throw new Error('Not authorized to delete this review');
    }

    await Review.findByIdAndDelete(reviewId);

    return { message: 'Review deleted successfully' };
  }
}

module.exports = ReviewService;
