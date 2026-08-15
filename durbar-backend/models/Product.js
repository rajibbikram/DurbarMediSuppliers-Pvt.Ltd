const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['IV Supplies', 'IV Accessories', 'Respiratory', 'Medical Equipment', 'Surgical Supplies', 'Diagnostic Tools', 'Disposables', 'Pharmaceuticals']
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://img.icons8.com/color/480/medical-doctor.png'
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Product', productSchema);
