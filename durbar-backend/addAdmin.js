const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const defaultAdmin = {
  username: process.env.ADMIN_USERNAME,
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
};

async function addAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({
      username: defaultAdmin.username
    });

    if (existingAdmin) {
      existingAdmin.email = defaultAdmin.email;
      existingAdmin.password = defaultAdmin.password;

      existingAdmin.markModified('password');

      await existingAdmin.save();

      console.log('Admin updated successfully');
    } else {
      const admin = new Admin(defaultAdmin);
      await admin.save();

      console.log('Admin created successfully');
    }

    await mongoose.disconnect();

    console.log('Admin addition completed!');
  } catch (error) {
    console.error('Error adding admin:', error);
    process.exit(1);
  }
}

addAdmin();