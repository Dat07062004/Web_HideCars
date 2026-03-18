const CarService = require('../services/carService');

// Get All Cars
exports.getAllCars = async (req, res, next) => {
  try {
    const cars = await CarService.getAllCars(req.query);

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

// Get Car by ID
exports.getCarById = async (req, res, next) => {
  try {
    const car = await CarService.getCarById(req.params.id);

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

// Create Car (Admin only)
exports.createCar = async (req, res, next) => {
  try {
    const car = await CarService.createCar(req.body);

    res.status(201).json({
      success: true,
      message: 'Car created successfully',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

// Update Car (Admin only)
exports.updateCar = async (req, res, next) => {
  try {
    const car = await CarService.updateCar(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Car (Admin only)
exports.deleteCar = async (req, res, next) => {
  try {
    const result = await CarService.deleteCar(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle Car Availability (Admin only)
exports.toggleAvailability = async (req, res, next) => {
  try {
    const car = await CarService.toggleAvailability(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Car availability toggled',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};
