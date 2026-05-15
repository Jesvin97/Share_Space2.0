import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <header className="navbar-container nav-scrolled glass">
      <div className="container navbar">
        <Link to="/" className="navbar-logo">
          <Rocket className="logo-icon" size={28} color="var(--primary)" />
          <span>SpareSpace</span>
        </Link>
        
        <nav className="navbar-links desktop-only">
          <Link to="/spaces">Spaces</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="navbar-actions desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle Theme"
            style={{ color: 'var(--primary)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="btn-outline" onClick={() => navigate('/list-space')}>List your space</button>
        </div>

        <div className="mobile-only-actions" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
           <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            style={{ color: 'var(--primary)', padding: '0.5rem' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
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
            <Link to="/blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</Link>
            <Link to="/careers" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="mobile-actions">
              <button className="btn-outline" onClick={() => { navigate('/list-space'); setMobileMenuOpen(false); }}>List your space</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
