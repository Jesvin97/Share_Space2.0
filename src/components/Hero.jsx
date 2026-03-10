import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="container hero-content">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="hero-badge">Discover & Book in South India</span>
          <h1>Find the perfect space for your next big idea</h1>
          <p>Whether you need a studio for a content shoot, a warehouse for a production, or a premium venue for your corporate event, Spare Space connects you with unique spaces across South India.</p>
          
          <motion.div 
            className="search-bar glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="search-input-group">
              <MapPin className="search-icon" size={20} />
              <input type="text" placeholder="Where do you want to book?" />
            </div>
            <div className="search-divider"></div>
            <div className="search-input-group">
              <Search className="search-icon" size={20} />
              <input type="text" placeholder="What are you shooting?" />
            </div>
            <button className="btn-primary search-btn">Search Spaces</button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-images"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="hero-image-grid">
            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" alt="Beautiful South Indian Venue" className="img-main" />
            <div className="img-stack">
              <img src="https://images.unsplash.com/photo-1549488344-c10f80bc8bd1?auto=format&fit=crop&w=400&q=80" alt="Studio Space" className="img-secondary" />
              <img src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" alt="Warehouse Event Space" className="img-tertiary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
