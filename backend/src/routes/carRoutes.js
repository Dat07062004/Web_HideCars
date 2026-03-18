const express = require('express');
const carController = require('../controllers/carController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, carController.createCar);
router.put('/:id', authMiddleware, adminMiddleware, carController.updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, carController.deleteCar);
router.patch('/:id/toggle-availability', authMiddleware, adminMiddleware, carController.toggleAvailability);

module.exports = router;
