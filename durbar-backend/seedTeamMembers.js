const mongoose = require('mongoose');
const TeamMember = require('./models/TeamMember');
require('dotenv').config();

const seedTeamMembers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/durbar-medical');
    console.log('MongoDB connected successfully');

    // Clear existing team members (optional - remove if you want to keep existing)
    await TeamMember.deleteMany({});
    console.log('Cleared existing team members');

    // Sample team members
    const teamMembers = [
      {
        name: 'Mani Raj Shah',
        position: 'CEO',
        bio: 'Leading the company with vision and expertise in medical supplies industry.',
        email: 'mani@durbarmedi.com',
        phone: '+977 9851414243',
        image: 'https://img.icons8.com/color/480/user.png', // Replace with actual image
        active: true,
        displayOrder: 1
      },
      {
        name: 'Ram Bahadur',
        position: 'Operations Manager',
        bio: 'Managing daily operations and ensuring quality service delivery.',
        email: 'ram@durbarmedi.com',
        phone: '+977 9841234567',
        image: 'https://img.icons8.com/color/480/user.png', // Replace with actual image
        active: true,
        displayOrder: 2
      },
      {
        name: 'Sita Devi',
        position: 'Sales Manager',
        bio: 'Driving sales growth and building strong customer relationships.',
        email: 'sita@durbarmedi.com',
        phone: '+977 9876543210',
        image: 'https://img.icons8.com/color/480/user.png', // Replace with actual image
        active: true,
        displayOrder: 3
      }
    ];

    // Insert team members
    await TeamMember.insertMany(teamMembers);
    console.log('Team members seeded successfully!');

    // Display seeded members
    const allMembers = await TeamMember.find().sort({ displayOrder: 1 });
    console.log('Current team members:');
    allMembers.forEach(member => {
      console.log(`- ${member.name} (${member.position})`);
    });

  } catch (error) {
    console.error('Error seeding team members:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedTeamMembers();