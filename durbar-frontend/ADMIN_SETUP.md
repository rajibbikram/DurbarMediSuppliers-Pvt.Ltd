# Admin Panel Setup Guide

This guide will help you set up and run the admin panel for Durbar Medical Suppliers.

## Prerequisites

- Node.js installed (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Backend Setup

### 1. Navigate to the server directory
```bash
cd server
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Configure environment variables
The `.env` file is already created with default values. You can modify if needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/durbar-medical
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

**Important:** Change the `JWT_SECRET` to a secure random string in production!

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
net start MongoDB

# On Mac/Linux
sudo systemctl start mongod
# or
mongod
```

### 5. Seed the database (creates default admin and sample products)
```bash
npm run seed
```

This will create:
- **Default admin account:**
  - Username: `admin`
  - Password: `admin123`
  - Email: `admin@durbarmedi.com`
- **Sample products** for testing

**⚠️ IMPORTANT:** Change the default admin password after first login!

### 6. Start the backend server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to the project root
```bash
cd ..
```

### 2. Install frontend dependencies (if not already installed)
```bash
npm install
```

### 3. Start the React development server
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Admin Login

### Login to Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Enter the default credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "Login"

You will be redirected to the admin dashboard where you can manage products.

## Admin Panel Features

### Dashboard (`/admin/dashboard`)
- View statistics (total products, featured, in stock, out of stock)
- See recent products
- Quick access to product management

### Product Management (`/admin/products`)
- View all products in a table format
- Search products by name or description
- Filter by category
- Edit existing products
- Delete products
- Add new products

### Add/Edit Product (`/admin/products/add` or `/admin/products/edit/:id`)
- Product name
- Price (in Nepali Rupees)
- Category selection
- Description
- Image URL (optional)
- Featured product toggle
- In stock toggle

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login admin with username and password

### Products (Public)
- `GET /api/products` - Get all products (supports ?search= and ?category= filters)
- `GET /api/products/:id` - Get single product

### Products (Admin - Requires Authentication)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Admin (Requires Authentication)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/profile` - Get admin profile

## Product Categories

The following categories are available:
- IV Supplies
- IV Accessories
- Respiratory
- Medical Equipment
- Surgical Supplies
- Diagnostic Tools
- Disposables
- Pharmaceuticals

## Public Website Integration

The public website now fetches products from the backend API:
- Products page displays data from MongoDB
- Search functionality works with the API
- Category filtering from footer links works
- Stock status is displayed (In Stock/Out of Stock)
- Featured products are highlighted

## Security Notes

1. **JWT Secret**: Change the default `JWT_SECRET` in production
2. **Default Password**: Change the default admin password (`admin123`) immediately after first login
3. **MongoDB**: Use authentication for MongoDB in production
4. **HTTPS**: Use HTTPS in production for secure communication
5. **Single Admin**: This system is designed for a single admin. No registration endpoint is available.

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify the MongoDB URI in `.env`
- Check if port 5000 is available
- Ensure all dependencies are installed (`npm install`)

### Can't login with default credentials
- Make sure you ran the seed script (`npm run seed`)
- Check if admin was created in MongoDB
- Try clearing browser localStorage
- Verify username is `admin` and password is `admin123`

### Seed script fails
- Ensure MongoDB is running
- Check if port 27017 is available for MongoDB
- Verify the MongoDB URI in `.env`
- Try running the seed script again

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check for CORS issues (already configured in backend)
- Verify API URLs in frontend components

### Products not loading
- Check backend server is running
- Verify MongoDB connection
- Check browser console for API errors
- Ensure database has been seeded

## File Structure

```
durber/
├── server/                    # Backend server
│   ├── models/               # Database models
│   │   ├── Admin.js
│   │   └── Product.js
│   ├── routes/               # API routes
│   │   ├── auth.js          # Login endpoint only
│   │   ├── products.js
│   │   └── admin.js
│   ├── middleware/           # Express middleware
│   │   └── auth.js
│   ├── uploads/              # File upload directory
│   ├── server.js            # Main server file
│   ├── seed.js              # Database seeding script
│   ├── package.json
│   └── .env                  # Environment variables
├── src/
│   ├── pages/                # React pages
│   │   ├── AdminLogin.js
│   │   ├── AdminDashboard.js
│   │   ├── ProductManagement.js
│   │   └── ProductForm.js
│   ├── components/           # React components
│   │   ├── Products.jsx      # Updated to use API
│   │   ├── ProductDetails.jsx
│   │   ├── Header/
│   │   └── Footer.jsx
│   └── App.js                # Updated with admin routes
└── package.json
```

## Next Steps

1. Start both servers (backend and frontend)
2. Run the seed script to create default admin and sample products
3. Login with default credentials (admin/admin123)
4. **IMPORTANT**: Change the default admin password
5. Add/manage products through the admin panel
6. Test the public website to ensure products display correctly
7. Customize the categories and product fields as needed

## Support

For issues or questions, refer to the main project README or contact the development team.
