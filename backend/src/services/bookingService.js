const Booking = require('../models/Booking');
const Car = require('../models/Car');
const { validateBookingDates } = require('../utils/validation');

class BookingService {
  static async createBooking(userId, bookingData) {
    // Validate dates
    if (!validateBookingDates(bookingData.startDate, bookingData.endDate)) {
      throw new Error('Invalid booking dates');
    }

    // Check if car exists and is available
    const car = await Car.findById(bookingData.carId);
    if (!car) {
      throw new Error('Car not found');
    }

    if (!car.available) {
      throw new Error('Car is not available');
    }

    // Calculate total price
    const startDate = new Date(bookingData.startDate);
    const endDate = new Date(bookingData.endDate);
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const totalPrice = car.pricePerDay * numberOfDays;

    // Create booking
    const booking = await Booking.create({
      userId,
      carId: bookingData.carId,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      numberOfDays,
      totalPrice,
      pickupLocation: bookingData.pickupLocation || '',
      dropoffLocation: bookingData.dropoffLocation || '',
      specialRequests: bookingData.specialRequests || '',
    });

    await booking.populate('carId userId');
    return booking;
  }

  static async getUserBookings(userId) {
    const bookings = await Booking.find({ userId })
      .populate('carId')
      .populate('userId', 'name email phone');

    return bookings;
  }

  static async getBookingById(bookingId) {
    const booking = await Booking.findById(bookingId)
      .populate('carId')
      .populate('userId', 'name email phone');

    if (!booking) {
      throw new Error('Booking not found');
    }

    return booking;
  }

  static async updateBooking(bookingId, userId, updateData) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.userId.toString() !== userId) {
      throw new Error('Not authorized to update this booking');
    }

    if (booking.status !== 'pending') {
      throw new Error('Can only modify pending bookings');
    }

    Object.assign(booking, updateData);
    await booking.save();

    return booking;
  }

  static async cancelBooking(bookingId, userId) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.userId.toString() !== userId) {
      throw new Error('Not authorized to cancel this booking');
    }

    if (booking.status === 'cancelled') {
      throw new Error('Booking is already cancelled');
    }

    booking.status = 'cancelled';
    await booking.save();

    return booking;
  }

  static async confirmBooking(bookingId) {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error('Booking not found');
    }

    booking.status = 'confirmed';
    await booking.save();

    return booking;
  }
}

module.exports = BookingService;
