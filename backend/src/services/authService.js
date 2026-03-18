const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { validateEmail, validatePassword } = require('../utils/validation');
const { generateResetToken, sendEmail } = require('../utils/email');
const crypto = require('crypto');

class AuthService {
  static async register(userData) {
    // Validate input
    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email address');
    }

    if (!validatePassword(userData.password)) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create new user
    const user = await User.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
    });

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(email, password) {
    // Validate input
    if (!validateEmail(email)) {
      throw new Error('Invalid email address');
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    console.log('User found for login:', user); // Debugging log
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password
    const isPasswordCorrect = await user.comparePassword(password);
    console.log('Password comparison result:', isPasswordCorrect); // Debugging log
    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const { resetToken, resetTokenHash, resetPasswordExpire } = generateResetToken();

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // In production, send email with reset token
    await sendEmail(email, 'Password Reset', `Reset token: ${resetToken}`);

    return { message: 'Password reset link sent to email' };
  }

  static async resetPassword(resetToken, newPassword) {
    if (!validatePassword(newPassword)) {
      throw new Error('Password must be at least 6 characters');
    }

    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return { message: 'Password reset successfully' };
  }

  static async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name: updateData.name,
        phone: updateData.phone,
        avatar: updateData.avatar,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  static async changePassword(userId, oldPassword, newPassword) {
    if (!validatePassword(newPassword)) {
      throw new Error('Password must be at least 6 characters');
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}

module.exports = AuthService;
