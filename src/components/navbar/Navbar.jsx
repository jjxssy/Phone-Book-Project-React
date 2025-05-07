// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// Import CSS module for styling
import classes from './navbar.module.css';

// Navbar component for application navigation
const Navbar = () => {
  return (
    // Main navigation container
    <nav className={classes.navbar}>
      {/* Inner container for layout control */}
      <div className={classes.container}>
        {/* Logo/Home link */}
        <Link to="/" className={classes.logo}>
          Phone Book
        </Link>
        {/* Navigation links container */}
        <div className={classes.links}>
          {/* Individual navigation links */}
          <Link to="/terms" className={classes.link}>Terms</Link>
          <Link to="/privacy" className={classes.link}>Privacy</Link>
          <Link to="/help" className={classes.link}>Help</Link>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;