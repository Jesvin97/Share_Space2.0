import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="section" style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', paddingTop: '8rem', background: 'var(--surface)' }}>
      <div className="container">
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
