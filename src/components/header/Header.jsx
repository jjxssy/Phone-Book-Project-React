// Import required dependencies
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import pageClasses from "../../app/page.module.css";

/**
 * Header component - Displays the application header with navigation and user information
 * @param {Object} props - Component props
 * @param {Object} props.user - User object containing username and role
 * @param {Function} props.onLogout - Callback function to handle user logout
 * @returns {JSX.Element} - Rendered header component
 */
function Header({ user, onLogout }) {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  /**
   * Handles the logout process
   * Calls the onLogout callback and redirects to home page
   */
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        {/* Logo and home link */}
        <Link to="/" className={classes.logo}>
          <h1>Phone Book</h1>
        </Link>
        
        {/* User section - only displayed when user is logged in */}
        {user && (
          <div className={classes.userSection}>
            {/* Display user information */}
            <div className={classes.userInfo}>
              <span className={classes.welcomeText}>
                Welcome, <strong>{user.username}</strong>
              </span>
              {/* Role badge showing admin or user status */}
              <span className={classes.roleBadge}>
                {user.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>
            
            {/* Logout button */}
            <button 
              className={classes.logoutButton}
              onClick={handleLogout}
            >
              <span className={classes.logoutIcon}>🚪</span>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
