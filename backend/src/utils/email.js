const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Simple email service (optional)
const sendEmail = async (email, subject, message) => {
  try {
    // For development, just log it
    console.log(`Email sent to ${email}: ${subject}`);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
};

// Generate reset token
const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return {
    resetToken,
    resetTokenHash,
    resetPasswordExpire,
  };
};

module.exports = {
  sendEmail,
  generateResetToken,
};
