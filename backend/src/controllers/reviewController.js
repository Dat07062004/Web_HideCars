const ReviewService = require('../services/reviewService');

// Create Review
exports.createReview = async (req, res, next) => {
  try {
    const review = await ReviewService.createReview(req.userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// Get Car Reviews
exports.getCarReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getCarReviews(req.params.carId);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// Get Car Average Rating
exports.getCarAverageRating = async (req, res, next) => {
  try {
    const rating = await ReviewService.getCarAverageRating(req.params.carId);

    res.status(200).json({
      success: true,
      data: rating,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Review
exports.deleteReview = async (req, res, next) => {
  try {
    const result = await ReviewService.deleteReview(req.params.id, req.userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
