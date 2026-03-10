import React from 'react';
import { motion } from 'framer-motion';

const SignIn = () => {
  return (
    <section className="section bg-light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
         <motion.div 
           className="glass"
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}
        >
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Sign in to continue to SpareSpace</p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
             <input type="password" placeholder="Password" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
             <button type="button" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>Sign In</button>
          </form>
          <div style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Don't have an account? <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Sign up</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignIn;
