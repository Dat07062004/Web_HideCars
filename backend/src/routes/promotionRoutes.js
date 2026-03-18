const express = require('express');
const promotionController = require('../controllers/promotionController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.get('/', promotionController.getAllPromotions);
router.get('/:code', promotionController.getPromotionByCode);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, promotionController.createPromotion);
router.put('/:id', authMiddleware, adminMiddleware, promotionController.updatePromotion);
router.delete('/:id', authMiddleware, adminMiddleware, promotionController.deletePromotion);

module.exports = router;
