import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './loginForm.module.css'; // Keep this for form-specific styles
import homeClasses from './home.module.css';   // Import for outer wrapper styles

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const demoAccounts = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    user: { username: 'user', password: 'user123', role: 'user' },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { username, password } = formData;

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (username === demoAccounts.admin.username && password === demoAccounts.admin.password) {
      onLogin?.({ username, role: 'admin', id: Date.now() });
      navigate('/contacts');
      return;
    }

    if (username === demoAccounts.user.username && password === demoAccounts.user.password) {
      onLogin?.({ username, role: 'user', id: Date.now() });
      navigate('/contacts');
      return;
    }

    setError('Invalid username or password');
  };

  return (
    <div className={homeClasses.loginCard}>
      <form onSubmit={handleSubmit} className={homeClasses.loginForm}>
        <h2>Login</h2>

        {error && <div className={homeClasses.errorMessage}>{error}</div>}

        <div className={homeClasses.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>

        <div className={homeClasses.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className={homeClasses.loginButton}>
          Login
        </button>

        <div className={homeClasses.demoCredentials}>
          <p>Demo Credentials:</p>
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>User:</strong> user / user123</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
