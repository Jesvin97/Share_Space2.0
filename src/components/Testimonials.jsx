import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Nandika K.',
    role: 'Chief Marketing Officer',
    text: "As a marketing agency, we're always hunting for fresh shoot spaces. Spare Space makes it easy with plenty of diverse and styled options. It's been a game-changer.",
    rating: 5
  },
  {
    name: 'Arsheya O.',
    role: 'Founder & CEO',
    text: "We were looking for a large industrial setup, but our search led nowhere. Even with our highly specific requirements, Spare Space helped us find the perfect location effortlessly!",
    rating: 5
  },
  {
    name: 'Puneet K.',
    role: 'Event Director',
    text: "We manage events for a lot of corporates and brands, so finding spaces to host them quickly is key. Spare Space has helped us find amazing venues hassle-free.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="section testimonials-section" id="about">
      {/* Diorama layered noise/texture specific to this section */}
      <div className="diorama-bg-layer"></div>
      
      <div className="container">
        <motion.div
           initial={{ opacity: 0, z: -100 }}
           whileInView={{ opacity: 1, z: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="section-title" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>Our Users Feedback</h2>
          <p className="section-subtitle">What Our Community Loves About Us</p>
        </motion.div>
        
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              className="testimonial-card glass"
              /* Organic Diorma entrance: cards float in from deep Z, slightly rotated */
              initial={{ opacity: 0, scale: 0.85, rotateZ: index % 2 === 0 ? -2 : 2, z: -150, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0, z: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -10, 
                z: 40,
                rotateX: 5,
                rotateY: index % 2 === 0 ? 3 : -3,
                boxShadow: "0 30px 60px -20px rgba(0,0,0,1)"
              }}
            >
              <div className="stars" style={{ transform: "translateZ(20px)" }}>
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className="testimonial-text" style={{ transform: "translateZ(30px)" }}>"{t.text}"</p>
              
              <div className="testimonial-author" style={{ transform: "translateZ(40px)" }}>
                <div className="author-avatar">{t.name.charAt(0)}</div>
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
