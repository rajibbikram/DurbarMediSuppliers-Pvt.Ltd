const mongoose = require('mongoose');
const OfferItem = require('./models/OfferItem');

const seedOfferItems = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/durbar-medical');
    console.log('Connected to MongoDB');

    // Clear existing offer items
    await OfferItem.deleteMany();
    console.log('Cleared existing offer items');

    // Sample offer items
    const offerItems = [
      {
        name: 'IV Set (Auto Airstop)',
        description: 'Used for giving fluids to patients; has an automatic air-stop feature for safety.'
      },
      {
        name: 'IV Cannula (multiple sizes)',
        description: 'A small tube inserted into a patient\'s vein for giving medicines/fluids. Available in different sizes.'
      },
      {
        name: 'MS Q Syte',
        description: 'A needle-free connector used in IV lines for safe medication delivery.'
      },
      {
        name: 'Extension Tube',
        description: 'A tube used to extend IV lines so patients can move comfortably.'
      },
      {
        name: 'Breathing Circuit',
        description: 'Used in anesthesia machines and ventilators to help patients breathe.'
      },
      {
        name: 'Burette Set',
        description: 'A special IV set used to give accurate and controlled medicines to children or critical patients.'
      }
    ];

    await OfferItem.insertMany(offerItems);
    console.log('Offer items seeded successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding offer items:', error);
    process.exit(1);
  }
};

seedOfferItems();
