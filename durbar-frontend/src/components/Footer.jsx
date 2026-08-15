import React from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaChevronRight,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current path is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Don't render footer on admin routes
  if (isAdminRoute) {
    return null;
  }

  const handleProductCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (e) => {
    const target = e.currentTarget.getAttribute('href');
    if (target === window.location.pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h5 className="text-white font-bold text-lg md:text-xl mb-4 md:mb-6">Durbar Medical Suppliers</h5>
            <p className="text-xs md:text-sm mb-4 md:mb-6 leading-relaxed text-gray-400">Your trusted partner for quality medical supplies and equipment. We are committed to providing the best healthcare solutions with integrity and excellence.</p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              <div className="bg-white/10 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold text-white flex items-center">
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full mr-1.5 md:mr-2"></span>
                <span className="hidden sm:inline">ISO Certified</span>
                <span className="sm:hidden">ISO</span>
              </div>
              <div className="bg-white/10 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold text-white flex items-center">
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full mr-1.5 md:mr-2"></span>
                <span className="hidden sm:inline">Quality Assured</span>
                <span className="sm:hidden">Quality</span>
              </div>
              <div className="bg-white/10 px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold text-white flex items-center">
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 bg-green-500 rounded-full mr-1.5 md:mr-2"></span>
                <span className="hidden sm:inline">FDA Compliant</span>
                <span className="sm:hidden">FDA</span>
              </div>
            </div>
            
            <div className="flex gap-3 md:gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-500 hover:text-white transition-all duration-300">
                <FaFacebook className="text-sm md:text-base" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-500 hover:text-white transition-all duration-300">
                <FaTwitter className="text-sm md:text-base" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-500 hover:text-white transition-all duration-300">
                <FaInstagram className="text-sm md:text-base" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-500 hover:text-white transition-all duration-300">
                <FaLinkedin className="text-sm md:text-base" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-lg mb-6">Quick Links</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleNavigation} className="hover:text-medical-400 transition-colors flex items-center group">
                  <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleNavigation} className="hover:text-medical-400 transition-colors flex items-center group">
                  <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={handleNavigation} className="hover:text-medical-400 transition-colors flex items-center group">
                  <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleNavigation} className="hover:text-medical-400 transition-colors flex items-center group">
                  <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleNavigation} className="hover:text-medical-400 transition-colors flex items-center group">
                  <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h5 className="text-white font-bold text-lg mb-6">Our Products</h5>
            <ul className="space-y-3">
              {['Medical Equipment', 'Surgical Supplies', 'Diagnostic Tools', 'Disposables', 'Pharmaceuticals'].map((category) => (
                <li key={category}>
                  <button 
                    onClick={() => handleProductCategory(category)}
                    className="hover:text-medical-400 transition-colors flex items-center text-left w-full p-0 border-0 bg-transparent group"
                  >
                    <FaChevronRight size={10} className="mr-2 text-medical-500 group-hover:text-medical-400" />
                    <span>{category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <h5 className="text-white font-bold text-lg mb-6">Contact Information</h5>
          <p className="mb-8 text-sm text-gray-400">We're here to assist you. Reach out to us through any of these channels:</p>
          
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-medical-500 to-teal-500 text-white p-4 rounded-xl mr-4 shadow-glow">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h6 className="font-semibold text-white mb-1">Our Location</h6>
                <address className="not-italic text-sm text-gray-400">
                  Jakha, Kirtipur<br />
                  Kathmandu 44600, Nepal
                </address>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gradient-to-br from-medical-500 to-teal-500 text-white p-4 rounded-xl mr-4 shadow-glow">
                <FaPhone />
              </div>
              <div>
                <h6 className="font-semibold text-white mb-1">Call Us</h6>
                <p className="text-sm text-gray-400 mb-1">
                  <a href="tel:+9779768912291" className="hover:text-medical-400 transition-colors">+977-9768912291</a>
                </p>
                <p className="text-sm text-gray-400 mb-0">
                  <a href="tel:+9779768912291" className="hover:text-medical-400 transition-colors">+977-9768912291</a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gradient-to-br from-medical-500 to-teal-500 text-white p-4 rounded-xl mr-4 shadow-glow">
                <FaEnvelope />
              </div>
              <div>
                <h6 className="font-semibold text-white mb-1">Email Us</h6>
                <p className="text-sm text-gray-400 mb-1">
                  <a href="mailto:info@durbarmedical.com" className="hover:text-medical-400 transition-colors">info@durbarmedical.com</a>
                </p>
                <p className="text-sm text-gray-400 mb-0">
                  <a href="mailto:support@durbarmedical.com" className="hover:text-medical-400 transition-colors">support@durbarmedical.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h6 className="font-semibold text-white mb-4">Business Hours</h6>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span> 
                  <span className="text-white">5:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span> 
                  <span className="text-white">5:00 AM - 9:00 PM</span>
                </li>
               
              </ul>
            </div>
            
            <div>
              <h6 className="font-semibold text-white mb-4">Find Us On Map</h6>
              <div className="rounded-2xl overflow-hidden shadow-soft">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2376.3660754633697!2d85.27365251318419!3d27.667764357378953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1912cf295f61%3A0x3e99ea01e8109ea0!2sDurbar%20Medi%20Suppliers%20Pvt.Ltd!5e1!3m2!1sen!2snl!4v1785841553560!5m2!1sen!2snl" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Durbar Medical Suppliers Location"
                  aria-label="Google Maps Location"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/maps?q=123+Medical+Street,+Kathmandu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-sm hover:text-medical-400 transition-colors text-medical-500 font-medium"
              >
                View on Google Maps <FaExternalLinkAlt size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-6 md:my-8 border-gray-700" />
        
        {/* Trust Signals & Legal */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="text-center md:text-left">
            <h6 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Quality Assurance</h6>
            <p className="text-xs text-gray-400 leading-relaxed">All products meet international quality standards and are sourced from certified manufacturers.</p>
          </div>
          <div className="text-center md:text-left">
            <h6 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Secure Payments</h6>
            <p className="text-xs text-gray-400 leading-relaxed">We use secure payment gateways to protect your transactions and personal information.</p>
          </div>
          <div className="text-center md:text-left">
            <h6 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Privacy Policy</h6>
            <p className="text-xs text-gray-400 leading-relaxed">Your data is protected. We never share your information with third parties.</p>
          </div>
        </div>
        
        <div className="text-center text-xs md:text-sm text-gray-400">
          &copy; {currentYear} Durbar Medical Suppliers. All rights reserved. | Designed for Healthcare Excellence
        </div>
      </div>
    </footer>
  );
};

export default Footer;