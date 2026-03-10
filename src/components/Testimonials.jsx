import React from 'react';
import { motion } from 'framer-motion';
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
      <div className="container">
        <h2 className="section-title">Our Users Feedback</h2>
        <p className="section-subtitle">What Our Users Love About Us</p>
        
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              className="testimonial-card glass"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
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
