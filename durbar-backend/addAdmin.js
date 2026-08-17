const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// Default admin credentials
const defaultAdmin = {
  username: 'manishah',
  email: 'shah.mani20@gmail.com',
  password: 'shah.mani20@'
};

async function addAdmin() {
  try {
    // Connect to MongoDB using production connection string
    const productionMongoURI = 'mongodb+srv://shahrajib278_db_user:Xsx1jqGy5ET2DiR0@cluster0.t7xxalb.mongodb.net/durbar-medical';
    await mongoose.connect(productionMongoURI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: defaultAdmin.username });
    if (existingAdmin) {
      // Update existing admin
      existingAdmin.email = defaultAdmin.email;
      existingAdmin.password = defaultAdmin.password;
      existingAdmin.markModified('password'); // Trigger password hashing
      await existingAdmin.save();
      console.log('Admin updated successfully:');
      console.log('  Username:', defaultAdmin.username);
      console.log('  Password:', defaultAdmin.password);
      console.log('  Email:', defaultAdmin.email);
    } else {
      // Create new admin
      const admin = new Admin(defaultAdmin);
      await admin.save();
      console.log('Admin created successfully:');
      console.log('  Username:', defaultAdmin.username);
      console.log('  Password:', defaultAdmin.password);
      console.log('  Email:', defaultAdmin.email);
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    console.log('Admin addition completed!');
  } catch (error) {
    console.error('Error adding admin:', error);
    process.exit(1);
  }
}

addAdmin();