const express = require('express');
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/:carId', reviewController.getCarReviews);
router.get('/:carId/rating', reviewController.getCarAverageRating);

// Protected routes
router.post('/', authMiddleware, reviewController.createReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
