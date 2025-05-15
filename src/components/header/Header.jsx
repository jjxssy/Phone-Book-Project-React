import React from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import classes from './header.module.css';

/**
 * Header component with app title, user info, and logout
 * @param {Object} props - Component props
 * @param {Object} props.user - User data
 * @param {Function} props.onLogout - Logout function
 * @returns {JSX.Element} - Rendered component
 */
function Header({ user, onLogout }) {
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.logoSection}>
          <h1 className={classes.logo}>Phone Book</h1>
        </div>
        
        <div className={classes.userSection}>
          <div className={classes.userInfo}>
            <FaUser className={classes.userIcon} />
            <div className={classes.userDetails}>
              <span className={classes.username}>{user.username}</span>
              <span className={classes.role}>{user.role}</span>
            </div>
          </div>
          
          <button 
            className={classes.logoutButton}
            onClick={onLogout}
            aria-label="Logout"
          >
            <FaSignOutAlt className={classes.logoutIcon} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
