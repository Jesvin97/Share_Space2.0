import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);

  // Values for 3D Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoother springs for a high-quality responsive feel
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 25 });

  // Convert mouse location to rotational axis properties
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates so center is 0, bounds are -0.5 to 0.5
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    // Snap cleanly back to default position
    x.set(0);
    y.set(0);
  };

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

        {/* 3D Container specific wrap */}
        <motion.div 
          className="hero-images-wrapper"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.8, z: -200, y: 50 }}
          animate={{ opacity: 1, scale: 1, z: 0, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="hero-image-grid"
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* The layered z-translates make the cards pop physically out towards the viewer as it spins */}
            <motion.img 
              src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80" 
              alt="Beautiful South Indian Venue" 
              className="img-main" 
              style={{ transform: "translateZ(var(--depth-near))" }}
            />
            
            <motion.div className="img-stack" style={{ transform: "translateZ(calc(var(--depth-near) + 40px))" }}>
              <img 
                src="https://images.unsplash.com/photo-1549488344-c10f80bc8bd1?auto=format&fit=crop&w=400&q=80" 
                alt="Studio Space" 
                className="img-secondary" 
              />
              <img 
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80" 
                alt="Warehouse Event Space" 
                className="img-tertiary" 
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
