import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaAddressBook, FaLayerGroup } from 'react-icons/fa';
import classes from './navbar.module.css';

/**
 * Navbar component for main navigation
 * @returns {JSX.Element} - Rendered component
 */
function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navContainer}>
        <NavLink 
          to="/home" 
          className={({ isActive }) => 
            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
          }
        >
          <FaHome className={classes.navIcon} />
          <span>Home</span>
        </NavLink>
        
        <NavLink 
          to="/contacts" 
          className={({ isActive }) => 
            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
          }
        >
          <FaAddressBook className={classes.navIcon} />
          <span>Contacts</span>
        </NavLink>
        
        <NavLink 
          to="/grouped-contacts" 
          className={({ isActive }) => 
            isActive ? `${classes.navLink} ${classes.activeLink}` : classes.navLink
          }
        >
          <FaLayerGroup className={classes.navIcon} />
          <span>Groups</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;