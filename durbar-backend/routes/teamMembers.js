const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/team-members/upload
// @desc    Upload team member image (admin only)
// @access  Private
router.post('/upload', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.json({
      imagePath: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error uploading file' });
  }
});

// @route   GET /api/team-members
// @desc    Get all team members (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { active } = req.query;
    let query = {};

    if (active === 'true') {
      query.active = true;
    }

    const teamMembers = await TeamMember.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Server error fetching team members' });
  }
});

// @route   GET /api/team-members/:id
// @desc    Get single team member (public)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    res.json(teamMember);
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({ message: 'Server error fetching team member' });
  }
});

// @route   POST /api/team-members
// @desc    Create new team member (admin only)
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, position, bio, email, phone, active, displayOrder } = req.body;
    
    let imagePath = 'https://img.icons8.com/color/480/user.png';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imagePath = req.body.image;
    }

    const teamMember = new TeamMember({
      name,
      position,
      image: imagePath,
      bio: bio || '',
      email: email || '',
      phone: phone || '',
      active: active !== undefined ? active : true,
      displayOrder: displayOrder || 0
    });

    await teamMember.save();
    res.status(201).json(teamMember);
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({ message: 'Server error creating team member' });
  }
});

// @route   PUT /api/team-members/:id
// @desc    Update team member (admin only)
// @access  Private
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, position, bio, email, phone, active, displayOrder } = req.body;

    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (name) teamMember.name = name;
    if (position) teamMember.position = position;
    if (bio !== undefined) teamMember.bio = bio;
    if (email !== undefined) teamMember.email = email;
    if (phone !== undefined) teamMember.phone = phone;
    if (active !== undefined) teamMember.active = active;
    if (displayOrder !== undefined) teamMember.displayOrder = displayOrder;
    
    if (req.file) {
      teamMember.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      teamMember.image = req.body.image;
    }

    await teamMember.save();
    res.json(teamMember);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ message: 'Server error updating team member' });
  }
});

// @route   DELETE /api/team-members/:id
// @desc    Delete team member (admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ message: 'Server error deleting team member' });
  }
});

module.exports = router;