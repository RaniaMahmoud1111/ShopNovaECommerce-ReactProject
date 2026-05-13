import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [token]);

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    
    if (userExists) {
      return { success: false, message: 'Email already registered!' };
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };

  const login = (credentials) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);

    if (foundUser) {
      const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
      setUser(foundUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('activeUser', JSON.stringify(foundUser));
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password!' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('activeUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
