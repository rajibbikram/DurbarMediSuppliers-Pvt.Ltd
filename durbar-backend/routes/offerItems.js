const express = require('express');
const router = express.Router();
const OfferItem = require('../models/OfferItem');
const auth = require('../middleware/auth');

// Get all offer items
router.get('/', async (req, res) => {
  try {
    const offerItems = await OfferItem.find().sort({ createdAt: -1 });
    res.json(offerItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offer items', error: error.message });
  }
});

// Get single offer item
router.get('/:id', async (req, res) => {
  try {
    const offerItem = await OfferItem.findById(req.params.id);
    if (!offerItem) {
      return res.status(404).json({ message: 'Offer item not found' });
    }
    res.json(offerItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offer item', error: error.message });
  }
});

// Create offer item (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const offerItem = new OfferItem({
      name,
      description
    });
    
    const savedOfferItem = await offerItem.save();
    res.status(201).json(savedOfferItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating offer item', error: error.message });
  }
});

// Update offer item (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const offerItem = await OfferItem.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!offerItem) {
      return res.status(404).json({ message: 'Offer item not found' });
    }
    
    res.json(offerItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating offer item', error: error.message });
  }
});

// Delete offer item (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const offerItem = await OfferItem.findByIdAndDelete(req.params.id);
    
    if (!offerItem) {
      return res.status(404).json({ message: 'Offer item not found' });
    }
    
    res.json({ message: 'Offer item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting offer item', error: error.message });
  }
});

module.exports = router;
