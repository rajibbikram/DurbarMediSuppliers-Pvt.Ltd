import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import Logo from "../../assets/img/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const mobileMenuRef = useRef(null);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/products', label: 'Products', icon: '🛍️' },
    { path: '/contact', label: 'Contact', icon: '✉️' }
  ];

  // Check if current path is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Toggle body scroll
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.classList.remove('no-scroll');
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.documentElement.classList.remove('no-scroll');
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
        document.documentElement.classList.remove('no-scroll');
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle scroll effect for header
  useEffect(() => {
    const threshold = 8; // minimal delta to reduce jitter
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      // Toggle scrolled styling
      setIsScrolled(currentY > 10);

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current + threshold && currentY > 80) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - threshold) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render header on admin routes
  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100' : 'bg-transparent'} ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src={Logo} 
                  className="w-10 h-10 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300"
                  alt="Durbar Medical Suppliers Logo"
                />
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="ml-3">
                <span className="block font-bold text-gray-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">Durbar Medical</span>
                <span className="block text-xs text-gray-500 font-medium">Suppliers Pvt.Ltd.</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search medical supplies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full px-5 py-2.5 pl-11 rounded-xl border transition-all duration-300 ${
                    isSearchFocused 
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white shadow-md' 
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                  } focus:outline-none text-gray-700 placeholder-gray-400 text-sm`}
                />
                <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  isSearchFocused ? 'text-blue-600' : 'text-gray-400'
                }`} />
              </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    location.pathname === link.path 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{link.icon}</span>
                  <span>{link.label}</span>
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Mobile */}
            <div className="lg:hidden flex-1 mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 text-sm text-gray-700 placeholder-gray-400 transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            {/* Menu button - visible only on mobile */}
            <button 
              className="lg:hidden p-2.5 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              type="button"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-gray-700 text-lg" />
              ) : (
                <FaBars className="text-gray-700 text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 space-y-2">
              {/* Search Bar - Mobile Menu */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.body.style.overflow = 'auto';
                    document.documentElement.classList.remove('no-scroll');
                  }}
                >
                  <span className="mr-3 text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Add space for fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;