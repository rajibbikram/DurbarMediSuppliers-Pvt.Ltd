const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const sendEmail = require('../utils/email');

// @route   POST /api/contact
// @desc    Submit contact form (public)
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, productInfo } = req.body;

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
      productInfo: productInfo || null
    });

    await newContact.save();

    // Send email notification
    try {
      let emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0891b2;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
          <p style="margin-top: 20px; color: #666;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      `;

      // Add product information if available
      if (productInfo) {
        emailContent += `
          <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-radius: 5px; border-left: 4px solid #0891b2;">
            <h3 style="color: #0891b2; margin-top: 0;">Product Information</h3>
            <p><strong>Product:</strong> ${productInfo.name}</p>
            <p><strong>Price:</strong> Rs${productInfo.price}</p>
            <p><strong>Category:</strong> ${productInfo.category}</p>
          </div>
        `;
      }

      await sendEmail({
        subject: `New Contact: ${subject}`,
        html: emailContent
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contact: newContact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error submitting contact form' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error fetching contacts' });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact submission (admin only)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error fetching contact' });
  }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status (admin only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (status) contact.status = status;

    await contact.save();
    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error updating contact' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact submission (admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error deleting contact' });
  }
});

module.exports = router;
