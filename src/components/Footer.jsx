import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" style={{ color: 'white' }}>
            <Rocket size={24} color="var(--primary)" />
            <span>SpareSpace</span>
          </Link>
          <p>Connecting creators and brands with premium spaces across South India.</p>
          <div className="social-links">
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="link-group">
            <h4>Support</h4>
            <Link to="/help">Help Center</Link>
            <Link to="/trust">Trust & Safety</Link>
          </div>
          <div className="link-group">
            <h4>Discover</h4>
            <Link to="/">Chennai Spaces</Link>
            <Link to="/">Bangalore Spaces</Link>
            <Link to="/">Hyderabad Spaces</Link>
            <Link to="/">Kerala Spaces</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} SpareSpace India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
