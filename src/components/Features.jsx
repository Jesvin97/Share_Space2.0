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
        
        <div className="features-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridAutoRows: 'minmax(250px, auto)',
          gap: '2rem'
        }}>
          {featureData.map((feature, index) => {
            const isLarge = feature.id === 3;
            return (
              <motion.div 
                className="feature-card glass"
                key={feature.id}
                style={{ 
                  gridColumn: isLarge ? 'span 2' : 'span 1',
                  display: 'flex',
                  flexDirection: isLarge ? 'row' : 'column',
                  padding: isLarge ? '0' : '2.5rem',
                  overflow: 'hidden',
                  minHeight: isLarge ? '400px' : 'auto'
                }}
                initial={{ opacity: 0, scale: 0.8, y: 80 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {isLarge ? (
                  <>
                    <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div className="feature-icon" style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{feature.icon}</div>
                      <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{feature.title}</h3>
                      <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{feature.description}</p>
                    </div>
                    <div style={{ flex: 1.2, position: 'relative' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800" 
                        alt="Creators at work"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--surface) 0%, transparent 50%)' }}></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="feature-icon" style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>{feature.icon}</div>
                    <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
