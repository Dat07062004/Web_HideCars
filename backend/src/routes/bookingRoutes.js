const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, bookingController.createBooking);
router.get('/user', authMiddleware, bookingController.getUserBookings);
router.get('/:id', authMiddleware, bookingController.getBookingById);
router.put('/:id', authMiddleware, bookingController.updateBooking);
router.delete('/:id', authMiddleware, bookingController.cancelBooking);

// Admin routes
router.patch('/:id/confirm', authMiddleware, adminMiddleware, bookingController.confirmBooking);

module.exports = router;
