'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        
        if (session && Object.keys(session).length > 0 && session.user) {
          const gUser = {
            id: session.user.id || session.user.email,
            name: session.user.name,
            email: session.user.email,
            role: 'customer',
            provider: 'google'
          };
          setUser(gUser);
          localStorage.setItem('user', JSON.stringify(gUser));
          localStorage.setItem('token', 'google-token');
        } else {
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          if (token && storedUser && token !== 'google-token') {
            setUser(JSON.parse(storedUser));
          } else if (token === 'google-token') {
            // next-auth session expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (err) {
        console.error('Session check error', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    const isGoogle = user?.provider === 'google';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (isGoogle) {
      window.location.href = '/api/auth/signout?callbackUrl=/';
    }
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
