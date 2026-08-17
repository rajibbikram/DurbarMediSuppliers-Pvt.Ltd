import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Services from './components/Services.jsx';
import Products from './components/Products';
import Contact from './components/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProductManagement from './pages/ProductManagement';
import ProductForm from './pages/ProductForm';
import TestimonialManagement from './pages/TestimonialManagement';
import TestimonialForm from './pages/TestimonialForm';
import OfferItemManagement from './pages/OfferItemManagement';
import OfferItemForm from './pages/OfferItemForm';
import TeamMemberManagement from './pages/TeamMemberManagement';
import TeamMemberForm from './pages/TeamMemberForm';

function App() {
  return (
    <Router>
      <div id="root" className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/products/add" element={<ProductForm />} />
              <Route path="/admin/products/edit/:id" element={<ProductForm />} />
              <Route path="/admin/testimonials" element={<TestimonialManagement />} />
              <Route path="/admin/testimonials/add" element={<TestimonialForm />} />
              <Route path="/admin/testimonials/edit/:id" element={<TestimonialForm />} />
              <Route path="/admin/offer-items" element={<OfferItemManagement />} />
              <Route path="/admin/offer-items/add" element={<OfferItemForm />} />
              <Route path="/admin/offer-items/edit/:id" element={<OfferItemForm />} />
              <Route path="/admin/team-members" element={<TeamMemberManagement />} />
              <Route path="/admin/team-members/add" element={<TeamMemberForm />} />
              <Route path="/admin/team-members/edit/:id" element={<TeamMemberForm />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
