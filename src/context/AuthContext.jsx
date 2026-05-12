import React, { createContext, useContext } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <AuthConsumer>{children}</AuthConsumer>
    </SessionProvider>
  );
};

const AuthConsumer = ({ children }) => {
  const { data: session, status } = useSession();
  
  const loading = status === 'loading';
  const user = session?.user || null;
  const isAuthenticated = !!session;
  const isAdmin = session?.user?.role === 'admin';

  const login = async (email, password) => {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result.error) throw new Error(result.error);
    return result;
  };

  const register = async (email, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed.');
    
    // Automatically sign in after registration
    return login(email, password);
  };

  const logout = () => signOut({ redirect: false });

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
