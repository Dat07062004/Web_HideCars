import { apiCall } from '@/utils/api';

export const promotionService = {
  getAllPromotions: async () => {
    return apiCall('/promotion', {
      method: 'GET',
    });
  },

  getPromotionByCode: async (code) => {
    return apiCall(`/promotion/${code}`, {
      method: 'GET',
    });
  },

  createPromotion: async (promotionData) => {
    return apiCall('/promotion', {
      method: 'POST',
      body: JSON.stringify(promotionData),
    });
  },

  updatePromotion: async (promotionId, promotionData) => {
    return apiCall(`/promotion/${promotionId}`, {
      method: 'PUT',
      body: JSON.stringify(promotionData),
    });
  },

  deletePromotion: async (promotionId) => {
    return apiCall(`/promotion/${promotionId}`, {
      method: 'DELETE',
    });
  },
};
