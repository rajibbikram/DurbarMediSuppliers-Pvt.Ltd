# Render Deployment Guide

This guide will help you deploy the Durbar Medical Suppliers application to Render.

## Prerequisites

- A Render account (free tier available)
- MongoDB Atlas account (free tier available)
- GitHub repository with your code

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and create a new cluster
3. Create a database user with username and password
4. Whitelist all IPs (0.0.0.0/0) for development (or add Render's IP ranges for production)
5. Get your connection string from the Atlas dashboard:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/durbar-medical
   ```

## Step 2: Deploy Backend to Render

### Option A: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Go to Render dashboard and click "New +"
3. Select "Blueprint" and connect your GitHub repository
4. Render will automatically detect and use the `render.yaml` file
5. Configure the following environment variables in Render:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string (use: `openssl rand -base64 32`)
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render default)

### Option B: Manual Deployment

1. Go to Render dashboard and click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: durbar-backend
   - **Region**: Choose nearest region
   - **Branch**: main
   - **Root Directory**: durbar-backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Runtime**: Node
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
6. Click "Create Web Service"

## Step 3: Deploy Frontend to Render

### Option A: Using render.yaml (Recommended)

If using the render.yaml with both services, the frontend will be deployed automatically.

### Option B: Manual Deployment

1. Go to Render dashboard and click "New +"
2. Select "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: durbar-frontend
   - **Region**: Same as backend
   - **Branch**: main
   - **Root Directory**: durbar-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: build
5. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL (e.g., `https://durbar-backend.onrender.com`)
6. Click "Create Static Site"

## Step 4: Configure Cloudinary (Optional for Image Uploads)

If you want to enable image uploads in production:

1. Create a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add these to your Render backend environment variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

## Step 5: Seed the Database

After backend deployment, you need to create the admin user:

1. Access your backend service logs in Render
2. Click "Shell" in the Render dashboard for your backend service
3. Run:
   ```bash
   node seed.js
   ```
4. This will create the default admin account:
   - Username: `admin`
   - Password: `admin123`
   - Email: `admin@durbarmedi.com`

**Important**: Change the default password after first login!

## Step 6: Verify Deployment

1. Check backend health: `https://your-backend-url.onrender.com/health`
2. Access frontend: `https://your-frontend-url.onrender.com`
3. Test admin login at `/admin/login`
4. Verify products and other features load correctly

## Common Issues and Solutions

### ESLint Errors During Build

If you get ESLint errors during frontend build:

1. The `.eslintrc.json` has been updated to treat unused variables as warnings instead of errors
2. This should resolve the CI build issues on Render

### MongoDB Connection Timeout

If MongoDB connection fails:

1. Verify your MongoDB Atlas cluster is running
2. Check that IP whitelisting includes 0.0.0.0/0
3. Ensure your connection string is correct
4. Check Render logs for specific error messages

### File Upload Issues

If image uploads fail:

1. Configure Cloudinary credentials in Render environment variables
2. Without Cloudinary, the app uses memory storage in production
3. For persistent storage, Cloudinary is required

### Frontend Can't Connect to Backend

1. Verify `REACT_APP_API_URL` is set correctly in frontend
2. Check backend is running and accessible
3. Ensure CORS is properly configured (already done in server.js)
4. Check browser console for CORS errors

### Port Issues

Render uses port 10000 by default. The server.js has been updated to:
- Use `process.env.PORT` which Render sets automatically
- Default to 5000 for local development

## Environment Variables Reference

### Backend (Required)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to `production`
- `PORT`: Render sets this automatically (10000)

### Backend (Optional)
- `CLOUDINARY_CLOUD_NAME`: For image uploads
- `CLOUDINARY_API_KEY`: For image uploads
- `CLOUDINARY_API_SECRET`: For image uploads
- `EMAIL_USER`: For contact form emails
- `EMAIL_PASS`: For contact form emails

### Frontend (Required)
- `REACT_APP_API_URL`: Backend API URL

## Post-Deployment Checklist

- [ ] Backend service is running and healthy
- [ ] Frontend is accessible
- [ ] Admin login works with default credentials
- [ ] Products display correctly
- [ ] Contact form submissions work
- [ ] Change default admin password
- [ ] Configure Cloudinary for image uploads (if needed)
- [ ] Set up custom domain (optional)
- [ ] Enable SSL (Render provides this automatically)

## Monitoring and Logs

- View logs in Render dashboard for each service
- Backend logs show MongoDB connection status
- Frontend build logs show any compilation errors
- Monitor resource usage in Render dashboard

## Updates and Maintenance

To update your application:

1. Push changes to GitHub
2. Render automatically detects and rebuilds
3. Monitor deployment logs for errors
4. Test after each deployment

## Support

For issues specific to:
- **Render**: Check [Render Documentation](https://render.com/docs)
- **MongoDB Atlas**: Check [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- **Cloudinary**: Check [Cloudinary Docs](https://cloudinary.com/documentation)
