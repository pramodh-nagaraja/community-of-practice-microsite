import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const APPROVED_EMAILS = [
  'u.challa@accenture.com',
  'priti.ranjit.das@accenture.com',
  'shweta.dedhia@accenture.com',
  'v.devathi@accenture.com',
  'kavitha.mallya@accenture.com',
  'sagar.melupalleppa@accenture.com',
  'shrimoyee.mukherjee@accenture.com',
  'pramodh.nagaraja@accenture.com',
  'piyush.a.rana@accenture.com',
  'raghav.a.ranjan@accenture.com',
  'srikar.rao.deshpande@accenture.com',
  'devi.r.rao.katuru@accenture.com',
  'kaseeswar.reddy@accenture.com',
  'd.roshan.shetty@accenture.com',
  'shlesha.sahay@accenture.com',
  'dharshan.surendran@accenture.com',
  'vijay.k.seshu.hejeeb@accenture.com',
  'r.g.subramanian@accenture.com',
  'srinivas.vinnakota@accenture.com',
  'ashish.nageet@accenture.com'
];
const STORAGE_KEY = 'cop_auth';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { email, timestamp } = JSON.parse(stored);
        // Check if session is still valid (within 30 days)
        if (Date.now() - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true);
          setUserEmail(email);
        } else {
          // Session expired
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error parsing stored auth:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (email: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if email is in approved list
    const isApproved = APPROVED_EMAILS.some(
      approvedEmail => approvedEmail.toLowerCase() === normalizedEmail
    );

    if (isApproved) {
      setIsAuthenticated(true);
      setUserEmail(normalizedEmail);
      
      // Store in localStorage with timestamp
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          email: normalizedEmail,
          timestamp: Date.now(),
        })
      );
    } else {
      throw new Error('Email not in approved list');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
