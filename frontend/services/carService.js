import { apiCall } from '@/utils/api';

export const carService = {
  getAllCars: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiCall(`/cars${queryParams ? '?' + queryParams : ''}`, {
      method: 'GET',
    });
  },

  getCarById: async (carId) => {
    return apiCall(`/cars/${carId}`, {
      method: 'GET',
    });
  },

  createCar: async (carData) => {
    return apiCall('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
  },

  updateCar: async (carId, carData) => {
    return apiCall(`/cars/${carId}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
  },

  deleteCar: async (carId) => {
    return apiCall(`/cars/${carId}`, {
      method: 'DELETE',
    });
  },

  toggleAvailability: async (carId) => {
    return apiCall(`/cars/${carId}/toggle-availability`, {
      method: 'PATCH',
    });
  },
};
