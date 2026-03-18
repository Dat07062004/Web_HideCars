import { apiCall } from '@/utils/api';

export const reviewService = {
  createReview: async (reviewData) => {
    return apiCall('/review', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },

  getCarReviews: async (carId) => {
    return apiCall(`/review/${carId}`, {
      method: 'GET',
    });
  },

  getCarAverageRating: async (carId) => {
    return apiCall(`/review/${carId}/rating`, {
      method: 'GET',
    });
  },

  deleteReview: async (reviewId) => {
    return apiCall(`/review/${reviewId}`, {
      method: 'DELETE',
    });
  },
};
