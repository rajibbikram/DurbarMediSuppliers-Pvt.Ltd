# Durbar Medical Suppliers - Backend API

Express.js backend server for Durbar Medical Suppliers application.

## Features

- RESTful API for products, testimonials, contact forms, and offer items
- Admin authentication with JWT tokens
- File upload support for product and testimonial images
- MongoDB database integration
- CORS enabled for frontend integration

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/durbar-medical
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

## Database Setup

### Seed the database with admin user:

```bash
npm run seed
```

### Seed offer items:

```bash
npm run seedOfferItems
```

## Running the Server

### Development mode (with auto-restart):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will run on port 5000 by default.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Get dashboard statistics (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials?active=true` - Get active testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (requires auth)
- `PUT /api/testimonials/:id` - Update testimonial (requires auth)
- `DELETE /api/testimonials/:id` - Delete testimonial (requires auth)

### Contact
- `POST /api/contact` - Submit contact form

### Offer Items
- `GET /api/offer-items` - Get all offer items
- `GET /api/offer-items/:id` - Get single offer item
- `POST /api/offer-items` - Create offer item (requires auth)
- `PUT /api/offer-items/:id` - Update offer item (requires auth)
- `DELETE /api/offer-items/:id` - Delete offer item (requires auth)

## File Uploads

Images are uploaded to the `uploads/` directory and served at `/uploads/:filename`.

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## Project Structure

```
durbar-backend/
├── middleware/
│   ├── auth.js       # JWT authentication middleware
│   └── upload.js     # Multer file upload configuration
├── models/
│   ├── Admin.js      # Admin user model
│   ├── Contact.js    # Contact form model
│   ├── OfferItem.js  # Offer item model
│   ├── Product.js    # Product model
│   └── Testimonial.js # Testimonial model
├── routes/
│   ├── admin.js      # Admin dashboard routes
│   ├── auth.js       # Authentication routes
│   ├── contact.js    # Contact form routes
│   ├── offerItems.js # Offer items routes
│   ├── products.js   # Product routes
│   └── testimonials.js # Testimonial routes
├── utils/
│   └── email.js      # Email utility functions
├── uploads/          # Uploaded images directory
├── .env              # Environment variables
├── .env.example      # Environment variables template
├── server.js         # Main server file
├── seed.js           # Database seed script
└── seedOfferItems.js # Offer items seed script
```