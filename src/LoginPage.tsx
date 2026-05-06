import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import './LoginPage.css';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      login(email);
    } catch (err) {
      setError('Access denied. Your email is not authorized to access this site.');
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Community of Practice</h1>
          <p>Microsite</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your Accenture email"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={isLoading || !email}
            className="login-button"
          >
            {isLoading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Only authorized Accenture team members can access this site.</p>
        </div>
      </div>
    </div>
  );
};
