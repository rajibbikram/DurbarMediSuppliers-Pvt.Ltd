# Durbar Medical Suppliers

A professional medical supplies e-commerce website built with React, featuring a responsive design and modern UI components.

## Features

- **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- **Modern UI**: Professional medical-themed design with Tailwind CSS
- **Product Catalog**: Browse medical supplies with detailed product information
- **Search Functionality**: Prominent search bar in header for easy product discovery
- **Trust Signals**: Certifications, quality assurance, and customer testimonials
- **Contact Form**: Easy way for customers to reach out for inquiries
- **Smooth Navigation**: React Router for seamless page transitions
- **Scroll-to-Top**: Automatic scroll to top on route changes

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **Icons**: React FontAwesome
- **Build Tool**: Create React App

## Project Structure

```
durber/
├── public/
│   ├── img/
│   │   └── logo.png
│   └── index.html
├── src/
│   ├── assets/
│   │   └── img/
│   │       └── logo.png
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Header/
│   │   │   └── Header.js
│   │   ├── Hero.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Products.jsx
│   │   ├── Services.jsx
│   │   ├── Testimonials.jsx
│   │   └── TrustSignals.jsx
│   ├── pages/
│     │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Home.js
│   │   ├── Products.js
│   │   └── Services.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── postcss.config.js
├── tailwind.config.js
└── package.json
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/rajibbikram/DurbarMediSuppliers.git
cd DurbarMediSuppliers
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Customization

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with medical-themed colors defined in `tailwind.config.js`:

- **Medical Blue**: A range of blue shades for primary branding
- **Teal**: A range of teal shades for accents and secondary elements

### Adding New Products

Edit the `products` array in `src/components/Products.jsx` to add or modify products.

### Modifying Content

- **Hero Section**: Edit `src/components/Hero.jsx`
- **About Section**: Edit `src/components/About.jsx`
- **Services**: Edit `src/components/Services.jsx`
- **Contact Info**: Edit `src/components/Contact.jsx`
- **Footer**: Edit `src/components/Footer.jsx`

## Deployment

The app can be deployed to any static hosting service such as:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

To deploy, run:
```bash
npm run build
```

Then upload the contents of the `build` folder to your hosting provider.

## License

This project is proprietary and confidential.

## Contact

For inquiries, please contact Durbar Medical Suppliers Pvt. Ltd.
- Phone: 9851414243
- Email: info@durbarmedi.com
