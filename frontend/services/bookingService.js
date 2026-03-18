import { apiCall } from '@/utils/api';

export const bookingService = {
  createBooking: async (bookingData) => {
    return apiCall('/booking', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  },

  getUserBookings: async () => {
    return apiCall('/booking/user', {
      method: 'GET',
    });
  },

  getBookingById: async (bookingId) => {
    return apiCall(`/booking/${bookingId}`, {
      method: 'GET',
    });
  },

  updateBooking: async (bookingId, bookingData) => {
    return apiCall(`/booking/${bookingId}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData),
    });
  },

  cancelBooking: async (bookingId) => {
    return apiCall(`/booking/${bookingId}`, {
      method: 'DELETE',
    });
  },

  confirmBooking: async (bookingId) => {
    return apiCall(`/booking/${bookingId}/confirm`, {
      method: 'PATCH',
    });
  },
};
