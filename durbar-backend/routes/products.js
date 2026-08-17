const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/products/upload
// @desc    Upload product image (admin only)
// @access  Private
router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Handle both Cloudinary and local storage responses
    let imagePath;
    if (req.file.path) {
      // Cloudinary response
      imagePath = req.file.path;
    } else if (req.file.filename) {
      // Local storage response
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      return res.status(500).json({ message: 'File upload failed - no file path received' });
    }
    
    res.json({
      imagePath: imagePath,
      filename: req.file.filename || req.file.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error uploading file' });
  }
});

// @route   GET /api/products
// @desc    Get all products (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

// @route   POST /api/products
// @desc    Create new product (admin only)
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, featured, inStock } = req.body;
    
    // Use uploaded file path or provided URL or default
    let imagePath = 'https://img.icons8.com/color/480/medical-doctor.png';
    if (req.file) {
      // Handle both Cloudinary and local storage
      if (req.file.path) {
        imagePath = req.file.path; // Cloudinary URL
      } else if (req.file.filename) {
        imagePath = `/uploads/${req.file.filename}`; // Local path
      }
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    const product = new Product({
      name,
      price,
      category,
      description,
      image: imagePath,
      featured: featured || false,
      inStock: inStock !== undefined ? inStock : true
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error creating product' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (admin only)
// @access  Private
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, featured, inStock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (description) product.description = description;
    if (featured !== undefined) product.featured = featured;
    if (inStock !== undefined) product.inStock = inStock;
    
    // Handle image update
    if (req.file) {
      // Handle both Cloudinary and local storage
      if (req.file.path) {
        product.image = req.file.path; // Cloudinary URL
      } else if (req.file.filename) {
        product.image = `/uploads/${req.file.filename}`; // Local path
      }
    } else if (req.body.image !== undefined) {
      product.image = req.body.image;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
});

module.exports = router;
