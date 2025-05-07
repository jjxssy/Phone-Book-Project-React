// Import necessary dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import CSS modules for styling
import classes from './loginForm.module.css';
import homeClasses from './home.module.css';

// LoginForm component handles user authentication
// @param {function} onLogin - Callback function to handle successful login
function LoginForm({ onLogin }) {
  // State for form data and error messages
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Demo account credentials for testing
  const demoAccounts = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    user: { username: 'user', password: 'user123', role: 'user' },
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { username, password } = formData;

    // Validate form inputs
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check admin credentials
    if (username === demoAccounts.admin.username && password === demoAccounts.admin.password) {
      onLogin?.({ username, role: 'admin', id: Date.now() });
      navigate('/contacts');
      return;
    }

    // Check user credentials
    if (username === demoAccounts.user.username && password === demoAccounts.user.password) {
      onLogin?.({ username, role: 'user', id: Date.now() });
      navigate('/contacts');
      return;
    }

    // Set error message for invalid credentials
    setError('Invalid username or password');
  };

  return (
    // Main login card container
    <div className={homeClasses.loginCard}>
      <form onSubmit={handleSubmit} className={homeClasses.loginForm}>
        <h2>Login</h2>

        {/* Display error message if any */}
        {error && <div className={homeClasses.errorMessage}>{error}</div>}

        {/* Username input field */}
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

        {/* Password input field */}
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

        {/* Submit button */}
        <button type="submit" className={homeClasses.loginButton}>
          Login
        </button>

        {/* Demo credentials section */}
        <div className={homeClasses.demoCredentials}>
          <p>Demo Credentials:</p>
          <p><strong>Admin:</strong> admin / admin123</p>
          <p><strong>User:</strong> user / user123</p>
        </div>
      </form>
    </div>
  );
}

// Export the LoginForm component
export default LoginForm;
