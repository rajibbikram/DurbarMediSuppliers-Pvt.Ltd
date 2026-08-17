const multer = require('multer');
const path = require('path');

// Check if Cloudinary credentials are available
const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && 
                      process.env.CLOUDINARY_API_KEY && 
                      process.env.CLOUDINARY_API_SECRET;

let storage;

if (useCloudinary) {
  // Use Cloudinary storage for production
  const { storage: cloudinaryStorage } = require('../config/cloudinary');
  storage = cloudinaryStorage;
  console.log('Using Cloudinary for file uploads');
} else {
  // Use local storage for development
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      // Generate unique filename with generic prefix
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'upload-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  console.log('Using local storage for file uploads');
}

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

module.exports = upload;
