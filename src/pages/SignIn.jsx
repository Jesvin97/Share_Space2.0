import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-color)', padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)' }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
          {isSignUp ? "Join our network of premium spaces and creators." : "Sign in to access your bookings and host dashboard."}
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <input type="email" placeholder="hello@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', marginLeft: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
