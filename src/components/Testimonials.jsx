import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import './Testimonials.css';

const QUERY = `*[_type == "testimonial"] | order(order asc) {
  _id, name, role, text, rating, avatar
}`;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(QUERY)
      .then(data => { setTestimonials(data); setLoading(false); })
      .catch(err => { console.error('Sanity fetch error:', err); setLoading(false); });
  }, []);

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
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No testimonials yet.</div>
        ) : (
        <div className="testimonials-grid">
          {testimonials.map((t, index) => (
            <motion.div 
              key={t._id}
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
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className="testimonial-text" style={{ transform: "translateZ(30px)" }}>"{t.text}"</p>
              
              <div className="testimonial-author" style={{ transform: "translateZ(40px)" }}>
                {t.avatar ? (
                  <img src={urlFor(t.avatar).width(48).height(48).url()} alt={t.name} className="author-avatar" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="author-avatar">{t.name?.charAt(0)}</div>
                )}
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
