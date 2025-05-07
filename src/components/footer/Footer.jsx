// Import necessary dependencies from React and React Router
import React from 'react';
import { Link } from 'react-router-dom';
// Import CSS modules for styling
import classes from './footer.module.css';

/**
 * Footer component that displays copyright information and navigation links
 * This component appears at the bottom of the application
 * @component
 * @returns {JSX.Element} - Rendered Footer component
 */
function Footer() {
  // Get current year for copyright text
  const currentYear = new Date().getFullYear();
  
  return (
    // Main footer container
    <footer className={classes.footer}>
      {/* Inner container for content alignment */}
      <div className={classes.container}>
        {/* Copyright section */}
        <div className={classes.copyright}>
          <p>&copy; {currentYear} Phone Book App. All rights reserved.</p>
        </div>
        {/* Navigation links section */}
        <div className={classes.links}>
          {/* Link to Terms page */}
          <Link to="/terms" className={classes.link}>Terms</Link>
          {/* Link to Privacy page */}
          <Link to="/privacy" className={classes.link}>Privacy</Link>
          {/* Link to Help page */}
          <Link to="/help" className={classes.link}>Help</Link>
        </div>
      </div>
    </footer>
  );
}

// Export the Footer component for use in other parts of the application
export default Footer;
