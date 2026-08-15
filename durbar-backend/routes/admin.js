const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const featuredProducts = await Product.countDocuments({ featured: true });
    const inStockProducts = await Product.countDocuments({ inStock: true });
    const outOfStockProducts = await Product.countDocuments({ inStock: false });

    const totalTestimonials = await Testimonial.countDocuments();
    const featuredTestimonials = await Testimonial.countDocuments({ featured: true });
    const activeTestimonials = await Testimonial.countDocuments({ active: true });

    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      statistics: {
        totalProducts,
        featuredProducts,
        inStockProducts,
        outOfStockProducts,
        totalTestimonials,
        featuredTestimonials,
        activeTestimonials
      },
      recentProducts
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
});

// @route   GET /api/admin/profile
// @desc    Get admin profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

module.exports = router;
