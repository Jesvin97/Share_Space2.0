import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PASSWORD_RE = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`-]).{12,}$/;

const SignIn = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp]         = useState(false);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const inputStyle = {
    width: '100%', padding: '0.75rem', paddingRight: '2.5rem',
    borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
    background: 'var(--bg-color)', color: 'var(--text-main)', fontFamily: 'inherit',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!PASSWORD_RE.test(password)) {
      setError('Password must be at least 12 characters with letters, numbers, and symbols.');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/spaces');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 80px)', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass"
        style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem', borderRadius: 'var(--radius-lg)' }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {isSignUp ? 'Join our network of premium spaces and creators.' : 'Sign in to access host contacts and your dashboard.'}
        </p>

        {error && (
          <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#ff8080', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>Email Address</label>
            <input type="email" placeholder="hello@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} required autoComplete="email" />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, fontFamily: 'monospace' }}
                required
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isSignUp && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                Min 12 characters · letters + numbers + symbol
              </p>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}
            style={{ width: '100%', marginTop: '0.5rem', padding: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" onClick={() => { setIsSignUp(v => !v); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', marginLeft: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        {/* Demo credentials hint */}
        {!isSignUp && (
          <div style={{ marginTop: '1.5rem', padding: '0.75rem', background: 'rgba(212,175,55,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Demo Admin: <strong style={{ color: 'var(--primary)' }}>admin@shrshape.com</strong> / <strong style={{ color: 'var(--primary)' }}>admin12345#@</strong>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SignIn;
