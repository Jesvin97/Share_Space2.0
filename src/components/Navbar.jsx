import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar-container nav-scrolled glass">
      <div className="container navbar">
        <Link to="/" className="navbar-logo">
          <Rocket className="logo-icon" size={28} color="var(--primary)" />
          <span>SpareSpace</span>
        </Link>
        
        <nav className="navbar-links desktop-only">
          <Link to="/spaces">Spaces</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions desktop-only">
          <button className="btn-outline" onClick={() => navigate('/list-space')}>List your space</button>
          <button className="btn-primary" onClick={() => navigate('/signin')}>Sign In</button>
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/spaces" onClick={() => setMobileMenuOpen(false)}>Spaces</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="mobile-actions">
              <button className="btn-outline" onClick={() => { navigate('/list-space'); setMobileMenuOpen(false); }}>List your space</button>
              <button className="btn-primary" onClick={() => { navigate('/signin'); setMobileMenuOpen(false); }}>Sign In</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
