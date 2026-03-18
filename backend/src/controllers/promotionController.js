const Promotion = require('../models/Promotion');

// Get All Promotions
exports.getAllPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: promotions.length,
      data: promotions,
    });
  } catch (error) {
    next(error);
  }
};

// Get Promotion by Code
exports.getPromotionByCode = async (req, res, next) => {
  try {
    const promotion = await Promotion.findOne({
      code: req.params.code.toUpperCase(),
      isActive: true,
    });

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found',
      });
    }

    if (promotion.expiryDate && promotion.expiryDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Promotion expired',
      });
    }

    if (promotion.maxUses && promotion.usedCount >= promotion.maxUses) {
      return res.status(400).json({
        success: false,
        message: 'Promotion limit reached',
      });
    }

    res.status(200).json({
      success: true,
      data: promotion,
    });
  } catch (error) {
    next(error);
  }
};

// Create Promotion (Admin only)
exports.createPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Promotion created successfully',
      data: promotion,
    });
  } catch (error) {
    next(error);
  }
};

// Update Promotion (Admin only)
exports.updatePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Promotion updated successfully',
      data: promotion,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Promotion (Admin only)
exports.deletePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);

    if (!promotion) {
      return res.status(404).json({
        success: false,
        message: 'Promotion not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Promotion deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
