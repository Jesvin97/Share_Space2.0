import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Camera } from 'lucide-react';
import './Features.css';

const featureData = [
  {
    id: 1,
    title: 'Verified Spaces',
    description: 'Every space is vetted by our team for quality, safety, and aesthetic appeal.',
    icon: <Shield size={24} />
  },
  {
    id: 2,
    title: 'Instant Booking',
    description: 'No endless back-and-forth. Find an available slot and book it immediately.',
    icon: <Zap size={24} />
  },
  {
    id: 3,
    title: 'Tailored for Creators',
    description: 'Venues with the best natural light, power setups, and creative vibes.',
    icon: <Camera size={24} />
  },
  {
    id: 4,
    title: 'Premium Aesthetics',
    description: 'Rich South Indian heritage meets modern design spaces.',
    icon: <Sparkles size={24} />
  }
];

const Features = () => {
  return (
    <section className="section bg-light" id="how-it-works">
      <div className="container">
        <h2 className="section-title">Why choose Spare Space?</h2>
        <p className="section-subtitle">We make finding and booking the perfect space effortless, so you can focus on what matters.</p>
        
        <div className="features-grid">
          {featureData.map((feature, index) => (
            <motion.div 
              className="feature-card glass"
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
