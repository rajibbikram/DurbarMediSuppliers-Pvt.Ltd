const mongoose = require('mongoose');
const Product = require('./models/Product');
const Admin = require('./models/Admin');
const Testimonial = require('./models/Testimonial');
const Contact = require('./models/Contact');
require('dotenv').config();

// Default admin credentials
const defaultAdmin = {
  username: 'admin',
  email: 'admin@durbarmedi.com',
  password: 'admin123'
};

// Sample products to seed the database
const sampleProducts = [
  {
    name: 'IV Set (Auto Airstop)',
    price: 350,
    category: 'IV Supplies',
    description: 'Used for giving fluids to patients; has an automatic air-stop feature for safety.',
    image: 'https://img.icons8.com/color/480/intravenous-bag.png',
    featured: true,
    inStock: true
  },
  {
    name: 'IV Cannula (Multiple Sizes)',
    price: 150,
    category: 'IV Supplies',
    description: 'A small tube inserted into a patient\'s vein for giving medicines/fluids. Available in different sizes.',
    image: 'https://img.icons8.com/color/480/needle.png',
    featured: true,
    inStock: true
  },
  {
    name: 'MS Q Syte',
    price: 120,
    category: 'IV Accessories',
    description: 'A needle-free connector used in IV lines for safe medication delivery.',
    image: 'https://img.icons8.com/color/480/medical-doctor.png',
    featured: true,
    inStock: true
  },
  {
    name: 'Extension Tube',
    price: 200,
    category: 'IV Accessories',
    description: 'A tube used to extend IV lines so patients can move comfortably.',
    image: 'https://img.icons8.com/color/480/medical-tube.png',
    featured: false,
    inStock: true
  },
  {
    name: 'Breathing Circuit',
    price: 2800,
    category: 'Respiratory',
    description: 'Used in anesthesia machines and ventilators to help patients breathe.',
    image: 'https://img.icons8.com/color/480/lungs.png',
    featured: true,
    inStock: true
  },
  {
    name: 'Burette Set',
    price: 450,
    category: 'IV Supplies',
    description: 'A special IV set used to give accurate and controlled medicines to children or critical patients.',
    image: 'https://img.icons8.com/color/480/medical-doctor.png',
    featured: true,
    inStock: true
  }
];

// Sample testimonials to seed the database
const sampleTestimonials = [
  {
    clientName: 'Dr. Sarah Johnson',
    company: 'City General Hospital',
    testimonial: 'Durbar Medical Suppliers has been our trusted partner for over 5 years. Their IV supplies and medical equipment are always of the highest quality, and their delivery service is exceptional.',
    rating: 5,
    image: 'https://img.icons8.com/color/480/doctor-female.png',
    featured: true,
    active: true
  },
  {
    clientName: 'Michael Chen',
    company: 'MediCare Clinic',
    testimonial: 'The respiratory equipment we ordered from Durbar Medical has significantly improved our patient care. Excellent products and outstanding customer support.',
    rating: 5,
    image: 'https://img.icons8.com/color/480/doctor-male.png',
    featured: true,
    active: true
  },
  {
    clientName: 'Emily Rodriguez',
    company: 'HealthFirst Pharmacy',
    testimonial: 'Reliable supplier with competitive pricing. We appreciate their consistent quality and quick response to urgent orders.',
    rating: 4,
    image: 'https://img.icons8.com/color/480/nurse-female.png',
    featured: false,
    active: true
  },
  {
    clientName: 'Dr. Ahmed Hassan',
    company: 'Regional Medical Center',
    testimonial: 'Professional service and top-notch medical supplies. Durbar Medical understands the needs of healthcare facilities and delivers accordingly.',
    rating: 5,
    image: 'https://img.icons8.com/color/480/doctor-male.png',
    featured: true,
    active: true
  },
  {
    clientName: 'Lisa Thompson',
    company: 'Community Health Network',
    testimonial: 'We have been sourcing our surgical supplies from Durbar Medical for years. Their product range and reliability make them our go-to supplier.',
    rating: 4,
    image: 'https://img.icons8.com/color/480/nurse-female.png',
    featured: false,
    active: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/durbar-medical');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Admin.deleteMany({});
    await Testimonial.deleteMany({});
    await Contact.deleteMany({});
    console.log('Cleared existing data');

    // Create default admin
    const admin = new Admin(defaultAdmin);
    await admin.save();
    console.log('Default admin created:');
    console.log('  Username:', defaultAdmin.username);
    console.log('  Password:', defaultAdmin.password);
    console.log('  Email:', defaultAdmin.email);

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted successfully');

    // Insert sample testimonials
    await Testimonial.insertMany(sampleTestimonials);
    console.log('Sample testimonials inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
