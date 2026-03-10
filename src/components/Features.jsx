import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Camera } from 'lucide-react';
import './Features.css';

const featureData = [
  {
    id: 1,
    title: 'Verified Spaces',
    description: 'Every space is vetted by our team for quality, safety, and aesthetic appeal.',
    icon: <Shield size={28} />
  },
  {
    id: 2,
    title: 'Instant Booking',
    description: 'No endless back-and-forth. Find an available slot and book it immediately.',
    icon: <Zap size={28} />
  },
  {
    id: 3,
    title: 'Tailored for Creators',
    description: 'Venues with the best natural light, power setups, and creative vibes.',
    icon: <Camera size={28} />
  },
  {
    id: 4,
    title: 'Premium Aesthetics',
    description: 'Rich South Indian heritage meets modern design spaces.',
    icon: <Sparkles size={28} />
  }
];

const Features = () => {
  return (
    <section className="section features-section" id="how-it-works">
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Why choose Spare Space?</h2>
          <p className="section-subtitle">We make finding and booking the perfect space effortless, so you can focus on what matters.</p>
        </motion.div>
        
        <div className="features-grid">
          {featureData.map((feature, index) => (
            <motion.div 
              className="feature-card glass"
              key={feature.id}
              initial={{ opacity: 0, scale: 0.8, rotateX: 15, y: 80 }}
              whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: 10, 
                rotateY: -5,
                boxShadow: "0 30px 60px -20px rgba(212, 175, 55, 0.15)"
              }}
            >
              <div className="feature-icon" style={{ transform: "translateZ(40px)" }}>{feature.icon}</div>
              <h3 style={{ transform: "translateZ(30px)" }}>{feature.title}</h3>
              <p style={{ transform: "translateZ(20px)" }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
