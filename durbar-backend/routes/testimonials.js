const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/testimonials/upload
// @desc    Upload testimonial image (admin only)
// @access  Private
router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Return the file path
    res.json({
      imagePath: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error uploading file' });
  }
});

// @route   GET /api/testimonials
// @desc    Get all testimonials (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { featured, active } = req.query;
    let query = {};

    if (featured === 'true') {
      query.featured = true;
    }

    if (active === 'true') {
      query.active = true;
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ message: 'Server error fetching testimonials' });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get single testimonial (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({ message: 'Server error fetching testimonial' });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial (admin only)
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { clientName, company, testimonial, rating, featured, active } = req.body;
    
    // Use uploaded file path or provided URL or default
    let imagePath = 'https://img.icons8.com/color/480/user.png';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    const newTestimonial = new Testimonial({
      clientName,
      company,
      testimonial,
      rating: rating || 5,
      image: imagePath,
      featured: featured || false,
      active: active !== undefined ? active : true
    });

    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ message: 'Server error creating testimonial' });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial (admin only)
// @access  Private
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { clientName, company, testimonial, rating, featured, active } = req.body;

    const testimonialDoc = await Testimonial.findById(req.params.id);
    if (!testimonialDoc) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    // Update fields
    if (clientName) testimonialDoc.clientName = clientName;
    if (company) testimonialDoc.company = company;
    if (testimonial) testimonialDoc.testimonial = testimonial;
    if (rating !== undefined) testimonialDoc.rating = rating;
    if (featured !== undefined) testimonialDoc.featured = featured;
    if (active !== undefined) testimonialDoc.active = active;
    
    // Handle image update
    if (req.file) {
      testimonialDoc.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      testimonialDoc.image = req.body.image;
    }

    await testimonialDoc.save();
    res.json(testimonialDoc);
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({ message: 'Server error updating testimonial' });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial (admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({ message: 'Server error deleting testimonial' });
  }
});

module.exports = router;
