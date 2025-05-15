import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { users } from '../../data/users';
import classes from './login.module.css';

/**
 * Login component for user authentication
 * Includes username, password, and password confirmation fields
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Function to call on successful login
 * @returns {JSX.Element} - Rendered component
 */
function Login({ onLogin }) {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Toggle password visibility
   * @param {string} field - Field to toggle (password or confirmPassword)
   */
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  /**
   * Validate form inputs
   * @returns {boolean} - True if form is valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    // Username validation - must be at least 3 characters
    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Password validation - must be at least 6 characters with at least one number
    const passwordPattern = /^(?=.*\d).{6,}$/;
    if (!formData.password || !passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters and contain at least one number';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check if user exists and passwords match
    const user = users.find(u => u.username === formData.username);
    
    if (user && user.password === formData.password) {
      // Login successful
      onLogin({ 
        id: user.id,
        username: user.username, 
        role: user.role 
      });
      navigate('/home');
    } else {
      // Login failed
      setErrors({ 
        form: 'Invalid username or password' 
      });
    }
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginCard}>
        <h2 className={classes.loginHeader}>Login to Phone Book</h2>
        
        <form onSubmit={handleSubmit} className={classes.loginForm}>
          {errors.form && (
            <div className={classes.errorMessage}>{errors.form}</div>
          )}
          
          <div className={classes.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className={errors.username ? classes.inputError : ''}
              pattern=".{3,}"
              title="Username must be at least 3 characters"
              required
            />
            {errors.username && (
              <span className={classes.errorText}>{errors.username}</span>
            )}
          </div>
          
          <div className={classes.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={classes.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className={errors.password ? classes.inputError : ''}
                pattern="(?=.*\d).{6,}"
                title="Password must be at least 6 characters and contain at least one number"
                required
              />
              <button 
                type="button" 
                className={classes.togglePasswordBtn}
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className={classes.errorText}>{errors.password}</span>
            )}
          </div>
          
          <div className={classes.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={classes.passwordInputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={errors.confirmPassword ? classes.inputError : ''}
                required
              />
              <button 
                type="button" 
                className={classes.togglePasswordBtn}
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={classes.errorText}>{errors.confirmPassword}</span>
            )}
          </div>
          
          <button type="submit" className={classes.loginButton}>
            Login
          </button>
        </form>
        
        <div className={classes.usersList}>
          <h3>Available Users:</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <strong>{user.username}</strong> (Role: {user.role})
                <br />
                Password: {user.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login; 