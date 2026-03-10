import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (pass) => {
    // 12 chars min, at least 1 letter, 1 number, 1 symbol
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/-]).{12,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      setError('Password must be at least 12 characters long and contain letters, numbers, and symbols.');
      return;
    }

    if (isSignUp) {
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/spaces';
    } else {
      if (email === 'admin@shrshape.com' && password === 'admin12345#@') {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.href = '/spaces';
      } else {
        setError('Invalid credentials. Please use the demo account.');
      }
    }
  };

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
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem' }}>
          {isSignUp ? "Join our network of premium spaces and creators." : "Sign in to access your bookings and host dashboard."}
        </p>
        
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} required />
            </div>
          )}
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="hello@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)' }} 
              required 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'monospace' }} 
                required 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isSignUp && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Must be at least 12 characters, including letters, numbers, and symbols.
              </p>
            )}
          </div>
          
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button 
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }} 
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
