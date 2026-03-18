const BookingService = require('../services/bookingService');

// Create Booking
exports.createBooking = async (req, res, next) => {
  try {
    const booking = await BookingService.createBooking(req.userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Get User Bookings
exports.getUserBookings = async (req, res, next) => {
  try {
    const bookings = await BookingService.getUserBookings(req.userId);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// Get Booking by ID
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await BookingService.getBookingById(req.params.id);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Update Booking
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await BookingService.updateBooking(req.params.id, req.userId, req.body);

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await BookingService.cancelBooking(req.params.id, req.userId);

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// Confirm Booking (Admin only)
exports.confirmBooking = async (req, res, next) => {
  try {
    const booking = await BookingService.confirmBooking(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
