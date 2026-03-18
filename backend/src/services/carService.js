const Car = require('../models/Car');

class CarService {
  static async getAllCars(filters = {}) {
    let query = {};

    // Search by keyword
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (filters.category) {
      query.category = filters.category;
    }

    // Filter by price range
    if (filters.priceMin || filters.priceMax) {
      query.pricePerDay = {};
      if (filters.priceMin) query.pricePerDay.$gte = parseFloat(filters.priceMin);
      if (filters.priceMax) query.pricePerDay.$lte = parseFloat(filters.priceMax);
    }

    // Filter by availability
    if (filters.available !== undefined) {
      query.available = filters.available === 'true' || filters.available === true;
    }

    const cars = await Car.find(query);
    return cars;
  }

  static async getCarById(carId) {
    const car = await Car.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    return car;
  }

  static async createCar(carData) {
    const car = await Car.create(carData);
    return car;
  }

  static async updateCar(carId, updateData) {
    const car = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      throw new Error('Car not found');
    }

    return car;
  }

  static async deleteCar(carId) {
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    return { message: 'Car deleted successfully' };
  }

  static async toggleAvailability(carId) {
    const car = await Car.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    car.available = !car.available;
    await car.save();

    return car;
  }
}

module.exports = CarService;
