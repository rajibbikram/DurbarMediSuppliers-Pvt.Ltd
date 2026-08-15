import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn
} from 'react-icons/fa';
import Logo from './Logo';
import './Navbar.css';

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const closeNav = () => setExpanded(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar bg-primary text-white py-2 d-none d-lg-block">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="me-4 d-flex align-items-center">
                <FaPhoneAlt className="me-2" />
                <span>+977 9841 234567</span>
              </div>
              <div className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>info@durbarmedisuppliers.com</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="social-links me-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`navbar-modern ${scrolled ? 'navbar-scrolled' : ''} ${expanded ? 'navbar-expanded' : ''}`}
        expanded={expanded}
        style={{
          top: scrolled ? '0' : '40px',
          transition: 'top 0.3s ease-in-out'
        }}
      >
        <Container className="position-relative">
          <Navbar.Brand className="d-flex align-items-center me-0 me-lg-5">
            <Logo />
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="main-navbar-nav" 
            onClick={() => setExpanded(expanded ? false : true)}
            className={expanded ? 'active' : ''}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="mx-auto align-items-lg-center">
              {navLinks.map((link) => (
                <Nav.Link 
                  key={link.to}
                  as={Link} 
                  to={link.to} 
                  className={`nav-link-modern mx-2 ${location.pathname === link.to ? 'active' : ''}`}
                  onClick={closeNav}
                >
                  {link.label}
                  <span className="nav-link-underline"></span>
                </Nav.Link>
              ))}
            </Nav>
            
            <div className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0">
              <Button 
                as={Link} 
                to="/contact" 
                className="btn-primary"
                onClick={closeNav}
              >
                Get a Quote
              </Button>
              
              <div className="d-lg-none mt-3 w-100">
                <div className="social-links d-flex justify-content-center mt-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary me-3">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary me-3">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary me-3">
                    <FaInstagram />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Add space for fixed navbar and top bar */}
      <div 
        className="navbar-placeholder" 
        style={{
          height: scrolled ? '100px' : '140px',
          transition: 'height 0.3s ease-in-out'
        }}
      ></div>
    </>
  );
};

export default NavigationBar;
