import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import pageClasses from "../../app/page.module.css";

/**
 * Header component
 * @param {Object} props - Component props
 * @param {Object} props.user - User object if logged in
 * @param {Function} props.onLogout - Function to handle logout
 * @returns {JSX.Element} - Rendered component
 */
function Header({ user, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          <h1>Phone Book</h1>
        </Link>
        
        {user && (
          <div className={classes.userSection}>
            <div className={classes.userInfo}>
              <span className={classes.welcomeText}>
                Welcome, <strong>{user.username}</strong>
              </span>
              <span className={classes.roleBadge}>
                {user.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>
            
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
