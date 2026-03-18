const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  return validator.isLength(password, { min: 6 });
};

const validatePhoneNumber = (phone) => {
  return validator.isMobilePhone(phone, 'any', { strictMode: false });
};

const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end > start;
};

const validateBookingDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return start >= today && end > start;
};

module.exports = {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateDateRange,
  validateBookingDates,
};
